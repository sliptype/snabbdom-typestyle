"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var updateDOM = function (oldNode, newNode) {
    if (newNode.elm) {
        var elm_1 = newNode.elm;
        utils_1.updateVNode(newNode, function (name, value) { return elm_1.setAttribute(name, value); });
    }
};
exports.cssModule = {
    create: updateDOM,
    update: updateDOM,
};
exports.default = exports.cssModule;
