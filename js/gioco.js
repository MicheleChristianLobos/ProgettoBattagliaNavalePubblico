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
                    switch (width) {
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
                    alert("ok");
                    posizionaNave(numCaselle, horizontal, getPositionByID(listaCelle[j].parentElement.id));
                } else {
                    alert("no");
                }
            } else {
                return;
            }
        });
        riga.push(listaCelle[j]);
    }
    tabelloneG1[i + 1] = riga;
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
                } else {
                    alert("Non ci sono più portaerei disponibili.");
                }
                break;
            case 3:
                if (naviDisponibili.incrociatori > 0) {
                    imgBtnCella.className = "cella incrociatore";
                    imgBtnCella.src = "/incrociatore";
                    naviDisponibili.incrociatori--;
                } else {
                    alert("Non ci sono più incrociatori disponibili.");
                }
                break;
            case 2:
                if (naviDisponibili.torpedinieri > 0) {
                    imgBtnCella.className = " cella torpediniere";
                    imgBtnCella.src = "/torpediniere";
                    naviDisponibili.torpedinieri--;
                } else {
                    alert("Non ci sono più torpedinieri disponibili.");
                }
                break;
            case 1:
                if (naviDisponibili.sommergibili > 0) {
                    imgBtnCella.className = "cella sommergibile";
                    imgBtnCella.src = "/sommergibile";
                    naviDisponibili.sommergibili--;
                } else {
                    alert("Non ci sono più sommergibili disponibili.");
                }
                break;
            default:
                alert("Si è verificato un errore (numero di celle: 0).");
        }
        /* cella.firstChild.firstChild.src = "/portaerei";
        cella.setAttribute("colspan", 4); */
        /* for (let i = posIniziale[1] - 1; i < posIniziale[1] - 1 + numCaselle; i++) {
            tabelloneG1[riga][i].style.backgroundColor = "green";
        } */
    } else {
        // Colonna costante, ciclo la riga
        /* let colonna = posIniziale[1] - 1;
        for (let i = posIniziale[0]; i < posIniziale[0] + numCaselle; i++) {
            tabelloneG1[i][colonna].style.backgroundColor = "green";
        } */
        // Impostazione immagine nella cella
        btnCella.className = btnCella.className.replace("horizontal", "vertical");
        switch (numCaselle) {
            case 4:
                if (naviDisponibili.portaerei > 0) {
                    imgBtnCella.className = "cella portaerei";
                    imgBtnCella.src = "/portaerei";
                    naviDisponibili.portaerei--;
                } else {
                    alert("Non ci sono più portaerei disponibili.");
                }
                break;
            case 3:
                if (naviDisponibili.incrociatori > 0) {
                    imgBtnCella.className = "cella incrociatore";
                    imgBtnCella.src = "/incrociatore";
                    naviDisponibili.incrociatori--;
                } else {
                    alert("Non ci sono più incrociatori disponibili.");
                }
                break;
            case 2:
                if (naviDisponibili.torpedinieri > 0) {
                    imgBtnCella.className = " cella torpediniere";
                    imgBtnCella.src = "/torpediniere";
                    naviDisponibili.torpedinieri--;
                } else {
                    alert("Non ci sono più torpedinieri disponibili.");
                }
                break;
            case 1:
                if (naviDisponibili.sommergibili > 0) {
                    imgBtnCella.className = "cella sommergibile";
                    imgBtnCella.src = "/sommergibile";
                    naviDisponibili.sommergibili--;
                } else {
                    alert("Non ci sono più sommergibili disponibili.");
                }
                break;
            default:
                alert("Si è verificato un errore (numero di celle: 0).");
        }
    }
}

let tabelloneG2 = {};

// Memorizzazione tabellone Giocatore 2
for (let i = listaCelle.length / 20; i < listaCelle.length; i++) {
    let riga = [];
    for (let j = (i - 100) * 10; j < (i - 100) * 10 + 10; j++) {
        //console.log("j: " + j);
        // errore qua??
        /* listaCelle[j].addEventListener('click', function () {
            ctrlPos();
        }); */
        riga.push(listaCelle[j]);
    }
    tabelloneG2[i + 1] = riga;
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