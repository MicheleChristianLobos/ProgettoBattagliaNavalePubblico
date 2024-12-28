//File JS che gestisce il gioco direttamente
let listaCelle = document.getElementsByClassName("square");

let tabelloneG1 = {};
let riga = [];
let naviDisponibili = {
    "portaerei": 1,
    "incrociatori": 2,
    "torpedinieri": 3,
    "sommergibili": 4
};

// Memorizzazione tabellone Giocatore 1
for (let i = 0; i < listaCelle.length / 20; i++) {
    riga = [];

    for (let j = i * 10; j < i * 10 + 10; j++) {
        // Ascoltatore bottoni tabellone G1
        listaCelle[j].addEventListener('click', function () {
            let numCaselle = 0;
            let visible = isVisible("riquadroGuida");
            let horizontal = isHorizontal("riquadroGuida");
            let width = document.getElementById("riquadroGuida").style.width;
            let height = document.getElementById("riquadroGuida").style.height;
            if (visible) {
                if (horizontal) {
                    switch (width || height) {
                        case "164px":
                            numCaselle = 4;
                            break;
                        case "128px":
                            numCaselle = 3;
                            break;
                        case "76px":
                            numCaselle = 2;
                            break;
                        case "32px":
                            numCaselle = 1;
                            break;
                        default:
                            numCaselle = 0;
                            break;
                    }
                } else {
                    switch (height) {
                        case "164px":
                            numCaselle = 4;
                            break;
                        case "128px":
                            numCaselle = 3;
                            break;
                        case "76px":
                            numCaselle = 2;
                            break;
                        case "32px":
                            numCaselle = 1;
                            break;
                        default:
                            numCaselle = 0;
                            break;
                    }
                }
                if (controllaCelleAdiacenti(numCaselle, horizontal, getPositionByID(listaCelle[j].parentElement.id))) {
                    if (posizionaNave(numCaselle, horizontal, getPositionByID(listaCelle[j].parentElement.id))) {
                        occupaCaselle(numCaselle, horizontal, getPositionByID(listaCelle[j].parentElement.id));
                        switch (numCaselle) {
                            case 4:
                                updateNum("numPortaerei");
                                break;
                            case 3:
                                updateNum("numIncrociatori");
                                break;
                            case 2:
                                updateNum("numTorpedinieri");
                                break;
                            case 1:
                                updateNum("numSommergibili");
                                break;
                            default:
                                break;
                        }
                    }
                } else {
                    alert("Posizione non valida.");
                }
                checkEnableConferma();
            } else {
                return;
            }
        });
        riga.push(listaCelle[j]);
    }
    tabelloneG1[i + 1] = riga;
}

let tabelloneG2 = {};

// Memorizzazione tabellone Giocatore 2
for (let i = listaCelle.length / 20; i < listaCelle.length / 10; i++) {
    let riga = [];
    for (let j = (i * 10); j < (i * 10) + 10; j++) {
        listaCelle[j].addEventListener('click', function () {
            sparaCasella(getPositionByID(listaCelle[j].parentElement.id));
        });
        riga.push(listaCelle[j]);
    }
    tabelloneG2[(i + 1) - 10] = riga;
}

function posizionaNave(numCaselle, horizontal, posIniziale) {
    // Riga costante, ciclo la colonna
    let riga = posIniziale[0];
    let colonna = posIniziale[1];
    let cella = document.getElementById(`c${riga}-${colonna}-g1`);
    let btnCella = cella.firstChild;
    let imgBtnCella = btnCella.firstChild;

    if (horizontal) {
        // Impostazione immagine nella cella
        btnCella.className = btnCella.className.replace("vertical", "horizontal");
        switch (numCaselle) {
            case 4:
                if (naviDisponibili.portaerei > 0) {
                    imgBtnCella.className = "cella portaerei";
                    imgBtnCella.src = "/portaerei";
                    naviDisponibili.portaerei--;
                    return true;
                } else {
                    alert("Non ci sono più portaerei disponibili.");
                    return false;
                }
            case 3:
                if (naviDisponibili.incrociatori > 0) {
                    imgBtnCella.className = "cella incrociatore";
                    imgBtnCella.src = "/incrociatore";
                    naviDisponibili.incrociatori--;
                    return true;
                } else {
                    alert("Non ci sono più incrociatori disponibili.");
                    return false;
                }
            case 2:
                if (naviDisponibili.torpedinieri > 0) {
                    imgBtnCella.className = " cella torpediniere";
                    imgBtnCella.src = "/torpediniere";
                    naviDisponibili.torpedinieri--;
                    return true;
                } else {
                    alert("Non ci sono più torpedinieri disponibili.");
                    return false;
                }
            case 1:
                if (naviDisponibili.sommergibili > 0) {
                    imgBtnCella.className = "cella sommergibile";
                    imgBtnCella.src = "/sommergibile";
                    naviDisponibili.sommergibili--;
                    return true;
                } else {
                    alert("Non ci sono più sommergibili disponibili.");
                    return false;
                }
            default:
                alert("Si è verificato un errore (numero di celle: 0).");
                return false;
        }
    } else {
        // Impostazione immagine nella cella
        btnCella.className = btnCella.className.replace("horizontal", "vertical");
        switch (numCaselle) {
            case 4:
                if (naviDisponibili.portaerei > 0) {
                    imgBtnCella.className = "cella portaerei";
                    imgBtnCella.src = "/portaerei";
                    naviDisponibili.portaerei--;
                    return true;
                } else {
                    alert("Non ci sono più portaerei disponibili.");
                    return false;
                }
            case 3:
                if (naviDisponibili.incrociatori > 0) {
                    imgBtnCella.className = "cella incrociatore";
                    imgBtnCella.src = "/incrociatore";
                    naviDisponibili.incrociatori--;
                    return true;
                } else {
                    alert("Non ci sono più incrociatori disponibili.");
                    return false;
                }
            case 2:
                if (naviDisponibili.torpedinieri > 0) {
                    imgBtnCella.className = " cella torpediniere";
                    imgBtnCella.src = "/torpediniere";
                    naviDisponibili.torpedinieri--;
                    return true;
                } else {
                    alert("Non ci sono più torpedinieri disponibili.");
                    return false;
                }
            case 1:
                if (naviDisponibili.sommergibili > 0) {
                    imgBtnCella.className = "cella sommergibile";
                    imgBtnCella.src = "/sommergibile";
                    naviDisponibili.sommergibili--;
                    return true;
                } else {
                    alert("Non ci sono più sommergibili disponibili.");
                    return false;
                }
            default:
                alert("Si è verificato un errore (numero di celle: 0).");
                return false;
        }
    }
}

function occupaCaselle(numCaselle, horizontal, posIniziale) {
    let tipoNave = "";
    switch (numCaselle) {
        case 4:
            tipoNave = "portaerei";
            break;
        case 3:
            tipoNave = "incrociatore";
            break;
        case 2:
            tipoNave = "torpediniere";
            break;
        case 1:
            tipoNave = "sommergibile";
            break;
        default:
            tipoNave = "";
            break;
    }

    if (tipoNave != "") {
        if (horizontal) {
            for (let c = posIniziale[1] - 1; c < posIniziale[1] - 1 + numCaselle; c++) {
                var elemento = tabelloneG1[posIniziale[0]][c];
                elemento.setAttribute("disabled", "true");
                if (c > posIniziale[1] - 1) {
                    elemento.firstChild.src = elemento.firstChild.src = `/${tipoNave}`;
                    elemento.firstChild.className += "invisibile";
                }
            }
        } else {
            for (let r = posIniziale[0]; r < posIniziale[0] + numCaselle; r++) {
                var elemento = tabelloneG1[r][posIniziale[1] - 1];
                elemento.setAttribute("disabled", "true");
                if (r > posIniziale[0]) {
                    elemento.firstChild.src = elemento.firstChild.src = `/${tipoNave}`;
                    elemento.firstChild.className += "invisibile";
                }
            }
        }
    }
}

function updateNum(id) {
    let span = document.getElementById(id);
    switch (id) {
        case "numPortaerei":
            if (naviDisponibili.portaerei == 0) {
                span.innerText = "0";
                span.className = "numSpan text-danger";
                let btn = document.getElementById("portaerei");
                disable(btn.id);
            } else {
                span.innerText = `${naviDisponibili.portaerei}`;
            }
            break;
        case "numIncrociatori":
            if (naviDisponibili.incrociatori == 0) {
                span.innerText = "0";
                span.className = "numSpan text-danger";
                let btn = document.getElementById("incrociatore");
                disable(btn.id);
            } else {
                span.innerText = `${naviDisponibili.incrociatori}`;
            }
            break;
        case "numTorpedinieri":
            if (naviDisponibili.torpedinieri == 0) {
                span.innerText = "0";
                span.className = "numSpan text-danger";
                let btn = document.getElementById("torpediniere");
                disable(btn.id);
            } else {
                span.innerText = `${naviDisponibili.torpedinieri}`;
            }
            break;
        case "numSommergibili":
            if (naviDisponibili.sommergibili == 0) {
                span.innerText = "0";
                span.className = "numSpan text-danger";
                let btn = document.getElementById("sommergibile");
                disable(btn.id);
            } else {
                span.innerText = `${naviDisponibili.sommergibili}`;
            }
            break;
        default:
            break;
    }
}

function checkEnableConferma() {
    // Controllo navi ancora disponibili per abilitare o meno il bottone di conferma del tabellone
    let abilitare = true;
    for (var tipo in naviDisponibili) {
        if (naviDisponibili[tipo] > 0) {
            abilitare = false;
            break;
        }
    }

    let btnConferma = document.getElementById("confermaTabellone");
    if (abilitare) {
        btnConferma.removeAttribute("disabled");
    } else {
        btnConferma.setAttribute("disabled", "true");
    }
}

function controllaCelleAdiacenti(numero, orizzontale, posIniziale) {
    if (orizzontale) {
        // Orizzontale
        try {
            for (let j = posIniziale[1] - 1; j < posIniziale[1] - 1 + numero; j++) {
                if (!tabelloneG1[posIniziale[0]][j].firstChild.src.endsWith("/casella_vuota")) {
                    return false;
                }
            }
            return true;
        } catch (e) {
            return false;
        }
    } else {
        // Verticale
        try {
            for (let j = posIniziale[0]; j < posIniziale[0] + numero; j++) {
                if (!tabelloneG1[j][posIniziale[1] - 1].firstChild.src.endsWith("/casella_vuota")) {
                    return false;
                }
            }
            return true;
        } catch (e) {
            return false;
        }
    }
}

function getPositionByID(id) {
    let coordsFromId = id.replace("c", "").replace(/\-g\d$/, "").split("-");
    let position = [];
    coordsFromId.forEach(coord => {
        position.push(parseInt(coord));
    });
    return position;
}

function calcolaTabelloneG1() {
    /* Costruzione oggetto JS tabellone
       Riga - colonne: es. 1 - [0, 1, 2, ..., 9]
       Come fatto fin dall'inizio */
    let tabellone = {};
    for (var riga in tabelloneG1) {
        var naviRiga = []
        tabelloneG1[riga].forEach(c => {
            // Se c'è una nave
            if (c.getAttribute("disabled") === "true") {
                naviRiga.push(true);
            } else { // Se non c'è alcuna nave
                naviRiga.push(false);
            }
        });
        tabellone[riga] = naviRiga;
    }
    return tabellone;
}

function sparaCasella(coordinate) {
    // Manda la richiesta al server, che la elaborerà
    // socket.emit("spara", coordinate);
    console.log("spara a " + coordinate);
}