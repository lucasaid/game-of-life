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
  return Math.floor(Math.random() * 2);
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

var canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;

var context = canvas.getContext("2d");

function drawBoard() {
  context.strokeStyle = "black";
  context.fillStyle = "black";

  // Loop Through Grid
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

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map