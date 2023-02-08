import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { SearchBar } from "../../../components/search/SearchBar";
import { Section } from "../../../components/Section";
import { ApplicationTable } from "../../../components/tables/applicationsTable/ApplicationsTable";
import { ApplicationProp } from "../../applications/Applications";

/**
 * @param {ApplicationProp[]} applications - Applications linked with applicant
 */
export interface ApplicantApplicationsProps {
  applications: ApplicationProp[];
}

/**
 * Page that displys Applicant Applications with search functionality
 */
export const ApplicantApplications = (props: ApplicantApplicationsProps) => {
  const { applications } = props;

  //search bar state
  const [searchResults, setSearchResults] = useState<ApplicationProp[] | []>(
    []
  );

  //search request handler
  const searchRequest = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (applications) {
      const results = applications.filter((application: ApplicationProp) =>
        Object.values(application).find((element: number | string) => {
          if (element?.toString().includes(event.target.value)) {
            return true;
          }
        })
      );
      if (results) setSearchResults(results);
    }
  };

  return (
    <Box
      sx={{
        marginTop: "5px",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Section title={"Eingereichte Bewerbungen"} />
        <Box sx={{ flex: 1, flexGrow: 1, flexDirection: "row" }} />
        <SearchBar requestCallback={searchRequest} searchPlaholder="Suche" />
      </Stack>

      <Box
        sx={{
          marginTop: "15px",
          width: "100%",
        }}
      >
        <ApplicationTable
          applicationData={
            searchResults && searchResults.length > 0
              ? searchResults
              : applications
          }
        />
      </Box>
    </Box>
  );
};
