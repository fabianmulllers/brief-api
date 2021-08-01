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
exports.eliminarTipoBrief = exports.actualizarTipoBrief = exports.crearTipoBrief = exports.obtenerTipoBrief = exports.obtenerTipoBriefs = void 0;
const models = __importStar(require("../models"));
const helpers = __importStar(require("../helpers"));
const obtenerTipoBriefs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tipoBrief = yield models.TipoBrief.findAll({
            attributes: [['tib_id', 'id'], 'nombre'],
            where: {
                estado: true
            }
        });
        return res.json(tipoBrief);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.obtenerTipoBriefs = obtenerTipoBriefs;
const obtenerTipoBrief = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tipoBrief = yield models.TipoBrief.findOne({
            attributes: [['tib_id', 'id'], 'nombre'],
            where: {
                tib_id: id,
                estado: true
            }
        });
        return res.json(tipoBrief);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.obtenerTipoBrief = obtenerTipoBrief;
const crearTipoBrief = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.body;
        const crearTipoBrief = yield models.TipoBrief.create({ nombre });
        const tipoBrief = yield models.TipoBrief.findOne({
            attributes: [['tib_id', 'id'], 'nombre'],
            where: {
                tib_id: crearTipoBrief.tib_id,
            }
        });
        return res.json(tipoBrief);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.crearTipoBrief = crearTipoBrief;
const actualizarTipoBrief = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const tipoBrief = yield models.TipoBrief.findOne({
            where: {
                estado: true,
                tib_id: id
            }
        });
        yield (tipoBrief === null || tipoBrief === void 0 ? void 0 : tipoBrief.update({ nombre }, {
            where: {
                tib_id: id
            }
        }));
        const tipoBriefResp = yield models.TipoBrief.findOne({
            attributes: [['tib_id', 'id'], 'nombre'],
            where: {
                tib_id: id
            }
        });
        return res.json(tipoBriefResp);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.actualizarTipoBrief = actualizarTipoBrief;
const eliminarTipoBrief = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tipoBrief = yield models.TipoBrief.findByPk(id);
        yield (tipoBrief === null || tipoBrief === void 0 ? void 0 : tipoBrief.update({ estado: false }, {
            where: {
                tib_id: id
            }
        }));
        return res.json(tipoBrief);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.eliminarTipoBrief = eliminarTipoBrief;
//# sourceMappingURL=tipo-brief.controller.js.map