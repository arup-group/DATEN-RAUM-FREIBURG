import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Button, TableBody, TableCell, TableRow, Table } from "@mui/material";
import Legend from "./legend";
import SpeedIcon from "@mui/icons-material/Speed";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useRouter } from "next/router";
import axios from "axios";
import { convertToMs, setTrafficStyle } from "../utils/utils";

import { ATTRIBUTION, MAPSERVER, TILESPROVIDER } from "../../utils/common-links";

const REQUEST_PARAMS = {
  service: "WFS",
  version: "1.1.0",
  request: "GetFeature",
  typename: "traffic",
  outputformat: "geojson",
};

function runAsyncMapRequest(setAllRoadSegments, setCurrentGeoJSONKey) {
  return (async () => {
    try {
      axios
        .get(MAPSERVER, {
          params: REQUEST_PARAMS,
        })
        .then((response) => {
          setAllRoadSegments(response["data"]["features"]);
          setCurrentGeoJSONKey(Math.random());
        })
        .catch((error) => Promise.reject(error));
    } catch (e) {
      runAsyncMapRequest(setAllRoadSegments, setCurrentGeoJSONKey);
    }
  })();
}

// Create Map that displays current traffic info
export default function TrafficMap() {
  const [map, setMap] = useState(null);

  const [clickedRoadSegment, setClickedRoadSegment] = useState(null);

  //Holds all road segments from the geoJSON and their corresponding traffic info
  const [allRoadSegments, setAllRoadSegments] = useState(null);

  //Triggers the WFS request each minute to update the road segments and traffic info
  useEffect(() => {
    runAsyncMapRequest(setAllRoadSegments, setCurrentGeoJSONKey);
    const interval = setInterval(() => {
      runAsyncMapRequest(setAllRoadSegments, setCurrentGeoJSONKey);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  //Holds the GeoJSON key, the map only gets reloaded if this key changes
  const [currentGeoJSONKey, setCurrentGeoJSONKey] = useState(null);

  // Holds all stats for the popup window
  const [trafficStatusINRIX, setTrafficStatusINRIX] = useState(null);
  const [recordTimeINRIX, setRecordTimeINRIX] = useState(null);
  const [trafficStatusTelraam, setTrafficStatusTelraam] = useState(null);
  const [recordTimeTelraam, setRecordTimeTelraam] = useState(null);
  const [speedINRIX, setSpeedINRIX] = useState(null);
  const [v85SpeedTelraam, setV85SpeedTelraam] = useState(null);
  const [bicycles, setBicycles] = useState(null);
  const [pedestrians, setPedestrians] = useState(null);
  const [cars, setCars] = useState(null);
  const [trucks, setTrucks] = useState(null);
  const router = useRouter();

  // Sets all stats for the current clicked road segment
  let onSegmentClick = (event) => {
    // is needed for sending the dashboard the info which road segment was clicked in function @handleShowInDashboard
    setClickedRoadSegment(event.sourceTarget.feature);

    setTrafficStatusINRIX(event.sourceTarget.feature["properties"]["congestion_level_speed_inrix"]);
    setRecordTimeINRIX(event.sourceTarget.feature["properties"]["time_inrix"]);
    setTrafficStatusTelraam(
      event.sourceTarget.feature["properties"]["congestion_level_car_telraam"]
    );
    setRecordTimeTelraam(event.sourceTarget.feature["properties"]["time_telraam"]);
    setSpeedINRIX(event.sourceTarget.feature["properties"]["speed_inrix"]);
    setV85SpeedTelraam(event.sourceTarget.feature["properties"]["v85_telraam"]);
    setBicycles(Math.round(event.sourceTarget.feature["properties"]["bike_telraam"]));
    setPedestrians(Math.round(event.sourceTarget.feature["properties"]["pedestrian_telraam"]));
    setCars(Math.round(event.sourceTarget.feature["properties"]["car_telraam"]));
    setTrucks(Math.round(event.sourceTarget.feature["properties"]["heavy_telraam"]));
  };

  // Pushes a router path to the dashboard, sends the currently selected road segment coordinates as a unique identificator of road segments
  const handleShowInDashboard = (event) => {
    event.stopPropagation();
    router.push({
      pathname: "dashboard",
      query: { seg: String(clickedRoadSegment["geometry"]["coordinates"]) },
    });
  };

  return (
    <MapContainer center={[47.999, 7.8421]} zoom={13} scrollWheelZoom={true} whenCreated={setMap}>
      <GeoJSON
        key={currentGeoJSONKey}
        data={allRoadSegments}
        style={setTrafficStyle}
        eventHandlers={{ click: onSegmentClick }}
      >
        <Popup>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  Zeit INRIX:{" "}
                  {new Date(
                    convertToMs(parseFloat(new String(recordTimeINRIX).replace(":", ".")))
                  ).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  Zeit Telraam: {new Date(convertToMs(recordTimeTelraam)).toLocaleTimeString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Verkehr Status Inrix:
                  <br />
                  {trafficStatusINRIX}
                </TableCell>
                <TableCell>
                  Verkehr Status Telraam:
                  <br />
                  {trafficStatusTelraam}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <SpeedIcon /> Aktuell
                  <br />
                  {speedINRIX}
                </TableCell>
                <TableCell>
                  <SpeedIcon /> Max. der letzen reg. Stunde:
                  <br />
                  {v85SpeedTelraam}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DirectionsBikeIcon />
                  <br />
                  {bicycles}
                </TableCell>
                <TableCell>
                  <DirectionsWalkIcon />
                  <br />
                  {pedestrians}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <DirectionsCarIcon />
                  <br />
                  {cars}
                </TableCell>
                <TableCell>
                  <LocalShippingIcon />
                  <br />
                  {trucks}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button onClick={handleShowInDashboard}>Im Dashboard Zeigen</Button>
        </Popup>
      </GeoJSON>

      {/* Set your preferred tiles provider here under url */}
      <TileLayer url={TILESPROVIDER} attribution={ATTRIBUTION} />
      <Legend map={map} />
    </MapContainer>
  );
}
