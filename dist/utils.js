"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typestyle_1 = require("typestyle");
exports.isVNode = function (vNode) {
    return vNode.length === undefined;
};
exports.updateVNode = function (node, attributeAccessor) {
    var data = node.data;
    if (data.css) {
        data.props = data.props || {};
        var styleClass = typestyle_1.style(data.css);
        var oldClassName = data.props.className || '';
        var newClassName = (oldClassName + " " + styleClass).trim();
        attributeAccessor('class', newClassName);
    }
};
