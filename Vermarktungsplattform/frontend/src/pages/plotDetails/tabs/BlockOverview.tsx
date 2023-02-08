import { Box, Stack } from "@mui/material";
import { Section } from "../../../components/Section";

/**
 * @param {number} selectedPlot - Selected plot ID
 */
export interface BlockOverviewProps {
  selectedPlot: number;
}

/**
 * Example block overview component
 */
export const BlockOverview = (props: BlockOverviewProps) => {
  return (
    <Box sx={{ marginTop: "30px" }}>
      <Stack rowGap={6}>
        <Section
          title={"Informationen"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          }
        />
        <Section
          title={"Übersicht Bewerbungsfortschritt"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          }
        />
      </Stack>
    </Box>
  );
};
