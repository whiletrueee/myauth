"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.loginUser = exports.registerUser = void 0;
var dotenv_1 = require("dotenv");
var user_1 = require("../services/user");
var user_2 = require("../services/user");
var userSchema_1 = require("../utils/userSchema");
var jwt_1 = require("../utils/jwt");
(0, dotenv_1.config)();
var registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userdata, signup, err_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                userdata = userSchema_1.registerSchema.safeParse(req.body);
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                if (!userdata.success) {
                    throw { statusCode: 400, message: "Invalid data provided" };
                }
                return [4 /*yield*/, (0, user_1.userRegister)(userdata.data)];
            case 2:
                signup = _c.sent();
                res.status(200).json(signup);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _c.sent();
                res.status((_a = err_1.statusCode) !== null && _a !== void 0 ? _a : 500).json({
                    auth: false,
                    message: (_b = err_1.message) !== null && _b !== void 0 ? _b : "Internal Server Error",
                });
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = registerUser;
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, getUser_1, token, err_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = userSchema_1.loginSchema.safeParse(req.body);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                if (!user.success) {
                    throw { statusCode: 400, message: "Invalid data provided" };
                }
                return [4 /*yield*/, (0, user_1.userLogin)(user.data.email, user.data.password)];
            case 2:
                getUser_1 = _b.sent();
                token = (0, jwt_1.loginToken)(getUser_1.username);
                res
                    .status(200)
                    .json({ message: "Successfully logged in", auth: true, token: token });
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                res.status((_a = err_2.status) !== null && _a !== void 0 ? _a : 500).json({ message: err_2.message, auth: false });
                console.log(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
var me = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var verify, user, err_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                verify = (0, jwt_1.verifyToken)(req.headers.authorization);
                if (!!verify) return [3 /*break*/, 1];
                throw { status: 401, message: "Invalid token" };
            case 1: return [4 /*yield*/, (0, user_2.getUser)(verify.username)];
            case 2:
                user = _b.sent();
                res
                    .status(200)
                    .json({
                    message: "true user",
                    auth: true,
                    user: { name: user.name, email: user.email, username: user.username },
                });
                _b.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_3 = _b.sent();
                res
                    .status((_a = err_3.status) !== null && _a !== void 0 ? _a : 500)
                    .json({ message: err_3.message, success: false });
                console.log(err_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.me = me;
