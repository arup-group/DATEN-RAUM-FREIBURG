import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export const Speedv85Car = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="overline">
            85 % der Fahrzeuge fahren maximal
          </Typography>
          <Typography color="textPrimary" variant="h4">
            {props.dataset["properties"]["v85_telraam"]} km/h
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <DirectionsCarIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
