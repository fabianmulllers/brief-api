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
exports.eliminarCliente = exports.actualizarCliente = exports.agregarCliente = exports.obtenerCliente = exports.obtenerClientes = void 0;
const models = __importStar(require("../models"));
const helpers = __importStar(require("../helpers"));
const obtenerClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientes = yield models.Cliente.findAll({
            attributes: [['cli_id', 'id'], 'nombre'],
            where: {
                estado: true
            },
            include: {
                model: models.Empresa,
                attributes: ['nombre', ['emp_id', 'id']]
            }
        })
            .catch(error => {
            return res.status(400).json({
                msg: error.errors[0].messages
            });
        });
        return res.json(clientes);
        return;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.obtenerClientes = obtenerClientes;
const obtenerCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cliente = yield models.Cliente.findOne({
            attributes: [['cli_id', 'id'], 'nombre'],
            where: {
                estado: true
            },
            include: {
                model: models.Empresa,
                attributes: ['nombre', ['emp_id', 'id']]
            }
        })
            .catch(error => {
            return res.status(400).json({
                msg: error.errors[0].messages
            });
        });
        return res.json(cliente);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.obtenerCliente = obtenerCliente;
const agregarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, empresa } = req.body;
        const crearCliente = yield models.Cliente.create({
            nombre: helpers.estandarizarString(nombre),
            emp_id: empresa
        })
            .catch(error => {
            return res.status(400).json({
                msg: error.errors[0].messages
            });
        });
        const cliente = yield models.Cliente.findOne({
            attributes: [['cli_id', 'id'], 'nombre'],
            where: {
                cli_id: crearCliente.cli_id
            },
            include: {
                model: models.Empresa,
                attributes: ['nombre', ['emp_id', 'id']]
            }
        });
        return res.json(cliente);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.agregarCliente = agregarCliente;
const actualizarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre, empresa } = req.body;
        const cliente = yield models.Cliente.findByPk(id);
        yield (cliente === null || cliente === void 0 ? void 0 : cliente.update({
            nombre: helpers.estandarizarString(nombre),
            emp_id: empresa
        }));
        return res.json(cliente);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.actualizarCliente = actualizarCliente;
const eliminarCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const cliente = yield models.Cliente.findByPk(id);
        cliente === null || cliente === void 0 ? void 0 : cliente.update({ estado: false }, { where: {
                emp_id: id
            } });
        return res.json(cliente);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.eliminarCliente = eliminarCliente;
//# sourceMappingURL=cliente.controller.js.map