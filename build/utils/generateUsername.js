"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUsername = void 0;
var generateUsername = function (name) {
    var _a;
    if (name.split(" ").length > 1) {
        return ((_a = name.split(" ")[0].slice(0, 1).toLowerCase() +
            name.split(" ")[1].slice(0, 1).toLowerCase()) !== null && _a !== void 0 ? _a : name.split(" ")[0].slice(1, 2)).toLowerCase();
    }
    else {
        return name.slice(0, 2).toLowerCase();
    }
};
exports.generateUsername = generateUsername;
