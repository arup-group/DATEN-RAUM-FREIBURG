import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";

export function CValueINRIX(props) {
  let cvalueINRIX = props.dataset["properties"]["c-Value_inrix"];

  return (
    <Card sx={{ height: "100%" }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Verlässlichkeitsscore Daten INRIX (0-100)
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {cvalueINRIX}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor:
                  (cvalueINRIX >= 80 && "success.main") ||
                  (cvalueINRIX <= 49 && "error.main") ||
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
          <LinearProgress value={cvalueINRIX} variant="determinate" />
        </Box>
      </CardContent>
    </Card>
  );
}
