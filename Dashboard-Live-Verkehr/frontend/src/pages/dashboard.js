import Head from "next/head";
import { useEffect, useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import { FlowINRIX } from "../components/dashboard/flow-inrix";
import { AvgSpeedINRIX } from "src/components/dashboard/avg-speed-inrix";
import { RefSpeedINRIX } from "src/components/dashboard/ref-speed-inrix";
import { ScoreINRIX } from "src/components/dashboard/score-inrix";
import { FlowTelraamCar } from "src/components/dashboard/flow-telraam-car";
import { FlowTelraamHGV } from "src/components/dashboard/flow-telraam-hgv";
import { UptimeTelraam } from "../components/dashboard/uptime-telraam";
import { BicycleCounter } from "../components/dashboard/bicycle-counter";
import { Speedv85Car } from "../components/dashboard/speed-v85-car";
import { TrafficShares } from "../components/dashboard/traffic-shares";
import { CValueINRIX } from "src/components/dashboard/cvalue-inrix";
import { DashboardLayout } from "../components/dashboard-layout";
import { Typography } from "@mui/material";
import axios from "axios";

import { useRouter } from "next/router";

import { MAPSERVER } from "../utils/common-links";

const REQUEST_PARAMS = {
  service: "WFS",
  version: "1.1.0",
  request: "GetFeature",
  typename: "traffic",
  outputformat: "geojson",
};

function readActiveSegment(allRoadSegments, setLoading) {
  const router = useRouter();

  //Gets the string containing info on the active road segment
  const activeSegment_coord_string = router.query.seg;
  //find the active dataset according to the string received as a URL parameter

  if (allRoadSegments != undefined) {
    let active_dataset = allRoadSegments.filter(
      (o) => String(o["geometry"]["coordinates"]) === String(activeSegment_coord_string)
    );

    return active_dataset[0];
  }
}

function Dashboard() {
  //Holds all road segments from the geoJSON and their corresponding traffic info
  const [allRoadSegments, setAllRoadSegments] = useState(null);
  const [isLoading, setLoading] = useState(true);

  //Triggers the WFS request each minute to update the road segments and traffic info
  useEffect(() => {
    runAsyncDashboardRequest(setAllRoadSegments, setLoading);
    const interval = setInterval(() => {
      runAsyncDashboardRequest(setAllRoadSegments, setLoading);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading || readActiveSegment(allRoadSegments, setLoading) === undefined) {
    return (
      <Typography variant="h3" align="center" marginTop="10%">
        Laden...
      </Typography>
    );
  } else {
    return (
      <>
        <Head>
          <title>Dashboard</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <h1>
              {readActiveSegment(allRoadSegments, setLoading)["properties"]["road_name"]} -{" "}
              {readActiveSegment(allRoadSegments, setLoading)["properties"]["city_distr"]}
            </h1>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <FlowINRIX dataset={readActiveSegment(allRoadSegments, setLoading)} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <AvgSpeedINRIX dataset={readActiveSegment(allRoadSegments, setLoading)} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <RefSpeedINRIX dataset={readActiveSegment(allRoadSegments, setLoading)} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <ScoreINRIX dataset={readActiveSegment(allRoadSegments, setLoading)} />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <CValueINRIX dataset={readActiveSegment(allRoadSegments, setLoading)} />
              </Grid>
              <Box width="100%" />
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <FlowTelraamCar dataset={readActiveSegment(allRoadSegments, setLoading)} />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <FlowTelraamHGV dataset={readActiveSegment(allRoadSegments, setLoading)} />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <BicycleCounter dataset={readActiveSegment(allRoadSegments, setLoading)} />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <Speedv85Car
                  dataset={readActiveSegment(allRoadSegments, setLoading)}
                  sx={{ height: "100%" }}
                />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <UptimeTelraam dataset={readActiveSegment(allRoadSegments, setLoading)} />
              </Grid>
              <Box width="100%" />
              <Grid item lg={4} md={6} xl={3} xs={12}>
                <TrafficShares
                  sx={{ height: "100%" }}
                  dataset={readActiveSegment(allRoadSegments, setLoading)}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }
}

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;

function runAsyncDashboardRequest(setAllRoadSegments, setLoading) {
  try {
    (async () => {
      axios
        .get(MAPSERVER, {
          params: REQUEST_PARAMS,
        })
        .then((response) => {
          setAllRoadSegments(response["data"]["features"]);
          setLoading(false);
        })
        .catch((error) => Promise.reject(error));
    })();
  } catch (e) {
    console.log("error in request");
    console.log(e);
    setLoading(true);
    runAsyncDashboardRequest(setAllRoadSegments, setLoading);
  }
}
