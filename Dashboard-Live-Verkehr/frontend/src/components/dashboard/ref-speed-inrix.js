import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SpeedIcon from "@mui/icons-material/Speed";

export const RefSpeedINRIX = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            Reference Speed INRIX
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {Math.round(props.dataset["properties"]["reference_inrix"])} km/h
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "grey",
              height: 56,
              width: 56,
            }}
          >
            <SpeedIcon />
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
