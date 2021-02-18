/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/draw.ts":
/*!*********************!*\
  !*** ./src/draw.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Itokake = void 0;\nvar static_1 = __webpack_require__(/*! ./static */ \"./src/static.ts\");\nvar Itokake = /** @class */ (function () {\n    function Itokake() {\n    }\n    Itokake.prototype.deg2rad = function (degree) {\n        var radian = degree * (Math.PI / 180);\n        return radian;\n    };\n    Itokake.prototype.initPin = function (shape, pinCount) {\n        var Shape = static_1.StaticValue.Shape;\n        var defaultPin = [];\n        if (shape <= Shape.Circle || shape == Shape.Custom) {\n            var pin = [];\n            for (var i = 0; i < pinCount; i++) {\n                var degree = 360 / pinCount;\n                var x = 250 + 250 * Math.cos(this.deg2rad(degree) * i);\n                var y = 250 + 250 * Math.sin(this.deg2rad(degree) * i);\n                pin.push([x, y]);\n            }\n            return pin;\n        }\n        else if (shape == Shape.Square) {\n            var pin = [];\n            for (var i = 0; i < 16; i++) {\n                pin.push([10 + 30 * i, 10]);\n            }\n            for (var i = 0; i < 16; i++) {\n                pin.push([490, 10 + 30 * i]);\n            }\n            for (var i = 0; i < 16; i++) {\n                pin.push([490 - 30 * i, 490]);\n            }\n            for (var i = 0; i < 16; i++) {\n                pin.push([10, 490 - 30 * i]);\n            }\n            return pin;\n        }\n        else if (shape == Shape.Pentagon) {\n            var pin = new Array(80);\n            for (var i = 0; i < 5; i++) {\n                var degree = 72 * i - 18;\n                pin[i * 16] = [250 + 250 * Math.cos(this.deg2rad(degree)), 270 + 250 * Math.sin(this.deg2rad(degree))];\n            }\n            for (var i = 0; i < 80; i++) {\n                if (!pin[i]) {\n                    if (i < 64) {\n                        var x = ((16 - i % 16) * pin[Math.floor(i / 16) * 16][0] + i % 16 * pin[(Math.floor(i / 16) + 1) * 16][0]) / 16;\n                        var y = ((16 - i % 16) * pin[Math.floor(i / 16) * 16][1] + i % 16 * pin[(Math.floor(i / 16) + 1) * 16][1]) / 16;\n                        pin[i] = [x, y];\n                    }\n                    else {\n                        var x = ((16 - i % 16) * pin[Math.floor(i / 16) * 16][0] + i % 16 * pin[0][0]) / 16;\n                        var y = ((16 - i % 16) * pin[Math.floor(i / 16) * 16][1] + i % 16 * pin[0][1]) / 16;\n                        pin[i] = [x, y];\n                    }\n                }\n            }\n            return pin;\n        }\n        else if (shape == Shape.Hexagon) {\n            var pin = new Array(72);\n            for (var i = 0; i < 6; i++) {\n                var degree = 60 * i;\n                pin[i * 12] = [250 + 250 * Math.cos(this.deg2rad(degree)), 270 + 250 * Math.sin(this.deg2rad(degree))];\n            }\n            for (var i = 0; i < 72; i++) {\n                if (!pin[i]) {\n                    if (i < 60) {\n                        var x = ((12 - i % 12) * pin[Math.floor(i / 12) * 12][0] + i % 12 * pin[(Math.floor(i / 12) + 1) * 12][0]) / 12;\n                        var y = ((12 - i % 12) * pin[Math.floor(i / 12) * 12][1] + i % 12 * pin[(Math.floor(i / 12) + 1) * 12][1]) / 12;\n                        pin[i] = [x, y];\n                    }\n                    else {\n                        var x = ((12 - i % 12) * pin[Math.floor(i / 12) * 12][0] + i % 12 * pin[0][0]) / 12;\n                        var y = ((12 - i % 12) * pin[Math.floor(i / 12) * 12][1] + i % 12 * pin[0][1]) / 12;\n                        pin[i] = [x, y];\n                    }\n                }\n            }\n            return pin;\n        }\n        // else if(shape == Shape.Bud){\n        //     let pin:number[][] = new Array(84);\n        // }else if(shape == Shape.HempLeaf){\n        // }else if(shape == Shape.Hexagram){\n        //     const vertex:number[][][] = [\n        //         [[250, 0], [180, 125], [320, 125]],\n        //         [[40, 125], [180, 125], [110, 250]],\n        //         [[180, 125], [250, 250], [110, 250]],\n        //         [[320, 125], [250, 250], [180, 125]],\n        //         [[320, 125], [250, 250], [390, 250]],\n        //         [[460, 125], [320, 125], [390, 250]],\n        //         [[40, 375], [110, 250], [180, 375]],\n        //         [[110, 250], [250, 250], [180, 375]],\n        //         [[180, 375], [250, 250], [320, 375]],\n        //         [[390, 250], [250, 250], [320, 375]],\n        //         [[460, 375], [390, 250], [320, 375]],\n        //         [[250, 500], [320, 375], [180, 375]]\n        //     ];\n        // }\n        return defaultPin;\n    };\n    Itokake.prototype.init = function (canvas, width) {\n        if (!canvas.getContext) {\n            console.log(\"error\");\n            return;\n        }\n        this.width = width;\n        this.canvas = canvas;\n        this.ctx = canvas.getContext(\"2d\");\n    };\n    Itokake.prototype.drawPin = function (shape, pinCount) {\n        this.pin = this.initPin(shape, pinCount);\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        this.ctx.beginPath();\n        this.ctx.fillStyle = 'black';\n        for (var _i = 0, _a = this.pin; _i < _a.length; _i++) {\n            var i = _a[_i];\n            this.ctx.rect(i[0], i[1], 2, 2);\n            this.ctx.fill();\n        }\n        this.ctx.closePath();\n    };\n    Itokake.prototype.drawLine = function (shape, pinCount, interval, colorSet, bgColor) {\n        this.ctx.fillStyle = bgColor;\n        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n        for (var i = 0; i < interval.length; i++) {\n            this.ctx.strokeStyle = colorSet[i];\n            for (var j = 0; j < this.pin.length; j++) {\n                var d = interval[i];\n                this.ctx.beginPath();\n                this.ctx.moveTo(this.pin[j][0], this.pin[j][1]);\n                this.ctx.lineTo(this.pin[(j + d) % this.pin.length][0], this.pin[(j + d) % this.pin.length][1]);\n                this.ctx.stroke();\n                this.ctx.closePath();\n            }\n        }\n    };\n    return Itokake;\n}());\nexports.Itokake = Itokake;\n\n\n//# sourceURL=webpack://Color-Sim/./src/draw.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar draw_1 = __webpack_require__(/*! ./draw */ \"./src/draw.ts\");\nvar static_1 = __webpack_require__(/*! ./static */ \"./src/static.ts\");\nvar shapeElement = document.getElementById(\"shape\");\nvar pinCountElement = document.getElementById(\"pinCount\");\nvar intervalElements = document.querySelectorAll(\".interval\");\nvar colorElements = document.querySelectorAll(\".color\");\nvar bgColorElement = document.getElementById(\"bg-color\");\nvar pinCount = 48;\nvar draw;\nvar shapeNumber = 0;\nvar bgColor = \"#000000\";\nvar interval;\nvar colorSet = Array(12).fill(\"#ffffff\");\ndocument.addEventListener('DOMContentLoaded', function () {\n    var canvas = document.getElementById('canvas');\n    canvas.width = 500;\n    draw = new draw_1.Itokake();\n    draw.init(canvas, 500);\n    interval = static_1.StaticValue.defaultInterval[0];\n    drawAll();\n});\nfunction setColSize(shape) {\n    var x = static_1.StaticValue.colorNum[shape];\n    for (var i = 1; i <= 12; i++) {\n        if (i > x) {\n            var colorPicker = document.getElementById(\"color\" + String(i)).parentNode;\n            colorPicker.style.display = \"none\";\n        }\n        else {\n            var colorPicker = document.getElementById(\"color\" + String(i)).parentNode;\n            colorPicker.style.display = \"flex\";\n        }\n    }\n    if (shape == 11) {\n        document.getElementById(\"custompin\").style.display = \"block\";\n    }\n    else {\n        document.getElementById(\"custompin\").style.display = \"none\";\n    }\n}\nfunction drawAll() {\n    draw.drawPin(shapeNumber, pinCount);\n    draw.drawLine(shapeNumber, pinCount, interval, colorSet, bgColor);\n    setColSize(shapeNumber);\n}\n// 形状変更\nshapeElement.addEventListener(\"change\", function (event) {\n    shapeNumber = Number(shapeElement.value);\n    pinCount = static_1.StaticValue.defaultPin[shapeNumber];\n    if (shapeNumber == static_1.StaticValue.Shape.Custom) {\n        pinCountElement.value = String(static_1.StaticValue.defaultPin[shapeNumber]);\n        static_1.StaticValue.defaultInterval[shapeNumber].forEach(function (interval, i) {\n            var intervalElement = intervalElements[i];\n            intervalElement.value = String(interval);\n        });\n    }\n    interval = static_1.StaticValue.defaultInterval[shapeNumber];\n    drawAll();\n});\n// ピン数変更(カスタム円のみ)\npinCountElement.addEventListener(\"change\", function (event) {\n    pinCount = Number(pinCountElement.value);\n});\n// 糸の間隔(カスタム円のみ)\nintervalElements.forEach(function (intervalElement, i) {\n    intervalElement.addEventListener(\"change\", function (event) {\n        var intervalInput = intervalElement;\n        interval[i] = Number(intervalInput.value);\n        drawAll();\n    });\n});\ncolorElements.forEach(function (colorElement, i) {\n    var colorInputElements = colorElement;\n    colorInputElements.addEventListener(\"change\", function (event) {\n        colorSet[i] = colorInputElements.value;\n        drawAll();\n    });\n});\nbgColorElement.addEventListener(\"change\", function (event) {\n    bgColor = bgColorElement.value;\n    drawAll();\n});\n\n\n//# sourceURL=webpack://Color-Sim/./src/main.ts?");

/***/ }),

/***/ "./src/static.ts":
/*!***********************!*\
  !*** ./src/static.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.StaticValue = void 0;\nvar StaticValue;\n(function (StaticValue) {\n    StaticValue.defaultPin = Array(12);\n    StaticValue.defaultPin[0] = 48;\n    StaticValue.defaultPin[1] = 64;\n    StaticValue.defaultPin[2] = 77;\n    StaticValue.defaultPin[3] = 88;\n    StaticValue.defaultPin[4] = 108;\n    StaticValue.defaultPin[11] = 48;\n    StaticValue.defaultInterval = Array(12);\n    StaticValue.defaultInterval[0] = [23, 19, 17, 13, 11, 7];\n    StaticValue.defaultInterval[1] = [31, 29, 23, 19, 17, 13, 11, 7], // 円 64\n        StaticValue.defaultInterval[2] = [37, 31, 29, 23, 19, 17], // 円 77\n        StaticValue.defaultInterval[3] = [43, 41, 37, 31, 29, 23], // 円 88\n        StaticValue.defaultInterval[4] = [53, 47, 43, 41, 37, 31, 29, 23, 19, 17, 13, 11], // 円 108\n        StaticValue.defaultInterval[5] = [31, 29, 23, 19, 17, 13], // 正方形\n        StaticValue.defaultInterval[6] = [37, 31, 29, 23, 19, 17], // 正五角形\n        StaticValue.defaultInterval[7] = [31, 29, 23, 19, 17, 13], // 正六角形\n        StaticValue.defaultInterval[11] = [31, 29, 23, 19, 17, 13]; // カスタム円\n    StaticValue.colorNum = [6, 8, 6, 6, 12, 6, 6, 6, 3, 4, 8, 6];\n    var Shape;\n    (function (Shape) {\n        Shape.Circle = 4;\n        Shape.Square = 5;\n        Shape.Pentagon = 6;\n        Shape.Hexagon = 7;\n        Shape.Bud = 8;\n        Shape.HempLeaf = 9;\n        Shape.Hexagram = 10;\n        Shape.Custom = 11;\n    })(Shape = StaticValue.Shape || (StaticValue.Shape = {}));\n})(StaticValue = exports.StaticValue || (exports.StaticValue = {}));\n\n\n//# sourceURL=webpack://Color-Sim/./src/static.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/main.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;