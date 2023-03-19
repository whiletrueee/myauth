"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_1 = require("../controller/user");
var router = express_1.default.Router();
router.post("/register", user_1.registerUser);
router.post("/login", user_1.loginUser);
router.get("/me", user_1.me);
router.get("/hello", function (req, res) { return res.send("Hello World!"); });
module.exports = router;
