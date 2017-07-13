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
let GameOfLifeGrid = new Grid_1.default({
    id: "canvas",
    gridSize: 40,
    cellWidth: 50,
    cellHeight: 50,
    lightness: 50,
    randomness: 70,
    emoji: true
});
GameOfLifeGrid.run(true);
let stopButton = document.querySelector('.stopBtn');
let on = true;
stopButton.addEventListener("click", function () {
    if (on)
        GameOfLifeGrid.stop();
    else
        GameOfLifeGrid.run(true);
    on = !on;
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Grid {
    constructor(config) {
        this.repeat = (fn) => Array(this.gridSize).fill(0).map(fn);
        this.rand = () => Math.random() < this.randomness ? 0 : 1;
        this.createGrid = () => {
            this.grid = this.repeat(() => this.repeat(this.rand));
            this.tempGrid = JSON.parse(JSON.stringify(this.grid));
        };
        this.randColour = () => {
            return '#' + Math.floor(Math.random() * 16777215).toString(16);
        };
        this.randHsl = () => {
            let hue = this.hue || this.randHue;
            let saturation = this.saturation || Math.floor(Math.random() * 100);
            let lightness = this.lightness || Math.floor(Math.random() * 100);
            return "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
        };
        this.drawRect = () => {
            this.tempGrid.forEach((yCell, y) => {
                yCell.forEach((xCell, x) => {
                    let check = this.grid[y][x];
                    if (xCell != check) {
                        if (xCell) {
                            if (!this.emoji) {
                                this.context.fillStyle = this.randHsl();
                                this.context.fillRect((x * this.cellWidth), (y * this.cellHeight), this.cellWidth, this.cellHeight);
                            }
                            else {
                                this.context.drawImage(this.img, (x * this.cellWidth), (y * this.cellHeight), this.cellWidth, this.cellHeight);
                            }
                        }
                        else {
                            this.context.clearRect((x * this.cellWidth), (y * this.cellHeight), this.cellWidth, this.cellHeight);
                        }
                    }
                });
            });
            this.grid = JSON.parse(JSON.stringify(this.tempGrid));
        };
        this.drawBoard = () => {
            this.context.strokeStyle = "black";
            this.img = document.getElementById("emoji");
            this.context.font = this.cellWidth + "px";
            // Loop Through Grid
            this.drawRect();
            this.context.stroke();
        };
        this.checkCells = () => {
            this.grid.forEach((yCell, y) => {
                yCell.forEach((xCell, x) => {
                    this.checkNeighbours(x, y);
                });
            });
        };
        this.checkNeighbours = (x, y) => {
            let sum = 0;
            let yLen = this.grid.length - 1;
            let xLen = this.grid[y].length - 1;
            sum += (y > 0) ? this.grid[y - 1][x] : 0; // Check Top
            sum += (x > 0) ? this.grid[y][x - 1] : 0; // Check Left
            sum += (x < xLen) ? this.grid[y][x + 1] : 0; // Check Right
            sum += (y < yLen) ? this.grid[y + 1][x] : 0; // Check Bottom  
            sum += (y > 0 && x > 0) ? this.grid[y - 1][x - 1] : 0; // Check Top Left
            sum += (y > 0 && x < xLen) ? this.grid[y - 1][x + 1] : 0; // Check Top Right
            sum += (y < yLen && x > 0) ? this.grid[y + 1][x - 1] : 0; // Check Bottom Left
            sum += (y < yLen && x < xLen) ? this.grid[y + 1][x + 1] : 0; // Check Bottom Right
            if (this.grid[y][x] === 0) {
                if (sum == 3)
                    this.tempGrid[y][x] = 1; //if cell is dead and has 3 neighbours, switch it on
            }
            else if (this.tempGrid[y][x] === 1) {
                if (sum == 2 || sum == 3) {
                    this.tempGrid[y][x] = 1; //carry on living
                }
                else {
                    this.tempGrid[y][x] = 0; //die of lonelines
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
            if (this.random)
                this.addRandom();
            this.checkCells();
            this.drawBoard();
            this.ticker = setTimeout(this.requestFrame, 50);
        };
        this.run = (random) => {
            this.random = random || this.random;
            this.loop();
            this.canvas.addEventListener("click", this.addCell);
        };
        this.addCell = (evt) => {
            let coords = this.getMousePos(evt);
            let x = Math.ceil(coords.x / this.cellWidth) - 1;
            let y = Math.ceil(coords.y / this.cellHeight) - 1;
            console.log(x, y);
            if (this.grid[y][x])
                this.grid[y][x] = 1;
            this.checkCells();
            this.drawBoard();
        };
        this.getMousePos = (evt) => {
            let rect = this.canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        };
        this.stop = () => {
            clearTimeout(this.ticker);
            return true;
        };
        this.gridSize = config.gridSize;
        this.cellWidth = config.cellWidth;
        this.cellHeight = config.cellHeight;
        this.width = this.cellWidth * this.gridSize;
        this.height = this.cellHeight * this.gridSize;
        this.randomness = (config.randomness / 100) || 0.75;
        this.createGrid();
        this.canvas = document.getElementById(config.id);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");
        this.random = false;
        this.loopRun = 0;
        this.randHue = Math.floor(Math.random() * 360);
        this.hue = config.hue || null;
        this.saturation = config.saturation || null;
        this.lightness = config.lightness || null;
        this.emoji = config.emoji || false;
    }
}
exports.default = Grid;


/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map