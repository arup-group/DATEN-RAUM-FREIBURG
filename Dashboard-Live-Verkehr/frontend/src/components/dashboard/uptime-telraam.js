import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";

export function UptimeTelraam(props) {
  let uptime_telraam = Math.round(props.dataset["properties"]["uptime_telraam"] * 100);

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Uptime Telraam
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {uptime_telraam} %
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress value={uptime_telraam} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
}
