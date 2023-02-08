import { Card, Stack, Typography } from "@mui/material";
import { FileUploadButton } from "../buttons/FileUpload";

/**
 * @param {string} label - Upload file action button label
 * @param {(params: any) => any} actionCallback - Upload file action button callback
 */
interface ActionProps {
  label: string;
  actionCallback: (params: any) => any;
}

/**
 * @param {string} title - Upload file card title
 * @param {string} description - Upload file card description
 * @param {ActionProps} actionProps - Upload file input action button
 */
export interface UploadFileCardProps {
  title?: string;
  description?: string;
  actionProps?: ActionProps;
}

/**
 * Card with a file input to upload documents/file, includes optional title/description
 */
export const UploadFileCard = (props: UploadFileCardProps) => {
  return (
    <Card
      sx={{
        padding: 3,
        bgcolor: "#F8F9FB",
        boxShadow: 0,
        borderRadius: 2,
      }}
    >
      <Stack spacing={3} direction="column" sx={{ alignItems: "center" }}>
        {props.title && (
          <Typography sx={{ fontSize: 16, fontWeight: 500 }} color="primary">
            {props.title}
          </Typography>
        )}
        {props.description && (
          <Typography sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
            {props.description}
          </Typography>
        )}
        {props.actionProps && (
          <FileUploadButton
            label={props.actionProps.label}
            onChangeCallback={props.actionProps.actionCallback}
          />
        )}
      </Stack>
    </Card>
  );
};
