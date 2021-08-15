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
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarRole = exports.actualizarRole = exports.crearRole = exports.obtenerRole = exports.obtenerRoles = void 0;
const models_1 = require("../models");
const helpers = __importStar(require("../helpers"));
const obtenerRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // obtenemos todos los roles con estado: true (No han sido eliminado)
        const roles = yield models_1.Role.findAll({
            attributes: [['rol_id', 'id'], 'nombre'],
            where: { estado: true }
        });
        return res.json(roles);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.obtenerRoles = obtenerRoles;
const obtenerRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const role = yield models_1.Role.findOne({
            attributes: [['rol_id', 'id'], 'nombre'],
            where: {
                estado: true,
                rol_id: id
            }
        });
        return res.json(role);
    }
    catch (error) {
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.obtenerRole = obtenerRole;
const crearRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //obtenemos el nombre y guardamos en base de datos
        let { nombre } = req.body;
        nombre = helpers.estandarizarString(nombre);
        const role = yield models_1.Role.create({ nombre });
        res.json(role);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.crearRole = crearRole;
const actualizarRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const role = yield models_1.Role.findByPk(id);
        yield role.update({ nombre }, { where: { rol_id: id } });
        res.json(role);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.actualizarRole = actualizarRole;
const eliminarRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const role = yield models_1.Role.findByPk(id);
        yield (role === null || role === void 0 ? void 0 : role.update({ estado: false }, { where: { rol_id: id } }));
        res.json(role);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.eliminarRole = eliminarRole;
//# sourceMappingURL=role.controller.js.map