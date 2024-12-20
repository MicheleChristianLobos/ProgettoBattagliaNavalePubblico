//File JS che gestisce le animazioni di animeJS - Miki
var roundLogEl = document.querySelector('.round-log');

anime 
({
    targets: ".anime",
    translateX: 250,
    easing: 'easeInOutExpo'
});

anime({
  targets: ".ore",
  innerHTML: [0, 112],
  easing: 'linear',
  round: 10 // Will round the animated value to 1 decimal
});