import { SyntheticEvent, useState } from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";
import { PageScaffold } from "../../components/PageScaffold";
import { Outlet } from "react-router-dom";
import { Application } from "./tabs/Application";
import { AwardProcess } from "./tabs/AwardProcess";
import { BlocksOverview } from "./tabs/BlocksOverview";
import { a11yProps, TabPanel } from "../../components/tabs/TabPanel";

export const OverviewPage = () => {
  //selected tab state
  const [value, setValue] = useState(0);

  //Tab event change handler
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <PageScaffold
      showAccountMenu={false}
      showConsoleLink={true}
      protectedArea={false}
      children={
        <Container sx={{ marginTop: "24px" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Bewerbung"
                {...a11yProps(1)}
                sx={{ textTransform: "none" }}
              />
              <Tab
                label="Vergabeprozess"
                {...a11yProps(2)}
                sx={{ textTransform: "none" }}
              />
              <Tab
                label="Grundstücke"
                {...a11yProps(3)}
                sx={{ textTransform: "none" }}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Application />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AwardProcess />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <BlocksOverview />
          </TabPanel>
          <Outlet />
        </Container>
      }
    />
  );
};
