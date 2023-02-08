import { Box, Grid, Stack } from "@mui/material";
import { TitleComponent } from "../../components/TitleComponent";
import { PageScaffold } from "../../components/PageScaffold";
import { TitleValueProps } from "../../components/cards/props/TitleValueProps";
import { TabPanel } from "../../components/tabs/TabPanel";
import { ApplicantApplications } from "./tabs/ApplicantApplications";
import { ReturnNavBar } from "../../components/ReturnNavBar";
import { DetailsCard } from "../../components/cards/DetailsCard";
import { useLocation } from "react-router-dom";
import { useGetApplicantQuery } from "../../redux/slices/applicants/ApplicantsAPISlice";
import { useGetApplicationsWithApplicantQuery } from "../../redux/slices/applications/ApplicationAPISlice";
import { useEffect } from "react";
import ErrorAlert from "../../components/ErrorAlert";

//Page details of an applicant and displays their applications
export const ApplicantDetails = () => {
  //type decleration for application location state
  type ApplicantLocationState = {
    id: string;
  };

  const location = useLocation();
  const { id } = location.state as ApplicantLocationState;

  const {
    data: applicant,
    isError: isGetApplicantError,
    error: getApplicantError,
  } = useGetApplicantQuery(parseInt(id));

  const { applications } = useGetApplicationsWithApplicantQuery(undefined, {
    selectFromResult: ({ data }) => ({
      applications: data?.applications
        ? data?.applications?.filter(
            (application: any) => application.user_id === parseInt(id)
          )
        : [],
    }),
  });

  useEffect(() => {
    if (isGetApplicantError) console.error(getApplicantError);
  });

  //Applicant data
  const applicantDetails: TitleValueProps[] = [
    { label: "Bewerber:in: ", value: applicant?.full_name ?? " - " },
    { label: "Firma: ", value: applicant?.company_name ?? " - " },
    { label: "Adresse: ", value: applicant?.postal_address ?? " - " },
    { label: "Kontakt: ", value: applicant?.phone_number ?? " - " },
  ];

  return (
    <PageScaffold
      showAccountMenu={true}
      showConsoleLink={true}
      protectedArea={true}
      children={
        <Box
          sx={{
            margin: 2,
            flexDirection: "column",
            flex: 1,
          }}
        >
          <ReturnNavBar
            navigateURL="/applicants"
            navigationLabel="Bewerber:innen"
          />
          <TitleComponent title={"Bewerbungen"} />
          <Grid container columnGap={6} sx={{}}>
            <Grid item xs={1.5}>
              <Stack direction="column" spacing={0}>
                <DetailsCard titleValueArray={applicantDetails} />
              </Stack>
            </Grid>
            <Grid item sx={{ flex: 1, flexDirection: "row" }}>
              {!isGetApplicantError ? (
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <ApplicantApplications applications={applications} />
                </Box>
              ) : (
                <ErrorAlert
                  errormsg=" Fehler bei der Anzeige der Ergebnisse. Bitte kehren Sie zur
              vorherigen Seite zurück."
                  severity="error"
                />
              )}

              <TabPanel value={0} index={0}></TabPanel>
            </Grid>
          </Grid>
        </Box>
      }
    />
  );
};
