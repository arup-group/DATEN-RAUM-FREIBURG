import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
import { Applications } from "./pages/applications/Applications";
import { Plots } from "./pages/plots/Plots";
import { Applicants } from "./pages/applicants/Applicants";
import { PlotDetails } from "./pages/plotDetails/PlotDetails";
import { ApplicantDetails } from "./pages/applicantDetails/ApplicantDetails";
import { Application } from "./pages/application/Application";
import { ManagementConsole } from "./pages/managementConsole/ManagementConsole";
import { SignIn } from "./pages/signin/SignIn";

import { Provider } from "react-redux";
import { store } from "./redux/reduxStore/Store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/managementconsole" element={<ManagementConsole />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/plots" element={<Plots />} />
            <Route path="/plotdetails" element={<PlotDetails />} />
            <Route path="/applicants" element={<Applicants />} />
            <Route path="/application" element={<Application />} />
            <Route path="/applicantdetails" element={<ApplicantDetails />} />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
