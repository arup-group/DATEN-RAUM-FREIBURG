import { useEffect, useState } from "react";
import MapInstance from "../../../components/cesium/MapInstance";
import { Section } from "../../../components/Section";
import { Box, Container, Grid, Stack } from "@mui/material";

import { MapCard } from "../../../components/cesium/MapCard";
import { InstructionCard } from "../../../components/cards/InstructionCard";
import { EntityProps } from "../../../components/cesium/props/SelectedEntityProps";
import { useGetGrundstuecksparzellierungWFSServiceQuery } from "../../../redux/services/GrundstuecksparzellierungWFSService";
import {
  entPolyBorder,
  entSelectedBackground,
} from "../../../utils/EntityColors";
import { Color } from "cesium";
import { capitalizeFirstLetter } from "../../../utils/StringFormatter";

/**
 * @param {string} fid - entity data fid
 * @param {string} text - entity text info
 * @param {string} bauabsch - entity bauabsch info
 * @param {string} flurstueck - entity flurstueck info
 */
export interface PropertyProps {
  fid: string;
  text: string;
  bauabsch: string;
  flurstueck: string;
}

/**
 * @param {Object} geometry - entity geometry data
 * @param {PropertyProps} properties - entity properties
 * @param {string} type - entity type
 */
export interface FeatureProps {
  geometry: Object;
  properties: PropertyProps;
  type: string;
}

/**
 * Component to display WFS blocks data onto Cesium instance
 */
export const BlocksOverview = () => {
  const [selectedEntity, setSelectedEntity] = useState<EntityProps | null>();
  const [selectedEntityProperties, setSelectedEntityProperties] = useState([]);
  const [selectedColRef, setSelectedColRef] = useState<Color | null>();

  //plot data from WFS service
  const grundstuecksparzellierungQuery =
    useGetGrundstuecksparzellierungWFSServiceQuery();
  const grundstueckData = grundstuecksparzellierungQuery.data;

  //Cesium map instance selected entity state handler
  const updateSelectedEntity = (
    properties: any // SelectedEntityCallBackProps[] | [undefined]
  ) => {
    if (properties) {
      setSelectedEntityProperties(properties);
    }
  };

  useEffect(() => {
    //Handle ingestion error on render
    if (grundstuecksparzellierungQuery.isError) {
      window.alert("Quelldaten konnten nicht abgerufen werden.");
      console.error(grundstuecksparzellierungQuery.error);
    }
  });

  //Selected entity changes event handler
  const handleSelectedEntityChanged = (ref: any) => {
    //check for a previously selected entity
    if (selectedEntity && selectedEntity.polygon?.material && selectedColRef) {
      //if there's a previously selected entity, revert it's color back to it's random color value
      selectedEntity.polygon.material = selectedColRef;
      selectedEntity.polygon._outlineColor._value = entPolyBorder;
      setSelectedColRef(null);
      setSelectedEntity(null);
      setSelectedEntityProperties([]);
    }

    if (ref.current?.cesiumElement?.selectedEntity) {
      if (ref.current?.cesiumElement?.selectedEntity?.polygon?.material) {
        //keep reference of polygon random color
        setSelectedColRef(
          ref.current.cesiumElement.selectedEntity.polygon.material
        );

        //set selected polygon background
        ref.current.cesiumElement.selectedEntity.polygon.material =
          entSelectedBackground;
      }

      //selected entity state
      setSelectedEntity(ref.current?.cesiumElement?.selectedEntity);

      //return entity properties keys
      const propValues =
        ref.current?.cesiumElement?.selectedEntity?.properties?.propertyNames;

      //For each properties entry, return key value to display
      const properties = propValues?.reduce(
        (result: Object[], propertyName: any) => {
          const propertyList =
            ref.current?.cesiumElement?.selectedEntity?.properties;

          //filter out text property key
          if (propertyName !== "text") {
            //format key string with uppercase first character for presentation
            result.push({
              label: `${capitalizeFirstLetter(propertyName)}: `,
              value: propertyList ? propertyList[propertyName]._value : null,
            });
          }
          return result;
        },
        []
      );

      if (properties) updateSelectedEntity(properties);
    }
  };

  return (
    <Container sx={{ marginTop: 6 }}>
      <Grid container columnSpacing={3}>
        <Grid item xs={9}>
          <Stack rowGap={0} direction="column">
            {grundstueckData &&
              grundstueckData.translatedData &&
              grundstueckData.translatedData.features.length > 0 && (
                <MapInstance
                  wfsData={grundstueckData.translatedData}
                  focusCoordinate={grundstueckData.centreCoord}
                  onSelectedEntityChange={handleSelectedEntityChanged}
                  randomColor={true}
                />
              )}
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack
            rowGap={0}
            direction="column"
            sx={{
              marginTop: 0,
            }}
          >
            <Section title={"Übersicht: Grundstücke"} />
            <Box sx={{ marginTop: "12px" }}>
              {selectedEntityProperties.length > 0 ? (
                <MapCard selectedEntity={selectedEntityProperties} />
              ) : (
                <InstructionCard
                  title="Übersicht: Grundstücke"
                  description="Wählen Sie ein Grundstück für weitere Informationen und zur Einreichung eines Antrags."
                />
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
