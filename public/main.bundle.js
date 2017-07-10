/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var repeat = function repeat(fn, n) {
  return Array(n).fill(0).map(fn);
};
var rand = function rand() {
  return Math.random() < 0.75 ? 0 : 1;
};
var createGrid = function createGrid(n) {
  return repeat(function () {
    return repeat(rand, n);
  }, n);
};

var gridSize = 10;

var grid = createGrid(gridSize);

var cellWidth = 40;
var cellHeight = 40;

var width = cellWidth * gridSize;
var height = cellHeight * gridSize;

var loops = 0;

var canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;

var context = canvas.getContext("2d");

function drawRect() {
  grid.forEach(function (yCell, y) {
    context.moveTo(0, y * cellHeight);
    context.lineTo(width, y * cellHeight);
    yCell.forEach(function (xCell, x) {
      context.moveTo(x * cellWidth, 0);
      context.lineTo(x * cellWidth, height);
      if (xCell) {
        context.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      }
    });
  });
}
function checkCells() {
  grid.forEach(function (yCell, y) {
    yCell.forEach(function (xCell, x) {
      checkNeighbours(x, y);
    });
  });
}

function checkNeighbours(x, y) {
  var left = y > 0 ? grid[y - 1][x] : 0;
  var up = x > 0 ? grid[y][x - 1] : 0;
  var down = x < grid[y].length - 1 ? grid[y][x + 1] : 0;
  var right = y < grid.length - 1 ? grid[y + 1][x] : 0;
  var upleft = y > 0 && x > 0 ? grid[y - 1][x - 1] : 0;
  var upright = y > 0 && x < grid[y].length - 1 ? grid[y - 1][x + 1] : 0;
  var downleft = y < grid.length - 1 && x > 0 ? grid[y + 1][x - 1] : 0;
  var downright = y < grid.length - 1 && x < grid[y].length - 1 ? grid[y + 1][x + 1] : 0;
  var sum = left + up + down + right + upleft + upright + downleft + downright;
  if (sum < 2 && grid[y][x]) {
    grid[y][x] = 0;
  } else if (sum >= 2 && sum <= 3 && grid[y][x]) {
    grid[y][x] = 1;
  } else if (sum > 3 && grid[y][x]) {
    grid[y][x] = 0;
  } else if (!grid[y][x] && sum == 3) {
    grid[y][x] = 1;
  }
}
function updateGrid() {
  checkCells();
}
function addRandom() {
  var x = Math.floor(Math.random() * gridSize + 1);
  var y = Math.floor(Math.random() * gridSize + 1);
  console.log(x, y);
  grid[y][x] = 1;
}

// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

function drawBoard() {

  context.clearRect(0, 0, width, height);
  context.strokeStyle = "black";
  context.fillStyle = "black";

  // Loop Through Grid
  drawRect();

  // Draw Bottom Line
  context.moveTo(0, height);
  context.lineTo(width, height);

  // Draw Right Line
  context.moveTo(width, 0);
  context.lineTo(width, height);

  // Draw all the lines
  context.stroke();
}

function loop() {
  loops++;
  console.log(loops);
  if (loops < 30) {
    setTimeout(function () {
      window.requestAnimationFrame(loop);
    }, 500);
  }

  updateGrid();
  drawBoard();
  //addRandom();
}

window.addEventListener("load", loop);

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map