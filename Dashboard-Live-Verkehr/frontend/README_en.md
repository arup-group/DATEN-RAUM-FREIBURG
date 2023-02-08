## Freiburg Traffic Dashboard

### How to install:

1. Install node package manager (npm)
2. Run

```
npm install
```

3. Insert link for backend into
   - src/utils/common-links.js

under:

```
// @constants
const MAPSERVER =
```

- In case you run into any issues the reason might be that the links to the mapserver have not been set correctly. Please make sure you have a running instance of the mapserver and entered the correct link for the mapserver.

4. Replace TILESPROVIDER and ATTRIBUTION in src/utils/common-links.js with the desired tiles-service

5. Execute

```
npm run dev
```

### Historical values

The dashboard is extensible by historical values in frontend\src\components\dashboard\historic-traffic-status.js and in some components of /frontend/src/components/dashboard/, this is commented out and documented in the code.

## License

The frontend is licensed under the terms of the
[Mozilla Public License (MPL) version 2.0](LICENSE.md) except for the following packages.

The react-material-dashboard package is licensed under
[MIT-License](LICENSE_react-material-dashboard.md).

The react-leaflet package is licensed under
[Hippocratic License Version Number: 2.1.](LICENSE_react-leaflet.md)
