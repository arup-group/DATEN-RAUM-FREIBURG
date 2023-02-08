import {
  Container,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
  ListItemText,
} from "@mui/material";
import { CSSProperties } from "@mui/material/styles/createTypography";

/**
 * Component to display application information
 */
export const Application = () => {
  //custom content CSS prop
  const contentStyle: CSSProperties = {
    fontSize: 12,
    fontWeight: 400,
  };

  //custom text CSS prop
  const textStyle: CSSProperties = {
    fontSize: 12,
    fontWeight: 400,
    py: 0,
  };

  //custom text style CSS prop
  const textStyleUnderline: CSSProperties = {
    fontSize: 12,
    fontWeight: 400,
    py: 0,
    textDecoration: "underline",
    textIndent: "30px",
    color: "primary",
  };

  //custom list item CSS prop
  const listItemStyle: CSSProperties = {
    display: "list-item",
    p: 0,
    ml: 6,
    color: "primary",
  };

  return (
    <Container sx={{ marginTop: 6 }}>
      <Grid container columnSpacing={6}>
        <Stack rowGap={1} direction="column" sx={{ marginBottom: "50px" }}>
          <Typography
            component="span"
            sx={{
              fontSize: 18,
              fontWeight: 500,
            }}
            color="primary"
          >
            Ablauf der Bewerbung bei der Grundstücksvergabe:
          </Typography>
          <List
            sx={{
              listStyleType: "disc",
              pr: 0,
              py: 0,
              pl: 2,
            }}
          >
            <ListItem
              sx={{
                display: "list-item",
                p: 0,
                color: "primary",
              }}
            >
              <ListItemText
                color="primary"
                primaryTypographyProps={{ style: textStyle }}
                primary="Für Grundstücke, bei denen das Vergabeverfahren ausgeschrieben ist, können Sie sich mit Ihrem geplanten Bauprojekt bewerben."
              />
            </ListItem>
            <ListItem
              sx={{
                display: "list-item",
                p: 0,
                color: "primary",
              }}
            >
              <ListItemText
                color="primary"
                primaryTypographyProps={{ style: textStyle }}
                primary="Die Ausschreibung der Grundstücke zur Vergabe für die jeweiligen Bauprojekte wird auf dem Vermarktungsportal Dietenbach der Stadt Freiburg sowie im Amtsblatt der Stadt Freiburg / Bundesanzeiger bekannt gegeben."
              />
            </ListItem>
            <ListItem
              sx={{
                display: "list-item",
                p: 0,
                color: "primary",
              }}
            >
              <ListItemText
                color="primary"
                primaryTypographyProps={{ style: textStyle }}
                primary="Reichen Sie die erforderlichen Unterlagen innerhalb der angegebenen Frist unter Ihrem Bewerberzugang auf der Vermarktungsplattform ein. Dort erhalten Sie regelmäßig eine Rückmeldung zum Bearbeitungsstand Ihrer Bewerbung.
                Ggfls. können Sie die Unterlagen auch postalisch an uns senden."
              />
            </ListItem>
          </List>
          <Typography component="span" sx={contentStyle} color="primary">
            In manchen Baublöcken werden Grundstücke für sog. „Ankernutzer“
            sowie „Anlieger“ ausgewiesen. Bewerber für die Anker-Grundstücke
            sollen neben dem eigenen Hochbauprojekt zusätzlich auch die
            Konzeption und Koordination der im Baublock anstehenden
            Querschnittsaufgaben übernehmen. Die Grundstücke für die Ankernutzer
            werden zuerst ausgeschrieben und vergeben. Sobald das Konzept für
            die Querschnittsaufgaben feststeht, findet die Vergabe der
            restlichen Grundstücke des Baublocks für die sog. Anlieger statt.
            Die Ankerkonzeption ist Voraussetzung für die Ausschreibung der
            Anliegerprojekte und wird ein Bestandteil der Bewerbungsunterlagen
            für die jeweiligen Hochbauprojekte der Anlieger des Baublocks.
          </Typography>

          <List sx={textStyle}>
            <ListItem
              component="ol"
              sx={{
                display: "list-item",
                fontWeight: "bold",
                color: "primary",
                fontSize: 15,
              }}
            >
              <ListItemText
                color="primary"
                primaryTypographyProps={{
                  style: {
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "primary",
                  },
                }}
              >
                Bewerbung für ein Hochbauprojekt{" "}
                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: "bold",
                    textDecoration: "underline",
                    display: "inline",
                    color: "primary",
                  }}
                >
                  inklusive
                </Typography>{" "}
                der gemeinschaftlich anstehenden Querschnittsaufgaben:
              </ListItemText>
            </ListItem>
            <ListItem>
              <Typography color="primary" sx={contentStyle}>
                Der Ankernutzer bewirbt sich um ein Grundstück für sein eigenes
                Hochbauprojekt.{" "}
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 400,
                    textDecoration: "underline",
                    display: "inline",
                  }}
                >
                  Zusätzlich
                </Typography>{" "}
                ist er verantwortlich für die im Baublock zu regelnden
                Querschnittsaufgaben und erstellt ein Konzept für die
                Organisation und Finanzierung der Gemeinschaftsaufgaben.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography color="primary" sx={contentStyle}>
                Wenn Sie Interesse an einem der für Ankerprojekte ausgewiesenen
                Grundstücke haben, um Ihr Hochbauprojekt in Zusammenhang mit den
                Querschnittsaufgaben zu verwirklichen, sind die folgenden
                Unterlagen einzureichen:
              </Typography>
            </ListItem>
            <List sx={{ fontSize: 12, fontWeight: 400, py: 0, my: 0 }}>
              <ListItem component="ol" sx={listItemStyle}>
                <ListItemText
                  color="primary"
                  primaryTypographyProps={{ style: textStyleUnderline }}
                  primary="Bewerberbogen"
                />
              </ListItem>
              <ListItem component="ol" sx={listItemStyle}>
                <ListItemText
                  color="primary"
                  primaryTypographyProps={{ style: textStyleUnderline }}
                  primary="Bewerbungsunterlagen für ein Hochbauprojekt"
                />
              </ListItem>
              <ListItem component="ol" sx={listItemStyle}>
                <ListItemText
                  color="primary"
                  primaryTypographyProps={{ style: textStyleUnderline }}
                  primary="Bewerbungsunterlagen für Querschnittsaufgaben"
                />
              </ListItem>
            </List>
            <br />
            <Typography
              color="primary"
              sx={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Für den ersten Vermarktungsabschnitt findet die Vergabe der
              Grundstücke für die Ankerprojekte voraussichtlich ab 01.01. statt
            </Typography>
            <ListItem
              component="ol"
              sx={{
                display: "list-item",
                fontWeight: "bold",
                color: "primary",
                fontSize: 15,
                marginTop: "30px",
              }}
            >
              <ListItemText
                color="primary"
                primaryTypographyProps={{
                  style: {
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "primary",
                  },
                }}
                primary="Bewerbung für ein Hochbauprojekt:"
              />
            </ListItem>

            <ListItem>
              <Typography
                color="primary"
                sx={{ fontSize: 12, fontWeight: 400, py: 0, my: 0 }}
              >
                Wenn Sie Interesse an einem Grundstück haben, um Ihr
                Hochbauprojekt zu verwirklichen, sind die folgenden Unterlagen
                einzureichen:
              </Typography>
            </ListItem>

            <List
              sx={{
                fontSize: 12,
                fontWeight: 400,
                py: 0,
                my: 0,
              }}
            >
              <ListItem component="ol" sx={listItemStyle}>
                <ListItemText
                  color="primary"
                  primaryTypographyProps={{ style: textStyleUnderline }}
                  primary="Bewerberbogen"
                />
              </ListItem>
              <ListItem component="ol" sx={listItemStyle}>
                <ListItemText
                  color="primary"
                  primaryTypographyProps={{ style: textStyleUnderline }}
                  primary="Bewerbungsunterlagen für ein Hochbauprojekt"
                />
              </ListItem>
              <ListItem component="ol" sx={listItemStyle}>
                <ListItemText
                  color="primary"
                  primaryTypographyProps={{ style: textStyleUnderline }}
                  primary="Ankerkonzeption mit Einverständniserklärung"
                />
              </ListItem>
            </List>
          </List>
          <br />
          <Typography
            color="primary"
            sx={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            Für den ersten Vermarktungsabschnitt im BA1 findet die Vergabe der
            Grundstücke für die Anliegerprojekte voraussichtlich ab 01.05. statt
          </Typography>
          <Typography
            component="span"
            sx={{ fontSize: 12, fontWeight: 400 }}
            color="primary"
          >
            Sofern Sie Fragen haben, wenden Sie sich bitte an:
            <br />
            Frau/Herr, Tel / Email
            <br />
            Sofern Sie die Bewerbungsunterlagen nicht über die
            Bewerbungsplattform einreichen können, senden Sie uns Ihre
            Unterlagen (digital auf CD Rom oder USB-Stick sowie ausgedruckt mit
            2 Ausfertigungen) an folgende Adresse: Frau/Herr / PGD /
            Fehrenbachallee 12 /Freiburg
          </Typography>
        </Stack>
      </Grid>
    </Container>
  );
};
