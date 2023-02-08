import { Box, CircularProgress, Typography } from "@mui/material";

/**
 * @param {string} label - Label to show with indicator
 */
export interface ActivityIndicatorProps {
  label?: string;
}

//Component to display an activity indicator with optional text - styled to centre top of page
export const ActivityIndicator = (props: ActivityIndicatorProps) => {
  const { label } = props;

  return (
    <Box
      sx={{
        flex: 1,
        flexDirection: "column",
        flexGrow: 1,
        textAlign: "center",
        marginTop: 15,
      }}
    >
      <CircularProgress />
      {label ?? <Typography>{label}</Typography>}
    </Box>
  );
};
