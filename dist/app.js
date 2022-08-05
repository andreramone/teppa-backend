"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
require("reflect-metadata");
require("dotenv/config");
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var firebase_1 = __importDefault(require("firebase"));
var auth_1 = require("./validations/auth");
var AuthenticatedUserService_1 = __importDefault(require("./services/auth/AuthenticatedUserService"));
var firebase_2 = require("./config/firebase");
firebase_1.default.initializeApp(firebase_2.firebaseConfig);
var db = firebase_1.default.firestore();
var user = db.collection('users');
var hero = db.collection('hero');
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// CRUD DE USERS
app.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user.get()];
            case 1:
                snapshot = _a.sent();
                users = snapshot.docs.map(function (doc) { return (__assign({ id: doc.id }, doc.data())); });
                res.send(users);
                return [2 /*return*/];
        }
    });
}); });
app.get('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, snapshot, users, userfilter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, user.get()];
            case 1:
                snapshot = _a.sent();
                users = snapshot.docs.map(function (doc) { return (__assign({ id: doc.id }, doc.data())); });
                userfilter = users.filter(function (u) { return u.id === id; });
                res.send(userfilter);
                return [2 /*return*/];
        }
    });
}); });
app.post('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                return [4 /*yield*/, user.add(data)];
            case 1:
                _a.sent();
                res.status(201).send({ msg: 'Usuário criado com sucesso' });
                return [2 /*return*/];
        }
    });
}); });
app.put('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, user.doc(id).update(req.body)];
            case 1:
                _a.sent();
                res.send({ msg: 'Usuário atualizado com sucesso' });
                return [2 /*return*/];
        }
    });
}); });
app.delete('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, user.doc(id).delete];
            case 1:
                _a.sent();
                res.send({ msg: 'Usuário deletado com sucesso' });
                return [2 /*return*/];
        }
    });
}); });
//  CRUD DE HEROES
app.get('/heroes', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot, heroes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, hero.get()];
            case 1:
                snapshot = _a.sent();
                heroes = snapshot.docs.map(function (doc) { return (__assign({ id: doc.id }, doc.data())); });
                res.send(heroes);
                return [2 /*return*/];
        }
    });
}); });
app.get('/hero/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, snapshot, heroes, herofilter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, hero.get()];
            case 1:
                snapshot = _a.sent();
                heroes = snapshot.docs.map(function (doc) { return (__assign({ id: doc.id }, doc.data())); });
                herofilter = heroes.find(function (u) { return u.id === id; });
                res.send(herofilter);
                return [2 /*return*/];
        }
    });
}); });
app.post('/hero', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = req.body;
                return [4 /*yield*/, hero.add(data)];
            case 1:
                _a.sent();
                res.status(201).send({ msg: 'Usuário criado com sucesso' });
                return [2 /*return*/];
        }
    });
}); });
app.put('/hero/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                response = req.body;
                if (response.length <= 0) {
                    response = {};
                }
                // await user.doc(id).update(req.body);
                return [4 /*yield*/, db.collection('hero').doc(id).update(response)];
            case 1:
                // await user.doc(id).update(req.body);
                _a.sent();
                res.send({ msg: 'Usuário atualizado com sucesso' });
                return [2 /*return*/];
        }
    });
}); });
app.delete('/hero/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, db.collection('hero').doc(id).delete()];
            case 1:
                _a.sent();
                res.send({ msg: 'Usuário deletado com sucesso' });
                return [2 /*return*/];
        }
    });
}); });
// AUTH
app.post('/auth', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userAuth, authenticatedUserService, userAuthenticated, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userAuth = req.body;
                return [4 /*yield*/, auth_1.UserAuthDTOValidation.validate(userAuth).catch(function (err) {
                        throw new Error(err.message);
                    })];
            case 1:
                _a.sent();
                authenticatedUserService = new AuthenticatedUserService_1.default();
                return [4 /*yield*/, authenticatedUserService.execute(userAuth).catch(function (err) {
                        console.log(err);
                    })];
            case 2:
                userAuthenticated = _a.sent();
                res.json(userAuthenticated);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(5000, function () {
    console.log("Server running on port 5000");
});
exports.default = app;
