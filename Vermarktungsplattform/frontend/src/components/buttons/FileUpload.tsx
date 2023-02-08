import { Button } from "@mui/material";
import { ChangeEvent } from "react";

/**
 * @param {string} label - Label for input button
 * @param {(params: ChangeEvent<HTMLInputElement>) => void} onChangeCallback - On change input event
 */
interface FileUploadButtonProps {
  label: string;
  onChangeCallback: (params: ChangeEvent<HTMLInputElement>) => void;
}

//File upload button with nested file input component, accepts button label and onchange callback
export const FileUploadButton = (props: FileUploadButtonProps) => {
  return (
    <>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        component="label"
        sx={{
          textAlign: "center",
          boxShadow: 0,
          borderRadius: 1,
          textTransform: "none",
          marginLeft: "24px",
          marginRight: "24px",
        }}
      >
        {props.label}
        <input type="file" hidden onChange={props.onChangeCallback} />
      </Button>
    </>
  );
};
