## Freiburg Traffic Dashboard Frontend

### Zum Installieren des Frontends:

1. Installieren Sie node package manager (npm)
2. Führen Sie

```
npm install
```

aus.

3. Fügen Sie die Links für das Backend in der Datei
   - src/utils/common-links.js

unter

```
// @constants
const MAPSERVER =
```

ein.

- Sollten Sie auf Probleme stoßen, könnte es daran liegen, dass die Links zum MapServer nicht korrekt gesetzt wurden. Bitte stellen Sie sicher, dass Sie eine laufende Instanz des MapServer haben und den richtigen Link für den MapServer eingegeben haben.

4. Ersetzen Sie TILESPROVIDER und ATTRIBUTION in src/utils/common-links.js durch den gewünschten Tiles-Dienst

5. Führen Sie

```
npm run dev
```

aus.

### Historische Werte

Das Dashboard ist in frontend\src\components\dashboard\historic-traffic-status.js und in einigen Kompontenten von /frontend/src/components/dashboard/ durch historische Werte erweiterbar, dies ist im Code auskommentiert und dokumentiert.

## Lizenz

Das Frontend ist lizenziert unter den Bedingungen der
[Mozilla Public License (MPL) version 2.0](LICENSE.md) bis auf folgende Pakete.

Das Paket react-material-dashboard ist lizenziert unter
[MIT-License](LICENSE_react-material-dashboard.md).

Das Paket react-leaflet ist lizenziert unter
[Hippocratic License Version Number: 2.1.](LICENSE_react-leaflet.md)
