"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typestyle_1 = require("typestyle");
var updateCSS = function (oldNode, newNode) {
    var data = newNode.data;
    if (data.css) {
        data.props = data.props || {};
        var styleClass = typestyle_1.style(data.css);
        var oldClassName = data.props.className || '';
        var newClassName = oldClassName + " " + styleClass;
        if (newNode.elm) {
            var elm = newNode.elm;
            elm.setAttribute('class', newClassName);
        }
    }
};
exports.cssModule = {
    create: updateCSS,
    update: updateCSS,
};
exports.default = exports.cssModule;
