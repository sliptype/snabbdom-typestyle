"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var removeServersideStyles = function (styleElementSelector) {
    var previousStyleTarget = document.querySelector(styleElementSelector);
    if (previousStyleTarget) {
        previousStyleTarget.remove();
    }
};
var makeDomUpdater = function (styleElementSelector) {
    if (styleElementSelector === void 0) { styleElementSelector = undefined; }
    return function (oldNode, newNode) {
        if (newNode.elm) {
            var elm_1 = newNode.elm;
            utils_1.updateVNode(newNode, function (name, value) { return elm_1.setAttribute(name, value); });
        }
        if (typeof styleElementSelector !== 'undefined') {
            removeServersideStyles(styleElementSelector);
        }
    };
};
exports.makeModule = function (styleElementSelector) {
    if (styleElementSelector === void 0) { styleElementSelector = undefined; }
    // Serverside styles are only removed the first time updateDOM is called
    var domUpdater = utils_1.alternateFirstInvocation(function () { return makeDomUpdater(styleElementSelector); }, function () { return makeDomUpdater(); });
    var updateDOM = function (oldNode, newNode) { return domUpdater.next().value(oldNode, newNode); };
    return {
        create: updateDOM,
        update: updateDOM,
    };
};
exports.default = exports.makeModule();
