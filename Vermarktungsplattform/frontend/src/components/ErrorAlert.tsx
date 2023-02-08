import Alert, { AlertColor } from "@mui/material/Alert";

/**
 * Severity passed can either be error, warning, info or success
 *
 * @param {string} errormsg - Message to display in alert
 * @param {AlertColor} severity  - Severity category
 */
export interface ErrorAlertProps {
  errormsg: string;
  severity: AlertColor;
}

export default function ErrorAlert(props: ErrorAlertProps) {
  // only returns Alert component if errormsg is set
  return props.errormsg ? (
    <Alert severity={props.severity}>{props.errormsg}</Alert>
  ) : (
    <></>
  );
}
