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
exports.agregarUsuariosEmpresas = exports.eliminarEmpresa = exports.actualizarEmpresa = exports.crearEmpresa = exports.obtenerEmpresa = exports.obtenerEmpresas = void 0;
const models = __importStar(require("../models"));
const helpers = __importStar(require("../helpers"));
const models_1 = require("../models");
const obtenerEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empresas = yield models.Empresa.findAll({
            where: {
                estado: true
            }
        });
        return res.json(empresas);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.obtenerEmpresas = obtenerEmpresas;
const obtenerEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const empresa = yield models.Empresa.findByPk(id)
            .catch(error => {
            return res.status(400).json({
                msg: error.errors[0].messages
            });
        });
        return res.json(empresa);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.obtenerEmpresa = obtenerEmpresa;
const crearEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.body;
        const empresa = yield models_1.Empresa.create({ nombre: helpers.estandarizarString(nombre) })
            .catch(error => {
            res.status(400).json({
                msg: error.errors[0].messages
            });
        });
        return res.json(empresa);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.crearEmpresa = crearEmpresa;
const actualizarEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const empresa = yield models.Empresa.findByPk(id)
            .catch(error => {
            res.status(400).json({
                msg: error.errors[0].messages
            });
        });
        yield (empresa === null || empresa === void 0 ? void 0 : empresa.update({ nombre: helpers.estandarizarString(nombre) }, {
            where: {
                emp_id: id
            }
        }));
        return res.json(empresa);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.actualizarEmpresa = actualizarEmpresa;
const eliminarEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const empresa = yield models_1.Empresa.findByPk(id)
            .catch(error => {
            res.status(400).json({
                msg: error.errors[0].messages
            });
        });
        yield (empresa === null || empresa === void 0 ? void 0 : empresa.update({ estado: false }, {
            where: {
                estado: false
            }
        }));
        res.json(empresa);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.eliminarEmpresa = eliminarEmpresa;
const agregarUsuariosEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, usuarios } = req.body;
        const empresa = yield models.Empresa.findOne({
            where: {
                emp_id: id,
                estado: true
            }
        });
        empresa.addUsuario(usuarios);
        return res.json(empresa);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.agregarUsuariosEmpresas = agregarUsuariosEmpresas;
//# sourceMappingURL=empresa.controller.js.map