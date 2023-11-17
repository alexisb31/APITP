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
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var yup = require("yup");
var lowdb_1 = require("lowdb");
var FileSync_1 = require("lowdb/adapters/FileSync");
// Base de données JSON
var adapter = new FileSync_1.default('db.json');
var db = (0, lowdb_1.default)(adapter);
// Initialisation de la base de données avec un utilisateur admin par défaut si aucun utilisateur n'existe
if (!db.has('users').value()) {
    db.defaults({ users: [
            {
                "id": 1,
                "email": "test@test.com",
                "password": "test",
                "role": "admin"
            }
        ] }).write();
}
// Schéma de validation Yup pour l'utilisateur
var userSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    role: yup.string().oneOf(['admin', 'student']).required(),
});
var app = (0, express_1.default)();
var port = 3000;
// Middleware pour traiter le corps des requêtes au format JSON
app.use(body_parser_1.default.json());
// Endpoint pour ajouter un utilisateur
app.post('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, role, users, lastUser, newUserId, newUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, role = _a.role;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                // Validation des données avec Yup
                return [4 /*yield*/, userSchema.validate({ email: email, password: password, role: role })];
            case 2:
                // Validation des données avec Yup
                _b.sent();
                return [4 /*yield*/, db.get('users').value()];
            case 3:
                users = _b.sent();
                lastUser = users[users.length - 1];
                newUserId = lastUser ? Number(lastUser.id) + 1 : 1;
                newUser = { newUserId: newUserId, email: email, password: password, role: role };
                db.set('users', newUser).write();
                res.status(201).json(newUser);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                res.status(400).json({ error: error_1.message });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
