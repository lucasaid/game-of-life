import Grid from "./Grid";

let GameOfLifeGrid = new Grid("canvas",150,3,3);
GameOfLifeGrid.drawBoard();
GameOfLifeGrid.run(true);
