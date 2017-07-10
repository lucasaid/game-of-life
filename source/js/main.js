const repeat = (fn, n) => Array(n).fill(0).map(fn);
const rand = () => Math.floor((Math.random() * 2));
const createGrid = n => repeat(() => repeat(rand, n), n);

const gridSize = 10;

const grid = createGrid(gridSize);

const cellWidth = 40;
const cellHeight = 40;

const width = cellWidth*gridSize;
const height = cellHeight*gridSize;

let canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;

var context = canvas.getContext("2d");

function drawBoard(){
    context.strokeStyle = "black";
    context.fillStyle = "black";

    // Loop Through Grid
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

    // Draw Bottom Line
    context.moveTo(0, height);
    context.lineTo(width, height);

    // Draw Right Line
    context.moveTo(width, 0);
    context.lineTo(width, height);

    // Draw all the lines
    context.stroke();
}

drawBoard();
