import React, { useEffect, useState } from "react";
import { Container, Stack } from "@mui/material";
import { PageScaffold } from "../../components/PageScaffold";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RowDetailsBtn } from "../../components/RowDetailsBtn";
import { TitleComponent } from "../../components/TitleComponent";
import { ReturnNavBar } from "../../components/ReturnNavBar";
import { SearchBar } from "../../components/search/SearchBar";
import { ApplicantDataProps } from "../../interfaces/Applicant";
import { CustomToolbar } from "../../components/tables/utils/customToolbar/CustomToolbar";
import { useGetApplicantsQuery } from "../../redux/slices/applicants/ApplicantsAPISlice";
import ErrorAlert from "../../components/ErrorAlert";

//Page displays applicants and includes search functionality
export const Applicants = () => {
  const [searchResults, setSearchResults] = useState<ApplicantDataProps[] | []>(
    []
  );

  //get applicants from redux query
  const {
    data: applicants,
    isError: isApplicantsError,
    error: applicantError,
  } = useGetApplicantsQuery();

  //search request handler
  const searchRequest = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (applicants) {
      const results = applicants.filter((applicant: ApplicantDataProps) =>
        Object.values(applicant).find((element: number | string) => {
          if (element.toString().includes(event.target.value)) {
            return true;
          }
        })
      );
      if (results) setSearchResults(results);
    }
  };

  useEffect(() => {
    if (isApplicantsError) console.error(applicantError);
  });

  //table columns
  const columnsT: GridColDef[] = [
    { field: "id", headerName: "Bewerber:in-Nr.", width: 130 },
    { field: "full_name", headerName: "Name", width: 150, flex: 1 },
    { field: "company_name", headerName: "Firma", width: 150, flex: 1 },
    {
      field: "action",
      headerName: "",
      renderCell: (params) => {
        const { row } = params;
        return (
          <RowDetailsBtn
            row={row}
            tempLink={"/applicantdetails"}
            label="Details anzeigen"
            state={{
              state: {
                id: row.id,
              },
            }}
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
            navigationLabel="Anmeldeportal"
          />

          <Stack direction="row" sx={{ alignItems: "center" }}>
            <TitleComponent title={"Bewerber:innen"} />

            <SearchBar
              requestCallback={searchRequest}
              searchPlaholder="Suche"
            />
          </Stack>

          {!isApplicantsError ? (
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
                  : applicants
                  ? applicants
                  : []
              }
              columns={columnsT}
              density={"compact"}
              disableColumnSelector={true}
              disableSelectionOnClick={true}
              hideFooter={true}
              hideFooterPagination={true}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          ) : (
            <ErrorAlert
              errormsg=" Fehler bei der Anzeige der Ergebnisse. Bitte kehren Sie zur
              vorherigen Seite zurück."
              severity="error"
            />
          )}
        </Container>
      }
    />
  );
};
