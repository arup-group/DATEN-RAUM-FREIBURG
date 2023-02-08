import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import Vergabebild from "../../../assets/images/Vergabebild.svg";
import { CSSProperties } from "@mui/material/styles/createTypography";

/**
 * Component to display award process information
 */
export const AwardProcess = () => {
  //custom css prop
  const contentStyle: CSSProperties = {
    fontSize: 12,
    fontWeight: 400,
  };

  return (
    <Container sx={{ marginTop: 6, marginBottom: 6 }}>
      <Grid container columnSpacing={6}>
        <Grid item xs={6}>
          <Box
            component="img"
            sx={{
              width: "100%",
              maxWidth: "800px",
              minWidth: "250px",
            }}
            alt="Site plan"
            src={Vergabebild}
          />
          <Stack rowGap={2} direction="column">
            <Typography component="span" sx={contentStyle} color="primary">
              Die Grundstücksvergabe im 1. Bauabschnitt des neuen Stadtteils
              Dietenbach findet in 4 Vermarktungsabschnitten statt.
            </Typography>
            <List
              sx={{
                listStyleType: "disc",
                pl: 4,
                pr: 0,
                py: 0,
              }}
            >
              <ListItem
                sx={{
                  display: "list-item",
                  p: 0,
                  color: "primary",
                }}
              >
                <Typography
                  color="primary"
                  sx={{
                    fontSize: 12,
                    fontWeight: 400,
                    py: 0,
                  }}
                >
                  Vermarktungsabschnitt 1 mit 57 Grundstücken in 6 Baublöcken
                  Ausschreibung ab xxx
                </Typography>
              </ListItem>
              <ListItem
                sx={{
                  display: "list-item",
                  p: 0,
                  color: "primary",
                }}
              >
                <Typography
                  color="primary"
                  sx={{
                    fontSize: 12,
                    fontWeight: 400,
                    py: 0,
                  }}
                >
                  Vermarktungsabschnitt 2 mit xx Grundstücken in xx Baublöcken
                  Ausschreibung ab xxx
                </Typography>
              </ListItem>
              <ListItem
                sx={{
                  display: "list-item",
                  p: 0,
                  color: "primary",
                }}
              >
                <Typography
                  color="primary"
                  sx={{
                    fontSize: 12,
                    fontWeight: 400,
                    py: 0,
                  }}
                >
                  Vermarktungsabschnitt 3 mit xx Grundstücken in xx Baublöcken
                  Ausschreibung ab xxx
                </Typography>
              </ListItem>
              <ListItem
                sx={{
                  display: "list-item",
                  p: 0,
                  color: "primary",
                }}
              >
                <Typography
                  color="primary"
                  sx={{
                    fontSize: 12,
                    fontWeight: 400,
                    py: 0,
                  }}
                >
                  Vermarktungsabschnitt 4 mit xx Grundstücken in xx Baublöcken
                  Ausschreibung ab xxx
                </Typography>
              </ListItem>
            </List>
            <Typography component="span" sx={contentStyle} color="primary">
              Die Vergabe der Grundstücke wird{" "}
              <Link href="">öffentlich ausgeschrieben</Link> und auf dem{" "}
              <Link href="">Vermarktungsportal Dietenbach</Link> der Stadt
              Freiburg sowie im Amtsblatt der Stadt Freiburg und Bundesanzeiger
              bekannt gegeben.{" "}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={6} rowGap={6} sx={{ marginBottom: "50px" }}>
          <Stack rowGap={2} direction="column">
            <Typography
              component="span"
              sx={{
                fontSize: 18,
                fontWeight: 500,
              }}
              color="primary"
            >
              Vergabeprozess
            </Typography>
            <Typography component="span" sx={contentStyle} color="primary">
              Um die angedachte Vielfalt in dem Baugebiet Dietenbach zu
              ermöglichen, soll die Vergabe der Grundstücke nach dem{" "}
              <Link>Konzeptvergabeverfahren</Link> erfolgen, welches auf das
              Ziel ausgerichtet ist, durch einen offenen Ideenwettbewerb
              kleinteilige, durchmischte und vielfältige Typologien entstehen zu
              lassen. Die Interessenten für den Kauf eines Grundstücks stellen
              das geplante Konzept im Rahmen einer Bewerbung vor. Die Idee
              (Qualität) des eingereichten Konzepts steht im Vordergrund der
              Vergabeentscheidung. Dabei werden architektonische /
              städtebauliche Kriterien, soziale Kriterien sowie auch der Beitrag
              des Projekts zum Leben im Quartier und zu
              Nachhaltigkeitszielsetzungen betrachtet.
            </Typography>
            <Typography component="span" sx={contentStyle} color="primary">
              Nur so lässt es sich realisieren, dass in dem neuen Stadtteil
              Dietenbach gemischte, inklusive Wohnquartiere für weite Kreise der
              Bevölkerung (Haushalte mit geringem oder mittlerem Einkommen,
              Familien und Alleinerziehende mit Kindern, Studierende, Ältere und
              Menschen mit Behinderungen) entstehen können. Zudem sollen neben
              der Sicherstellung von 50% geförderten Wohnungsbau die
              städtebaulichen Ziele (hohe Wohnqualität durch Kleinteiligkeit und
              ansprechende Freiraumgestaltung), die Ziele des Klimaschutzes und
              des nachhaltigen Bauens sowie eines zukunftsfähigen
              Mobilitätskonzeptes umgesetzt werden.
            </Typography>
            <Typography component="span" sx={contentStyle} color="primary">
              Im Hinblick auf die organisatorischen Herausforderungen zur
              Errichtung der jeweiligen Hochbauten in einem Baublock zusammen
              mit den gemeinschaftlich zu erstellenden Einrichtungen
              (Fahrradtiefgarage mit Rampen, Gestaltung des gemeinschaftlichen
              Innenhofs, Unterbringung der Unterflurmüllcontainer) wird die
              Vergabe der Grundstücke innerhalb eines Baublocks in zwei Stufen
              durchgeführt:
            </Typography>
            <List sx={{ fontSize: 12, fontWeight: 400, py: 0, my: 0 }}>
              <ListItem
                sx={{
                  display: "list-item",
                  p: 0,
                }}
              >
                <Typography
                  color="primary"
                  sx={{
                    fontSize: 12,
                    fontWeight: 400,
                    py: 0,
                  }}
                >
                  1. Zunächst wird in dem jeweiligen Baublock ein Hochbauprojekt
                  entsprechend der o.g. Konzeptvergabe an einen sog.
                  „Ankernutzer“ vergeben. Dieser ist zum einen verantwortlich
                  für sein eigenes Hochbauprojekt, übernimmt jedoch darüber
                  hinaus auch die Konzeption und Koordination der im Baublock
                  anstehenden Querschnittsaufgaben.{" "}
                </Typography>
              </ListItem>

              <ListItem
                sx={{
                  textIndent: "20px",
                }}
              >
                <Typography color="primary" sx={contentStyle}>
                  Dies betrifft die folgenden gemeinschaftlich zu regelnden
                  Aufgaben:
                </Typography>
              </ListItem>
              <List
                sx={{
                  listStyleType: "disc",
                  pl: 8,
                  pr: 0,
                  py: 0,
                }}
              >
                <ListItem
                  sx={{
                    display: "list-item",
                    p: 0,
                    color: "primary",
                  }}
                >
                  <Typography color="primary" sx={contentStyle}>
                    Freiraumgestaltung Innenhof und UFC
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    display: "list-item",
                    p: 0,
                    color: "primary",
                  }}
                >
                  <Typography color="primary" sx={contentStyle}>
                    Fahrradtiefgaragen
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    display: "list-item",
                    p: 0,
                    color: "primary",
                  }}
                >
                  <Typography color="primary" sx={contentStyle}>
                    Partizipativer Planungsprozess
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    display: "list-item",
                    p: 0,
                    color: "primary",
                  }}
                >
                  <Typography color="primary" sx={contentStyle}>
                    Organisatorisches und finanzielles Konzept für
                    Gemeinschaftsaufgaben{" "}
                  </Typography>
                </ListItem>
              </List>
              <ListItem
                sx={{
                  display: "list-item",
                  px: 0,
                }}
              >
                <Typography
                  color="primary"
                  sx={{
                    fontSize: 12,
                    fontWeight: 400,
                    p: 0,
                  }}
                >
                  2. Sobald der jeweilige Ankernutzer feststeht und die
                  Konzeption des Ankernutzers für die gemeinschaftlichen
                  Aufgaben vorliegt (das sog. Ankerkonzept), werden die weiteren
                  Grundstücke des Baublocks an die jeweiligen „Anlieger“
                  vergeben.
                </Typography>
              </ListItem>
            </List>
            <Typography component="span" sx={contentStyle} color="primary">
              Zur Teilnahme am Verfahren müssen die jeweils geforderten
              Unterlagen vollständig und fristgerecht vorliegen.{" "}
            </Typography>
            <Typography component="span" sx={contentStyle} color="primary">
              Anschließend erhalten die Interessenten, deren
              Bewerbungsunterlagen vollständig vorliegen, die Möglichkeit, ihr
              Projekt persönlich vorzustellen und ggfls. zu überarbeiten. Die
              finalen Bewerbungen werden anhand der Auswahlkriterien verglichen
              und bewertet. Das ausgewählte Projekt erhält eine
              Reservierungszusage, während der die Bauantragsunterlagen erstellt
              und eingereicht und die Finanzierungszusagen der Banken eingeholt
              werden. Nach Vorliegen dieser Unterlagen wird der Grundstückskauf
              notariell beurkundet.{" "}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
