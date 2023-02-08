import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import { convertToMs } from "../utils/utils";
import { MAPSERVER } from "../../utils/common-links";

const REQUEST_PARAMS = {
  service: "WFS",
  version: "1.1.0",
  request: "GetFeature",
  typename: "traffic",
  outputformat: "geojson",
};

export function TrafficStatusEvents(props) {
  const [allRoadSegments, setAllRoadSegments] = useState(null);
  const [isLoading, setLoading] = useState(true);

  function getCongestedSegments() {
    if (allRoadSegments != undefined) {
      console.log("road segs returned");
      return allRoadSegments.filter((o) => o["properties"]["v85_telraam"] != 0);
    }
  }
  //Triggers the WFS request each minute to update the road segments and traffic info
  useEffect(() => {
    runAsnycEventRequest(setAllRoadSegments, setLoading);
    const interval = setInterval(() => {
      runAsnycEventRequest(setAllRoadSegments, setLoading);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading || getCongestedSegments() === undefined) {
    return (
      <Typography variant="h3" align="center" marginTop="10%">
        Laden...
      </Typography>
    );
  } else {
    return (
      <Card {...props}>
        <CardHeader title="Verkehrsereignisse" />

        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Typography variant="subtitle2" marginLeft="2%" marginBottom="2%">
              Alle Werte in km/h - Zeigt alle Segmente von Telraam und deren neuesten Verkehrsstatus
              im Vergleich zu den INRIX-Daten
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Straßenname</TableCell>
                  <TableCell>Gebiet</TableCell>

                  <TableCell>Zeit INRIX</TableCell>
                  <TableCell>Live-Verkehrsfluss INRIX</TableCell>
                  <TableCell>Geschwindigkeit INRIX</TableCell>
                  <TableCell>Referenzgeschwindigkeit INRIX</TableCell>
                  <TableCell>Datenverfügbarkeit INRIX</TableCell>
                  <TableCell>Zeit Telraam</TableCell>
                  <TableCell>Durchschnittliche Auslastung 1h Telraam</TableCell>
                  <TableCell>Durchschnittsgeschwindigkeit 85% Telraam</TableCell>
                  <TableCell>Datenverfügbarkeit Telraam</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getCongestedSegments().map((event) => (
                  <TableRow hover key={event.id}>
                    <TableCell>{event["properties"]["road_name"]}</TableCell>
                    <TableCell>{event["properties"]["city_distr"]}</TableCell>
                    <TableCell>
                      {new Date(
                        convertToMs(
                          parseFloat(
                            new String(event["properties"]["time_inrix"]).replace(":", ".")
                          )
                        )
                      ).toLocaleTimeString()}
                    </TableCell>

                    <TableCell>
                      <SeverityPill
                        color={
                          (event["properties"]["congestion_level_speed_inrix"] ===
                            "very congested" &&
                            "error") ||
                          (event["properties"]["congestion_level_speed_inrix"] ===
                            "very congestion" &&
                            "error") ||
                          (event["properties"]["congestion_level_speed_inrix"] === "congested" &&
                            "error") ||
                          (event["properties"]["congestion_level_speed_inrix"] ===
                            "slightly congested" &&
                            "warning") ||
                          (event["properties"]["congestion_level_speed_inrix"] ===
                            "no congestion" &&
                            "success") ||
                          "info"
                        }
                      >
                        {(event["properties"]["congestion_level_speed_inrix"] ===
                          "very congested" &&
                          "Sehr Langsamer Verkehr") ||
                          (event["properties"]["congestion_level_speed_inrix"] ===
                            "very congestion" &&
                            "Sehr Langsamer Verkehr") ||
                          (event["properties"]["congestion_level_speed_inrix"] === "congested" &&
                            "Langsamer Verkehr") ||
                          (event["properties"]["congestion_level_speed_inrix"] ===
                            "slightly congested" &&
                            "Mittlerer Verkehr") ||
                          (event["properties"]["congestion_level_speed_inrix"] ===
                            "no congestion" &&
                            "Fließender Verkehr") ||
                          "Keine Daten"}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>{event["properties"]["speed_inrix"]}</TableCell>
                    <TableCell>{event["properties"]["reference_inrix"]}</TableCell>
                    <TableCell>
                      <SeverityPill
                        color={
                          (event["properties"]["score_inrix"] === 30 && "success") ||
                          (event["properties"]["score_inrix"] <= 10 && "error") ||
                          "warning"
                        }
                      >
                        {(event["properties"]["score_inrix"] === 30 && "Sehr Gut") ||
                          (event["properties"]["score_inrix"] <= 10 && "Schlecht") ||
                          "Gut"}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      {new Date(
                        convertToMs(event["properties"]["time_telraam"])
                      ).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      <SeverityPill
                        color={
                          (event["properties"]["congestion_level_car_telraam"] ===
                            "very congested" &&
                            "error") ||
                          (event["properties"]["congestion_level_car_telraam"] ===
                            "very congestion" &&
                            "error") ||
                          (event["properties"]["congestion_level_car_telraam"] === "congested" &&
                            "error") ||
                          (event["properties"]["congestion_level_car_telraam"] ===
                            "slightly congested" &&
                            "warning") ||
                          (event["properties"]["congestion_level_car_telraam"] ===
                            "no congestion" &&
                            "success") ||
                          "info"
                        }
                      >
                        {(event["properties"]["congestion_level_car_telraam"] ===
                          "very congested" &&
                          "Sehr Hohe Auslastung") ||
                          (event["properties"]["congestion_level_car_telraam"] ===
                            "very congestion" &&
                            "Sehr Hohe Auslastung") ||
                          (event["properties"]["congestion_level_car_telraam"] === "congested" &&
                            "Hohe Auslastung") ||
                          (event["properties"]["congestion_level_car_telraam"] ===
                            "slightly congested" &&
                            "Mittlere Auslastung") ||
                          (event["properties"]["congestion_level_car_telraam"] ===
                            "no congestion" &&
                            "Niedrige Auslastung") ||
                          (event["properties"]["congestion_level_car_telraam"] === "no data" &&
                            "Keine Daten") ||
                          "Nicht erfasst"}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>{Math.round(event["properties"]["v85_telraam"])}</TableCell>
                    <TableCell>
                      <SeverityPill
                        color={
                          (event["properties"]["uptime_telraam"] >= 0.75 && "success") ||
                          (event["properties"]["uptime_telraam"] >= 0.5 && "warning") ||
                          "error"
                        }
                      >
                        {(event["properties"]["uptime_telraam"] >= 0.75 && "Sehr Gut") ||
                          (event["properties"]["uptime_telraam"] >= 0.5 && "Gut") ||
                          "Schlecht"}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Box>
      </Card>
    );
  }
}
function runAsnycEventRequest(setAllRoadSegments, setLoading) {
  (async () => {
    axios
      .get(MAPSERVER, {
        params: REQUEST_PARAMS,
      })
      .then((response) => {
        try {
          setAllRoadSegments(response["data"]["features"]);
          setLoading(false);
        } catch (e) {
          console.log("error in request");
          console.log(e);
        }
      })
      .catch((error) => Promise.reject(error));
  })();
}
