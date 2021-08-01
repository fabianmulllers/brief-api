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
exports.verRoles = exports.agregarRoles = exports.eliminarArea = exports.actualizarArea = exports.crearArea = exports.obtenerArea = exports.obtenerAreas = void 0;
const helpers = __importStar(require("../helpers"));
const models_1 = require("../models");
const role_model_1 = require("../models/role.model");
const obtenerAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areas = yield models_1.Area.findAll({ where: { estado: true } });
        return res.json(areas);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor
        });
    }
});
exports.obtenerAreas = obtenerAreas;
const obtenerArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const area = yield models_1.Area.findByPk(id);
        return res.json(area);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor
        });
    }
});
exports.obtenerArea = obtenerArea;
const crearArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.body;
        const area = yield models_1.Area.create({ nombre });
        return res.json(area);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor
        });
    }
});
exports.crearArea = crearArea;
const actualizarArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const area = yield models_1.Area.findByPk(id);
        yield (area === null || area === void 0 ? void 0 : area.update({ nombre }, { where: { are_id: id } }));
        return res.json(area);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor
        });
    }
});
exports.actualizarArea = actualizarArea;
const eliminarArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const area = yield models_1.Area.findByPk(id);
        yield (area === null || area === void 0 ? void 0 : area.update({ estado: false }, { where: { are_id: id } }));
        return res.json(area);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor
        });
    }
});
exports.eliminarArea = eliminarArea;
const agregarRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, role } = req.body;
        const area = yield models_1.Area.findByPk(id);
        area.addRoles(role);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.agregarRoles = agregarRoles;
const verRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // await Area.findByPk( id ).then( (area:any) => {
        //     area.getRoles( { attributes:['nombre'] } ).then( (roles:any) => { 
        //         res.json( roles );
        //     })
        // })
        const area = yield models_1.Area.findByPk(id, { include: {
                model: role_model_1.Role,
                attributes: ['nombre']
            } });
        res.json(area);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.verRoles = verRoles;
//# sourceMappingURL=area.controller.js.map