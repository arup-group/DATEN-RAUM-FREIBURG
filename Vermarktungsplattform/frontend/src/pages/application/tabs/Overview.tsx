import { Box, Stack, Typography } from "@mui/material";
import { ApplicationFileCard } from "../../../components/cards/ApplicationFileCard";
import { Section } from "../../../components/Section";
/**
 * Overview page for application
 */
export const Overview = () => {
  return (
    <Box
      sx={{
        marginTop: "30px",
      }}
    >
      <Section
        title={"Den Bereich zur „Bewerbung auf ein Grundstück“ bitte ergänzen"}
      />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ marginBottom: "100px" }}>
          <Stack rowGap={2} direction="column" sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
              Bei konkretem <u>Interesse an einem Hochbauprojekt</u> bitten wir
              Sie um Abgabe der folgenden Informationen bzw. Unterlagen. Die
              Vorlagen zu den Bewerbungsunterlagen können Sie hier
              herunterladen:
            </Typography>
          </Stack>
          <Stack rowGap={1} direction="column" sx={{ flex: 1 }}>
            <Stack
              rowGap={2}
              direction="column"
              sx={{ marginTop: "16px", marginBottom: "16px" }}
            >
              <ApplicationFileCard
                description="Fragebogen/ Bewerbungsbogen "
                btnTitle="Download"
              />
              <ApplicationFileCard
                description="Projektbeschreibung (mit wesentlichen Konzeptmerkmalen)"
                btnTitle="Download"
              />
              <ApplicationFileCard
                description="Skizzen / Pläne (Ansichten, Grundrisse KG, EG, OG, Bauablaufplan)"
                btnTitle="Download"
              />
              <ApplicationFileCard
                description="Excel-Tool"
                btnTitle="Download"
              />
              <ApplicationFileCard
                description="Kostenaufstellung/Finanzierungskonzept"
                btnTitle="Download"
              />
              <Typography
                sx={{ fontSize: 12, fontWeight: 500 }}
                color="primary"
              >
                Bei Anliegerprojekten:
              </Typography>
              <ApplicationFileCard
                description="Ankerkonzeption mit Einverständniserklärung"
                btnTitle="Download"
              />
              <Typography
                sx={{ fontSize: 12, fontWeight: 500 }}
                color="primary"
              >
                Bei Ankerprojekten:
              </Typography>
              <ApplicationFileCard
                description="Konzept für die Organisation und Finanzierung der Gemeinschaftsaufgaben"
                btnTitle="Download"
              />
            </Stack>
            <Typography sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
              Diese Unterlagen ergeben Ihre Bewerbung. Weitere Unterlagen sind
              nicht notwendig.
            </Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
              Bitte lassen Sie uns die erforderlichen Bewerbungsunterlagen
              fristgerecht über das <u>Bewerbungsportal</u> zukommen.
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
