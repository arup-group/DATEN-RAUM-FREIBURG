# Welcome to the DATEN:RAUM:FREIBURG Traffic Dashboard

The dashboard consists of a frontend that displays live traffic from different sources, such as Telraam and INRIX currently on a map, displaying detailed values in a dashboard,
as well as showing current events of that traffic in an events list.

You first access the map. On this map you see minute-wise updates of traffic. INRIX segments are displayed as thin lines, while Telraam traffic measurements are displayed as thick lines.

![Map](img/map.PNG?raw=true "Map")

For Telraam and INRIX, the measurement times are displayed in the dashboard to show the comparability of the values. Telraam values are aggregated hourly, while INRIX values are measured every minute.

If you click on a road segment, a popup with currrent segment stats gets displayed.

![Popup](img/popup.PNG?raw=true "Popup")

If you click on "Im Dashboard Zeigen" you will get to the traffic dashboard, that then displays a chosen set of current live values from this road segment.

![Dashboard](img/dash.PNG?raw=true "Dashboard")

If you click on "Verkehrsereignisse", you will see a configurable set of important traffic events, currently these are segments covered by Telraam and INRIX values for comparison.

![Events](img/events.PNG?raw=true "Events")

## License

The backend is licensed under the terms of the
[Mozilla Public License (MPL) version 2.0](backend/LICENSE.md).

MapServer is licensed under the terms of the
[OGC License](backend/LICENSE_mapserver.md).

The frontend is licensed under the terms of the
[Mozilla Public License (MPL) version 2.0](frontend/LICENSE.md) except for the following packages.

The react-material-dashboard package is licensed under
[MIT-License](frontend/LICENSE_react-material-dashboard.md).

The react-leaflet package is licensed under
[Hippocratic License Version Number: 2.1.](frontend/LICENSE_react-leaflet.md)

## Disclaimer

This code repository is a bare-bones prototype. The implemented patterns and methodologies do not reflect the recommended best practice for a production-ready application. It is purely to demonstrate how an application for the prototypical use case may behave. Please consider this factor when reviewing the application's security, maintainability, and scalability.
