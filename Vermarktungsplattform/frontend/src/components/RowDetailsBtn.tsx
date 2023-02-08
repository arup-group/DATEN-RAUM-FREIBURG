import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * @param {any} state - React router navigation state
 */
interface NavigationState {
  state: any;
}

/**
 * @param {any} row - Row reference from table mui grid
 * @param {string} tempLink - React Router Navigation Link
 * @param {NavigationState} state - React router navigation state
 * @param {string} label - Row Details Button label
 */
export interface RowDetailsBtnProps {
  row: any;
  tempLink: string;
  state?: NavigationState;
  label: string;
}

//returns a navigation button with a label
export const RowDetailsBtn = (props: RowDetailsBtnProps) => {
  let navigate = useNavigate();

  const { row, tempLink, state, label } = props;
  return (
    <Button
      variant="text"
      onClick={() => {
        navigate(tempLink, state);
      }}
      sx={{
        textAlign: "center",
        boxShadow: 0,
        borderRadius: 1,
        textTransform: "none",
      }}
    >
      {label}
    </Button>
  );
};
