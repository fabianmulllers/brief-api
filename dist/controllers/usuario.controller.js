"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuario = exports.actualizarUsuario = exports.crearUsuario = exports.obtenerUsuario = exports.obtenerUsuarios = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const helpers = __importStar(require("../helpers"));
const models_1 = require("../models");
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield models_1.Usuario.findAll({
            where: { estado: true },
            attributes: [['usu_id', 'id'], 'nombre', 'email', 'avatar', 'estado'],
            include: [
                {
                    model: models_1.Area,
                    attributes: [['are_id', 'id'], 'nombre']
                },
                {
                    model: models_1.Role,
                    attributes: [['rol_id', 'id'], 'nombre']
                }
            ],
        });
        return res.json(usuarios);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.obtenerUsuarios = obtenerUsuarios;
const obtenerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const usuario = yield models_1.Usuario.findOne({
            where: {
                estado: true,
                usu_id: id
            },
            attributes: [['usu_id', 'id'], 'nombre', 'email', 'avatar', 'estado'],
            include: [
                {
                    model: models_1.Area,
                    attributes: [['are_id', 'id'], 'nombre']
                },
                {
                    model: models_1.Role,
                    attributes: [['rol_id', 'id'], 'nombre']
                }
            ],
        });
        return res.json(usuario);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.obtenerUsuario = obtenerUsuario;
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { area, role } = _a, user = __rest(_a, ["area", "role"]);
        const salt = bcrypt_1.default.genSaltSync();
        user.password = bcrypt_1.default.hashSync(user.password, salt);
        user.are_id = area;
        user.rol_id = role;
        const usuario = yield models_1.Usuario.create(user)
            .catch((error) => {
            return res.status(400).json({
                msg: error.errors[0].message
            });
        });
        const resp = yield models_1.Usuario.findByPk(usuario.usu_id, {
            attributes: [['usu_id', 'id'], 'nombre', 'email', 'avatar', 'estado'],
            include: [
                {
                    model: models_1.Area,
                    attributes: [['are_id', 'id'], 'nombre']
                },
                {
                    model: models_1.Role,
                    attributes: [['rol_id', 'id'], 'nombre']
                }
            ]
        });
        return res.json(resp);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.crearUsuario = crearUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _b = req.body, { estado, password, role, area } = _b, user = __rest(_b, ["estado", "password", "role", "area"]);
        const usuario = yield models_1.Usuario.findByPk(id);
        if (password) {
            const salt = bcrypt_1.default.genSaltSync();
            user.password = bcrypt_1.default.hashSync(password, salt);
        }
        (role) ? user.rol_id = role : '';
        (area) ? user.are_id = area : '';
        yield (usuario === null || usuario === void 0 ? void 0 : usuario.update(user, {
            where: { usu_id: id }
        }));
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "verificar"
        });
    }
});
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const usuario = yield models_1.Usuario.findByPk(id);
        yield (usuario === null || usuario === void 0 ? void 0 : usuario.update({ estado: false }, { where: { usu_id: id } }));
        return res.json(usuario);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.eliminarUsuario = eliminarUsuario;
//# sourceMappingURL=usuario.controller.js.map