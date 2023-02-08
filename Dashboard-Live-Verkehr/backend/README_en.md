## Freiburg Traffic Dashboard - Backend

### How it works.

1. A Python script named "traffic_script.py" runs a traffic scraping procedure from Telraam and INRIX sources. It outputs a file called "traffic_results.json.
2. This script is triggered by a node.js server named "server.js" running it each minute.
3. A Mapserver reads in the results file and produces an OGC-complient WFS-Stream for the frontend to read.

### How to install:

1. Install Mapserver Instance

- if you want to run locally on a windows machine, please install map server for windows: https://www.ms4w.com/
- for running locally, CORS policy needs to be set in the apache instance of the mapserver

#### The Apache server part of the MapServer must contain the following configuration in the httpd.conf file

```c
<IfModule mod_headers.c>
Header set Access-Control-Allow-Origin "\*"

 </IfModule>
```

- use mapserver/wfs_json.map as Mapfile for the mapserver

2. In the mapfile mapserver/wfs_json.map set the link for the WFS-resource

```
"wfs_onlineresource" "MAPSERV_INSTANCE?map=PATHTO/wfs_json.map&" ## SET THIS TO THE CONFIGURATION OF YOUR SYSTEM
```

e.g.

```
"wfs_onlineresource" "localhost/cgi-bin/mapserv.exe?map=foo/bar/wfs_json.map&" ## SET THIS TO THE CONFIGURATION OF YOUR SYSTEM
```

2. Access the mapserver like this

   - http://MAPSERV_INSTANCE?map=PATHTO/wfs_json.map
   - eg. http://localhost/cgi-bin/mapserv.exe?map=FOO/BAR/wfs_json.map

3. Insert that link into the frontend at

   - frontend/src/utils/common-links.js

under:

```
// @constants
const MAPSERVER = ""
```

4. **Set User and PW for INRIX in python_script/traffic-script.py**
   under ##Constants to be set by user
   #INRIX
5. **Set Telraam API key in python_script/traffic-script.py**
   under ##Constants to be set by user
   #Telraam

6. Install requirements for the traffic scraping python script like this: pip install -r python_script/requirements.txt

- Go to python_script/ and test running it via
  ```
  python3 traffic-script.py
  ```

7. Install Node.js v16.13.1 and run the repeated data scraping cron job like this in the node/ folder

```
npm install
node server.js
```

- A data update will be performed each minute by triggering the python script

## License

The backend is licensed under the terms of the
[Mozilla Public License (MPL) version 2.0](LICENSE.md).

MapServer is licensed under the terms of the
[OGC License](LICENSE_mapserver.md).
