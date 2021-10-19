"use strict";
(self["webpackChunk_tiledb_inc_tiledb_plot_widget"] = self["webpackChunk_tiledb_inc_tiledb_plot_widget"] || []).push([["lib_index_js"],{

/***/ "./lib/debounce.js":
/*!*************************!*\
  !*** ./lib/debounce.js ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const debounce = (func, waitFor) => {
    let timeout;
    return (...args) => new Promise(resolve => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};
exports["default"] = debounce;


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "webpack/sharing/consume/default/@jupyter-widgets/base/@jupyter-widgets/base");
__exportStar(__webpack_require__(/*! ./version */ "./lib/version.js"), exports);
const widgetExports = __importStar(__webpack_require__(/*! ./widget */ "./lib/widget.js"));
const version_1 = __webpack_require__(/*! ./version */ "./lib/version.js");
/**
 * Initialization data for the @tiledb-inc/tiledb-plot-widget extension.
 */
const plugin = {
    id: '@tiledb-inc/tiledb-plot-widget:plugin',
    requires: [base_1.IJupyterWidgetRegistry],
    autoStart: true,
    activate: (app, registry) => {
        registry.registerWidget({
            name: version_1.MODULE_NAME,
            version: version_1.MODULE_VERSION,
            exports: widgetExports
        });
    }
};
exports["default"] = plugin;


/***/ }),

/***/ "./lib/poll.js":
/*!*********************!*\
  !*** ./lib/poll.js ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.poll = void 0;
function poll(fn, timeout = 2000, interval = 100) {
    const endTime = Number(new Date()) + timeout;
    const checkCondition = function (resolve, reject) {
        // If the condition is met, we're done!
        const result = fn();
        if (result) {
            resolve(result);
        }
        // If the condition isn't met but the timeout hasn't elapsed, go again
        else if (Number(new Date()) < endTime) {
            setTimeout(checkCondition, interval, resolve, reject);
        }
        // Didn't match and too much time, reject!
        else {
            reject(new Error('timed out for ' + fn + ': '));
        }
    };
    return new Promise(checkCondition);
}
exports.poll = poll;


/***/ }),

/***/ "./lib/version.js":
/*!************************!*\
  !*** ./lib/version.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


// Copyright (c) TileDB
// Distributed under the terms of the MIT License.
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MODULE_NAME = exports.MODULE_VERSION = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const data = require('../package.json');
/**
 * The _model_module_version/_view_module_version this package implements.
 *
 * The html widget manager assumes that this is the same as the npm package
 * version number.
 */
exports.MODULE_VERSION = '0.2.0';
/*
 * The current package name.
 */
exports.MODULE_NAME = '@tiledb-inc/tiledb-plot-widget';


/***/ }),

/***/ "./lib/widget.js":
/*!***********************!*\
  !*** ./lib/widget.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// Copyright (c) TileDB
// Distributed under the terms of the MIT License.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DagVisualizeView = exports.DagVisualizeModel = void 0;
const base_1 = __webpack_require__(/*! @jupyter-widgets/base */ "webpack/sharing/consume/default/@jupyter-widgets/base/@jupyter-widgets/base");
const d3 = __importStar(__webpack_require__(/*! d3 */ "webpack/sharing/consume/default/d3/d3"));
const debounce_1 = __importDefault(__webpack_require__(/*! ./debounce */ "./lib/debounce.js"));
const worker_js_1 = __importDefault(__webpack_require__(/*! file-loader!../lib/worker.js */ "./node_modules/file-loader/dist/cjs.js!./lib/worker.js"));
const version_1 = __webpack_require__(/*! ./version */ "./lib/version.js");
const poll_1 = __webpack_require__(/*! ./poll */ "./lib/poll.js");
// const BOX_ASPECT_RATIO = 0.36;
class DagVisualizeModel extends base_1.DOMWidgetModel {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults()), { _model_name: DagVisualizeModel.model_name, _model_module: DagVisualizeModel.model_module, _model_module_version: DagVisualizeModel.model_module_version, _view_name: DagVisualizeModel.view_name, _view_module: DagVisualizeModel.view_module, _view_module_version: DagVisualizeModel.view_module_version, value: '' });
    }
}
exports.DagVisualizeModel = DagVisualizeModel;
DagVisualizeModel.serializers = Object.assign({}, base_1.DOMWidgetModel.serializers
// Add any extra serializers here
);
DagVisualizeModel.model_name = 'DagVisualizeModel';
DagVisualizeModel.model_module = version_1.MODULE_NAME;
DagVisualizeModel.model_module_version = version_1.MODULE_VERSION;
DagVisualizeModel.view_name = 'DagVisualizeView'; // Set to null if no view
DagVisualizeModel.view_module = version_1.MODULE_NAME; // Set to null if no view
DagVisualizeModel.view_module_version = version_1.MODULE_VERSION;
const PADDING = 40;
class DagVisualizeView extends base_1.DOMWidgetView {
    render() {
        this.el.classList.add('tiledb-widget');
        this.createSVG();
        this.value_changed();
        /**
         * Debounce rendering function so it won't rerender too fast
         */
        const debouncedOnChange = debounce_1.default(this.value_changed.bind(this), 1500);
        this.model.on('change:value', debouncedOnChange, this);
    }
    value_changed() {
        this.data = JSON.parse(this.model.get('value'));
        /**
         * Reset html and build new graph
         */
        this.createDag();
    }
    calculateBounds(positions) {
        if (typeof this.bounds === 'undefined') {
            const xNums = Object.keys(positions).map((pos) => positions[pos][0]);
            const yNums = Object.keys(positions).map((pos) => positions[pos][1]);
            const padding = 30;
            const verticalPadding = 60;
            const maxHorizontalCoordinate = Math.max(...xNums);
            const maxVerticalCoordinate = Math.max(...yNums);
            this.bounds = [
                maxHorizontalCoordinate + padding,
                maxVerticalCoordinate + verticalPadding
            ];
        }
        return this.bounds;
    }
    createSVG() {
        this.wrapper = d3.select(this.el).append('svg').append('g');
        this.svg = d3.select(this.el).select('svg');
        this.createControls();
        this.createTooltip();
    }
    getScale() {
        const [maxWidth, height] = this.bounds;
        const scaleX = this.el.offsetWidth / (maxWidth + PADDING);
        const scaleY = 400 / (height + PADDING);
        return [scaleX, scaleY];
    }
    zoom() {
        const [width, height] = this.bounds;
        const [scaleX, scaleY] = this.getScale();
        const svg = this.svg;
        const zoom = d3
            .zoom()
            .translateExtent([
            [0, 0],
            [width * scaleX + PADDING, height * scaleY + PADDING]
        ])
            .on('zoom', () => {
            this.wrapper.attr('transform', d3.event.transform);
        });
        svg.call(zoom).on('wheel.zoom', null);
        function zoomHandler() {
            d3.event.preventDefault();
            const direction = this.id === 'zoom_in' ? 0.2 : -0.2;
            /**
             * In SVG 1.1 <svg> elements did not support transform attributes. In SVG 2 it is proposed that they should.
             * Chrome and Firefox implement this part of the SVG 2 specification, Safari does not yet do so and IE11 never will.
             * That's why we apply transform to the "g" element instead of the "svg"
             */
            svg
                .transition()
                .duration(300)
                .call(zoom.scaleBy, 1 + direction);
        }
        function resetHandler() {
            svg.transition().duration(300).call(zoom.transform, d3.zoomIdentity);
        }
        setTimeout(() => {
            d3.select(this.el).selectAll('.zoomControl').on('click', zoomHandler);
            d3.select(this.el).selectAll('.resetControl').on('click', resetHandler);
        }, 0);
        this.initialized = true;
    }
    createTooltip() {
        this.tooltip = d3
            .select(this.el)
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);
    }
    /**
     * Method to calculate vertical offset from the hidden "fake" root node
     * @param descendants The hierarchy points
     * @param circleSize The size of the circle
     * @param fauxRootNode The name of the fake root node
     */
    calculateYOffset(descendants, circleSize, fauxRootNode) {
        /**
         * If we have already calculated the offset just return it.
         * If not calculate the offset
         */
        if (typeof this.verticalOffset === 'undefined') {
            const originalRoot = descendants.find((node) => Boolean(node.parent && node.parent.id === fauxRootNode));
            /**
             * Calculate the offset of the original root node,
             * since the first faux root node that we added,
             * we hide it and create an empty space to the top.
             */
            const yOffset = originalRoot ? originalRoot.y : 0;
            this.verticalOffset = circleSize - yOffset / 2;
        }
        return this.verticalOffset;
    }
    getRootNodes(nodes, edges) {
        const hasNoParent = (node) => edges.every(([, parent]) => node !== parent);
        return nodes.filter(hasNoParent);
    }
    /**
     * Calculate the size of the nodes in the graph depending on the number of nodes
     * As the number of nodes in the tree gets bigger and bigger, the tree is becoming
     * squeezed and the size of the nodes have to get smaller in order not to overlap
     * witch each other.
     * @param numberOfNodes Number of the nodes in the tree
     */
    getNodeSize(numberOfNodes) {
        const howManyTens = Math.floor(numberOfNodes / 10);
        /**
         * Don't let node size go bellow 5
         */
        return Math.max(320 / (20 + howManyTens), 5);
    }
    async createDag() {
        const { nodes, edges, node_details, positions } = this.data;
        const bounds = this.calculateBounds(positions);
        const maxHeight = bounds[1];
        /**
         * During initialization the wrapper elemete (this.el) has no width,
         * we wait for that before we do any DOM calculations.
         */
        if (!this.initialized) {
            await poll_1.poll(() => this.el.offsetWidth > 0, 300);
        }
        const numberOfNodes = nodes.length;
        const lessThanThirtyNodes = numberOfNodes < 30;
        const [scaleX, scaleY] = this.getScale();
        /**
         * Sometimes during updates we are getting different/weird positions object
         * So we save and re-use the first positions object we are getting
         */
        this.positions = this.positions || positions;
        if (!this.initialized) {
            this.zoom();
        }
        const circleSize = this.getNodeSize(numberOfNodes);
        const links = edges.map(([parent, child]) => ({
            source: parent,
            target: child
        }));
        const nodeDetails = Object.keys(node_details).map((node, i) => ({
            index: i,
            status: node_details[node].status,
            id: node,
            fx: this.positions[node][0] * scaleX,
            /** For Y position we flip tree upside down (that's why: maxHeight - node's Y position) */
            fy: (maxHeight - this.positions[node][1]) * scaleY
        }));
        const worker = new Worker(worker_js_1.default);
        worker.postMessage({
            nodes: nodeDetails,
            links
        });
        worker.onmessage = event => {
            if (event.data.type !== 'end') {
                return;
            }
            /**
             * Remove previous contents
             */
            this.wrapper.selectAll('*').remove();
            const { nodes, links } = event.data;
            this.wrapper
                .append('g')
                .selectAll('path')
                .data(links)
                .enter()
                .append('path')
                .attr('d', (d) => {
                return `M${d.source.x},${d.source.y} C ${d.source.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${(d.source.y + d.target.y) / 2} ${d.target.x},${d.target.y}`;
            })
                .attr('class', (d) => `path-${d.target.status}`);
            this.wrapper
                .append('g')
                .selectAll('circle')
                .data(nodes)
                .enter()
                .append('circle')
                .attr('cx', (d) => d.x)
                .attr('cy', (d) => d.y)
                .attr('r', circleSize)
                .attr('class', (d) => `${d.status} ${lessThanThirtyNodes ? 'node--small' : ''}`)
                .on('mouseover', (d) => {
                this.tooltip.transition().duration(200).style('opacity', 0.9);
                this.tooltip
                    .html(`<p>${d.id}: ${d.status}</p>`)
                    .style('left', `${d3.event.clientX + 10}px`)
                    .style('top', `${d3.event.clientY + 10}px`);
            })
                .on('mouseout', () => {
                this.tooltip.transition().duration(500).style('opacity', 0);
            });
        };
    }
    createControls() {
        const zoomInButton = document.createElement('button');
        const zoomOutButton = document.createElement('button');
        const resetButton = document.createElement('button');
        const className = 'zoomControl';
        zoomInButton.id = 'zoom_in';
        zoomOutButton.id = 'zoom_out';
        resetButton.className = 'resetControl';
        zoomInButton.className = className;
        zoomOutButton.className = className;
        this.el.append(zoomInButton);
        this.el.append(zoomOutButton);
        this.el.append(resetButton);
    }
}
exports.DagVisualizeView = DagVisualizeView;


/***/ }),

/***/ "./node_modules/file-loader/dist/cjs.js!./lib/worker.js":
/*!**************************************************************!*\
  !*** ./node_modules/file-loader/dist/cjs.js!./lib/worker.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "26c84ee286c89bc80d97e80b116a919ad0fd7135e61033ff9d953b42540a2aab.js");

/***/ })

}]);
//# sourceMappingURL=lib_index_js.45b0da20d7a6ab2018c0.js.map