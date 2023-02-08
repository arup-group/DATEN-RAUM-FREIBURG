# Freiburg Vermarktungsplattform Backend

## Haftungsausschluss

Bei diesem Code-Repository handelt es sich um einen Bare-Bones-Prototyp. Die implementierten Muster und Methoden entsprechen nicht den empfohlenen Best Practices für eine produktionsreife Anwendung. Sie dienen lediglich der Demonstration, wie sich eine Anwendung für den prototypischen Anwendungsfall verhalten könnte. Bitte berücksichtigen Sie diesen Faktor, wenn Sie die Sicherheit, Wartbarkeit und Skalierbarkeit der Anwendung prüfen.

## Übersicht

Die Freiburg Marketing Plattform informiert über den Bewerbungs- und Vergabeprozess der Grundstücke im Baugebiet Dietenbach, visualiert die verfügbaren Grundstücke und ermöglicht das online Einreichen einer Bewerbung.

## Entwicklung

### Verwendete Technologien

- [Express.js](https://expressjs.com/) - Node.js Framework

- [Docker](https://www.docker.com/get-started/) - Ein PaaS Containerisierungs-Framework

- [Node](https://nodejs.org/de/) - JavaScript Backend Laufzeitumgebung

- [Bcrypt](https://www.npmjs.com/package/bcryptjs) - Verschlüsselungsbibliothek zur Abwehr von Rainbow-Table-Angriffen

- [Multer](https://www.npmjs.com/package/multer) - Node.js Middleware zur Handhabung von Datei-Uploads

- [Node Postgres](https://www.npmjs.com/package/pg) - PostgreSQL Client für Node.js

- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken) - JSON Web Token Handler für Node.js

- [CORS](https://www.npmjs.com/package/cors) - Node.js Paket zur Bereitstellung von Connect/Express Middleware, ermöglicht Cross-Origin Resource Sharing

## Anleitung

1. `npm install` ausführen

2. `npm start` ausführen

# Build API and DB locally

1. `npm install` ausführen

Um die Datenbank in der lokalen Entwicklungsumgebung aufzusetzen:

2. `npm run setupDb` ausführen

Um die Datenbank in der lokalen Entwicklungsumgebung zu löschen:

3. `npm run teardownDb` ausführen

Um die Datenbank in der lokalen Entwicklungsumgebung mit Server im Entwicklungsmodus auszuführen:

4. `NODE_ENV=dev PORT=5000 npm run start` ausführen

Die API ist auf http://localhost:5000/ sichtbar.

## License

Dieses Projekt ist lizenziert unter den Bedingungen der
[Mozilla Public License 2.0](./LICENSE.md). Die Projektabhängigkeiten, die in dieser Anwendung verwendet werden, sind unter ihren eigenen Bedingungen lizenziert.
