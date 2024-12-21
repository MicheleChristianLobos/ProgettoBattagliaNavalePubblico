//File JS che gestisce il gioco direttamente
let listaCelle = document.getElementsByClassName("square");
console.log(listaCelle)

let tabelloneG1 = {};

// Memorizzazione tabellone Giocatore 1
for (var i = 0; i < listaCelle.length / 20; i++) {
    var riga = [];
    for (var j = i * 10; j < i * 10 + 10; j++) {
        console.log("j: " + j);
        listaCelle[j].addEventListener('click', function () {
            ctrlPos();
        });
        riga.push(listaCelle[j]);
    }
    tabelloneG1[i] = riga;
}

let tabelloneG2 = {};

// Memorizzazione tabellone Giocatore 2
for (var i = listaCelle.length / 20; i < listaCelle.length; i++) {
    var riga = [];
    for (var j = (i - 100) * 10; j < (i - 100) * 10 + 10; j++) {
        console.log("j: " + j);
        listaCelle[j].addEventListener('click', function () {
            ctrlPos();
        });
        riga.push(listaCelle[j]);
    }
    tabelloneG2[i] = riga;
}

console.log(tabelloneG1);

function ctrlPos() {
    
}

function getPosition(id) {
    let coordsFromId = id.replace("c", "").replace(/\-g\d$/, "").split("-");
    let position = [];
    coordsFromId.forEach(coord => {
        position.push(parseInt(coord));
    });
    return position;
}