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

Object.defineProperty(exports, "__esModule", { value: true });
const Grid_1 = __webpack_require__(1);
let GameOfLifeGrid = new Grid_1.default("canvas", 10, 10, 10);
GameOfLifeGrid.drawBoard();
GameOfLifeGrid.run(true);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// RULES
// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
class Grid {
    constructor(id, gridSize, cellWidth, cellHeight) {
        this.repeat = (fn) => Array(this.gridSize).fill(0).map(fn);
        this.rand = () => Math.random() < 0.75 ? 0 : 1;
        this.createGrid = () => this.grid = this.repeat(() => this.repeat(this.rand));
        this.drawRect = () => {
            this.grid.forEach((yCell, y) => {
                this.context.moveTo(0, y * this.cellHeight);
                this.context.lineTo(this.width, y * this.cellHeight);
                yCell.forEach((xCell, x) => {
                    this.context.moveTo(x * this.cellWidth, 0);
                    this.context.lineTo(x * this.cellWidth, this.height);
                    if (xCell) {
                        this.context.fillRect((x * this.cellWidth), (y * this.cellHeight), this.cellWidth, this.cellHeight);
                    }
                });
            });
        };
        this.drawBoard = () => {
            this.context.clearRect(0, 0, this.width, this.height);
            this.context.strokeStyle = "black";
            this.context.fillStyle = "black";
            // Loop Through Grid
            this.drawRect();
            // Draw Bottom Line
            this.context.moveTo(0, this.height);
            this.context.lineTo(this.width, this.height);
            // Draw Right Line
            this.context.moveTo(this.width, 0);
            this.context.lineTo(this.width, this.height);
            // Draw all the lines
            this.context.stroke();
        };
        this.checkCells = () => {
            this.grid.forEach((yCell, y) => {
                yCell.forEach((xCell, x) => {
                    this.checkNeighbours(x, y);
                });
            });
            this.grid = this.tempGrid.slice();
        };
        this.checkNeighbours = (x, y) => {
            let sum = 0;
            sum += (y > 0) ? this.grid[y - 1][x] : 0;
            sum += (x > 0) ? this.grid[y][x - 1] : 0;
            sum += (x < this.grid[y].length - 1) ? this.grid[y][x + 1] : 0;
            sum += (y < this.grid.length - 1) ? this.grid[y + 1][x] : 0;
            sum += (y > 0 && x > 0) ? this.grid[y - 1][x - 1] : 0;
            sum += (y > 0 && x < this.grid[y].length - 1) ? this.grid[y - 1][x + 1] : 0;
            sum += (y < this.grid.length - 1 && x > 0) ? this.grid[y + 1][x - 1] : 0;
            sum += (y < this.grid.length - 1 && x < this.grid[y].length - 1) ? this.grid[y + 1][x + 1] : 0;
            if (this.grid[y][x] === 0) {
                switch (sum) {
                    case 3:
                        this.tempGrid[y][x] = 1; //if cell is dead and has 3 neighbours, switch it on
                        break;
                    default:
                        this.tempGrid[y][x] = 0; //otherwise leave it dead
                }
            }
            else if (this.tempGrid[y][x] === 1) {
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
        };
        this.addRandom = () => {
            let x = Math.floor((Math.random() * this.gridSize));
            let y = Math.floor((Math.random() * this.gridSize));
            if (this.grid[y][x])
                this.grid[y][x] = 1;
        };
        this.requestFrame = () => {
            window.requestAnimationFrame(this.loop);
        };
        this.loop = () => {
            this.drawBoard();
            this.checkCells();
            if (this.random)
                this.addRandom();
            setTimeout(this.requestFrame, 50);
        };
        this.run = (random) => {
            this.random = random || this.random;
            window.addEventListener("load", this.loop);
        };
        this.gridSize = gridSize;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.width = this.cellWidth * this.gridSize;
        this.height = this.cellHeight * this.gridSize;
        this.createGrid();
        this.tempGrid = this.grid.slice();
        this.canvas = document.getElementById(id);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        this.random = false;
    }
}
exports.default = Grid;


/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map