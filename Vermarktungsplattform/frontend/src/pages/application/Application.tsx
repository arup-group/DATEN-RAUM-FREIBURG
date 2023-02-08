import React, { SyntheticEvent, useEffect, useState } from "react";
import { Box, Container, Grid, Stack, Tab, Tabs } from "@mui/material";
import { TitleComponent } from "../../components/TitleComponent";
import { PageScaffold } from "../../components/PageScaffold";
import { ActionBtnDetailsCard } from "../../components/cards/ActionBtnDetailsCard";
import { TitleValueProps } from "../../components/cards/props/TitleValueProps";
import { ActionCheckDetailsCard } from "../../components/cards/ActionCheckDetailsCard";
import { DocumentProp, Documents } from "./tabs/Documents";
import { AdditionalInformation, InfoProps } from "./tabs/AdditionalInformation";
import { a11yProps, TabPanel } from "../../components/tabs/TabPanel";
import {
  AwardCriteriaEvaluationProp,
  AwardEvalutation,
} from "./tabs/AwardEvaluation";
import { ReturnNavBar } from "../../components/ReturnNavBar";

import { awardCriteriaEvaluation } from "./tabs/utils/AwardCriteriaReference";
import { useLocation, useNavigate } from "react-router-dom";
import { PlotLocationState } from "../plotDetails/PlotDetails";
import {
  useAddApplicationMutation,
  useDeleteApplicationMutation,
  useGetApplicationQuery,
  useUpdateApplicationMutation,
} from "../../redux/slices/applications/ApplicationAPISlice";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetApplicationFilesQuery,
  useUploadFileMutation,
} from "../../redux/slices/documents/ApplicationFileAPISlice";
import { DeleteCard } from "../../components/cards/DeleteCard";
import { useGetMeQuery } from "../../redux/slices/user/GetUserAPISlice";
import { Overview } from "./tabs/Overview";
import ErrorAlert from "../../components/ErrorAlert";

/**
 * Application document object
 * @param {number} application_id - Application Document ID
 * @param {string} date_uploaded - Date file uploaded
 * @param {string} document_name - File name of document
 * @param {number} file_size - File size of document
 * @param {string} id - Document id
 */
interface ApplicationFileProp {
  application_id: number;
  date_uploaded: string;
  document_name: string;
  file_size: number;
  id: string;
}

/**
 * Page to display an application
 */
export const Application = () => {
  //router handler
  let navigate = useNavigate();
  const location = useLocation();
  const { plotFID, applicationID } = location.state as PlotLocationState;

  //value state for tabs
  const [value, setValue] = useState(0);

  const [documents, setDocuments] = useState<DocumentProp[] | []>([]);

  const [additionalInformation, setAdditionalInfo] = useState<InfoProps>({
    developmentArea: "",
    supportingInfo: "",
  });

  const [awardEvalutation, setAwardEvalutation] = useState<
    AwardCriteriaEvaluationProp[]
  >(awardCriteriaEvaluation);

  const [awardStatus, setAwardStatus] = useState("Frei");
  const [blockAnchorStatus, setBlockAnchorStatus] = useState(false);
  const [similarPlotsStatus, setSimilarPlotsStatus] = useState(false);
  const [blockDetails, setBlockDetails] = useState<TitleValueProps[] | []>([]);
  const [applicantID, setApplicantID] = useState<number | null>();
  const [addApplication, addAppResponse] = useAddApplicationMutation();
  const [updateApplication, updateAppResponse] = useUpdateApplicationMutation();
  const [uploadFile, uploadFileResponse] = useUploadFileMutation();
  const [deleteApplication, deleteApplicationResponse] =
    useDeleteApplicationMutation();

  //get application data from redux query
  const {
    data: application,
    isLoading: getIsApplicationLoading,
    isSuccess: getIsApplicationSuccess,
    isError: getIsApplicationError,
    error: getApplicationError,
  } = useGetApplicationQuery(applicationID ? applicationID : skipToken, {
    refetchOnMountOrArgChange: true,
  });

  //get application documents
  const {
    data: applicationFiles,
    isError: isApplicationFilesError,
    error: applicationFilesError,
  } = useGetApplicationFilesQuery(applicationID ? applicationID : skipToken, {
    refetchOnMountOrArgChange: true,
  });

  //get user data
  const {
    data: getUserData,
    isLoading: getIsUserDataLoading,
    isSuccess: getIsUserDataSuccess,
    isError: getIsUserDataError,
    error: getUserDataError,
  } = useGetMeQuery({ refetchOnMountOrArgChange: false });

  //admin state of user
  const isAdmin =
    getUserData && getIsUserDataSuccess && getUserData.is_admin === 1;

  //handler to delete application
  const deleteApplicationHandler = (event: SyntheticEvent) => {
    if (
      window.confirm(
        "Sind Sie sicher, dass Sie diese Anwendung löschen möchten?"
      )
    ) {
      if (applicantID) {
        deleteApplication({
          id: applicationID,
        })
          .unwrap()
          .then((res: any) => {
            navigate("/applications", { replace: true });
          })
          .catch((error: Error | void) => {
            console.error("Delete file error ", error);
            alert("Fehler beim Löschen der Anwendung");
          });
      }
    }
  };

  //helper method to check string in valid JSON format
  const safeJsonParse = (str: string) => {
    try {
      return [null, JSON.parse(str)];
    } catch (err) {
      return [err];
    }
  };

  useEffect(() => {
    if (application) {
      setAwardStatus(application.award_status);
      setBlockAnchorStatus(application.block_anchor);
      setSimilarPlotsStatus(application.open_to_other_plots);

      //additional information JSON parse
      const [aTError, additionalText] = safeJsonParse(
        application.additional_text
      );

      setAdditionalInfo(
        additionalText
          ? additionalText
          : {
              developmentArea: "",
              supportingInfo: "",
            }
      );

      //award outcome json parse
      const [aOError, awardOutcomee] = safeJsonParse(application.award_outcome);

      setAwardEvalutation(
        awardOutcomee ? awardOutcomee : awardCriteriaEvaluation
      );

      //construct block details linked to application
      setBlockDetails([
        {
          label: "Grundstücksnummer: ",
          value: application.grund_id.toString(),
        },
        { label: "Bewerbungsstatus: ", value: application.award_status },
      ]);

      setApplicantID(application.user_id);

      //
      if (applicationFiles) {
        const documentRefs: DocumentProp[] = [];
        applicationFiles.forEach((applicationFile: ApplicationFileProp) => {
          const { id, document_name } = applicationFile;
          documentRefs.push({
            ref: "uploaded",
            id: id,
            name: document_name,
          });
        });
        setDocuments(documentRefs);
      }
    } else {
      if (plotFID) {
        setBlockDetails([
          { label: "Grundstücksnummer: ", value: plotFID.toString() },
          { label: "Bewerbungsstatus: ", value: awardStatus },
        ]);
      }
    }
  }, [application, plotFID, applicationID, applicationFiles]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const uploadDocumentsHandler = (
    applicationId: number,
    documents: DocumentProp[]
  ) => {
    let documentsProcessed = 0;
    documents.forEach((document, index, documents) => {
      //don't upload a file already uploaded...
      if (document.ref === "uploaded") {
        documentsProcessed++;
        if (documentsProcessed === documents.length)
          navigate("/applications", { replace: true });
        return;
      }
      //new document, upload to server
      var formData = new FormData();
      formData.append("file", document.fileBlob as File);

      uploadFile({
        id: applicationId,
        data: formData,
      })
        .unwrap()
        .then((res: any) => {
          documentsProcessed++;

          if (documentsProcessed === documents.length)
            navigate("/applications", { replace: true });
        })
        .catch((error: Error | void) => {
          console.log("Upload file error ", error);
          alert("Fehler beim Hochladen des Dokuments");
        });
    });
  };

  const saveApplication = (event: any) => {
    if (plotFID || application) {
      if (applicationID === null) {
        //new application payload
        const nPayload = {
          grund_id: plotFID,
          block_anchor: blockAnchorStatus,
          award_status: awardStatus,
          open_to_other_plots: similarPlotsStatus,
          award_outcome: JSON.stringify(awardEvalutation),
          additional_text: JSON.stringify(additionalInformation),
        };

        addApplication(nPayload)
          .unwrap()
          .then((res: any) => {
            if (documents.length > 0) {
              uploadDocumentsHandler(res.id, documents);
            } else {
              navigate("/applications", { replace: true });
            }
          })
          .catch((error: Error | void) => {
            console.log(error);
            alert("Fehler beim Speichern der Anwendung");
          });
      } else {
        const uPayload = {
          id: parseInt(application.id),
          award_status: awardStatus,
          award_outcome: JSON.stringify(awardEvalutation),
          additional_text: JSON.stringify(additionalInformation),
          block_anchor: blockAnchorStatus,
          grund_id: application.grund_id,
          open_to_other_plots: similarPlotsStatus,
        };
        updateApplication(uPayload)
          .unwrap()
          .then((res: any) => {
            if (documents.length > 0) {
              uploadDocumentsHandler(applicationID, documents);
            } else {
              navigate("/applications", { replace: true });
            }
          })
          .catch((error: Error | void) => {
            console.error("application error response ", error);
            alert("Fehler speichern. Bitte versuchen Sie es erneut.");
          });
      }
    } else {
      alert("Fehler speichern. Bitte versuchen Sie es erneut.");
    }
  };

  const updateAnchorCheck = (event: any) => {
    setBlockAnchorStatus(event.target.checked);
  };

  const updateOtherPlotsCheck = (event: any) => {
    setSimilarPlotsStatus(event.target.checked);
  };

  const updateDocuments = (documents: DocumentProp[]) => {
    setDocuments(documents);
  };

  const updateEvaluation = (evaluation: AwardCriteriaEvaluationProp[]) => {
    setAwardEvalutation(evaluation);
  };

  const updateAdditionalInfo = (additionalInfo: InfoProps) => {
    setAdditionalInfo(additionalInfo);
  };

  const updateAwardStatus = (statusNumber: string) => {
    setAwardStatus(statusNumber);
  };

  return (
    <PageScaffold
      showAccountMenu={true}
      showConsoleLink={true}
      protectedArea={true}
      children={
        <Container>
          <ReturnNavBar navigateURL={-1} navigationLabel="Zurück" />
          <TitleComponent title={"Bewerben"} />

          {getIsApplicationError ||
          getIsUserDataError ||
          isApplicationFilesError ? (
            <ErrorAlert
              errormsg="Fehler beim Laden von Anwendungsdaten. Bitte kehren Sie zur vorherigen Seite zurück."
              severity="error"
            />
          ) : (
            <Grid container columnSpacing={6}>
              <Grid item>
                <Stack direction="column" spacing={3}>
                  <ActionBtnDetailsCard
                    titleValueArray={blockDetails}
                    actionLabel={"Bewerbung speichern"}
                    actionCallback={saveApplication}
                  />
                  <ActionCheckDetailsCard
                    title="Ankergrundstück"
                    description="Bitte ankreuzen, wenn es sich um ein Ankergrundstück handelt"
                    actionLabel="Bewerbung um Ankergrundstück"
                    actionCallback={updateAnchorCheck}
                    checkedState={blockAnchorStatus}
                  />
                  <ActionCheckDetailsCard
                    actionLabel="Bewerbung soll für ähnliche Grundstücke berücksichtigt werden, wenn die Bewerbung nicht erfolgreich ist."
                    actionCallback={updateOtherPlotsCheck}
                    checkedState={similarPlotsStatus}
                  />
                  {application && (
                    <DeleteCard
                      actionLabel="Bewerbung Löschen"
                      deleteCallback={deleteApplicationHandler}
                    />
                  )}
                </Stack>
              </Grid>
              <Grid item xs={8}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    {...a11yProps(0)}
                  >
                    <Tab
                      label="Überblick"
                      sx={{ textTransform: "none" }}
                      {...a11yProps(1)}
                    />
                    <Tab
                      label="Bewerbung"
                      sx={{ textTransform: "none" }}
                      {...a11yProps(2)}
                    />
                    <Tab
                      label="Zusatzinformationen"
                      sx={{ textTransform: "none" }}
                      {...a11yProps(3)}
                    />
                    {isAdmin && (
                      <Tab
                        label="Vergabebeurteilung"
                        sx={{ textTransform: "none" }}
                        {...a11yProps(4)}
                      />
                    )}
                  </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                  <Overview />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Documents
                    updateDocumentCallBack={updateDocuments}
                    documents={documents}
                  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <AdditionalInformation
                    additionalInfo={additionalInformation}
                    updateAdditionalInfo={updateAdditionalInfo}
                  />
                </TabPanel>
                {isAdmin && (
                  <TabPanel value={value} index={3}>
                    <AwardEvalutation
                      awardStatus={awardStatus}
                      updateAwardStatus={updateAwardStatus}
                      awardEvaluation={awardEvalutation}
                      updateAwardCriteriaEvaluation={updateEvaluation}
                    />
                  </TabPanel>
                )}
              </Grid>
            </Grid>
          )}
        </Container>
      }
    />
  );
};
