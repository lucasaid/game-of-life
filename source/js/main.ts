import Grid from "./Grid";

let GameOfLifeGrid = new Grid({
  id: "canvas",
  gridSize: 40,
  cellWidth: 50,
  cellHeight: 50,
  lightness: 50,
  randomness: 70, 
  emoji: true
});
GameOfLifeGrid.run(true);
let stopButton = document.querySelector('.stopBtn');
let on = true;
stopButton.addEventListener("click",function(){
  if(on)
    GameOfLifeGrid.stop();
  else
    GameOfLifeGrid.run(true);

  on = !on;
})
