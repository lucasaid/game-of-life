"use strict";

// RULES
// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

import {cloneDeep} from "lodash"; 

export default class Grid {
  // Declare types
  grid: any; 
  gridSize: number;
  cellWidth: number;
  cellHeight: number;
  width: number;
  height: number;
  tempGrid: Array<Array<number>>;
  random: boolean;
  firstRun: boolean;
  loopRun: number;

  canvas: any;
  context: any;

  constructor(id: string, gridSize: number, cellWidth: number, cellHeight: number) {
    this.gridSize = gridSize;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;

    this.width = this.cellWidth*this.gridSize;
    this.height = this.cellHeight*this.gridSize;

    this.createGrid();


    this.canvas = document.getElementById(id);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.context = this.canvas.getContext("2d");
    this.random = false;
    this.firstRun = true;
    this.loopRun = 0;
  }
  private repeat = (fn: any) => Array(this.gridSize).fill(0).map(fn);

  private rand = () => Math.random() < 0.75 ? 0 : 1;

  public createGrid = () => {
    this.grid = this.repeat(() => this.repeat(this.rand));
    this.tempGrid = cloneDeep(this.grid);
  }

  private drawRect = () => {
    this.tempGrid.forEach((yCell: any, y: number) => {

      yCell.forEach((xCell: number, x: number) => {

          let check = this.grid[y][x];
          if(xCell != check || this.firstRun){ 
            if(xCell){
              this.context.fillRect((x*this.cellWidth),(y*this.cellHeight),this.cellWidth,this.cellHeight);
            } else {
              this.context.clearRect((x*this.cellWidth),(y*this.cellHeight),this.cellWidth,this.cellHeight);
            }
          }

      });
    });
    this.firstRun = false;
    this.grid = cloneDeep(this.tempGrid);
  }
  public drawBoard = () => {

    this.context.strokeStyle = "black";
    this.context.fillStyle = "black";

    // Loop Through Grid
    this.drawRect()

    this.context.stroke();
  }

  private checkCells = () => {
    this.grid.forEach((yCell: Array<Array<number>>, y: number) => {
      yCell.forEach((xCell: Array<number>, x: number) => {
        this.checkNeighbours(x, y)
      });
    });
  }

  private checkNeighbours = (x: number, y: number) => {
    let sum: number = 0;
    sum += (y > 0) ? this.grid[y-1][x] : 0;
    sum += (x > 0) ? this.grid[y][x-1] : 0;
    sum += (x < this.grid[y].length-1) ? this.grid[y][x+1] : 0;
    sum += (y < this.grid.length-1) ? this.grid[y+1][x] : 0;
    sum += (y > 0 && x > 0) ? this.grid[y-1][x-1] : 0;
    sum += (y > 0 && x < this.grid[y].length-1) ? this.grid[y-1][x+1] : 0;
    sum += (y < this.grid.length-1 && x > 0) ? this.grid[y+1][x-1] : 0;
    sum += (y < this.grid.length-1 && x < this.grid[y].length-1) ? this.grid[y+1][x+1] : 0;

    if (this.grid[y][x] === 0) {
      switch (sum) {
        case 3:
          this.tempGrid[y][x] = 1; //if cell is dead and has 3 neighbours, switch it on
          break;
        default:
          this.tempGrid[y][x] = 0; //otherwise leave it dead
      }
    } else if (this.tempGrid[y][x] === 1) { //apply rules to living cell
      switch (sum) {
        case 0:
        case 1:
          this.tempGrid[y][x] = 0; //die of lonelines
          break;
        case 2:
        case 3:
          this.tempGrid[y][x] = 1; //carry on living
          break;
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
          this.tempGrid[y][x] = 0; //die of overcrowding
          break;
        default:
          this.tempGrid[y][x] = 0; //

      }

    }
  }
  private addRandom = () => {
    let x = Math.floor((Math.random() * this.gridSize));
    let y = Math.floor((Math.random() * this.gridSize));

    if(this.grid[y][x])
      this.grid[y][x] = 1;
  }
  private requestFrame = () => {
    window.requestAnimationFrame(this.loop);
  }
  private loop = () => {
    if(this.random)
      this.addRandom();
    this.checkCells();
    this.drawBoard();
    setTimeout(this.requestFrame,50);
  }
  public run = (random?: boolean) => {
    this.random = random || this.random
    window.addEventListener("load", this.loop);
  }
}
