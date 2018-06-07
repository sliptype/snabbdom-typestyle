"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typestyle_1 = require("typestyle");
var utils_1 = require("./utils");
var updateDOM = function (oldNode, newNode) {
    if (newNode.elm) {
        var elm_1 = newNode.elm;
        utils_1.updateVNode(newNode, function (name, value) { return elm_1.setAttribute(name, value); });
    }
};
exports.makeClientSideCssModule = function (styleElementSelector) {
    if (styleElementSelector === void 0) { styleElementSelector = undefined; }
    if (typeof styleElementSelector !== 'undefined') {
        var target = document.querySelector(styleElementSelector);
        typestyle_1.setStylesTarget(target);
    }
    return {
        create: updateDOM,
        update: updateDOM,
    };
};
exports.cssModule = exports.makeClientSideCssModule();
exports.default = exports.cssModule;
