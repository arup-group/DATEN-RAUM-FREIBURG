import {
  Alert,
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import placeholder6 from "../../assets/placeholders/placeholder-6.svg";
import { useEffect, useState } from "react";
import freiburgLogo from "../../assets/icons/freiburg-logo/freiburg-logo-dark.svg";
import { ReturnNavBar } from "../../components/ReturnNavBar";
import { AppDispatch } from "../../redux/reduxStore/Store";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/slices/AuthUserSlice";
import ErrorAlert from "../../components/ErrorAlert";

//Sign in page with input for an email address and password
export const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();

  //Auth state from redux
  const { loading, userInfo, error } = useSelector(
    (state: any) => state.authUser
  );
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  //Handles email input change
  const updateUserEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };

  //Handles password input change
  const updateUserPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.target.value);
  };

  //Handles sign in event disptach to redux
  const handleSignIn = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (userEmail.length > 0 && userPassword.length > 0) {
      dispatch(userLogin({ email: userEmail, password: userPassword }));
    }
  };

  return (
    <>
      <AppBar
        elevation={0}
        sx={{
          height: "53px",
          background: "#ffffff",
          justifyItems: "center",
        }}
        position="sticky"
        component="nav"
      >
        <Toolbar variant="dense">
          <Box
            display="flex"
            component="img"
            sx={{
              height: "80%",
              width: "auto",
            }}
            alt="Freiburg logo"
            src={freiburgLogo}
          />
          <Box
            display="flex"
            flexGrow={1}
            sx={{
              height: "100%",
              width: "auto",
            }}
          />
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          alignSelf: "center",
          alignText: "center",
          justifyItems: "center",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <ReturnNavBar navigateURL="/" navigationLabel="Zurück" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={8} sx={{ maxWidth: "1200px" }}>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                sx={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  minHeight: "500px",
                  maxHeight: "80vh",
                  minWidth: "350px",
                }}
                alt="Site plan"
                src={placeholder6}
              />
            </Grid>
            <Grid item xs={6}>
              <form onSubmit={handleSignIn}>
                <Stack direction="column" rowGap={3} sx={{ maxWidth: "400px" }}>
                  <Typography
                    sx={{ fontSize: 30, fontWeight: "800" }}
                    color="primary"
                    gutterBottom
                  >
                    Bewerbungsportal
                  </Typography>

                  <Typography
                    sx={{ fontSize: 14, fontWeight: "400" }}
                    color="primary"
                  >
                    Melden Sie sich bei Ihrem Konto an, um Bewerbungen
                    anzuzeigen und zu verwalten to view and manage applications
                  </Typography>

                  <TextField
                    id="email"
                    label="E-Mail"
                    type="email"
                    variant="outlined"
                    value={userEmail}
                    onChange={updateUserEmail}
                    inputProps={{
                      style: {
                        fontSize: 13,
                        fontWeight: 400,
                        color: "primary",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: 13,
                        fontWeight: 400,
                        color: "primary",
                      },
                    }}
                    required
                  />

                  <TextField
                    id="password"
                    label="Passwort"
                    variant="outlined"
                    type="password"
                    value={userPassword}
                    onChange={updateUserPassword}
                    inputProps={{
                      style: {
                        fontSize: 13,
                        fontWeight: 400,
                        color: "primary",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        fontSize: 13,
                        fontWeight: 400,
                        color: "primary",
                      },
                    }}
                    required
                  />

                  <Button
                    variant="contained"
                    size="medium"
                    color="secondary"
                    sx={{
                      textAlign: "center",
                      boxShadow: 0,
                      borderRadius: 1,
                      textTransform: "none",
                      width: "50%",
                    }}
                    type="submit"
                    component={Button}
                    disabled={loading}
                  >
                    Anmelden
                  </Button>
                  {error && (
                    <Box sx={{ marginTop: 5, marginBottom: 5 }}>
                      <>
                        <ErrorAlert
                          severity="error"
                          errormsg={
                            error ? error : "Fehler beim Authentifizieren"
                          }
                        />
                      </>
                    </Box>
                  )}
                </Stack>
              </form>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Outlet />
    </>
  );
};
