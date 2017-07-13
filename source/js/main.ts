import Grid from "./Grid";

let GameOfLifeGrid = new Grid({
  id: "canvas",
  gridSize: 140,
  cellWidth: 10,
  cellHeight: 10,
  lightness: 50
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
