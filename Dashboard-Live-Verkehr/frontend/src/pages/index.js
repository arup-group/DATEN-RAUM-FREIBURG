import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import dynamic from "next/dynamic";

const TrafficMap = dynamic(() => import("../components/map/osm-leaflet"), {
  ssr: false,
});

const Map = () => (
  <>
    <Head>
      <title>Dashboard Live-Verkehr</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false} sx={{ height: "100%" }}>
        <TrafficMap />
      </Container>
    </Box>
  </>
);
Map.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Map;
