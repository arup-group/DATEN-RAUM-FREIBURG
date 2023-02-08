import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";

export const BicycleCounter = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Fahrräder in letzten 60 min
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {Math.round(props.dataset["properties"]["bike_telraam"])}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 56,
              width: 56,
            }}
          >
            <DirectionsBikeIcon />
          </Avatar>
        </Grid>
      </Grid>
      {/* Historical Data, eg from Timescale DB can be displayed here as a comparative value eg from the last hour or a chosen hour before */}
      {/* <Box
        sx={{
          alignItems: "center",
          display: "flex",
          pt: 2,
        }}
      >
        <ArrowUpwardIcon color="success" />
        <Typography
          variant="body2"
          sx={{
            mr: 1,
          }}
        >
          16%
        </Typography>
        <Typography color="textSecondary" variant="caption">
          Zur vorherigen Stunde
        </Typography>
      </Box> */}
    </CardContent>
  </Card>
);
