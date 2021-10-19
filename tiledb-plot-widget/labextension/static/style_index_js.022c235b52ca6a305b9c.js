(self["webpackChunk_tiledb_inc_tiledb_plot_widget"] = self["webpackChunk_tiledb_inc_tiledb_plot_widget"] || []).push([["style_index_js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./style/base.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style/base.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _icons_zoomin_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../icons/zoomin.svg */ "./icons/zoomin.svg");
/* harmony import */ var _icons_zoomin_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_icons_zoomin_svg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _icons_zoomout_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../icons/zoomout.svg */ "./icons/zoomout.svg");
/* harmony import */ var _icons_zoomout_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_icons_zoomout_svg__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _icons_zoomreset_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../icons/zoomreset.svg */ "./icons/zoomreset.svg");
/* harmony import */ var _icons_zoomreset_svg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_icons_zoomreset_svg__WEBPACK_IMPORTED_MODULE_5__);
// Imports






var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()((_icons_zoomin_svg__WEBPACK_IMPORTED_MODULE_3___default()));
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()((_icons_zoomout_svg__WEBPACK_IMPORTED_MODULE_4___default()));
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()((_icons_zoomreset_svg__WEBPACK_IMPORTED_MODULE_5___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".tiledb-widget {\n    --prussian: #001759;\n    --navy: #001e73;\n    --azure: #0075ff;\n    --azure--darken: #0463d4;\n    --sky: #c8e0ff;\n    --dark: #3c3c3c;\n    --mediumDark: #838383;\n    --lightGray: #ececec;\n    --lightGray--darken: #d9d9da;\n    --gray: #d8d8d8;\n    --background: #fafafa;\n    --white: #fff;\n    --danger: #ff0062;\n    --danger--darken: #bd024a;\n    --warning: #ffa200;\n    --warning--darken: #e49100;\n    --ebony: #0f1426;\n    --ebonyLight: #121930;\n    --midnight: #151e38;\n    --midnight--darken: #11192f;\n    --midnightLight: #1a2342;\n    --rhino: #252e4b;\n    --fiord: #444c64;\n    --kashmir: #446690;\n    --success: #0075ff;\n  \n    --jp-image-zoomin: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    --jp-image-zoomout: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    --jp-image-zoomreset: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  \n    height: 440px;\n    padding: 20px 0;\n    position: relative;\n    width: 100%;\n  }\n  \n  .tiledb-widget svg {\n    height: 100%;\n    transform-origin: top left;\n  }\n  \n  svg{\n    width:100%;\n  }\n  \n  .tiledb-widget rect {\n    fill: var(--mediumDark);\n    width: 60px;\n    height: 30px;\n  }\n  \n  .tiledb-widget path {\n    fill: none;\n    stroke:#999;\n  }\n  \n  .tiledb-widget text {\n    fill: #fff;\n    pointer-events: none;\n  }\n  \n  .tiledb-widget .Not.Started {\n    fill: var(--kashmir);\n  }\n  \n  .tiledb-widget .Running {\n    animation: dash 15s linear;\n    animation-iteration-count: infinite;\n    fill: #66cc99;\n    stroke: #4e9c75;\n    stroke-dasharray: 10;\n    stroke-width: 3px;\n  }\n  \n  .tiledb-widget .Running.node--small {\n    stroke-width: 1px;\n  }\n  \n  .tiledb-widget .path-Running {\n    animation: dash-full 1s linear;\n    animation-iteration-count: infinite;\n    stroke-dasharray: 10;\n    stroke-dashoffset: 100;\n  }\n  \n  .tiledb-widget .Completed {\n    fill: var(--success);\n  }\n  \n  .tiledb-widget .Failed {\n    fill: var(--danger);\n  }\n  \n  .tiledb-widget .Cancelled {\n    fill: var(--warning);\n  }\n  \n  .tiledb-widget .tooltip {\t\n    background: var(--lightGray);\n    box-shadow: 0 0 5px rgba(0, 0, 0, .25);\n    color: var(--dark);\n    position: fixed;\n    text-align: center;\n    font: 12px sans-serif;\n    border: 0px;\n    border-radius: 8px;\n    pointer-events: none;\n    padding: 5px;\n    width: 65px;\n  }\n  \n  .tiledb-widget .zoomControl, .resetControl {\n    left: 0;\n    position: absolute;\n    top: 0;\n    z-index: 1;\n    background-color: var(--kashmir);\n    background-image: var(--jp-image-zoomin);\n    border: 0;\n    border-radius: 4px;\n    width: 20px;\n    height: 20px;\n    background-repeat: no-repeat;\n    background-position: center;\n    box-shadow: 0 0 3px rgba(0,0,0,.6);\n    background-size: 15px;\n  }\n  \n  .tiledb-widget .depth-0 {\n    opacity: 0;\n  }\n  \n  .resetControl {\n    left: 80px;\n    background-image: var(--jp-image-zoomreset);\n    background-size: 14px;\n  }\n  \n  #zoom_out {\n    left: 40px;\n    background-image: var(--jp-image-zoomout);\n    background-size: 14px;\n  }\n  \n  @keyframes dash {\n    to {\n      stroke-dashoffset: 1000;\n    }\n  }\n  \n  @keyframes dash-full {\n    to {\n      stroke-dashoffset: 0;\n    }\n  }\n  ", "",{"version":3,"sources":["webpack://./style/base.css"],"names":[],"mappings":"AAAA;IACI,mBAAmB;IACnB,eAAe;IACf,gBAAgB;IAChB,wBAAwB;IACxB,cAAc;IACd,eAAe;IACf,qBAAqB;IACrB,oBAAoB;IACpB,4BAA4B;IAC5B,eAAe;IACf,qBAAqB;IACrB,aAAa;IACb,iBAAiB;IACjB,yBAAyB;IACzB,kBAAkB;IAClB,0BAA0B;IAC1B,gBAAgB;IAChB,qBAAqB;IACrB,mBAAmB;IACnB,2BAA2B;IAC3B,wBAAwB;IACxB,gBAAgB;IAChB,gBAAgB;IAChB,kBAAkB;IAClB,kBAAkB;;IAElB,0DAA6C;IAC7C,2DAA+C;IAC/C,6DAAmD;;IAEnD,aAAa;IACb,eAAe;IACf,kBAAkB;IAClB,WAAW;EACb;;EAEA;IACE,YAAY;IACZ,0BAA0B;EAC5B;;EAEA;IACE,UAAU;EACZ;;EAEA;IACE,uBAAuB;IACvB,WAAW;IACX,YAAY;EACd;;EAEA;IACE,UAAU;IACV,WAAW;EACb;;EAEA;IACE,UAAU;IACV,oBAAoB;EACtB;;EAEA;IACE,oBAAoB;EACtB;;EAEA;IACE,0BAA0B;IAC1B,mCAAmC;IACnC,aAAa;IACb,eAAe;IACf,oBAAoB;IACpB,iBAAiB;EACnB;;EAEA;IACE,iBAAiB;EACnB;;EAEA;IACE,8BAA8B;IAC9B,mCAAmC;IACnC,oBAAoB;IACpB,sBAAsB;EACxB;;EAEA;IACE,oBAAoB;EACtB;;EAEA;IACE,mBAAmB;EACrB;;EAEA;IACE,oBAAoB;EACtB;;EAEA;IACE,4BAA4B;IAC5B,sCAAsC;IACtC,kBAAkB;IAClB,eAAe;IACf,kBAAkB;IAClB,qBAAqB;IACrB,WAAW;IACX,kBAAkB;IAClB,oBAAoB;IACpB,YAAY;IACZ,WAAW;EACb;;EAEA;IACE,OAAO;IACP,kBAAkB;IAClB,MAAM;IACN,UAAU;IACV,gCAAgC;IAChC,wCAAwC;IACxC,SAAS;IACT,kBAAkB;IAClB,WAAW;IACX,YAAY;IACZ,4BAA4B;IAC5B,2BAA2B;IAC3B,kCAAkC;IAClC,qBAAqB;EACvB;;EAEA;IACE,UAAU;EACZ;;EAEA;IACE,UAAU;IACV,2CAA2C;IAC3C,qBAAqB;EACvB;;EAEA;IACE,UAAU;IACV,yCAAyC;IACzC,qBAAqB;EACvB;;EAEA;IACE;MACE,uBAAuB;IACzB;EACF;;EAEA;IACE;MACE,oBAAoB;IACtB;EACF","sourcesContent":[".tiledb-widget {\n    --prussian: #001759;\n    --navy: #001e73;\n    --azure: #0075ff;\n    --azure--darken: #0463d4;\n    --sky: #c8e0ff;\n    --dark: #3c3c3c;\n    --mediumDark: #838383;\n    --lightGray: #ececec;\n    --lightGray--darken: #d9d9da;\n    --gray: #d8d8d8;\n    --background: #fafafa;\n    --white: #fff;\n    --danger: #ff0062;\n    --danger--darken: #bd024a;\n    --warning: #ffa200;\n    --warning--darken: #e49100;\n    --ebony: #0f1426;\n    --ebonyLight: #121930;\n    --midnight: #151e38;\n    --midnight--darken: #11192f;\n    --midnightLight: #1a2342;\n    --rhino: #252e4b;\n    --fiord: #444c64;\n    --kashmir: #446690;\n    --success: #0075ff;\n  \n    --jp-image-zoomin: url('../icons/zoomin.svg');\n    --jp-image-zoomout: url('../icons/zoomout.svg');\n    --jp-image-zoomreset: url('../icons/zoomreset.svg');\n  \n    height: 440px;\n    padding: 20px 0;\n    position: relative;\n    width: 100%;\n  }\n  \n  .tiledb-widget svg {\n    height: 100%;\n    transform-origin: top left;\n  }\n  \n  svg{\n    width:100%;\n  }\n  \n  .tiledb-widget rect {\n    fill: var(--mediumDark);\n    width: 60px;\n    height: 30px;\n  }\n  \n  .tiledb-widget path {\n    fill: none;\n    stroke:#999;\n  }\n  \n  .tiledb-widget text {\n    fill: #fff;\n    pointer-events: none;\n  }\n  \n  .tiledb-widget .Not.Started {\n    fill: var(--kashmir);\n  }\n  \n  .tiledb-widget .Running {\n    animation: dash 15s linear;\n    animation-iteration-count: infinite;\n    fill: #66cc99;\n    stroke: #4e9c75;\n    stroke-dasharray: 10;\n    stroke-width: 3px;\n  }\n  \n  .tiledb-widget .Running.node--small {\n    stroke-width: 1px;\n  }\n  \n  .tiledb-widget .path-Running {\n    animation: dash-full 1s linear;\n    animation-iteration-count: infinite;\n    stroke-dasharray: 10;\n    stroke-dashoffset: 100;\n  }\n  \n  .tiledb-widget .Completed {\n    fill: var(--success);\n  }\n  \n  .tiledb-widget .Failed {\n    fill: var(--danger);\n  }\n  \n  .tiledb-widget .Cancelled {\n    fill: var(--warning);\n  }\n  \n  .tiledb-widget .tooltip {\t\n    background: var(--lightGray);\n    box-shadow: 0 0 5px rgba(0, 0, 0, .25);\n    color: var(--dark);\n    position: fixed;\n    text-align: center;\n    font: 12px sans-serif;\n    border: 0px;\n    border-radius: 8px;\n    pointer-events: none;\n    padding: 5px;\n    width: 65px;\n  }\n  \n  .tiledb-widget .zoomControl, .resetControl {\n    left: 0;\n    position: absolute;\n    top: 0;\n    z-index: 1;\n    background-color: var(--kashmir);\n    background-image: var(--jp-image-zoomin);\n    border: 0;\n    border-radius: 4px;\n    width: 20px;\n    height: 20px;\n    background-repeat: no-repeat;\n    background-position: center;\n    box-shadow: 0 0 3px rgba(0,0,0,.6);\n    background-size: 15px;\n  }\n  \n  .tiledb-widget .depth-0 {\n    opacity: 0;\n  }\n  \n  .resetControl {\n    left: 80px;\n    background-image: var(--jp-image-zoomreset);\n    background-size: 14px;\n  }\n  \n  #zoom_out {\n    left: 40px;\n    background-image: var(--jp-image-zoomout);\n    background-size: 14px;\n  }\n  \n  @keyframes dash {\n    to {\n      stroke-dashoffset: 1000;\n    }\n  }\n  \n  @keyframes dash-full {\n    to {\n      stroke-dashoffset: 0;\n    }\n  }\n  "],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./style/base.css":
/*!************************!*\
  !*** ./style/base.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_base_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./base.css */ "./node_modules/css-loader/dist/cjs.js!./style/base.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_base_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_base_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./icons/zoomin.svg":
/*!**************************!*\
  !*** ./icons/zoomin.svg ***!
  \**************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 29 36.25' fill='%23fff'%3E%3Cstyle%3E%3C/style%3E%3Cpath d='M11 20.5c-5.238 0-9.5-4.262-9.5-9.5S5.762 1.5 11 1.5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5zm0-17c-4.136 0-7.5 3.364-7.5 7.5s3.364 7.5 7.5 7.5 7.5-3.364 7.5-7.5-3.364-7.5-7.5-7.5z'/%3E%3Cpath d='M25.914 23.086l-7.32-7.32a2.038 2.038 0 00-.377-.29 8.534 8.534 0 01-2.741 2.741c.081.134.174.262.29.377l7.32 7.32c.391.391.902.586 1.414.586s1.023-.195 1.414-.586a2 2 0 000-2.828zM11 16.5a1 1 0 01-1-1v-9a1 1 0 112 0v9a1 1 0 01-1 1z'/%3E%3Cpath d='M15.5 12h-9a1 1 0 110-2h9a1 1 0 110 2z'/%3E%3C/svg%3E"

/***/ }),

/***/ "./icons/zoomout.svg":
/*!***************************!*\
  !*** ./icons/zoomout.svg ***!
  \***************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125' fill='%23fff'%3E%3Cpath d='M72.4 60.1C81.1 45.9 79.3 27 67 14.8 52.6.4 29.2.4 14.8 14.8.4 29.2.4 52.6 14.8 67c12.3 12.3 31.1 14 45.3 5.4l21.1 21.1c3.4 3.4 8.9 3.4 12.2 0s3.4-8.9 0-12.2l-21-21.2zm-13-.7c-10.2 10.2-26.8 10.2-37 0s-10.2-26.8 0-37 26.8-10.2 37 0 10.2 26.8 0 37zM28 35.4h26v10.2H28V35.4z'/%3E%3C/svg%3E"

/***/ }),

/***/ "./icons/zoomreset.svg":
/*!*****************************!*\
  !*** ./icons/zoomreset.svg ***!
  \*****************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 126.308 148.41' fill='%23fff'%3E%3Cpath d='M123.962 99.037c-.082-.076-.172-.116-.246-.181L100.929 76.46l-5.749-5.648c5.875-12.929 5.905-28.35-1.279-41.82C81.632 6.015 52.957-2.707 29.979 9.555c-.486.257-.944.549-1.418.826-7.41 4.288-13.254 10.305-17.261 17.284-2.663-1.367-4.591-2.553-4.868-2.73.261.17.083.008-.245-.225a3.34 3.34 0 00-.798-.482 2.503 2.503 0 00-.324-.135 2.873 2.873 0 00-.767-.118c-.063-.008-.11-.004-.182-.004a3.273 3.273 0 00-.656.075c-.024.008-.047.008-.071.016a3.133 3.133 0 00-2.374 3.359s-.012.012-.004.016v.008c.008.355.047.735.142 1.138L5.259 46.24l1.284 5.544 1.142 4.892.367 1.572c.751 3.265 3.375 4.062 5.825 1.771l5.469-5.109 1.549-1.454 3.563-3.331 10.954-10.246.707-.66c.083-.079.139-.158.209-.237l.459-.451-.032-.008c.285-.324.53-.695.664-1.13.036-.115.048-.229.071-.34.213-.846.047-1.651-.482-2.331a3.115 3.115 0 00-1.684-1.261s-4.259.296-10.384-.929a33.342 33.342 0 014.947-5.702 33.01 33.01 0 016.749-4.781 32.905 32.905 0 0114.676-3.872c12.131-.312 24.001 6.069 30.094 17.485 7.713 14.462 3.564 32.133-9.033 41.802-.438.332-.877.66-1.327.973l-.521.352c-.11.079-.229.15-.348.225a34.97 34.97 0 01-1.834 1.087c-9.049 4.991-20.302 5.698-30.315.894a33.212 33.212 0 01-3.73-2.118c-.34-.222-.684-.45-1.019-.688a2.486 2.486 0 00-.771-.135 2.38 2.38 0 00-1.209.355l-.455.36-7.239 5.643-.829.644c-.34.411-.546.929-.546 1.506.008.485.158.937.411 1.312a46.577 46.577 0 009.266 5.883c10.437 5.011 21.809 5.82 32.225 3.13.031 0 .063.016.103.016.442-.119.89-.237 1.328-.363a46.922 46.922 0 008.898-3.62 48.852 48.852 0 003.382-2.007c.15-.095.305-.189.455-.289.32-.209.628-.431.944-.644.11-.078.216-.156.325-.232l4.841 4.768 22.066 21.671c.049.05.09.134.14.189 3.776 3.76 10.697 2.926 15.472-1.867 4.792-4.786 5.627-11.721 1.876-15.472z'/%3E%3C/svg%3E"

/***/ }),

/***/ "./style/index.js":
/*!************************!*\
  !*** ./style/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.css */ "./style/base.css");



/***/ })

}]);
//# sourceMappingURL=style_index_js.022c235b52ca6a305b9c.js.map