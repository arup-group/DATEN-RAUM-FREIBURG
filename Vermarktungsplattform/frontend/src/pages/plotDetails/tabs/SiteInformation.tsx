import { Box, Stack, Typography } from "@mui/material";
import { Section } from "../../../components/Section";
import SiteImagePlaceholder from "../../../assets/placeholders/site-plan-template.svg";

/**
 * Example Site Information Component
 */
export const SiteInformation = () => {
  return (
    <Box sx={{ marginTop: "16px" }} component="div">
      <Stack direction="row" spacing={4}>
        <Stack direction="column">
          <Box
            component="img"
            sx={{
              width: "100%",
              maxWidth: "800px",
              minWidth: "250px",
            }}
            alt="Site plan"
            src={SiteImagePlaceholder}
          />
        </Stack>
        <Stack rowGap={3} direction="column" component="div">
          <Typography
            sx={{ fontSize: 18, fontWeight: 600 }}
            color="primary"
            component="span"
          >
            Baufeldbezogener Steckbrief
          </Typography>

          <Stack direction="column">
            <Section
              title={"Baufeld Informationen"}
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
        </Stack>
      </Stack>
    </Box>
  );
};
