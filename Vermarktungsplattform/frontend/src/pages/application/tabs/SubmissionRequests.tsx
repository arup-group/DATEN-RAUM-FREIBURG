import { Box, Stack } from "@mui/material";
import { Section } from "../../../components/Section";

/**
 * Example component to display submission requirements
 */
export const SubmissionRequirements = () => {
  return (
    <Box sx={{ marginTop: "30px" }}>
      <Stack rowGap={1}>
        <Section
          title={"Submission Requirements"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          }
        />
        <Section
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          }
        />
      </Stack>
    </Box>
  );
};
