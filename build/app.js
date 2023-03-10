"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = require("dotenv");
var user = require("./routes/user");
(0, dotenv_1.config)();
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/auth", user);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server started on port ".concat(PORT));
});
