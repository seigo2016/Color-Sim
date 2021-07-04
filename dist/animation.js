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

/***/ "./src/animation.ts":
/*!**************************!*\
  !*** ./src/animation.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Animation = void 0;\nvar init_1 = __webpack_require__(/*! ./init */ \"./src/init.ts\");\nvar static_1 = __webpack_require__(/*! ./static */ \"./src/static.ts\");\nvar animationStartElement = document.getElementById('animation-start');\nvar animationResetElement = document.getElementById('animation-reset');\nvar pinCountElement = document.getElementById('pinCount');\nvar intervalElements = document.querySelectorAll('.interval');\nvar colorElements = document.querySelectorAll('.color');\nvar bgColorElement = document.getElementById('bg-color');\ndocument.addEventListener('DOMContentLoaded', function () {\n    var pinCount = 48;\n    var bgColor = '#000000';\n    var interval = static_1.StaticValue.defaultInterval[11];\n    var colorSet = Array(6).fill('#ffffff');\n    var canvas = document.getElementById('canvas');\n    canvas.width = 500;\n    var animation = new Animation();\n    var isStopped = true;\n    var isPause = false;\n    pinCountElement.addEventListener('change', function () {\n        pinCount = Number(pinCountElement.value);\n        if (isNaN(pinCount) || pinCount > 300 || pinCount < 1) {\n            pinCount = 10;\n            var pinMessage = document.getElementById('input-pin-message');\n            pinMessage.textContent = 'エラー:ピン数には1-300までの数字を入力してください';\n        }\n        else {\n            var pinMessage = document.getElementById('input-pin-message');\n            pinMessage.textContent = '';\n        }\n    });\n    intervalElements.forEach(function (intervalElement, i) {\n        intervalElement.addEventListener('change', function () {\n            var intervalInput = intervalElement;\n            interval[i] = Number(intervalInput.value);\n        });\n    });\n    colorElements.forEach(function (colorElement, i) {\n        var colorInputElements = colorElement;\n        colorInputElements.addEventListener('change', function () {\n            colorSet[i] = colorInputElements.value;\n        });\n    });\n    bgColorElement.addEventListener('change', function () {\n        bgColor = bgColorElement.value;\n    });\n    if (animationStartElement != null) {\n        animation.init(canvas);\n        animationStartElement.addEventListener('click', function () {\n            if (isStopped) {\n                animation.drawPin(11, pinCount);\n                animation.render(interval, colorSet, bgColor);\n                isStopped = false;\n                animationStartElement.value = 'Pause';\n            }\n            else if (!isPause) {\n                animation.pause();\n                isPause = true;\n                animationStartElement.value = 'Start';\n            }\n            else if (isPause) {\n                animation.restart();\n                isPause = false;\n                animationStartElement.value = 'Pause';\n            }\n        });\n        animationResetElement.addEventListener('click', function () {\n            if (!isStopped) {\n                animation.reset();\n                isPause = false;\n                isStopped = true;\n            }\n        });\n    }\n});\nvar Animation = /** @class */ (function () {\n    function Animation() {\n        this.sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };\n    }\n    Animation.prototype.init = function (canvas) {\n        if (!canvas.getContext) {\n            console.log('error');\n            return;\n        }\n        this.canvas = canvas;\n        this.ctx = canvas.getContext('2d');\n        this.isPause = false;\n        this.isReseted = false;\n        this.ctx.fillStyle = '#000000';\n        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n    };\n    Animation.prototype.drawPin = function (shape, pinCount) {\n        this.pin = init_1.InitPin(shape, pinCount);\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        this.ctx.beginPath();\n        this.ctx.fillStyle = 'white';\n        for (var _i = 0, _a = this.pin; _i < _a.length; _i++) {\n            var i = _a[_i];\n            this.ctx.rect(i[0], i[1], 2, 2);\n            this.ctx.fill();\n        }\n        this.ctx.closePath();\n    };\n    Animation.prototype.render = function (interval, colorSet, bgColor) {\n        return __awaiter(this, void 0, void 0, function () {\n            var i, n, j, d;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        this.ctx.fillStyle = bgColor;\n                        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n                        colorSet = colorSet.slice(0, 6).reverse();\n                        i = 0;\n                        _a.label = 1;\n                    case 1:\n                        if (!(i < interval.length)) return [3 /*break*/, 9];\n                        this.ctx.strokeStyle = colorSet[i];\n                        n = 0;\n                        j = 0;\n                        _a.label = 2;\n                    case 2:\n                        if (!(j < this.pin.length)) return [3 /*break*/, 8];\n                        d = interval[i];\n                        this.ctx.beginPath();\n                        this.ctx.moveTo(this.pin[n][0], this.pin[n][1]);\n                        this.ctx.lineTo(this.pin[(n + d) % this.pin.length][0], this.pin[(n + d) % this.pin.length][1]);\n                        this.ctx.stroke();\n                        this.ctx.closePath();\n                        n = (n + d) % this.pin.length;\n                        _a.label = 3;\n                    case 3:\n                        if (!this.isPause) return [3 /*break*/, 5];\n                        if (this.isReseted) {\n                            return [3 /*break*/, 9];\n                        }\n                        return [4 /*yield*/, this.sleep(500)];\n                    case 4:\n                        _a.sent();\n                        return [3 /*break*/, 3];\n                    case 5:\n                        if (this.isReseted) {\n                            return [3 /*break*/, 9];\n                        }\n                        return [4 /*yield*/, this.sleep(300)];\n                    case 6:\n                        _a.sent();\n                        _a.label = 7;\n                    case 7:\n                        j++;\n                        return [3 /*break*/, 2];\n                    case 8:\n                        i++;\n                        return [3 /*break*/, 1];\n                    case 9:\n                        this.init(this.canvas);\n                        this.isPause = false;\n                        this.isReseted = false;\n                        return [2 /*return*/];\n                }\n            });\n        });\n    };\n    Animation.prototype.pause = function () {\n        this.isPause = true;\n    };\n    Animation.prototype.restart = function () {\n        this.isPause = false;\n    };\n    Animation.prototype.reset = function () {\n        this.isReseted = true;\n    };\n    return Animation;\n}());\nexports.Animation = Animation;\n\n\n//# sourceURL=webpack://Color-Sim/./src/animation.ts?");

/***/ }),

/***/ "./src/init.ts":
/*!*********************!*\
  !*** ./src/init.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.InitPin = void 0;\nvar static_1 = __webpack_require__(/*! ./static */ \"./src/static.ts\");\nfunction deg2rad(degree) {\n    var radian = degree * (Math.PI / 180);\n    return radian;\n}\nfunction InitPin(shape, pinCount) {\n    var Shape = static_1.StaticValue.Shape;\n    var defaultPin = [];\n    if (shape <= Shape.Circle || shape == Shape.Custom) {\n        var pin = [];\n        for (var i = 0; i < pinCount; i++) {\n            var degree = 360 / pinCount;\n            var x = 250 + 250 * Math.cos(deg2rad(degree) * i);\n            var y = 250 + 250 * Math.sin(deg2rad(degree) * i);\n            pin.push([x, y]);\n        }\n        return pin;\n    }\n    else if (shape == Shape.Square) {\n        var pin = [];\n        for (var i = 0; i < 16; i++) {\n            pin.push([10 + 30 * i, 10]);\n        }\n        for (var i = 0; i < 16; i++) {\n            pin.push([490, 10 + 30 * i]);\n        }\n        for (var i = 0; i < 16; i++) {\n            pin.push([490 - 30 * i, 490]);\n        }\n        for (var i = 0; i < 16; i++) {\n            pin.push([10, 490 - 30 * i]);\n        }\n        return pin;\n    }\n    else if (shape == Shape.Pentagon) {\n        var pin = new Array(80);\n        for (var i = 0; i < 5; i++) {\n            var degree = 72 * i - 18;\n            pin[i * 16] = [250 + 250 * Math.cos(deg2rad(degree)), 270 + 250 * Math.sin(deg2rad(degree))];\n        }\n        for (var i = 0; i < 80; i++) {\n            if (!pin[i]) {\n                if (i < 64) {\n                    var x = ((16 - (i % 16)) * pin[Math.floor(i / 16) * 16][0] +\n                        (i % 16) * pin[(Math.floor(i / 16) + 1) * 16][0]) /\n                        16;\n                    var y = ((16 - (i % 16)) * pin[Math.floor(i / 16) * 16][1] +\n                        (i % 16) * pin[(Math.floor(i / 16) + 1) * 16][1]) /\n                        16;\n                    pin[i] = [x, y];\n                }\n                else {\n                    var x = ((16 - (i % 16)) * pin[Math.floor(i / 16) * 16][0] + (i % 16) * pin[0][0]) / 16;\n                    var y = ((16 - (i % 16)) * pin[Math.floor(i / 16) * 16][1] + (i % 16) * pin[0][1]) / 16;\n                    pin[i] = [x, y];\n                }\n            }\n        }\n        return pin;\n    }\n    else if (shape == Shape.Hexagon) {\n        var pin = new Array(72);\n        for (var i = 0; i < 6; i++) {\n            var degree = 60 * i;\n            pin[i * 12] = [250 + 250 * Math.cos(deg2rad(degree)), 270 + 250 * Math.sin(deg2rad(degree))];\n        }\n        for (var i = 0; i < 72; i++) {\n            if (!pin[i]) {\n                if (i < 60) {\n                    var x = ((12 - (i % 12)) * pin[Math.floor(i / 12) * 12][0] +\n                        (i % 12) * pin[(Math.floor(i / 12) + 1) * 12][0]) /\n                        12;\n                    var y = ((12 - (i % 12)) * pin[Math.floor(i / 12) * 12][1] +\n                        (i % 12) * pin[(Math.floor(i / 12) + 1) * 12][1]) /\n                        12;\n                    pin[i] = [x, y];\n                }\n                else {\n                    var x = ((12 - (i % 12)) * pin[Math.floor(i / 12) * 12][0] + (i % 12) * pin[0][0]) / 12;\n                    var y = ((12 - (i % 12)) * pin[Math.floor(i / 12) * 12][1] + (i % 12) * pin[0][1]) / 12;\n                    pin[i] = [x, y];\n                }\n            }\n        }\n        return pin;\n    }\n    else if (shape == Shape.Bud) {\n        var pin = new Array(81 * 6);\n        for (var i = 0; i < 6 * 81; i++) {\n            pin[i] = [0, 0];\n        }\n        for (var i = 0; i < 6; i++) {\n            pin[i * 81] = [250 + 250 * Math.cos(deg2rad(60 * i)), 250 + 250 * Math.sin(deg2rad(60 * i))];\n            pin[i * 81 + 27] = [250 + 250 * Math.cos(deg2rad(60 * i + 60)), 250 + 250 * Math.sin(deg2rad(60 * i + 60))];\n            pin[i * 81 + 54] = [250, 250];\n            for (var j = 0; j < 81; j++) {\n                if (j == 27 || j == 54 || j == 0) {\n                    continue;\n                }\n                var x = 0, y = 0;\n                if (j < 27) {\n                    x = ((27 - j) * pin[i * 81][0] + j * pin[i * 81 + 27][0]) / 27;\n                    y = ((27 - j) * pin[i * 81][1] + j * pin[i * 81 + 27][1]) / 27;\n                }\n                else if (j < 54) {\n                    x = ((54 - j) * pin[i * 81 + 27][0] + (j - 27) * pin[i * 81 + 54][0]) / 27;\n                    y = ((54 - j) * pin[i * 81 + 27][1] + (j - 27) * pin[i * 81 + 54][1]) / 27;\n                }\n                else if (j < 81) {\n                    x = ((81 - j) * pin[i * 81 + 54][0] + (j - 54) * pin[i * 81][0]) / 27;\n                    y = ((81 - j) * pin[i * 81 + 54][1] + (j - 54) * pin[i * 81][1]) / 27;\n                }\n                pin[i * 81 + j] = [x, y];\n            }\n        }\n        return pin;\n    }\n    else if (shape == Shape.Hexagram) {\n        var pin = new Array(16 * 3 * 12);\n        var vertex = [\n            [\n                [250, 0],\n                [180, 125],\n                [320, 125],\n            ],\n            [\n                [40, 125],\n                [180, 125],\n                [110, 250],\n            ],\n            [\n                [180, 125],\n                [250, 250],\n                [110, 250],\n            ],\n            [\n                [320, 125],\n                [250, 250],\n                [180, 125],\n            ],\n            [\n                [320, 125],\n                [250, 250],\n                [390, 250],\n            ],\n            [\n                [460, 125],\n                [320, 125],\n                [390, 250],\n            ],\n            [\n                [40, 375],\n                [110, 250],\n                [180, 375],\n            ],\n            [\n                [110, 250],\n                [250, 250],\n                [180, 375],\n            ],\n            [\n                [180, 375],\n                [250, 250],\n                [320, 375],\n            ],\n            [\n                [390, 250],\n                [250, 250],\n                [320, 375],\n            ],\n            [\n                [460, 375],\n                [390, 250],\n                [320, 375],\n            ],\n            [\n                [250, 500],\n                [320, 375],\n                [180, 375],\n            ],\n        ];\n        for (var i = 0; i < 12; i++) {\n            for (var j = 0; j < 3; j++) {\n                for (var k = 0; k < 16; k++) {\n                    var x = 0, y = 0;\n                    x = (k * vertex[i][j][0] + (16 - k) * vertex[i][(j + 1) % 3][0]) / 16;\n                    y = (k * vertex[i][j][1] + (16 - k) * vertex[i][(j + 1) % 3][1]) / 16;\n                    pin[48 * i + j * 16 + k] = [x, y];\n                }\n            }\n        }\n        return pin;\n    }\n    else if (shape == Shape.HempLeaf) {\n        var pin = new Array(16 * 4 * 6);\n        var vertex = new Array(6);\n        for (var i = 0; i < 6; i++) {\n            vertex[i] = new Array(4);\n            vertex[i][0] = [250 + 250 * Math.cos(deg2rad(60 * i + 30)), 250 + 250 * Math.sin(deg2rad(60 * i + 30))];\n            vertex[i][1] = [250 + 144 * Math.cos(deg2rad(60 * i)), 250 + 144 * Math.sin(deg2rad(60 * i))];\n            vertex[i][2] = [250, 250];\n            vertex[i][3] = [250 + 144 * Math.cos(deg2rad(60 * i + 60)), 250 + 144 * Math.sin(deg2rad(60 * i + 60))];\n        }\n        for (var i = 0; i < 6; i++) {\n            for (var j = 0; j < 4; j++) {\n                for (var k = 0; k < 16; k++) {\n                    var x = 0, y = 0;\n                    x = (k * vertex[i][j][0] + (16 - k) * vertex[i][(j + 1) % 4][0]) / 16;\n                    y = (k * vertex[i][j][1] + (16 - k) * vertex[i][(j + 1) % 4][1]) / 16;\n                    pin[64 * i + j * 16 + k] = [x, y];\n                }\n            }\n        }\n        return pin;\n    }\n    return defaultPin;\n}\nexports.InitPin = InitPin;\n\n\n//# sourceURL=webpack://Color-Sim/./src/init.ts?");

/***/ }),

/***/ "./src/static.ts":
/*!***********************!*\
  !*** ./src/static.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.StaticValue = void 0;\nvar StaticValue;\n(function (StaticValue) {\n    StaticValue.defaultPin = Array(12);\n    StaticValue.defaultPin[0] = 48;\n    StaticValue.defaultPin[1] = 64;\n    StaticValue.defaultPin[2] = 77;\n    StaticValue.defaultPin[3] = 88;\n    StaticValue.defaultPin[4] = 108;\n    StaticValue.defaultPin[11] = 48;\n    StaticValue.defaultInterval = Array(12);\n    StaticValue.defaultInterval[0] = [23, 19, 17, 13, 11, 7];\n    (StaticValue.defaultInterval[1] = [31, 29, 23, 19, 17, 13, 11, 7]), // 円 64\n        (StaticValue.defaultInterval[2] = [37, 31, 29, 23, 19, 17]), // 円 77\n        (StaticValue.defaultInterval[3] = [43, 41, 37, 31, 29, 23]), // 円 88\n        (StaticValue.defaultInterval[4] = [53, 47, 43, 41, 37, 31, 29, 23, 19, 17, 13, 11]), // 円 108\n        (StaticValue.defaultInterval[5] = [31, 29, 23, 19, 17, 13]), // 正方形\n        (StaticValue.defaultInterval[6] = [37, 31, 29, 23, 19, 17]), // 正五角形\n        (StaticValue.defaultInterval[7] = [31, 29, 23, 19, 17, 13]), // 正六角形\n        (StaticValue.defaultInterval[8] = [28, 28, 28]), // つぼみ\n        (StaticValue.defaultInterval[9] = [16, 16, 16, 16]), // 麻の葉\n        (StaticValue.defaultInterval[10] = [16, 16, 16]), // 六芒星\n        (StaticValue.defaultInterval[11] = [31, 29, 23, 19, 17, 13]); // カスタム円\n    StaticValue.colorNum = [6, 8, 6, 6, 12, 6, 6, 6, 3, 2, 3, 6];\n    var Shape;\n    (function (Shape) {\n        Shape.Circle = 4;\n        Shape.Square = 5;\n        Shape.Pentagon = 6;\n        Shape.Hexagon = 7;\n        Shape.Bud = 8;\n        Shape.HempLeaf = 9;\n        Shape.Hexagram = 10;\n        Shape.Custom = 11;\n    })(Shape = StaticValue.Shape || (StaticValue.Shape = {}));\n})(StaticValue = exports.StaticValue || (exports.StaticValue = {}));\n\n\n//# sourceURL=webpack://Color-Sim/./src/static.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/animation.ts");
/******/ 	
/******/ })()
;