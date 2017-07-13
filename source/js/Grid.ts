"use strict";

// RULES
// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

interface Config {
  gridSize: number;
  cellWidth: number;
  cellHeight: number;
  id: string;
  hue?: number;
  saturation?: number;
  lightness?: number;
}

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
  loopRun: number;
  randHue: number;
  ticker: number;

  hue?: number;
  saturation?: number;
  lightness?: number;

  canvas: any;
  context: any;


  constructor(config: Config) {
    this.gridSize = config.gridSize;
    this.cellWidth = config.cellWidth;
    this.cellHeight = config.cellHeight;

    this.width = this.cellWidth*this.gridSize;
    this.height = this.cellHeight*this.gridSize;

    this.createGrid();


    this.canvas = document.getElementById(config.id);
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.context = this.canvas.getContext("2d");
    this.random = false;
    this.loopRun = 0;
    this.randHue = Math.floor(Math.random()*360);

    this.hue = config.hue || null;
    this.saturation = config.saturation || null;
    this.lightness = config.lightness || null;
  }
  private repeat = (fn: any) => Array(this.gridSize).fill(0).map(fn);

  private rand = () => Math.random() < 0.75 ? 0 : 1;

  public createGrid = () => {
    this.grid = this.repeat(() => this.repeat(this.rand));
    this.tempGrid = JSON.parse(JSON.stringify(this.grid));
  }
  private randColour = () => { 
    return '#'+Math.floor(Math.random()*16777215).toString(16);  
  }
  private randHsl = () => {
    let hue = this.hue || this.randHue;
    let saturation = this.saturation || Math.floor(Math.random()*100);
    let lightness = this.lightness || Math.floor(Math.random()*100); 
    return "hsl("+hue+", "+saturation+"%, "+lightness+"%)";
  }
  private drawRect = () => {
    this.tempGrid.forEach((yCell: any, y: number) => {

      yCell.forEach((xCell: number, x: number) => {

          let check = this.grid[y][x];
          if(xCell != check){ 
            if(xCell){
              this.context.fillStyle = this.randHsl();
              this.context.fillRect((x*this.cellWidth),(y*this.cellHeight),this.cellWidth,this.cellHeight);
            } else {
              this.context.clearRect((x*this.cellWidth),(y*this.cellHeight),this.cellWidth,this.cellHeight);
            }
          }

      });
    });
    this.grid = JSON.parse(JSON.stringify(this.tempGrid));
  }
  public drawBoard = () => {

    this.context.strokeStyle = "black";

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
    let yLen: number = this.grid.length-1;
    let xLen: number = this.grid[y].length-1;

    sum += (y > 0) ? this.grid[y-1][x] : 0; // Check Top
    sum += (x > 0) ? this.grid[y][x-1] : 0; // Check Left
    sum += (x < xLen) ? this.grid[y][x+1] : 0; // Check Right
    sum += (y < yLen) ? this.grid[y+1][x] : 0; // Check Bottom  
    sum += (y > 0 && x > 0) ? this.grid[y-1][x-1] : 0; // Check Top Left
    sum += (y > 0 && x < xLen) ? this.grid[y-1][x+1] : 0; // Check Top Right
    sum += (y < yLen && x > 0) ? this.grid[y+1][x-1] : 0; // Check Bottom Left
    sum += (y < yLen && x < xLen  ) ? this.grid[y+1][x+1] : 0; // Check Bottom Right

    if (this.grid[y][x] === 0) {
      if(sum == 3)
          this.tempGrid[y][x] = 1; //if cell is dead and has 3 neighbours, switch it on
    } else if (this.tempGrid[y][x] === 1) { 
      if(sum == 2 || sum == 3){
          this.tempGrid[y][x] = 1; //carry on living
      } else {
          this.tempGrid[y][x] = 0; //die of lonelines
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

    this.ticker = setTimeout(this.requestFrame,50);
  }
  public run = (random?: boolean) => {
    this.random = random || this.random
    this.loop();
    this.canvas.addEventListener("click", this.addCell);
  }
  private addCell = (evt) => {
    let coords = this.getMousePos(evt);
    let x = Math.ceil(coords.x/this.cellWidth)-1;
    let y = Math.ceil(coords.y/this.cellHeight)-1;
    console.log(x, y);
    if(this.grid[y][x])
      this.grid[y][x] = 1;

    this.checkCells();
    this.drawBoard();
  }
  private getMousePos = (evt) => {
    let rect = this.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  public stop= () => {
    clearTimeout(this.ticker);
    return true;
  }
}
