import Grid from "./Grid";

let GameOfLifeGrid = new Grid("canvas",10,10,10);
GameOfLifeGrid.drawBoard();
GameOfLifeGrid.run(true);
