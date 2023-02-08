import { CheckCircle } from "@mui/icons-material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { RowDetailsBtn } from "../../RowDetailsBtn";
import { CustomToolbar } from "../utils/customToolbar/CustomToolbar";
import { ApplicationProp } from "../../../pages/applications/Applications";

/**
 * @param {ApplicationProp[]} applicationData - Application Data
 */
export interface ApplicationTableProps {
  applicationData: ApplicationProp[];
}

//Component to display applications in a table
export const ApplicationTable = (props: ApplicationTableProps) => {
  const { applicationData } = props;

  const columnsT: GridColDef[] = [
    {
      field: "id",
      headerName: "Bewerbungs-Nr.",
      flex: 1,
      maxWidth: 150,
      minWidth: 100,
      type: "number",
    },
    {
      field: "grund_id",
      headerName: "Grundstücks-Nr.",
      flex: 1,
      maxWidth: 150,
      minWidth: 80,
      type: "number",
    },
    {
      field: "full_name",
      headerName: "Bewerber:in",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "company_name",
      headerName: "Firma",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        return row.company_name ? `${row.company_name}` : " - ";
      },
    },
    {
      field: "block_anchor",
      headerName: "Anker",
      flex: 1,
      maxWidth: 90,
      align: "center",
      renderCell: (params) => {
        const { row } = params;

        return row.block_anchor ? (
          <CheckCircle style={{ fill: "primary" }} />
        ) : (
          <div />
        );
      },
    },
    { field: "award_status", headerName: "Vergabestatus", flex: 1 },
    {
      field: "action",
      headerName: "",
      minWidth: 150,
      renderCell: (params) => {
        const { row } = params;
        return (
          <RowDetailsBtn
            row={row}
            tempLink={"/application"}
            label="Details anzeigen"
            state={{
              state: {
                plotFID: row.plotID,
                applicationID: row.id,
              },
            }}
          />
        );
      },
      disableExport: true,
    },
  ];

  return (
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
      rows={applicationData}
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
  );
};
