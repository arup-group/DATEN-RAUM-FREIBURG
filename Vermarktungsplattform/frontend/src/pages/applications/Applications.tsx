import { Alert, Container, Stack } from "@mui/material";
import { PageScaffold } from "../../components/PageScaffold";
import { TitleComponent } from "../../components/TitleComponent";
import { ApplicationTable } from "../../components/tables/applicationsTable/ApplicationsTable";
import { ReturnNavBar } from "../../components/ReturnNavBar";
import { SearchBar } from "../../components/search/SearchBar";
import { useEffect, useState } from "react";
import { useGetApplicationsWithApplicantQuery } from "../../redux/slices/applications/ApplicationAPISlice";
import { useGetMeQuery } from "../../redux/slices/user/GetUserAPISlice";
import { ApplicantDataProps } from "../../interfaces/Applicant";
import ErrorAlert from "../../components/ErrorAlert";

/**
 * @param {string} developmentArea - Proposed development area for application
 * @param {string} supportingInfo - Additional supporting information
 */
export interface AdditionalApplciationInfoProp {
  developmentArea: string;
  supportingInfo: string;
}

/**
 * @param {number} id - Id of criteria
 * @param {string} criteria - Criteria awarding category
 * @param {number} rating - Rating of application for criteria
 */
export interface AwardCriteriaEvalutationProp {
  id: number;
  criteria: string;
  rating: number;
}

/**
 * @param {number} id - Id of application
 * @param {number} plotID - Id of plot linked with application
 * @param {boolen} blockAnchorApplication - Is application for anchor
 * @param {boolen} considerForOtherPlots - Is applicant open to similar plots
 * @param {File[]} documents -Uploaded documents for application
 * @param {AdditionalApplciationInfoProp} additionalInformation - Supporting information
 * @param {string} awardStatus - Award status of application
 * @param {AwardCriteriaEvalutationProp[]} awardEvaluation - Award evaluation of application
 * @param {ApplicantDataProps} applicant - applicant for application
 */
export interface ApplicationProp {
  id: number;
  plotID: number;
  blockAnchorApplication: boolean;
  considerForOtherPlots: boolean;
  documents: File[];
  additionalInformation: AdditionalApplciationInfoProp;
  awardStatus: string;
  awardEvaluation: AwardCriteriaEvalutationProp[];
  applicant: ApplicantDataProps;
}

/**
 * Component to display applicant applications
 */
export const Applications = () => {
  const [searchResults, setSearchResults] = useState<ApplicationProp[] | []>(
    []
  );

  //get current user information
  const {
    data: getUserData,
    isError: isGetUserError,
    error: getUserError,
  } = useGetMeQuery({
    refetchOnMountOrArgChange: true,
  });

  const {
    data: applications,
    isLoading: applicationsIsLoading,
    isSuccess: applicationIsSuccess,
    isError: applicationIsError,
    error: applicationError,
  } = useGetApplicationsWithApplicantQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
      data: !getUserData
        ? []
        : getUserData.is_admin === 0
        ? data?.applications?.filter(
            (application: any) =>
              application.user_id === parseInt(getUserData.id)
          )
        : data?.applications,
      isLoading,
      isSuccess,
      isError,
      error,
    }),
  });

  const searchRequest = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (applications) {
      const results = applications.filter((application: ApplicationProp) =>
        Object.values(application).find((element: number | string) => {
          if (element.toString().includes(event.target.value)) {
            return true;
          }
        })
      );
      if (results) setSearchResults(results);
    }
  };

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
            <TitleComponent title="Grundstücksbewerbungen" />

            <SearchBar
              requestCallback={searchRequest}
              searchPlaholder="Suche"
            />
          </Stack>

          {!applicationIsError && !isGetUserError ? (
            <ApplicationTable
              applicationData={
                !applicationsIsLoading && applicationIsSuccess
                  ? searchResults && searchResults.length > 0
                    ? searchResults
                    : applications
                  : []
              }
            />
          ) : (
            <ErrorAlert
              errormsg="Fehler bei der Anzeige der Ergebnisse. Bitte kehren Sie zur
              vorherigen Seite zurück."
              severity="error"
            />
          )}
        </Container>
      }
    />
  );
};
