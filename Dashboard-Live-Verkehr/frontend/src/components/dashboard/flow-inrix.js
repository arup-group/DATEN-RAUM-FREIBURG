import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TrafficIcon from "@mui/icons-material/Traffic";
import { getCongestionBackgroundColor, convertToMs } from "src/components/utils/utils";

export const FlowINRIX = (props) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Live-Verkehrsfluss INRIX
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {(props.dataset["properties"]["congestion_level_speed_inrix"] === "very congested" &&
              "Sehr Langsamer Autoverkehr") ||
              (props.dataset["properties"]["congestion_level_speed_inrix"] === "very congestion" &&
                "Sehr Langsamer Autoverkehr") ||
              (props.dataset["properties"]["congestion_level_speed_inrix"] === "congested" &&
                "Langsamer Autoverkehr") ||
              (props.dataset["properties"]["congestion_level_speed_inrix"] ===
                "slightly congested" &&
                "Mittlerer Autoverkehr") ||
              (props.dataset["properties"]["congestion_level_speed_inrix"] === "no congestion" &&
                "Fließender Autoverkehr") ||
              "Keine Daten"}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: getCongestionBackgroundColor(props, "congestion_level_speed_inrix"),
              height: 56,
              width: 56,
            }}
          >
            <TrafficIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          color={getCongestionBackgroundColor(props)}
          sx={{
            mr: 1,
          }}
          variant="body2"
        >
          {props.dataset["properties"]["speed_inrix"]} km/h
        </Typography>
        <Typography color="textSecondary" variant="caption">
          {new Date(
            convertToMs(
              parseFloat(new String(props.dataset["properties"]["time_inrix"]).replace(":", "."))
            )
          ).toLocaleTimeString()}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
