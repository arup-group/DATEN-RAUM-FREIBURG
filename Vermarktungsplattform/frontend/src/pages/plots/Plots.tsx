import React, { useState } from "react";
import { PageScaffold } from "../../components/PageScaffold";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RowDetailsBtn } from "../../components/RowDetailsBtn";
import { TitleComponent } from "../../components/TitleComponent";
import { Container, Stack } from "@mui/material";
import { ReturnNavBar } from "../../components/ReturnNavBar";
import { SearchBar } from "../../components/search/SearchBar";
import { CustomToolbar } from "../../components/tables/utils/customToolbar/CustomToolbar";
import { useGetGrundstuecksparzellierungWFSServiceQuery } from "../../redux/services/GrundstuecksparzellierungWFSService";
import { ActivityIndicator } from "../../components/indicator/ActivityIndicator";
import ErrorAlert from "../../components/ErrorAlert";

/**
 * Component to display WFS stream plots in a table view
 */
export const Plots = () => {
  //pull WFS plot data
  const { data, isLoading, isError, error } =
    useGetGrundstuecksparzellierungWFSServiceQuery();

  const [searchResults, setSearchResults] = useState([]);

  //plot search request handler
  const searchRequest = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (data && data.translatedData && data.translatedData.features) {
      const results = data.translatedData.features.filter((feature: any) =>
        Object.values(feature.properties).find((element: any) => {
          if (element.includes(event.target.value)) {
            return true;
          }
        })
      );
      if (results) setSearchResults(results);
    }
  };

  //return desired properties for plot row data
  const getFlaeche = (params: any) => `${params.row.properties.flaeche} m²`;
  const getId = (params: any) => `${params.row.properties.id} `;
  const getKategorie = (params: any) => `${params.row.properties.kategorie}`;

  //table column construct
  const columnsT: GridColDef[] = [
    {
      field: "id",
      headerName: "Grundstücksnr.",
      width: 150,
      flex: 1,
      valueGetter: getId,
    },
    {
      field: "flaeche",
      headerName: "Flaeche",
      width: 150,
      flex: 1,
      valueGetter: getFlaeche,
    },
    {
      field: "kategorie",
      headerName: "Kategorie",
      width: 150,
      flex: 1,
      valueGetter: getKategorie,
    },
    {
      field: "action",
      headerName: "",
      renderCell: (params) => {
        const { row } = params;
        return (
          <RowDetailsBtn
            row={row}
            tempLink={"/plotdetails"}
            state={{ state: { plotFID: row.properties.fid } }}
            label="Details anzeigen"
          />
        );
      },
      width: 150,
      disableExport: true,
    },
  ];

  return (
    <PageScaffold
      showAccountMenu={true}
      showConsoleLink={true}
      protectedArea={true}
      children={
        <Container>
          <ReturnNavBar
            navigateURL="/managementconsole"
            navigationLabel="Verwaltungssteuerung"
          />
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <TitleComponent title="Grundstücke" />
            <SearchBar
              requestCallback={searchRequest}
              searchPlaholder="Suche"
            />
          </Stack>

          {isLoading ? (
            <ActivityIndicator label="Laden von Plots" />
          ) : isError ? (
            <ErrorAlert
              errormsg="Fehler bei der Anzeige von Plot-Informationen. Bitte versuchen Sie es später noch einmal."
              severity="error"
            />
          ) : (
            <>
              <DataGrid
                sx={{
                  minHeight: "80vh",
                  background: "#ffffff",
                  m: 2,
                  padding: 1,
                  margin: "5px",
                  boxShadow: 2,
                  border: 0,
                }}
                rows={
                  searchResults && searchResults.length > 0
                    ? searchResults
                    : data && data.translatedData
                    ? data.translatedData.features
                    : []
                }
                columns={columnsT}
                density={"compact"}
                getRowId={(row) => row.properties.fid}
                disableColumnSelector={true}
                disableSelectionOnClick={true}
                hideFooter={true}
                hideFooterPagination={true}
                components={{
                  Toolbar: CustomToolbar,
                }}
              />
            </>
          )}
        </Container>
      }
    />
  );
};
