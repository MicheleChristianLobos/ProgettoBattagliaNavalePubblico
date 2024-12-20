/* Server
Michele Christian Lobos x Nicola Schianchi - 5^C Inf Progetto TDP "Battaglia Navale"*/
const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const ERR404 = `<!doctype html>
<html lang="it">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Errore 404</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
  <body>
    <h1 class="h1 text-danger">Errore 404: file o directory non trovata.</h1>
  </body>
</html>`;

const ERR500 = `<!doctype html>
<html lang="it">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Errore 500</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
  <body>
    <h1 class="h1 text-danger">Errore 500: errore interno del server.</h1>
  </body>
</html>`;

function requestHandler(req, res) {
  let filePath = "";
  let mimeType = "";

  switch (req.url) {
    case "/":
      filePath = "./index.html";
      mimeType = "text/html";
      break;
    case "/css":
      filePath = "./css/style.css";
      mimeType = "text/css";
      break;
    case "/gioco":
      filePath = "./html/gioco.html";
      mimeType = "text/html";
      break;
    case "/stanze":
      filePath = "./html/stanze.html";
      mimeType = "text/html";
      break;
    case "/casella_vuota":
      filePath = "./assets/img/casella_vuota.png";
      mimeType = "image/png";
      break;
    case "/incrociatore":
      filePath = "./assets/img/incrociatore.png";
      mimeType = "image/png";
      break;
    case "/portaerei":
      filePath = "./assets/img/portaerei.png";
      mimeType = "image/png";
      break;
    case "/sommergibile":
      filePath = "./assets/img/sommergibile.png";
      mimeType = "image/png";
      break;
    case "/torpediniere":
      filePath = "./assets/img/torpediniere.png";
      mimeType = "image/png";
      break;
    default:
      filePath = "";
      mimeType = "text/html";
      break;
  }

  if (filePath != "") {
    const stream = fs.createReadStream(filePath);
    const ext = path.extname(filePath);
    // Per file binari (tipo le immagini)
    if (ext.match(/\.png$/)) {
      stream.pipe(res);
    } else {
      // Per file di testo (tipo le pagine HTML)
      stream.on("data", function (chunk) {
        res.write(chunk.toString("utf-8"));
      });
      stream.on("error", function (err) {
        console.error(err);
        if (err.code === "ENOENT") {
          // MimeType: text/html
          res.writeHead(404, { 'Content-Type': mimeType });
          res.end(ERR404);
        } else {
          res.writeHead(500, { 'Content-Type': mimeType });
          res.end(ERR500);
        }
      });
      stream.on("end", function () {
        res.end();
      });
    }
  }
}

const server = http.createServer(requestHandler);
server.listen(port, hostname, function () {
  console.log(`Server in ascolto su: ${hostname}:${port}`);
});