//Create a component here for displaying the historic traffic status

// import { Bar } from "react-chartjs-2";
// import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowRightIcon from "@mui/icons-material/ArrowRight";

// export const HistoricTraffic = (props) => {
//   const theme = useTheme();

//   const data = {
//     datasets: [
//       {
//         backgroundColor: "#3F51B5",
//         barPercentage: 0.5,
//         barThickness: 12,
//         borderRadius: 4,
//         categoryPercentage: 0.5,
//         data: [18, 5, 45, 76, 90, 19, 10],
//         label: "Dieses Jahr",
//         maxBarThickness: 10,
//       },
//       {
//         backgroundColor: "#EEEEEE",
//         barPercentage: 0.5,
//         barThickness: 12,
//         borderRadius: 4,
//         categoryPercentage: 0.5,
//         data: [18, 5, 50, 80, 88, 20, 10],
//         label: "Letztes Jahr",
//         maxBarThickness: 10,
//       },
//     ],
//     labels: ["1 Aug", "2 Aug", "3 Aug", "4 Aug", "5 Aug", "6 Aug", "7 aug"],
//   };

//   const options = {
//     animation: false,
//     cornerRadius: 20,
//     layout: { padding: 0 },
//     legend: { display: false },
//     maintainAspectRatio: false,
//     responsive: true,
//     xAxes: [
//       {
//         ticks: {
//           fontColor: theme.palette.text.secondary,
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false,
//         },
//       },
//     ],
//     yAxes: [
//       {
//         ticks: {
//           fontColor: theme.palette.text.secondary,
//           beginAtZero: true,
//           min: 0,
//         },
//         gridLines: {
//           borderDash: [2],
//           borderDashOffset: [2],
//           color: theme.palette.divider,
//           drawBorder: false,
//           zeroLineBorderDash: [2],
//           zeroLineBorderDashOffset: [2],
//           zeroLineColor: theme.palette.divider,
//         },
//       },
//     ],
//     tooltips: {
//       backgroundColor: theme.palette.background.paper,
//       bodyFontColor: theme.palette.text.secondary,
//       borderColor: theme.palette.divider,
//       borderWidth: 1,
//       enabled: true,
//       footerFontColor: theme.palette.text.secondary,
//       intersect: false,
//       mode: "index",
//       titleFontColor: theme.palette.text.primary,
//     },
//   };

//   return (
//     <Card {...props}>
//       <CardHeader
//         action={
//           <Button endIcon={<ArrowDropDownIcon fontSize="small" />} size="small">
//             Letzte 7 Tage
//           </Button>
//         }
//         title="Historie Stra??enauslastung"
//       />
//       <Divider />
//       <CardContent>
//         <Box
//           sx={{
//             height: 400,
//             position: "relative",
//           }}
//         >
//           <Bar data={data} options={options} />
//         </Box>
//       </CardContent>
//       <Divider />
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end",
//           p: 2,
//         }}
//       >
//         <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
//           Overview
//         </Button>
//       </Box>
//     </Card>
//   );
// };
