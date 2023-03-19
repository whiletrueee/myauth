"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.loginToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var loginToken = function (username) {
    var secret = process.env.SECRET_KEY;
    return jsonwebtoken_1.default.sign({ username: username }, secret, {
        expiresIn: 86400, // expires in 24 hours
    });
};
exports.loginToken = loginToken;
var verifyToken = function (token) {
    var secret = process.env.SECRET_KEY;
    if (!token) {
        throw { message: "token is not provided in header.", auth: false };
    }
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyToken = verifyToken;
