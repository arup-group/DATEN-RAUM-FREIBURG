# Freiburg Vermarktungsplattform Frontend

## Haftungsausschluss

Bei diesem Code-Repository handelt es sich um einen Bare-Bones-Prototyp. Die implementierten Muster und Methoden entsprechen nicht den empfohlenen Best Practices für eine produktionsreife Anwendung. Sie dienen lediglich der Demonstration, wie sich eine Anwendung für den prototypischen Anwendungsfall verhalten könnte. Bitte berücksichtigen Sie diesen Faktor, wenn Sie die Sicherheit, Wartbarkeit und Skalierbarkeit der Anwendung prüfen.

## Übersicht

> Die Freiburg Marketing Plattform informiert über den Bewerbungs- und Vergabeprozess der Grundstücke im Baugebiet Dietenbach, visualiert die verfügbaren Grundstücke und ermöglicht das online Einreichen einer Bewerbung.

## Entwicklung

### Verwendete Technologien

- [React.js](https://reactjs.org/) - Javascript Framework
- [Material UI](https://mui.com/) - UI Bibliothek
- [Cesium](https://cesium.com/) - Open Source-Tool zur Visualisierung von 3D-Inhalten im Web
- [Webpack](https://webpack.js.org/) - bündelt aus modularem Javascript Code Packages zur Verwendung im Browser

### Features

- Informationen über ein bestimmtes Grundstück anzeigen
- Bewerberzugang erstellen
- Bewerbungsunterlagen über Plattform einreichen
- Bewerbungen einsehen und bewerten

## Anleitung

1. `npm install` ausführen
2. `npm start` ausführen

3. Example env file:

   ```
   CESIUM_BASE_URL="/cesium"
   API_URL="http://localhost:5000/api"
   FB_GEOPORTAL="https://geoportal.freiburg.de"
   ```

http://localhost:3000/ im Browser öffnen, um das Ergebnis zu sehen.

## License

Dieses Projekt ist lizenziert unter den Bedingungen der
[Mozilla Public License 2.0](./LICENSE.md). Die Projektabhängigkeiten, die in dieser Anwendung verwendet werden, sind unter ihren eigenen Bedingungen lizenziert.
