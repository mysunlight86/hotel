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
/*!**************************!*\
  !*** ./src/analytics.js ***!
  \**************************/
eval("\n\nfunction createAnalytics() {\n    let counter = 0;\n    let isDestroyed = false;\n\n    const listener = () => counter++;\n\n    document.addEventListener('click', listener);\n\n    return {\n        destroy() {\n            document.removeEventListener('click', listener);\n            isDestroyed = true;\n        },\n\n        getClicks() {\n            if (isDestroyed) {\n                return 'Analytics is destroyed';\n            }\n            return counter;\n        }\n    };\n}\n\nwindow.analytics = createAnalytics();\n\n\n//# sourceURL=webpack://hotel/./src/analytics.js?");
/******/ })()
;