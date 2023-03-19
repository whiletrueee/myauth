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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.userRegister = exports.userLogin = void 0;
var database_1 = require("../config/database");
var bcrypt_1 = __importDefault(require("bcrypt"));
var mongodb_1 = require("mongodb");
var generateUsername_1 = require("../utils/generateUsername");
var userLogin = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var db, collection, trueCred, compare;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, database_1.getDB)()];
            case 1:
                db = _a.sent();
                collection = db.collection("users");
                return [4 /*yield*/, collection.findOne({ email: email })];
            case 2:
                trueCred = _a.sent();
                if (!!trueCred) return [3 /*break*/, 3];
                throw { statusCode: 404, message: "User not found" };
            case 3: return [4 /*yield*/, bcrypt_1.default.compare(password, trueCred.password)];
            case 4:
                compare = _a.sent();
                if (!compare) {
                    throw { statusCode: 401, message: "Invalid password" };
                }
                return [2 /*return*/, trueCred];
        }
    });
}); };
exports.userLogin = userLogin;
var userRegister = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var db, collection, alreadyRegisterd, count, salt, hash, dbUser, inserted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, database_1.getDB)()];
            case 1:
                db = _a.sent();
                collection = db.collection("users");
                return [4 /*yield*/, collection.findOne({
                        email: data.email,
                    })];
            case 2:
                alreadyRegisterd = _a.sent();
                if (!alreadyRegisterd) return [3 /*break*/, 3];
                throw {
                    statusCode: 409,
                    message: "User already registerd",
                };
            case 3: return [4 /*yield*/, collection.findOne({
                    _id: new mongodb_1.ObjectId("64080a8a5fe4b12b34e428f2"),
                })];
            case 4:
                count = _a.sent();
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 5:
                salt = _a.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(data.password, salt)];
            case 6:
                hash = _a.sent();
                dbUser = {
                    name: data.name,
                    email: data.email,
                    password: hash,
                    username: (0, generateUsername_1.generateUsername)(data.name) + (count === null || count === void 0 ? void 0 : count.count),
                };
                return [4 /*yield*/, collection.insertOne(dbUser)];
            case 7:
                inserted = _a.sent();
                return [4 /*yield*/, collection.updateOne({ _id: new mongodb_1.ObjectId("64080a8a5fe4b12b34e428f2") }, {
                        $set: {
                            count: (count === null || count === void 0 ? void 0 : count.count) + 1,
                        },
                    }, { upsert: false })];
            case 8:
                _a.sent();
                if (!inserted) {
                    throw {
                        statusCode: 500,
                        message: "Unable to insert user",
                    };
                }
                else {
                    return [2 /*return*/, { message: "Successfully registerd", auth: true }];
                }
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.userRegister = userRegister;
var getUser = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var db, collection, finduser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, database_1.getDB)()];
            case 1:
                db = _a.sent();
                collection = db.collection("users");
                return [4 /*yield*/, collection.findOne({ username: username })];
            case 2:
                finduser = _a.sent();
                if (!finduser) {
                    throw { statusCode: 404, message: "User not found" };
                }
                else {
                    return [2 /*return*/, finduser];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
