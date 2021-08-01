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
exports.existeNombreEmpresa = void 0;
const sequelize_1 = require("sequelize");
const helpers = __importStar(require("../helpers"));
const empresa_model_1 = require("../models/empresa.model");
const existeNombreEmpresa = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        if (!nombre) {
            next();
        }
        let filter;
        if (id) {
            filter = {
                [sequelize_1.Op.not]: [{ emp_id: id }],
                nombre: helpers.estandarizarString(nombre),
                estado: true
            };
        }
        else {
            filter = {
                nombre: helpers.estandarizarString(nombre),
                estado: true
            };
        }
        const empresa = yield empresa_model_1.Empresa.findOne({ where: filter });
        if (empresa) {
            return res.status(400).json({
                msg: `Ya existe una empresa con el nombre ${nombre}`
            });
        }
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.existeNombreEmpresa = existeNombreEmpresa;
//# sourceMappingURL=empresa.middleware.js.map