# Willkommen beim DATEN:RAUM:FREIBURG Traffic Dashboard

Das Dashboard besteht aus einem Frontend, das den Live-Verkehr aus verschiedenen Quellen, wie Telraam und INRIX, aktuell auf einer Karte anzeigt und detaillierte Werte in einem Dashboard darstellt,
sowie die aktuellen Ereignisse dieses Verkehrs in einer Ereignisliste anzeigt.

Sie rufen zunächst die Karte auf. Auf dieser Karte sehen Sie minutengenaue Aktualisierungen des Verkehrs. INRIX-Segmente werden als dünne Linien angezeigt, während Telraam-Verkehrsmessungen als dicke Linien dargestellt werden.

![Map](img/map.PNG?raw=true "Map")

Für Telraam und INRIX werden die Messzeiten im Dashboard angezeigt, um die Vergleichbarkeit der Werte aufzuzeigen. Telraam-Werte werden stündlich aggregiert, während INRIX-Werte minütlich gemessen werden.

Wenn Sie auf ein Straßensegment klicken, wird ein Popup mit den aktuellen Segmentstatistiken angezeigt.

![Popup](img/popup.PNG?raw=true "Popup")

Wenn Sie auf "Im Dashboard Zeigen" klicken, gelangen Sie zum Verkehrs-Dashboard, das dann einen ausgewählten Satz aktueller Live-Werte von diesem Straßenabschnitt anzeigt.

![Dashboard](img/dash.PNG?raw=true "Dashboard")

Wenn Sie auf "Verkehrsereignisse" klicken, sehen Sie einen konfigurierbaren Satz von wichtigen Verkehrsereignissen, derzeit sind dies Segmente, die von Telraam und INRIX-Werten zum Vergleich abgedeckt werden.

![Events](img/events.PNG?raw=true "Events")

## Lizenz

Das Backend ist lizenziert unter den Bedingungen der
[Mozilla Public License (MPL) version 2.0](backend/LICENSE.md).

MapServer ist lizenziert unter den Bedingungen der
[OGC License](backend/LICENSE_mapserver.md).

Das Frontend ist lizenziert unter den Bedingungen der
[Mozilla Public License (MPL) version 2.0](frontend/LICENSE.md) bis auf folgende Pakete.

Das Paket react-material-dashboard ist lizenziert unter
[MIT-License](frontend/LICENSE_react-material-dashboard.md).

Das Paket react-leaflet ist lizenziert unter
[Hippocratic License Version Number: 2.1.](frontend/LICENSE_react-leaflet.md)

## Dislaimer

Bei diesem Code-Repository handelt es sich um einen Bare-Bones-Prototyp. Die implementierten Muster und Methoden entsprechen nicht den empfohlenen Best Practices für eine produktionsreife Anwendung. Sie dienen lediglich der Demonstration, wie sich eine Anwendung für den prototypischen Anwendungsfall verhalten könnte. Bitte berücksichtigen Sie diesen Faktor, wenn Sie die Sicherheit, Wartbarkeit und Skalierbarkeit der Anwendung prüfen.
