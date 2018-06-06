"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typestyle_1 = require("typestyle");
/*
  Utilities
 */
var isVNode = function (vNode) {
    return vNode.length === undefined;
};
var updateVNode = function (node, attributeAccessor) {
    var data = node.data;
    if (data.css) {
        data.props = data.props || {};
        var styleClass = typestyle_1.style(data.css);
        var oldClassName = data.props.className || '';
        var newClassName = (oldClassName + " " + styleClass).trim();
        attributeAccessor('class', newClassName);
    }
};
/*
  Client-side
 */
var updateDOM = function (oldNode, newNode) {
    if (newNode.elm) {
        var elm_1 = newNode.elm;
        updateVNode(newNode, function (name, value) { return elm_1.setAttribute(name, value); });
    }
};
exports.cssModule = {
    create: updateDOM,
    update: updateDOM,
};
exports.default = exports.cssModule;
/*
  Server-side
 */
exports.serverSideCssModule = function (node, attributes) {
    return updateVNode(node, function (name, value) { return attributes.set(name, value); });
};
exports.collectStyles = function (node) {
    var instance = typestyle_1.createTypeStyle();
    traverseVNode(node, instance);
    return instance.getStyles();
};
var traverseVNode = function (node, instance) {
    if (isVNode(node)) {
        var data = node.data;
        if (data.css) {
            instance.style(data.css);
        }
        if (node.children) {
            node.children.forEach(function (child) { return traverseVNode(child, instance); });
        }
    }
};
