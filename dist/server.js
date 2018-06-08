"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typestyle_1 = require("typestyle");
var utils_1 = require("./utils");
exports.serverSideCssModule = function (node, attributes) {
    return utils_1.updateVNode(node, function (name, value) { return attributes.set(name, value); });
};
exports.collectStyles = function (node) {
    var instance = typestyle_1.createTypeStyle();
    traverseVNode(node, instance);
    return instance.getStyles();
};
var traverseVNode = function (node, instance) {
    var data = node.data;
    if (data.css) {
        instance.style(data.css);
    }
    if (node.children) {
        node.children.forEach(function (child) { return traverseVNode(child, instance); });
    }
};
