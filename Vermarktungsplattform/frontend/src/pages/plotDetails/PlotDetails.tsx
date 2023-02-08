import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Stack, Tab, Tabs } from "@mui/material";
import { TitleComponent } from "../../components/TitleComponent";
import { PageScaffold } from "../../components/PageScaffold";
import { ActionBtnDetailsCard } from "../../components/cards/ActionBtnDetailsCard";
import { DetailsCard } from "../../components/cards/DetailsCard";
import { BlockOverview } from "./tabs/BlockOverview";
import { SiteInformation } from "./tabs/SiteInformation";
import { useLocation, useNavigate } from "react-router-dom";
import { TitleValueProps } from "../../components/cards/props/TitleValueProps";
import { a11yProps, TabPanel } from "../../components/tabs/TabPanel";
import { ReturnNavBar } from "../../components/ReturnNavBar";
import MapInstance from "../../components/cesium/MapInstance";
import { useGetGrundstuecksparzellierungWFSServiceQuery } from "../../redux/services/GrundstuecksparzellierungWFSService";
import { entSelectedBackground } from "../../utils/EntityColors";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import {
  useGetGrundApplicationAwardStatusQuery,
  useGetGrundIdAnchorQuery,
} from "../../redux/slices/applications/ApplicationAPISlice";
import PlotDetailsExample from "../../components/cards/DummyCard/PlotDetailsExample";
import {
  Entity,
  reconstructEntityResponse,
} from "../../components/cesium/utils/EntityResponse";
import { capitalizeFirstLetter } from "../../utils/StringFormatter";

/**
 * @param {string} plotFID - Plot unique FID
 * @param {number | null} applicationID - ID of application for plot (optional)
 */
export type PlotLocationState = {
  plotFID: number;
  applicationID: number | null;
};

/**
 * Component to display details of a selected map instance plot
 */
export const PlotDetails = () => {
  //selected tab state
  const [value, setValue] = useState(0);
  //coordinate for map centre
  const [plotCentreCoord, setPlotCentreCoord] = useState([0, 0, 0]);
  //anchor details model (optional)
  const [anchorDetails, setAnchorDetails] = useState<TitleValueProps[] | []>(
    []
  );
  //example of how details of a plot could look (Plot 1.19.1)
  const [plotDetailsExample, setPlotDetailsExample] = useState(false);

  let navigate = useNavigate();
  const location = useLocation();

  //plot FID from navigation
  const { plotFID } = location.state as PlotLocationState;

  //get site WFS stream data
  const grundstuecksparzellierungQuery =
    useGetGrundstuecksparzellierungWFSServiceQuery();
  const grundstueckData = grundstuecksparzellierungQuery.data;

  //Get anchor information for plot
  const { data } = useGetGrundIdAnchorQuery(plotFID ? plotFID : skipToken, {
    refetchOnMountOrArgChange: true,
  });

  //Get plot award status
  const { data: plotAwardStatus, isError: isPlotAwardedError, error: plotAwardedError } =
    useGetGrundApplicationAwardStatusQuery(plotFID ? plotFID : skipToken, {
      refetchOnMountOrArgChange: false,
    });


  //Set block details
  const [blockDetails, setBlockDetails] = useState<TitleValueProps[]>([
    {
      label: "Grundstücksnummer: ",
      value: plotFID ? plotFID.toString() : " - ",
    },
    {
      label: "Vergabestatus: ",
      value: isPlotAwardedError ? "Frei" : plotAwardStatus,
    },
  ]);

  //CHange handler for tabs
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //Navigation handler for application process
  const applyToPlot = (event: any) => {
    navigate("/application", {
      state: { applicationID: null, plotFID: plotFID },
    });
  };

  useEffect(() => {
    if (grundstueckData && grundstueckData.translatedData) {
      //return selected entity from WFS data
      const selectedFeatures = grundstueckData.translatedData.features.filter(
        (feature: any) => {
          return feature.properties.fid === plotFID;
        }
      );

      if (selectedFeatures.length > 0) {
        const keyValueConstruct: Entity[] = [];

        //return key value map of entity properties
        for (const [key, valueO] of Object.entries(
          selectedFeatures[0].properties
        )) {
          keyValueConstruct.push({
            label: capitalizeFirstLetter(key),
            value: valueO as string,
          });
        }

        /**
         * NOTE
         * Hardcoded example data for plot 1.19.1 - for demonstration purposes only. 
         * 
         * This is to demonstrate how a plot detail page could look to the prospective user.
         * The implemented pattern is only intended for the prototypical use case and not for production.
         */
        let additionHardCodedData: Entity[] = [];

        if (selectedFeatures[0].properties.id === "1.19.1") {
          setPlotDetailsExample(true);

          additionHardCodedData.push(
            { label: "Anzahl Geschosse:", value: "1/4/5" },
            { label: "Bewerbungsfrist:", value: "01.05.2024" }
          );
        }

        //set selected plot details
        setBlockDetails([
          {
            label: "Vergabestatus: ",
            value: isPlotAwardedError ? "Frei" : plotAwardStatus,
          },
          ...reconstructEntityResponse(keyValueConstruct),
          ...additionHardCodedData,
        ]);

        //update map to display centre on selected plot
        if (
          selectedFeatures[0].geometry &&
          selectedFeatures[0].geometry.coordinates
        ) {
          setPlotCentreCoord(selectedFeatures[0].geometry.coordinates[0][0]);
        }
      }
    }

    //display anchor information if present
    if (data && data.anchor) {
      setAnchorDetails([
        { label: "Name: ", value: data.anchor.full_name },
        { label: "Firma: ", value: data.anchor.company_name ?? "-" },
        {
          label: "Kontact: ",
          value: data.anchor.email ?? data.anchor.phone_number,
        },
      ]);
    }
  }, [grundstueckData, data, plotAwardStatus, isPlotAwardedError]);

  //callback function on map data load
  const onGeoJSONLoadCallback = (params: any) => {
    //update selected plot entity background color and border color
    const selectedPlotEntity = params.entities.values.filter((entity: any) => {
      return entity.properties.fid._value === plotFID;
    });

    if (selectedPlotEntity[0] && selectedPlotEntity[0].polygon) {
      selectedPlotEntity[0].polygon.material = entSelectedBackground;
    }
  };

  return (
    <PageScaffold
      showAccountMenu={true}
      showConsoleLink={true}
      protectedArea={true}
      children={
        <Container>
          <ReturnNavBar navigateURL={-1} navigationLabel="Grundstücke" />
          <TitleComponent title={"Baufeld Informationen"} />
          <Grid container columnSpacing={2}>
            <Grid item xs={2} sx={{ minWidth: "150px" }}>
              <Stack direction="column" spacing={3}>
                <>
                  {plotAwardStatus === "Vergeben" ? (
                    <DetailsCard
                      title={"Bewerben"}
                      titleValueArray={blockDetails}
                    />
                  ) : (
                    <ActionBtnDetailsCard
                      titleValueArray={blockDetails}
                      actionLabel={"Bewerben"}
                      actionCallback={applyToPlot}
                    />
                  )}
                  {anchorDetails.length > 0 && (
                    <DetailsCard
                      title={"Ankergrundstück: Details"}
                      titleValueArray={anchorDetails}
                    />
                  )}
                </>
              </Stack>
            </Grid>
            <Grid item xs={10} sx={{ marginBottom: "100px" }}>
              <Box>
                {grundstueckData && grundstueckData.translatedData && (
                  <MapInstance
                    wfsData={grundstueckData.translatedData}
                    focusCoordinate={plotCentreCoord}
                    zoomOutFactor={1000}
                    onLoadCallback={onGeoJSONLoadCallback}
                    randomColor={false}
                  />
                )}
              </Box>
              {!plotDetailsExample ? (
                <>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      marginTop: "30px",
                    }}
                  >
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                      {...a11yProps(0)}
                    >
                      <Tab
                        label="Übersicht"
                        sx={{ textTransform: "none" }}
                        {...a11yProps(1)}
                      />
                      <Tab
                        label="Steckbriefe"
                        sx={{ textTransform: "none" }}
                        {...a11yProps(2)}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <BlockOverview selectedPlot={plotFID} />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <SiteInformation />
                  </TabPanel>
                </>
              ) : (
                <>
                  <PlotDetailsExample />
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      }
    />
  );
};
