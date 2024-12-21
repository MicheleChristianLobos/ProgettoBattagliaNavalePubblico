//File JS che gestisce il gioco direttamente
let listaCelle = document.getElementsByClassName("square");
console.log(listaCelle)

let tabelloneG1 = {};

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

console.log(tabelloneG1);

function ctrlPos() {
    
}