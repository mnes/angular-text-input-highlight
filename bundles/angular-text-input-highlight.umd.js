/**
 * angular-text-input-highlight - A component that can highlight parts of text in a textarea. Useful for displaying mentions etc
 * @version v1.4.3
 * @author Matt Lewis
 * @link https://github.com/mattlewis92/angular-text-input-highlight#readme
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common"], factory);
	else if(typeof exports === 'object')
		exports["angularTextInputHighlight"] = factory(require("@angular/core"), require("@angular/common"));
	else
		root["angularTextInputHighlight"] = factory(root["ng"]["core"], root["ng"]["common"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["__extends"] = __extends;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (immutable) */ __webpack_exports__["__rest"] = __rest;
/* harmony export (immutable) */ __webpack_exports__["__decorate"] = __decorate;
/* harmony export (immutable) */ __webpack_exports__["__param"] = __param;
/* harmony export (immutable) */ __webpack_exports__["__metadata"] = __metadata;
/* harmony export (immutable) */ __webpack_exports__["__awaiter"] = __awaiter;
/* harmony export (immutable) */ __webpack_exports__["__generator"] = __generator;
/* harmony export (immutable) */ __webpack_exports__["__createBinding"] = __createBinding;
/* harmony export (immutable) */ __webpack_exports__["__exportStar"] = __exportStar;
/* harmony export (immutable) */ __webpack_exports__["__values"] = __values;
/* harmony export (immutable) */ __webpack_exports__["__read"] = __read;
/* harmony export (immutable) */ __webpack_exports__["__spread"] = __spread;
/* harmony export (immutable) */ __webpack_exports__["__spreadArrays"] = __spreadArrays;
/* harmony export (immutable) */ __webpack_exports__["__await"] = __await;
/* harmony export (immutable) */ __webpack_exports__["__asyncGenerator"] = __asyncGenerator;
/* harmony export (immutable) */ __webpack_exports__["__asyncDelegator"] = __asyncDelegator;
/* harmony export (immutable) */ __webpack_exports__["__asyncValues"] = __asyncValues;
/* harmony export (immutable) */ __webpack_exports__["__makeTemplateObject"] = __makeTemplateObject;
/* harmony export (immutable) */ __webpack_exports__["__importStar"] = __importStar;
/* harmony export (immutable) */ __webpack_exports__["__importDefault"] = __importDefault;
/* harmony export (immutable) */ __webpack_exports__["__classPrivateFieldGet"] = __classPrivateFieldGet;
/* harmony export (immutable) */ __webpack_exports__["__classPrivateFieldSet"] = __classPrivateFieldSet;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
tslib_1.__exportStar(__webpack_require__(3), exports);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(4);
var text_input_highlight_component_1 = __webpack_require__(5);
var text_input_highlight_container_directive_1 = __webpack_require__(6);
var text_input_element_directive_1 = __webpack_require__(7);
var TextInputHighlightModule = /** @class */ (function () {
    function TextInputHighlightModule() {
    }
    TextInputHighlightModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [
                text_input_highlight_component_1.TextInputHighlightComponent,
                text_input_highlight_container_directive_1.TextInputHighlightContainerDirective,
                text_input_element_directive_1.TextInputElementDirective
            ],
            imports: [common_1.CommonModule],
            exports: [
                text_input_highlight_component_1.TextInputHighlightComponent,
                text_input_highlight_container_directive_1.TextInputHighlightContainerDirective,
                text_input_element_directive_1.TextInputElementDirective
            ]
        })
    ], TextInputHighlightModule);
    return TextInputHighlightModule;
}());
exports.TextInputHighlightModule = TextInputHighlightModule;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var core_1 = __webpack_require__(1);
var styleProperties = Object.freeze([
    'direction',
    'boxSizing',
    'width',
    'height',
    'overflowX',
    'overflowY',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderStyle',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    // https://developer.mozilla.org/en-US/docs/Web/CSS/font
    'fontStyle',
    'fontVariant',
    'fontWeight',
    'fontStretch',
    'fontSize',
    'fontSizeAdjust',
    'lineHeight',
    'fontFamily',
    'textAlign',
    'textTransform',
    'textIndent',
    'textDecoration',
    'letterSpacing',
    'wordSpacing',
    'tabSize',
    'MozTabSize'
]);
var tagIndexIdPrefix = 'text-highlight-tag-id-';
function indexIsInsideTag(index, tag) {
    return tag.indices.start < index && index < tag.indices.end;
}
function overlaps(tagA, tagB) {
    return (indexIsInsideTag(tagB.indices.start, tagA) ||
        indexIsInsideTag(tagB.indices.end, tagA));
}
function isCoordinateWithinRect(rect, x, y) {
    return rect.left < x && x < rect.right && (rect.top < y && y < rect.bottom);
}
function escapeHtml(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
var TextInputHighlightComponent = /** @class */ (function () {
    function TextInputHighlightComponent(renderer, cdr) {
        this.renderer = renderer;
        this.cdr = cdr;
        /**
         * The CSS class to add to highlighted tags
         */
        this.tagCssClass = '';
        /**
         * An array of indices of the textarea value to highlight
         */
        this.tags = [];
        /**
         * Called when the area over a tag is clicked
         */
        this.tagClick = new core_1.EventEmitter();
        /**
         * Called when the area over a tag is moused over
         */
        this.tagMouseEnter = new core_1.EventEmitter();
        /**
         * Called when the area over the tag has the mouse is removed from it
         */
        this.tagMouseLeave = new core_1.EventEmitter();
        /**
         * @private
         */
        this.highlightElementContainerStyle = {};
        this.textareaEventListeners = [];
        this.isDestroyed = false;
    }
    /**
     * Manually call this function to refresh the highlight element if the textarea styles have changed
     */
    TextInputHighlightComponent.prototype.refresh = function () {
        var _this = this;
        var computed = getComputedStyle(this.textInputElement);
        styleProperties.forEach(function (prop) {
            _this.highlightElementContainerStyle[prop] = computed[prop];
        });
    };
    /**
     * @private
     */
    TextInputHighlightComponent.prototype.ngOnChanges = function (changes) {
        if (changes.textInputElement) {
            this.textInputElementChanged();
        }
        if (changes.tags || changes.tagCssClass || changes.textInputValue) {
            this.addTags();
        }
    };
    /**
     * @private
     */
    TextInputHighlightComponent.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
        this.textareaEventListeners.forEach(function (unregister) { return unregister(); });
    };
    /**
     * @private
     */
    TextInputHighlightComponent.prototype.onWindowResize = function () {
        this.refresh();
    };
    TextInputHighlightComponent.prototype.textInputElementChanged = function () {
        var _this = this;
        var elementType = this.textInputElement.tagName.toLowerCase();
        if (elementType !== 'textarea') {
            throw new Error('The angular-text-input-highlight component must be passed ' +
                'a textarea to the `textInputElement` input. Instead received a ' +
                elementType);
        }
        setTimeout(function () {
            // in case the element was destroyed before the timeout fires
            if (!_this.isDestroyed) {
                _this.refresh();
                _this.textareaEventListeners.forEach(function (unregister) { return unregister(); });
                _this.textareaEventListeners = [
                    _this.renderer.listen(_this.textInputElement, 'input', function () {
                        _this.addTags();
                    }),
                    _this.renderer.listen(_this.textInputElement, 'scroll', function () {
                        _this.highlightElement.nativeElement.scrollTop = _this.textInputElement.scrollTop;
                        _this.highlightTagElements = _this.highlightTagElements.map(function (tag) {
                            tag.clientRect = tag.element.getBoundingClientRect();
                            return tag;
                        });
                    }),
                    _this.renderer.listen(_this.textInputElement, 'mouseup', function () {
                        _this.refresh();
                    })
                ];
                // only add event listeners if the host component actually asks for it
                if (_this.tagClick.observers.length > 0) {
                    var onClick = _this.renderer.listen(_this.textInputElement, 'click', function (event) {
                        _this.handleTextareaMouseEvent(event, 'click');
                    });
                    _this.textareaEventListeners.push(onClick);
                }
                if (_this.tagMouseEnter.observers.length > 0) {
                    var onMouseMove = _this.renderer.listen(_this.textInputElement, 'mousemove', function (event) {
                        _this.handleTextareaMouseEvent(event, 'mousemove');
                    });
                    var onMouseLeave = _this.renderer.listen(_this.textInputElement, 'mouseleave', function (event) {
                        if (_this.mouseHoveredTag) {
                            _this.tagMouseLeave.emit(_this.mouseHoveredTag);
                            _this.mouseHoveredTag = undefined;
                        }
                    });
                    _this.textareaEventListeners.push(onMouseMove);
                    _this.textareaEventListeners.push(onMouseLeave);
                }
                _this.addTags();
            }
        });
    };
    TextInputHighlightComponent.prototype.addTags = function () {
        var _this = this;
        var textInputValue = typeof this.textInputValue !== 'undefined'
            ? this.textInputValue
            : this.textInputElement.value;
        var prevTags = [];
        var parts = [];
        tslib_1.__spread(this.tags).sort(function (tagA, tagB) {
            return tagA.indices.start - tagB.indices.start;
        })
            .forEach(function (tag) {
            if (tag.indices.start > tag.indices.end) {
                throw new Error("Highlight tag with indices [" + tag.indices.start + ", " + tag.indices
                    .end + "] cannot start after it ends.");
            }
            prevTags.forEach(function (prevTag) {
                if (overlaps(prevTag, tag)) {
                    throw new Error("Highlight tag with indices [" + tag.indices.start + ", " + tag.indices
                        .end + "] overlaps with tag [" + prevTag.indices.start + ", " + prevTag
                        .indices.end + "]");
                }
            });
            // TODO - implement this as an ngFor of items that is generated in the template for a cleaner solution
            var expectedTagLength = tag.indices.end - tag.indices.start;
            var tagContents = textInputValue.slice(tag.indices.start, tag.indices.end);
            if (tagContents.length === expectedTagLength) {
                var previousIndex = prevTags.length > 0 ? prevTags[prevTags.length - 1].indices.end : 0;
                var before_1 = textInputValue.slice(previousIndex, tag.indices.start);
                parts.push(escapeHtml(before_1));
                var cssClass = tag.cssClass || _this.tagCssClass;
                var tagId = tagIndexIdPrefix + _this.tags.indexOf(tag);
                // text-highlight-tag-id-${id} is used instead of a data attribute to prevent an angular sanitization warning
                parts.push("<span class=\"text-highlight-tag " + tagId + " " + cssClass + "\">" + escapeHtml(tagContents) + "</span>");
                prevTags.push(tag);
            }
        });
        var remainingIndex = prevTags.length > 0 ? prevTags[prevTags.length - 1].indices.end : 0;
        var remaining = textInputValue.slice(remainingIndex);
        parts.push(escapeHtml(remaining));
        parts.push('&nbsp;');
        this.highlightedText = parts.join('');
        this.cdr.detectChanges();
        this.highlightTagElements = Array.from(this.highlightElement.nativeElement.getElementsByTagName('span')).map(function (element) {
            return { element: element, clientRect: element.getBoundingClientRect() };
        });
    };
    TextInputHighlightComponent.prototype.handleTextareaMouseEvent = function (event, eventName) {
        var matchingTagIndex = this.highlightTagElements.findIndex(function (elm) {
            return isCoordinateWithinRect(elm.clientRect, event.clientX, event.clientY);
        });
        if (matchingTagIndex > -1) {
            var target = this.highlightTagElements[matchingTagIndex].element;
            var tagClass = Array.from(target.classList).find(function (className) {
                return className.startsWith(tagIndexIdPrefix);
            });
            if (tagClass) {
                var tagId = tagClass.replace(tagIndexIdPrefix, '');
                var tag = this.tags[+tagId];
                var tagMouseEvent = { tag: tag, target: target, event: event };
                if (eventName === 'click') {
                    this.tagClick.emit(tagMouseEvent);
                }
                else if (!this.mouseHoveredTag) {
                    this.mouseHoveredTag = tagMouseEvent;
                    this.tagMouseEnter.emit(tagMouseEvent);
                }
            }
        }
        else if (eventName === 'mousemove' && this.mouseHoveredTag) {
            this.mouseHoveredTag.event = event;
            this.tagMouseLeave.emit(this.mouseHoveredTag);
            this.mouseHoveredTag = undefined;
        }
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], TextInputHighlightComponent.prototype, "tagCssClass", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], TextInputHighlightComponent.prototype, "tags", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", HTMLTextAreaElement)
    ], TextInputHighlightComponent.prototype, "textInputElement", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], TextInputHighlightComponent.prototype, "textInputValue", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", Object)
    ], TextInputHighlightComponent.prototype, "tagClick", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", Object)
    ], TextInputHighlightComponent.prototype, "tagMouseEnter", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", Object)
    ], TextInputHighlightComponent.prototype, "tagMouseLeave", void 0);
    tslib_1.__decorate([
        core_1.ViewChild('highlightElement', { static: true }),
        tslib_1.__metadata("design:type", core_1.ElementRef)
    ], TextInputHighlightComponent.prototype, "highlightElement", void 0);
    tslib_1.__decorate([
        core_1.HostListener('window:resize'),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], TextInputHighlightComponent.prototype, "onWindowResize", null);
    TextInputHighlightComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'mwl-text-input-highlight',
            template: "\n    <div\n      class=\"text-highlight-element\"\n      [ngStyle]=\"highlightElementContainerStyle\"\n      [innerHtml]=\"highlightedText\"\n      #highlightElement>\n    </div>\n  "
        }),
        tslib_1.__metadata("design:paramtypes", [core_1.Renderer2, core_1.ChangeDetectorRef])
    ], TextInputHighlightComponent);
    return TextInputHighlightComponent;
}());
exports.TextInputHighlightComponent = TextInputHighlightComponent;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var core_1 = __webpack_require__(1);
var TextInputHighlightContainerDirective = /** @class */ (function () {
    function TextInputHighlightContainerDirective() {
    }
    TextInputHighlightContainerDirective = tslib_1.__decorate([
        core_1.Directive({
            selector: '[mwlTextInputHighlightContainer]',
            host: {
                '[class.text-input-highlight-container]': 'true'
            }
        })
    ], TextInputHighlightContainerDirective);
    return TextInputHighlightContainerDirective;
}());
exports.TextInputHighlightContainerDirective = TextInputHighlightContainerDirective;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(0);
var core_1 = __webpack_require__(1);
var TextInputElementDirective = /** @class */ (function () {
    function TextInputElementDirective() {
    }
    TextInputElementDirective = tslib_1.__decorate([
        core_1.Directive({
            selector: 'textarea[mwlTextInputElement]',
            host: {
                '[class.text-input-element]': 'true'
            }
        })
    ], TextInputElementDirective);
    return TextInputElementDirective;
}());
exports.TextInputElementDirective = TextInputElementDirective;


/***/ })
/******/ ]);
});
//# sourceMappingURL=angular-text-input-highlight.umd.js.map