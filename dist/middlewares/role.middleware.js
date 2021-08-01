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
exports.existeNombreRoleUpdate = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
const helpers = __importStar(require("../helpers"));
const existeNombreRoleUpdate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // obtenemos el id si es una actualizacion
        const { nombre } = req.body; // obtenemos el nombre del role         
        let filtro = {
            nombre: helpers.estandarizarString(nombre),
        };
        if (id) { // si existe el id en los parametros se agrega al filtro
            filtro = {
                nombre: helpers.estandarizarString(nombre),
                [sequelize_1.Op.not]: [{ rol_id: id }]
            };
        }
        //obtenemos el role 
        const role = yield models_1.Role.findOne({
            where: filtro
        });
        // si existe el role enviamos mensaje
        if (role) {
            return res.status(400).json({
                msg: `EL nombre de role : ${nombre} ya existe`
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
exports.existeNombreRoleUpdate = existeNombreRoleUpdate;
//# sourceMappingURL=role.middleware.js.map