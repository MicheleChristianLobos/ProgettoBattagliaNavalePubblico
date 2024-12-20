/* Server
Michele Christian Lobos x Nicola Schianchi - 5^C Inf Progetto TDP "Battaglia Navale"*/
const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const err404 = `<!doctype html>
<html lang="it">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
  <body>
    <h1 class="h1 text-danger">Errore 404: file o directory non trovata.</h1>
  </body>
</html>`;

const err500 = `<!doctype html>
<html lang="it">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
  <body>
    <h1 class="h1 text-danger">Errore 500: errore interno del server.</h1>
  </body>
</html>`;

function requestHandler(req, res) {
  let path = '';
  let mimeType = '';

  switch (req.url) {
      case '/':
          path = './index.html';
          mimeType = 'text/html';
          break;
      case '/css':
          path = './css/style.css';
          mimeType = 'text/css';
      default:
          break;
  }

  if (path != '') {
      const stream = fs.createReadStream(path, 'utf-8');
      stream.on("data", function (chunk) {
          res.writeHead(200, { 'Content-Type': mimeType });
          if (path === "/") {
            res.write(chunk, "utf-8");
          } else {
            stream.pipe(res);
          }
      });
      stream.on("error", function (err) {
          if (err.code === 'ENOENT') {
              res.writeHead(404, { 'Content-Type': 'text/html' });
              res.end(err404);
          } else {
              res.writeHead(500, { 'Content-Type': 'text/html' });
              res.end(err500);
          }
      });
      stream.on("end", function() {
          res.end();
      });
  } 
}

const server = http.createServer(requestHandler);
server.listen(port, hostname, function () {
  console.log(`Server in ascolto su: ${hostname}:${port}`);
});