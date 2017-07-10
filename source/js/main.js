const repeat = (fn, n) => Array(n).fill(0).map(fn);
const rand = () => Math.random() < 0.75 ? 0 : 1; 
const createGrid = n => repeat(() => repeat(rand, n), n);

const gridSize = 20;

let grid = createGrid(gridSize);
// grid = [[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,0,0,0]]
let tempGrid = grid.slice();
const cellWidth = 5;
const cellHeight = 5;

const width = cellWidth*gridSize;
const height = cellHeight*gridSize;

let loops = 0;

let canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;

var context = canvas.getContext("2d");

function drawRect(){
    grid.forEach((yCell, y) => {
      context.moveTo(0, y*cellHeight);
      context.lineTo(width, y*cellHeight);
      yCell.forEach((xCell, x) => {
        context.moveTo(x*cellWidth, 0);
        context.lineTo(x*cellWidth, height);
        if(xCell){
          context.fillRect((x*cellWidth),(y*cellHeight),cellWidth,cellHeight);
        }
      });
    });
}
function checkCells(){
    grid.forEach((yCell, y) => {
      yCell.forEach((xCell, x) => {
        checkNeighbours(x, y)
      });
    });
    grid = tempGrid.slice();
}

function checkNeighbours(x, y) {
  let left = (y > 0) ? grid[y-1][x] : 0;
  let up = (x > 0) ? grid[y][x-1] : 0;
  let down = (x < grid[y].length-1) ? grid[y][x+1] : 0;
  let right = (y < grid.length-1) ? grid[y+1][x] : 0;
  let upleft = (y > 0 && x > 0) ? grid[y-1][x-1] : 0;
  let upright = (y > 0 && x < grid[y].length-1) ? grid[y-1][x+1] : 0;
  let downleft = (y < grid.length-1 && x > 0) ? grid[y+1][x-1] : 0;
  let downright = (y < grid.length-1 && x < grid[y].length-1) ? grid[y+1][x+1] : 0;
  let sum = left+up+down+right+upleft+upright+downleft+downright; 
  if(sum < 2 && grid[y][x]){
    tempGrid[y][x] = 0;
  } else if(sum >= 2 && sum <= 3 && grid[y][x]){
    tempGrid[y][x] = 1; 
  } else if(sum > 3 && grid[y][x]) {
    tempGrid[y][x] = 0; 
  } else if(!grid[y][x] && sum == 3) {
    tempGrid[y][x] = 1;
  }
}
function updateGrid() {
   checkCells(); 
}
function addRandom() {
  let x = Math.floor((Math.random() * gridSize) + 1);
  let y = Math.floor((Math.random() * gridSize) + 1);
  console.log(x, y);
  grid[y][x] = 1;
}

// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function drawBoard(){

    context.clearRect(0, 0, width, height);
    context.strokeStyle = "black";
    context.fillStyle = "black";

    // Loop Through Grid
    drawRect()

    // Draw Bottom Line
    context.moveTo(0, height);
    context.lineTo(width, height);

    // Draw Right Line
    context.moveTo(width, 0);
    context.lineTo(width, height);

    // Draw all the lines
    context.stroke();
}

function loop () {
  loops++;
  setTimeout(function(){
    window.requestAnimationFrame(loop);
  }, 50);
  
  drawBoard();
  updateGrid();
  addRandom();
}

window.addEventListener("load", loop);
