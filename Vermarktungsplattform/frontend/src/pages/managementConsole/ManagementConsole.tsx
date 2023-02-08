import { Box, Grid, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { PageScaffold } from "../../components/PageScaffold";
import { TitleComponent } from "../../components/TitleComponent";
import { NavigationCard } from "../../components/cards/NavigationCard";

import ImagePlaceholder from "../../assets/placeholders/admin-console-placeholder.svg";
import { Container } from "@mui/system";
import { ReturnNavBar } from "../../components/ReturnNavBar";
import { useSelector } from "react-redux";

/**
 * Component to display management console menu
 */
export const ManagementConsole = () => {
  //return user info
  const { userInfo } = useSelector((state: any) => state.authUser);
  return (
    <PageScaffold
      showAccountMenu={true}
      showConsoleLink={false}
      protectedArea={true}
      children={
        <Container>
          <ReturnNavBar
            navigateURL="/"
            navigationLabel="Zurück zur Startseite"
          />
          <TitleComponent title="Verwaltungssteuerung" />

          <Container
            sx={{
              alignSelf: "center",
              alignText: "center",
              justifyItems: "center",
              display: "flex",
              flexGrow: 1,
            }}
          >
            <Grid
              container
              spacing={8}
              sx={{
                maxWidth: "1200px",
                alignItems: "center",
                justifyContents: "center",
              }}
            >
              <Grid item xs={6}>
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    maxWidth: "600px",
                    minWidth: "350px",
                  }}
                  alt="Site plan"
                  src={ImagePlaceholder}
                />
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={4}>
                  <NavigationCard
                    title="Grundstücke"
                    description="Verfügbare Grundstücke anzeigen"
                    linkURL="/plots"
                    btnTitle="Anzeigen"
                  />
                  <NavigationCard
                    title="Grundstücksbewerbungen"
                    description="Bewerbungen anzeigen und bearbeiten"
                    linkURL="/applications"
                    btnTitle="Anzeigen"
                  />
                  {userInfo && userInfo.is_admin === 1 && (
                    <NavigationCard
                      title="Bewerber:innen"
                      description="Bewerber:innen anzeigen"
                      linkURL="/applicants"
                      btnTitle="Anzeigen"
                    />
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Container>
          <Outlet />
        </Container>
      }
    />
  );
};
