//File JS che gestisce il gioco direttamente
let listaCelle = document.getElementsByClassName("square");

let tabelloneG1 = {};

let counter = 0;

// Memorizzazione tabellone Giocatore 1
for (let i = 0; i < listaCelle.length / 20; i++) {
    let riga = [];
    counter = 0;
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
                if (controllaCelleAdiacenti(numCaselle, horizontal, getPositionByID(`c${i + 1}-${++counter}-g1`))) {
                    alert("ok");
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
            for (let j = posIniziale[0] - 1; j < posIniziale[0] - 1 + numero; j++) {
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