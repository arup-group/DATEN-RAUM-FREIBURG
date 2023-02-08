import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Custom MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#001F60",
    },
    secondary: {
      main: "#C00000",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
