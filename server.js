/* Server
Michele Christian Lobos x Nicola Schianchi - 5^C Inf Progetto TDP "Battaglia Navale"*/
const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

let numGiocatori = 0
let giocatori = [];

const ERR404 = `<!doctype html>
<html lang="it" data-bs-theme="dark">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Errore 404</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
  <body>
    <center>
      <h1 class="h1 text-danger">Errore 404: file o directory non trovata.</h1>
    </center>
  </body>
</html>`;

const ERR500 = `<!doctype html>
<html lang="it" data-bs-theme="dark">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Errore 500</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  </head>
  <body>
    <center>
      <h1 class="h1 text-danger">Errore 500: errore interno del server.</h1>
    </center>
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
    case "/x_animejs_css":
      filePath = "./css/xAnime.css";
      mimeType = "text/css";
      break;
    case "/animejs_min":
      filePath = "./animeJS/anime.min.js";
      mimeType = "text/javascript";
      break;
    case "/x_animejs":
      filePath = "./js/xAnime.js";
      mimeType = "text/javascript";
      break;
    case "/giocojs":
      filePath = "./js/gioco.js";
      mimeType = "text/javascript";
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
  } else { // Risorsa non trovata
    res.writeHead(404, { 'Content-Type': mimeType });
    res.end(ERR404);
  }
}

const server = http.createServer(requestHandler);
server.listen(port, hostname, function () {
  console.log(`Server in ascolto su: ${hostname}:${port}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://127.0.0.1:3000",
    methods: ["GET", "POST"]
  }
});

io.sockets.on('connection', function (socket) {
  socket.username = socket.id;
  console.log('cliente: connesso ' + socket.id);
  socket.emit('connesso', hostname + " " + "porta:" + " " + port);
  numGiocatori++;
  socket.broadcast.emit('stato', numGiocatori);
  socket.emit('stato', numGiocatori);
  console.log('Clienti connessi:', numGiocatori);

  socket.on("registrazione", function (data) {
      let userExists = giocatori.some(user => user.name === data);

      console.log("ciao");

      if (userExists) {
          socket.emit("errore", "Il nome utente è già in uso. Scegli un altro.");
      } else {
          giocatori.push({ name: data, id: socket.id });
          console.log("Utente aggiunto:", data);
          //socket.emit("aggiunta_completata");
      }
  });

  socket.on("aggiorna_lista", function () {
      io.emit("aggiorna_lista", giocatori);
  });

  socket.on('disconnect', function () {
    numGiocatori--;
    console.log('Clienti connessi:', numGiocatori);
    socket.broadcast.emit('stato', numGiocatori);

      giocatori = giocatori.filter(user => user.id !== socket.id);
      io.emit("aggiorna_lista", giocatori);

    console.log('utente: disconnesso ' + socket.username);
  });

});
