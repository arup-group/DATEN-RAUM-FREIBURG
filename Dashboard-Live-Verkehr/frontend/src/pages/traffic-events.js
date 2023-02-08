import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { TrafficStatusEvents } from "../components/dashboard/traffic-status-events";
import { DashboardLayout } from "../components/dashboard-layout";

const TrafficEvents = () => (
  <>
    <Head>
      <title>Verkehrsereignisse</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <TrafficStatusEvents />
      </Container>
    </Box>
  </>
);

TrafficEvents.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TrafficEvents;
