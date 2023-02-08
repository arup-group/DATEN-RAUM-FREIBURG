import { Typography } from "@mui/material";
import { Box } from "@mui/system";

/**
 * @param {string} title - title text
 */
export interface ManagementConsoleProps {
  title: string;
}

//component to display a title
export const TitleComponent = (props: ManagementConsoleProps) => {
  return (
    <Box
      sx={{
        marginLeft: "24px",
        marginTop: "24px",
        marginBottom: "24px",
        flex: 1,
        flexGrow: 1,
      }}
    >
      <Typography sx={{ fontSize: 24, fontWeight: 600 }} color="primary">
        {props.title}
      </Typography>
    </Box>
  );
};
