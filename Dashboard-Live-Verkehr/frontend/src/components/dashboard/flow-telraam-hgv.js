import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TrafficIcon from "@mui/icons-material/Traffic";
import { getCongestionBackgroundColor, convertToMs } from "src/components/utils/utils";

export const FlowTelraamHGV = (props) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            LKW Live-Verkehrsfluss Telraam
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {(props.dataset["properties"]["congestion_level_hgv_telraam"] === "very congested" &&
              "Sehr Langsamer Verkehr") ||
              (props.dataset["properties"]["congestion_level_hgv_telraam"] === "very congestion" &&
                "Sehr Langsamer Verkehr") ||
              (props.dataset["properties"]["congestion_level_hgv_telraam"] === "congested" &&
                "Langsamer Verkehr") ||
              (props.dataset["properties"]["congestion_level_hgv_telraam"] ===
                "slightly congested" &&
                "Mittlerer Verkehr") ||
              (props.dataset["properties"]["congestion_level_hgv_telraam"] === "no congestion" &&
                "Fließender Verkehr") ||
              "Keine Daten"}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: getCongestionBackgroundColor(props, "congestion_level_hgv_telraam"),
              height: 56,
              width: 56,
            }}
          >
            <TrafficIcon />
          </Avatar>
        </Grid>
      </Grid>
      {/* Historical Data, eg from Timescale DB can be displayed here as a comparative value eg from the last hour or a chosen hour before */}
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
        ></Typography>
      </Box>
    </CardContent>
  </Card>
);
