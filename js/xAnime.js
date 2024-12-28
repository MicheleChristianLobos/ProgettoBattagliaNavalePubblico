//File JS che gestisce le animazioni di animeJS - Miki
var roundLogEl = document.querySelector('.round-log');
const DELAY_ESPLOSIONE = 2400;
const DURATA_ESPLOSIONE = 400;

var gestoreEsplosione1 = anime.timeline({
  targets: ".esplosione-bg",
  easing: 'easeInOutQuad',
  delay: DELAY_ESPLOSIONE,
  translateX: [1480, 1480],
  translateY: [450, 450],
  endDelay: 1000,
  duration: DURATA_ESPLOSIONE,
  scale:10
})
.add({ targets: '.esplosione-bg', background: 'rgb(199, 52, 52)',  }, 0)

var gestoreEsplosione2 = anime.timeline({
  targets: ".esplosione-bg-urto1",
  easing: 'easeInOutQuad',
  delay: DELAY_ESPLOSIONE,
  translateX: [1480, 1480],
  translateY: [450, 450],
  endDelay: 1000,
  duration: DURATA_ESPLOSIONE,
  scale:20
})
.add({ targets: '.esplosione-bg-urto1', background: 'rgba(246, 62, 0, 0.42)'}, 0)

var gestoreEsplosione3 = anime.timeline({
  targets: ".esplosione-bg-urto2",
  easing: 'easeInOutQuad',
  delay: DELAY_ESPLOSIONE,
  translateX: [1480, 1480],
  translateY: [450, 450],
  endDelay: 1000,
  duration: DURATA_ESPLOSIONE,
  scale:30
})
.add({ targets: '.esplosione-bg-urto2', background: 'rgba(255, 132, 0, 0.46)'}, 0)

//Da rivedere la funzione
var gestoreEsplosioneDefault = anime.timeline({
  targets: ".gestioneEsplosione",
  easing: 'easeInOutQuad',
  delay: 2800,
  opacity: [1, 0],
  duration: 3500
})
.add({ targets: '.gestioneEsplosione', background: 'rgba(255, 132, 0, 0)'}, 0)

//Titolo
anime 
({
    targets: ".titolo",
    translateX: [-1000, 250],
    delay: anime.stagger(0, {start: 50}),
    duration: 2000,
    easing: 'easeInOutExpo'
});

//Descrizione
anime 
({
    targets: ".descrizione",
    translateX: [1000, -250],
    delay: anime.stagger(0, {start: 50}),
    duration: 2000,
    easing: 'easeInOutExpo'
});

//Contatore
anime
({
  targets: ".ore",
  innerHTML: [0, 112],
  easing: 'linear',
  round: 10 // Will round the animated value to 1 decimal
});

//Prova
anime
({
  targets: '.tab',
  translateX: 270,
  delay: anime.stagger(100, {start: 500}) // delay starts at 500ms then increase by 100ms for each elements.
});

//Per il razzo nello sfondo
anime
({
  targets: '.razzo',
  easing: 'easeInOutQuad',
  translateX: [-100, 1600],
  translateY: 500,
  delay: 1600,
  duration: 1000
});

anime
({
  targets: '.razzo2',
  easing: 'easeInOutQuad',
  translateX: [-100, 1600],
  translateY: 550,
  delay: 2000,
  duration: 1000
});

anime
({
  targets: '.razzo3',
  easing: 'easeInOutQuad',
  translateX: [-100, 1600],
  translateY: 300,
  delay: 2100,
  duration: 1000
});

//Per la forma sotto il titolo
anime
({
  targets: ".quadratoTitolo",
  translateX: [-10000, -300],
  delay: anime.stagger(0, {start: 50}),
  duration: 1000,
  easing: 'easeInOutExpo'
})

anime({
  targets: '.vibrazione', // Selettore degli elementi
  translateX: [-16, 16],    // Movimento da sinistra a destra
  duration: 100,          // Durata di ogni oscillazione
  direction: 'alternate', // Alterna avanti e indietro
  delay: DELAY_ESPLOSIONE + 200,
  easing: 'easeInOutSine', // Easing per un effetto fluido
  loop: 2,
});

//Per la forma sotto la descrizione
anime
({
  targets: ".quadratoDescrizione",
  translateX: [10000, 300],
  delay: anime.stagger(0, {start: 50}),
  duration: 1000,
  easing: 'easeInOutExpo'
})

// Genera casualmente i frammenti e li fa esplodere
anime({
  targets: '.pezzo',
  translateX: function () {
    return anime.random(-200, -1200); //Movimento casuale orizzontale
  },
  translateY: function () {
    return anime.random(-20, -500); //Movimento casuale verticale
  },
  scale: function () {
    return anime.random(0.5, 5); //Dimensioni casuali
  },
  rotate: function () {
    return anime.random(0, 360); //Rotazione casuale
  },
  duration: 1000,
  easing: 'easeOutExpo',
  delay: DELAY_ESPLOSIONE + 200,
});


//Per l'animazione della formazione della tabella amica
anime
({
  targets: '.casellaNave',
  translateX: [-1000, 0],
  delay: anime.stagger(100) // delay starts at 500ms then increase by 100ms for each elements.
});


function childHandler(e)
{
  TweenMax.to("#divAmico", 1, {rotation:"+=360", clearProps: 'all'});
  
}


//Per l'animazione della formazione della tabella nemica
anime
({
  targets: '.casellaNaveNemica',
  translateX: [-1500, 0],
  delay: anime.stagger(100, {start: 500}) // delay starts at 500ms then increase by 100ms for each elements.
});

//Per l'animazione della formazione del campo di battaglia
anime
({
  targets: ".campoDiBattaglia",
  opacity: [0, 1],
  duration: 1000,
  delay: anime.stagger(100, {start: 500})
})

anime
({
  targets: ".selezioneNavi",
  delay: 1500,
  opacity: [0, 1],
  duration: 10000,
})