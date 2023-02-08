import ArrowBackIosRounded from "@mui/icons-material/ArrowBackIosRounded";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * @param {string | number} navigateURL - React router navigation URL string or negative number to jump back to prev page
 * @param {string} navigationLabel - Label for navigation link
 */
export interface ReturnNavBarProps {
  navigateURL: any;
  navigationLabel?: string;
  openTab?: number;
}

//Returns navigation bar to support navigating back to a specified routes
export const ReturnNavBar = (props: ReturnNavBarProps) => {
  let navigate = useNavigate();

  const navigationRequest = () => {
    navigate(props.navigateURL);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexGrow: 1,
        flexDirection: "row",
        marginTop: "12px",
        marginBottom: "12px",
        alignItems: "left",
      }}
    >
      <Stack direction="row" rowGap={2}>
        <IconButton color="primary" size="small" onClick={navigationRequest}>
          <ArrowBackIosRounded />
        </IconButton>
        {props.navigationLabel && (
          <Button
            variant="text"
            onClick={navigationRequest}
            sx={{
              textAlign: "center",
              boxShadow: 0,
              borderRadius: 1,
              textTransform: "none",
            }}
          >
            {props.navigationLabel}
          </Button>
        )}
      </Stack>
    </Box>
  );
};
