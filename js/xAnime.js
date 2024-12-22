//File JS che gestisce le animazioni di animeJS - Miki
var roundLogEl = document.querySelector('.round-log');

var gestoreEsplosione1 = anime.timeline({
  targets: ".esplosione-bg",
  easing: 'easeInOutQuad',
  delay: 3600,
  translateX: [1480, 1480],
  translateY: [450, 450],
  endDelay: 1000,
  scale:10
})
.add({ targets: '.esplosione-bg', background: 'rgb(199, 52, 52)',  }, 0)

var gestoreEsplosione2 = anime.timeline({
  targets: ".esplosione-bg-urto1",
  easing: 'easeInOutQuad',
  delay: 3600,
  translateX: [1480, 1480],
  translateY: [450, 450],
  endDelay: 1000,
  scale:20
})
.add({ targets: '.esplosione-bg-urto1', background: 'rgba(246, 62, 0, 0.42)'}, 0)

var gestoreEsplosione3 = anime.timeline({
  targets: ".esplosione-bg-urto2",
  easing: 'easeInOutQuad',
  delay: 3600,
  translateX: [1480, 1480],
  translateY: [450, 450],
  endDelay: 1000,
  scale:30
})
.add({ targets: '.esplosione-bg-urto2', background: 'rgba(255, 132, 0, 0.46)'}, 0)

var gestoreEsplosioneDefault = anime.timeline({
  targets: ".gestioneEsplosione",
  easing: 'easeInOutQuad',
  delay: 4600,
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
  translateX: [-100, 1480],
  translateY: 500,
  delay: 1600,
  duration: 2000
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

//Per la forma sotto la descrizione
anime
({
  targets: ".quadratoDescrizione",
  translateX: [10000, 200],
  delay: anime.stagger(0, {start: 50}),
  duration: 1000,
  easing: 'easeInOutExpo'
})

//Per l'animazione della formazione della tabella amica
anime
({
  targets: '.casellaNave',
  translateX: [-1000, 0],
  delay: anime.stagger(100, {start: 500}) // delay starts at 500ms then increase by 100ms for each elements.
});

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