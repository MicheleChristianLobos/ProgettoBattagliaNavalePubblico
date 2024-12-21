let listaCelle = document.getElementsByClassName("square");
console.log(listaCelle)

let tabelloneG1 = {};

for (var i = 0; i < listaCelle.length / 20; i++) {
    var riga = [];
    for (var j = i*10; j < i*10+10; j++) {
        console.log("j: " + j);
        riga.push(listaCelle[j]);
    }
    tabelloneG1[i] = riga;
}
// tabelloneG1.i = listaCelle[i].parentElement.id;

console.log(tabelloneG1);

//listaCelle[0].parentElement.id

