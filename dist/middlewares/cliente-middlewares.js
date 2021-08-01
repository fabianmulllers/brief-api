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
exports.existeNombreCliente = void 0;
const sequelize_1 = require("sequelize");
const helpers = __importStar(require("../helpers"));
const models = __importStar(require("../models"));
const existeNombreCliente = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        //si no existe el nombre no lo validamos
        if (!nombre) {
            next();
        }
        let filtro;
        if (id) {
            filtro = {
                [sequelize_1.Op.not]: [{ cli_id: id }],
                nombre: helpers.estandarizarString(nombre)
            };
        }
        else {
            filtro = {
                nombre: helpers.estandarizarString(nombre)
            };
        }
        const cliente = yield models.Cliente.findOne({ where: filtro });
        if (cliente) {
            return res.status(400).json({
                msg: `EL cliente con el nombre: ${nombre} ya existe`
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
exports.existeNombreCliente = existeNombreCliente;
//# sourceMappingURL=cliente-middlewares.js.map