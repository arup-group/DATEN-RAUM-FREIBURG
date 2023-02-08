import { DeleteRounded } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FileUploadButton } from "../../../components/buttons/FileUpload";
import { UploadFileCard } from "../../../components/cards/UploadDocumentCard";
import { SearchBar } from "../../../components/search/SearchBar";
import { Section } from "../../../components/Section";
import { CustomToolbar } from "../../../components/tables/utils/customToolbar/CustomToolbar";
import { useDeleteFileMutation } from "../../../redux/slices/documents/ApplicationFileAPISlice";
import { SESSION_TOKEN_ID } from "../../../utils/AuthSessionHelper";

/**
 * @param {string} ref - State of file, either local or uploaded
 * @param {string} id - ID of document file
 * @param {string} name - Document name
 * @param {File} fileBlob - Data blob of uploaded file
 */
export interface DocumentProp {
  ref: string | "local" | "uploaded";
  id: string;
  name: string;
  fileBlob?: File;
}

/**
 * @param {(documents) => void)} updateDocumentCallBack - Callback to set application documents
 * @param {DocumentProp[] | []} documents - Collection of documents
 */
export interface DocumentsProps {
  updateDocumentCallBack: (documents: DocumentProp[]) => void;
  documents: DocumentProp[] | [];
}

/**
 * Component to display application documents
 */
export const Documents = (props: DocumentsProps) => {
  //search state
  const [searchResults, setSearchResults] = useState<DocumentProp[] | []>([]);

  const { updateDocumentCallBack, documents } = props;

  //delete document callback reducer
  const [deleteDocumentReq, deleteDocumentResponse] = useDeleteFileMutation();

  //handles uploading a document to the application
  const uploadDocument = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.files) {
      //file details from input
      const { lastModified, name } = target.files[0];

      //check for duplicate file
      if (documents.find((document) => document.name === name)) {
        alert("Duplizierter Dateiname. Bitte versuchen Sie es erneut.");
        return;
      }

      //create document object
      const document: DocumentProp = {
        ref: "local",
        id: lastModified.toString(),
        name: name,
        fileBlob: target.files[0],
      };
      //append document to documents
      updateDocumentCallBack([...documents, document]);
    }
  };

  //search request handler
  const searchRequest = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (documents && documents.length > 0) {
      const results = documents.filter((document: any) => {
        return document.name.includes(event.target.value);
      });

      if (results) setSearchResults(results);
    }
  };

  //remove document from documents state
  const updateDocState = (file: DocumentProp) => {
    updateDocumentCallBack([
      ...documents.filter((document) => {
        return document.name !== file.name && document.id !== file.id;
      }),
    ]);
  };

  //handler to delete document from application
  const deleteDocument = (file: DocumentProp) => {
    if (
      window.confirm("Sind Sie sicher, dass Sie diese Datei löschen wollen?")
    ) {
      if (file.ref === "uploaded") {
        deleteDocumentReq(file.id)
          .unwrap()
          .then((res: any) => {
            updateDocState(file);
          })
          .catch((error: Error | void) => {
            console.log("Delete file error ", error);
            alert("Fehler beim Löschen der Anwendung");
          });
      } else {
        updateDocState(file);
      }
    }
  };

  //handler to download document to users device
  const fileDownloadHandler = (fileBlob: Blob, fileName: string) => {
    var url = window.URL.createObjectURL(fileBlob);
    // Mock a href element to trigger browser-safe download
    const link = document.createElement("a");
    link.href = url;
    //set file name
    link.setAttribute("download", fileName);
    // Append to html link element page
    document.body.appendChild(link);
    // Start download
    link.click();
    // Clean up and remove the link
    link?.parentNode?.removeChild(link);
  };

  //method to download document files
  const downloadFiles = () => {
    documents.forEach((aDocument: DocumentProp) => {
      if (aDocument.ref === "uploaded") {
        fetch(
          `${process.env.API_URL}/application/attachment/${parseInt(
            aDocument.id
          )}`,
          {
            method: "GET",
            headers: new Headers({
              Authorization: `Bearer ${sessionStorage.getItem(
                SESSION_TOKEN_ID
              )}`,
            }),
          }
        )
          .then((response) => {
            if (response.status !== 200)
              throw Error("Fehler beim Herunterladen des Dokuments");
            return response;
          })
          .then((response) => response.blob())
          .then((blob) => {
            fileDownloadHandler(blob, aDocument.name);
          })
          .catch((error) => {
            console.error(error);
            alert("Fehler beim Herunterladen des Dokuments");
          });
      } else if (aDocument.ref === "local" && aDocument.fileBlob) {
        fileDownloadHandler(aDocument.fileBlob, aDocument.name);
      }
    });
  };

  useEffect(() => {
    if (props.documents.length > 0) updateDocumentCallBack(props.documents);
  }, []);

  //document table construct
  const columnsT: GridColDef[] = [
    {
      field: "name",
      headerName: "Dokumenttitel",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "deleteaction",
      headerName: "",
      renderCell: (params) => {
        const { row } = params;

        return (
          <IconButton
            color="warning"
            size="small"
            onClick={() => deleteDocument(row)}
          >
            <DeleteRounded />
          </IconButton>
        );
      },
      disableColumnMenu: true,
      disableExport: true,
      disableReorder: true,
      editable: false,
      hideSortIcons: true,
      sortable: false,
      width: 100,
      align: "center",
    },
  ];

  return (
    <Box
      sx={{
        marginTop: "30px",
      }}
    >
      <Section title={"Bewerbungsdokumente"} />
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {documents.length > 0 && (
          <>
            <FileUploadButton
              label={"Dokument hochladen"}
              onChangeCallback={uploadDocument}
            />
            <SearchBar
              requestCallback={searchRequest}
              searchPlaholder="Suche"
            />
          </>
        )}
      </Stack>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {documents.length > 0 ? (
          <DataGrid
            sx={{
              minHeight: "50vh",
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
                : documents
            }
            columns={columnsT}
            density={"compact"}
            getRowId={(row) => row.lastModified ?? row.id}
            disableColumnSelector={true}
            disableSelectionOnClick={true}
            hideFooter={true}
            hideFooterPagination={true}
            components={{
              Toolbar: CustomToolbar,
            }}
            componentsProps={{
              toolbar: { onClickHandler: downloadFiles },
            }}
          />
        ) : (
          <UploadFileCard
            title="Einreichen der vollständigen Bewerbungsunterlagen"
            description="Datei zum Hochladen auswählen"
            actionProps={{
              label: "Dokument hochladen",

              actionCallback: uploadDocument,
            }}
          />
        )}
      </Box>
    </Box>
  );
};
