## Freiburg Traffic Dashboard - Backend

### So funktioniert es.

1. Ein Python-Skript mit dem Namen "traffic_script.py" führt ein Verfahren zum Abrufen des Verkehrs aus Telraam- und INRIX-Quellen aus. Es gibt eine Datei namens "traffic_results.json" aus.
2. Dieses Skript wird von einem node.js-Server namens "server.js" ausgelöst, der es jede Minute ausführt.
3. Eine MapServer-Instanz liest die Ergebnisdatei ein und erzeugt einen OGC-kompatiblen WFS-Stream, den das Frontend lesen kann.

### Zum Installieren:

1. Installieren Sie eine Instanz des MapServer

- Wenn Sie lokal auf einem Windows-Rechner arbeiten möchten, installieren Sie bitte den Mapserver für Windows: https://www.ms4w.com/
- für den lokalen Betrieb muss die CORS-Policy in der Apache-Instanz des Mapserver gesetzt werden

#### Der Apache-Server-Teil des MapServer muss in der Datei httpd.conf folgende Konfiguration enthalten

```c
<IfModule mod_headers.c>
Header set Access-Control-Allow-Origin "\*"

 </IfModule>
```

- mapserver/wfs_json.map als Mapfile (Konfigurationsdatei) für den Mapserver verwenden

2. Setzen Sie im mapfile mapserver/wfs_json.map den Link für die WFS-Ressource

```
"wfs_onlineresource" "MAPSERV_INSTANCE?map=PATHTO/wfs_json.map&" ## SET THIS TO THE CONFIGURATION OF YOUR SYSTEM
```

z.B.

```
"wfs_onlineresource" "localhost/cgi-bin/mapserv.exe?map=foo/bar/wfs_json.map&" ## SET THIS TO THE CONFIGURATION OF YOUR SYSTEM
```

2. Greifen Sie so auf den MapServer zu:

   - http://MAPSERV_INSTANCE?map=PATHTO/wfs_json.map
   - eg. http://localhost/cgi-bin/mapserv.exe?map=FOO/BAR/wfs_json.map

3. Fügen Sie diesen Link in das Frontend ein in der Datei

   - frontend/src/utils/common-links.js

unter

```
// @constants
const MAPSERVER = ""
```

ein.

4. **User und PW für INRIX in python_script/traffic-script.py**
   unter ##Constants to be set by user
   #INRIX
5. **Telraam API key in python_script/traffic-script.py**
   unter ##Constants to be set by user
   #Telraam

6. Installieren Sie die Anforderungen für das Python-Skript zur Verkehrsüberwachung wie folgt: pip install -r python_script/requirements.txt

- Gehen Sie zu python_script/ und testen Sie die Ausführung über
  ```
  python3 traffic-script.py
  ```

7. Installieren Sie Node.js v16.13.1 und führen Sie den wiederholten Data Scraping Cron Job wie folgt im Ordner node/ aus

```
npm install
node server.js
```

- Eine Datenaktualisierung wird jede Minute durchgeführt, indem das Python-Skript ausgelöst wird

## Lizenz

Das Backend ist lizenziert unter den Bedingungen der
[Mozilla Public License (MPL) version 2.0](LICENSE.md).

MapServer ist lizenziert unter den Bedingungen der
[OGC License](LICENSE_mapserver.md).
