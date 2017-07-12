import Grid from "./Grid";

let GameOfLifeGrid = new Grid("canvas",30,5,5);
GameOfLifeGrid.drawBoard();
GameOfLifeGrid.run(true);
