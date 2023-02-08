import {
  Box,
  Card,
  Link,
  List,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ApplicationFileCard } from "../ApplicationFileCard";

//Example component of what a plot information page could look like, in this case, plot 1.19.1
const PlotDetailsExample = () => {
  return (
    <Box sx={{ margin: "16px", marginTop: "32px" }}>
      <Card
        sx={{
          display: "flex",
          padding: 2,
          bgcolor: "#F8F9FB",
          boxShadow: 0,
          borderRadius: 2,
          justifyContent: "center",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Stack rowGap={2} direction="column" sx={{ flex: 1 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }} color="primary">
            Öffentliche Bekanntmachung
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }} color="primary">
            Ausschreibung des Grundstücks 19.1 im Baublock 19 / Stadtteil
            Dietenbach für ein Hochbauprojekt inklusive Querschnittsaufgaben
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
            Der Stadtteil Dietenbach soll als urbanes Wohnquartier mit rund 6900
            Wohnungen für rd. 16.000 Menschen entwickelt werden, um den erhöhten
            Bedarf – vor allem an bezahlbarem – Wohnraum in der Stadt Freiburg
            zu decken. Durch die Entwicklungsmaßnahme sollen gemischte,
            inklusive Wohnquartiere für weite Kreise der Bevölkerung (Haushalte
            mit geringem oder mittlerem Einkommen, Familien und Alleinerziehende
            mit Kindern, Studierende, Ältere und Menschen mit Behinderungen) mit
            einer Vielfalt an Wohnformen und Gestaltungsideen entstehen.
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
            Neben den städtebaulichen Zielen (hohe Wohnqualität durch
            Kleinteiligkeit und ansprechende Freiraumgestaltung), sind die
            Zielsetzungen von 50% geförderten Wohnungsbau sowie die Ziele des
            Klimaschutzes, des nachhaltigen Bauens und eines zukunftsfähigen
            Mobilitätskonzeptes zu realisieren.
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
            Die Vergabe der Grundstücke erfolgt nach dem Konzeptvergabeverfahren
            – die Qualität des eingereichten Konzepts steht im Vordergrund der
            Vergabeentscheidung.
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
            Das Grundstück 19.1 im Baublock 19 (Geschosswohnungsbau groß mit
            KiTa) wird an den sog. Ankernutzer vergeben und eine
            Reservierungsvereinbarung abgeschlossen. Neben seinem Hochbauprojekt
            auf Grundstück 19.1 ist der Ankernutzer verantwortlich für die
            Konzeption der im Baublock 19 anfallenden Gemeinschaftsaufgaben (das
            Ankerkonzept). Dazu zählen die Realisierung der Fahrradtiefgarage(n)
            und Rampen, der Bau der UFC und die Innenhofgestaltung. Zudem wird
            durch den Ankernutzer die Baustellenkoordination der Einzelprojekte
            in Baublock 19 durchgeführt.
          </Typography>

          <Typography sx={{ fontSize: 14, fontWeight: 500 }} color="primary">
            Gegenstand dieser Ausschreibung Offene Konzeptvergabe –
            Ankerverfahren
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
            Im Zuge dieser Ausschreibung bietet die Stadt Freiburg das im
            Baublock 19 gelegene Grundstück 19.1 zur Veräußerung an.
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
            Es ist die folgende Gebäudetypologie vorgesehen:
          </Typography>

          <TableContainer sx={{ marginBottom: "16px" }}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="Info table"
              size={"small"}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 500 }}
                      color="primary"
                    >
                      Nr
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 500 }}
                      color="primary"
                    >
                      Gebäudetypologie (inkl. Besonderheit)
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 500 }}
                      color="primary"
                    >
                      Grundstücksfläche [m2]
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  key={0}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" component="th" scope="row">
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 400 }}
                      color="primary"
                    >
                      19.1
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 400 }}
                      color="primary"
                    >
                      1* Geschosswohnungsbau groß mit KiTa und 30 – 40 WE
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography
                      sx={{ fontSize: 14, fontWeight: 400 }}
                      color="primary"
                    >
                      2.500
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            sx={{ fontSize: 12, fontWeight: 400, marginBottom: "16px" }}
            color="primary"
          >
            Das Grundstück wird auf der Grundlage der von den Bewerbern
            vorzulegenden Konzeptvorschläge vergeben.
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }} color="primary">
            Das Auswahlverfahren richtet sich nach den auf der Homepage der
            Stadt Freiburg veröffentlichten Verfahrensunterlagen, insbesondere
            nach der Unterlage „Verfahren zur Auswahl der Ankerprojektträger“.
            Maßgeblich für die Auswahlentscheidung sind die dort ausgewiesenen
            Mindestanforderungen und Auswahlkriterien.
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
            Nachfolgend können Sie die folgenden Dokumente herunterladen:
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 4 }} dense={true}>
            <ListItem sx={{ display: "list-item" }} dense={true}>
              <Link sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
                Verfahren zur Auswahl der Ankerprojektträger
              </Link>
            </ListItem>
            <ListItem sx={{ display: "list-item" }} dense={true}>
              <Link sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
                Expose für Baublock 19
              </Link>
            </ListItem>
            <ListItem sx={{ display: "list-item" }} dense={true}>
              <Link sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
                Unterlagen zur Bewerbung für das Hochbauprojekt
              </Link>
            </ListItem>
            <ListItem sx={{ display: "list-item" }} dense={true}>
              <Link sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
                Unterlagen zur Bewerbung für Querschnittsaufgaben
              </Link>
            </ListItem>
          </List>
          <Typography sx={{ fontSize: 12, fontWeight: 400 }} color="primary">
            Für Ihre Bewerbung registrieren Sie sich bitte auf der{" "}
            <Link>
              Vermarktungsplattform Dietenbach der Stadt Freiburg /
              Bewerberzugang{" "}
            </Link>{" "}
            und füllen den Fragebogen aus. Anschließend können Sie Ihre
            Bewerbungsunterlagen hochladen. Alle Personen und Unternehmen, die
            sich für die Durchführung des Ankerprojekts im Baublock 19 / auf
            Grundstück 19.1 bewerben wollen, werden hiermit gebeten, die in
            deutscher Sprache abzufassende Erstbewerbung abzugeben.
          </Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }} color="primary">
            Bewerbungsfrist ist der 01.03.
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 400,
              display: "block",
              marginBotton: "30px",
            }}
            color="primary"
          >
            Erstbewerbungen, die nach Ablauf der Bewerbungsfrist eingehen,
            werden im weiteren Verfahren nicht berücksichtigt.
          </Typography>
          <Typography
            sx={{ fontSize: 12, fontWeight: 400, display: "block" }}
            color="primary"
          >
            Die Auswahlentscheidung soll ab 01.04. erfolgen.
          </Typography>
          <Typography
            sx={{ fontSize: 12, fontWeight: 400, display: "block" }}
            color="primary"
          >
            Der Gemeinderat der Stadt Freiburg trifft die Auswahlentscheidung
          </Typography>
          <Typography
            sx={{ fontSize: 12, fontWeight: 400, display: "block" }}
            color="primary"
          >
            Die Veräußerung der Grundstücke erfolgt jeweils nach Vorlage der
            erteilten Baugenehmigung.
          </Typography>
          <Typography
            sx={{ fontSize: 12, fontWeight: 400, display: "block" }}
            color="primary"
          >
            Die Gemeinde wird darauf achten, dass die Bewerbungsinhalte samt
            allen Zusagen im Rahmen des rechtlich Möglichen durch geeignete
            Regelungen gesichert werden (Reservierungsvereinbarung).
          </Typography>
        </Stack>
      </Card>
      <ApplicationFileCard
        description="Steckbrief herunterladen"
        btnTitle="Anzeigen"
      />
      <ApplicationFileCard
        description="Expose herunterladen"
        btnTitle="Anzeigen"
      />
    </Box>
  );
};

export default PlotDetailsExample;
