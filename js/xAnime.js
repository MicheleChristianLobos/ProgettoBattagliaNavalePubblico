//File JS che gestisce le animazioni di animeJS - Miki
var roundLogEl = document.querySelector('.round-log');

//Prova animazzione
anime 
({
    targets: ".anime",
    translateX: [-1000, 0],
    delay: anime.stagger(0, {start: 50}),
    duration: 2000,
    easing: 'easeInOutExpo'
});

//Ore
anime
({
  targets: ".ore",
  innerHTML: [0, 112],
  easing: 'linear',
  round: 10 // Will round the animated value to 1 decimal
});

//Per la tabella
anime
({
  targets: '.tab',
  translateX: 270,
  delay: anime.stagger(100, {start: 500}) // delay starts at 500ms then increase by 100ms for each elements.
});

//Per la forma sotto il titolo
anime
({
  targets: ".quadratoTitolo",
  translateX: [-10000, -500],
  delay: anime.stagger(0, {start: 50}),
  duration: 1000,
  easing: 'easeInOutExpo'
})