import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

export const TrafficShares = (props) => {
  const theme = useTheme();
  const bikeAmount = props.dataset["properties"]["bike_telraam"];
  const carAmount = props.dataset["properties"]["car_telraam"];
  const heavyAmount = props.dataset["properties"]["heavy_telraam"];
  const pedestrianAmount = props.dataset["properties"]["pedestrian_telraam"];
  const trafficSum = bikeAmount + carAmount + heavyAmount + pedestrianAmount;
  const trafficShares = [
    bikeAmount / trafficSum,
    carAmount / trafficSum,
    heavyAmount / trafficSum,
    pedestrianAmount / trafficSum,
  ];

  const data = {
    datasets: [
      {
        data: [trafficShares[0], trafficShares[1], trafficShares[2], trafficShares[3]],
        backgroundColor: ["#3F51B5", "#e53935", "#FB8C00", "#14B8A6"],
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: ["Fahrrad", "PKW", "LKW", "Fußgänger"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const calculatePercentage = (index) => {
    if (trafficShares[index]) {
      return Math.round(trafficShares[index] * 100);
    } else {
      return 0;
    }
  };

  const shares = [
    {
      title: "Fahrrad",
      value: calculatePercentage(0),
      icon: DirectionsBikeIcon,
      color: "#3F51B5",
    },
    {
      title: "PKW",
      value: calculatePercentage(1),
      icon: DirectionsCarIcon,
      color: "#E53935",
    },
    {
      title: "LKW",
      value: calculatePercentage(2),
      icon: LocalShippingIcon,
      color: "#FB8C00",
    },
    {
      title: "Fussgänger",
      value: calculatePercentage(3),
      icon: DirectionsWalkIcon,
      color: "#14B8A6",
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title="Anteil Verkehrsmittel in letzten 60 min" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {shares.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h4">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
