import { Box, Button, ButtonProps } from "@mui/material";
import {
  GridCsvExportOptions,
  GridToolbarContainer,
  useGridApiContext,
} from "@mui/x-data-grid";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

/**
 * @param {string} fileName - File name for CSV
 * @param {() => {}} onClickHandler - On click callback for download button
 */
export interface CustomToolbarProps {
  fileName?: string;
  onClickHandler?: () => {};
}

//Custom table toolbar with download CSV button
export const CustomToolbar = (props: CustomToolbarProps) => {
  const { fileName, onClickHandler } = props;

  //Option to include custom file name and table headers in CSV
  const csvOptions = {
    fileName: fileName ?? "",
    includeHeaders: true,
  };

  //Custom button icon
  const buttonBaseProps: ButtonProps = {
    color: "primary",
    size: "small",
    startIcon: <FileDownloadOutlinedIcon />,
  };

  //grid context for csv download
  const apiRef = useGridApiContext();

  //call to export table as CSV download
  const handleExport = (options: GridCsvExportOptions) =>
    apiRef.current.exportDataAsCsv(options);

  //function to handle download button action call
  const downloadHandler = () => {
    onClickHandler ? onClickHandler() : handleExport(csvOptions);
  };

  return (
    <GridToolbarContainer>
      <Box sx={{ flex: 1, flexGrow: 1 }} />
      <Button {...buttonBaseProps} onClick={downloadHandler}>
        Download
      </Button>
    </GridToolbarContainer>
  );
};
