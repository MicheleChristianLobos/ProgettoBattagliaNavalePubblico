/* Server
Michele Christian Lobos x Nicola Schianchi - 5^C Inf Progetto Pubblico TDP "Battaglia Navale"*/
const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require("express")
const app = express();  //Per manipolare il comportamento dell'applicazione
//MiddleWare per le sessioni (MiddleWare = interfaccia tra applicazione e livelli di più sottostanti (SO, ecc.))
const sessione = require("express-session");
//Memorystore è usato per poter salvare le sessioni degli utenti (viene gestito nell' app.use() dove vengono gestite anche le sessioni)
const MemoryStore = require("memorystore")(sessione) //C'è (sessione) perché è una funzione (come se facessi db((sessione)) ma sulla dichiarazione)
//const { escape } = require('querystring');
let db = new MemoryStore({ checkPeriod: 3600000 })  //Viene resettato ogni ora (3600000 ms)

const hostname = '127.0.0.1';
const port = 3000;

let numGiocatori = 0
let giocatori = [];
let objTabelloni = {};

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
    case "/formaTitolo":
      filePath = "./assets/imgAnime/rettangoloPerTitolo.png";
      mimeType = "image/png";
      break;
    case "/formaDescrizione":
      filePath = "./assets/imgAnime/formaDescrizione.png";
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
    case "/kobaOutLineItalic":
      filePath = "./Font/koba-outlineitalic.otf";
      mimeType = "application/octet-stream";
      break;
    case "/koba":
      filePath = "./Font/koba.otf";
      mimeType = "application/octet-stream";
      break;
    case "/myImpact":
      filePath = "./Font/Impacted.ttf";
      mimeType = "application/octet-stream";
      break;
    case "/AaltoDisplayPersonalUse":
      filePath = "./Font/Aalto-Display-Personal-use.otf";
      mimeType = "application/octet-stream";
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
    if (ext.match(/(\.png)||(\.otf)$/)) {
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

//Per le sessioni -------------------------------------------------------------------------------------------------------------------------


let middleWareSession = sessione({
  resave: false,            //Permette di salvare la sessione solo quando viene modificata durante le richieste del client (con false)
  saveUninitialized: true,  //Permette di salvare la sessione quando viene aggiunta (uninitialized) (con true)
  secret: "forsestocapendocosastofacendo",
  cookie: { maxAge: 60000, secure: false },   //secure: false perchè si sta usando HTTP (true se HTTPS) e il maxAge è di 1 minuto (60000 ms)
  store: db
})

//Come si comporta l'applicazione per le sessioni
app.use(middleWareSession);

//Permetto la condivisione delle sessioni con i socket (come si vedrà di seguito di fatti si userà "socket.request.session")
io.use((socket, next) => {
  middleWareSession(socket.request, {}, next);
});


/*
app.use("/", (req, res) => {
  req.session.views++;
    console.log(req.session.views);
})*/
//-------------------------------------------------------------------------------------------------------------------------------------------

io.sockets.on('connection', function (socket) {

  const session = socket.request.session;

  /* Differenza tra socket.id e session.id:
  Il socket.id viene modificato per ogni connessione mentre il session.id è persistente
  (se chiudi il browser, vieni riconosciuto fino a un tot di tempo (maxAge del cookie))
  */
  socket.username = socket.id;
  console.log('cliente: connesso ' + socket.id);
  socket.emit('connesso', hostname + " " + "porta:" + " " + port);
  numGiocatori++;
  socket.broadcast.emit('stato', numGiocatori);
  socket.emit('stato', numGiocatori);
  console.log('Clienti connessi:', numGiocatori);
  console.log("Session-ID: " + session.id);  //Stampa il cookie di sessione con tutti i suoi parametri

  if (session) //Se la sessione non è NULL
  {
    session.views = (session.views || 0) + 1;
    session.save()

    if (session.views != 1)
      console.log("Hai visitato questo sito " + session.views + " volte");
    else
      console.log("Hai visitato questo sito " + session.views + " volta");

  }

  if (session && session.username) {
    socket.username = session.username;

    // Riassocia l'ID del socket
    giocatori = giocatori.map(user => {
      if (user.name === session.username) {
        user.id = socket.id;
      }
      return user;
    });

    console.log(`Utente riconnesso: ${session.username}`);
  }

  socket.on("registrazione", function (data) {
    // Controllare se il nome utente è già registrato
    let userExists = giocatori.some(user => user.name === data);

    if (userExists) {
      socket.emit("errore", "Il nome utente è già in uso: scegline un altro.");
    } else {
      giocatori.push({ name: data, id: socket.id });
      console.log("Utente aggiunto:", data);

      session.username = data;
      session.save();
    }
  });

  socket.on("aggiorna_lista", function () {
    io.emit("aggiorna_lista", giocatori);
  });

  socket.on("tabellone", function (data) {
    objTabelloni[session.username] = data;
    console.log("--- Tabelloni ---");
    for (var usr in objTabelloni) {
      console.log(`-- ${usr} --`);
      for (var riga in objTabelloni[usr]) {
        console.log(`${riga}: ${objTabelloni[usr][riga]}`);
      }
    }
    console.log(''); // A capo
  });

  socket.on("controlloSparo", function (posizione) {
    const usernameAvversario = "sLOBOS" // Ottieni il nome dell'avversario
    const tabelloneAvversario = objTabelloni[usernameAvversario];

    const [riga, colonna] = posizione; // Posizione cliccata

    console.log(riga + " e " + colonna);
    console.log("esito: " + objTabelloni[usernameAvversario][riga[colonna]]);
    const cella = tabelloneAvversario[riga][colonna];

    if (tabelloneAvversario[riga][colonna]) { // Supponendo che la cella contenga "nave" se c'è una nave
        socket.emit("risultatoColpo", { esito: true, posizione });
    } else {
        socket.emit("risultatoColpo", { esito: false, posizione });
    }
  });

  socket.on("risultatoColpo", function (data) {
    const { esito, posizione } = data;
    if (esito) {
        alert("Colpo a segno!");
        //aggiornaUI(posizione, true); // Funzione per aggiornare la cella come colpita
    } else {
        alert("Colpo mancato.");
        //aggiornaUI(posizione, false); // Funzione per aggiornare la cella come vuota
    }
  });



  socket.on('disconnect', function (reason) {
    /*numGiocatori--;
    console.log('Clienti connessi:', numGiocatori);
    socket.broadcast.emit('stato', numGiocatori);

    giocatori = giocatori.filter(user => user.id !== socket.id);
    io.emit("aggiorna_lista", giocatori);

    console.log('utente: disconnesso ' + socket.username + " per " + reason);*/
    const session = socket.request.session;

    if (session && session.username) {
      console.log(`Utente disconnesso, ma con sessione attiva: ${session.username}`);
      // Non rimuovere l'utente, ma aggiorna solo lo stato
      giocatori = giocatori.map(user => {
        if (user.name === session.username) {
          user.id = null; // Segna l'utente come "disconnesso" senza eliminarlo
          delete objTabelloni[session.username]; // Rimuovi il tabellone
        }
        return user;
      });
    } else {
      console.log(`Utente anonimo disconnesso.`);
    }
  });
});
