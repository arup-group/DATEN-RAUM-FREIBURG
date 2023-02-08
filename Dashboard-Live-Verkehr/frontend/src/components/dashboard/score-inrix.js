import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";

export function ScoreINRIX(props) {
  let scoreINRIX = props.dataset["properties"]["score_inrix"];

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Live-Verfügbarkeit Score INRIX (0-30)
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {scoreINRIX}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor:
                  (scoreINRIX === 30 && "success.main") ||
                  (scoreINRIX <= 10 && "error.main") ||
                  "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress
            value={
              (scoreINRIX === 30 && 100) ||
              (scoreINRIX === 20 && 66) ||
              (scoreINRIX === 10 && 33) ||
              0
            }
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
}
