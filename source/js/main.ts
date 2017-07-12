import Grid from "./Grid";

let GameOfLifeGrid = new Grid("canvas",10,20,20);
GameOfLifeGrid.drawBoard();
GameOfLifeGrid.run(true);
