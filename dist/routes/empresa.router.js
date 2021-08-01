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
Object.defineProperty(exports, "__esModule", { value: true });
exports.empresaRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers = __importStar(require("../controllers"));
const helpers = __importStar(require("../helpers"));
const middlewares = __importStar(require("../middlewares"));
exports.empresaRouter = express_1.Router();
exports.empresaRouter.get('/', [
    middlewares.validarJWT
], controllers.obtenerEmpresas);
exports.empresaRouter.get('/:id', [
    middlewares.validarJWT,
    express_validator_1.check('id').custom(helpers.existeIdEmpresa),
    middlewares.validarCampos
], controllers.obtenerEmpresa);
exports.empresaRouter.post('/', [
    middlewares.validarJWT,
    express_validator_1.check('nombre', 'EL nombre es requerido').notEmpty(),
    middlewares.validarCampos,
    middlewares.existeNombreEmpresa,
], controllers.crearEmpresa);
exports.empresaRouter.put('/:id', [
    middlewares.validarJWT,
    express_validator_1.check('id').custom(helpers.existeIdEmpresa),
    express_validator_1.check('nombre', 'EL nombre es requerido').notEmpty(),
    middlewares.validarCampos,
    middlewares.existeNombreEmpresa,
], controllers.actualizarEmpresa);
exports.empresaRouter.delete('/:id', [
    middlewares.validarJWT,
    express_validator_1.check('id').custom(helpers.existeIdEmpresa),
    middlewares.validarCampos
], controllers.eliminarEmpresa);
exports.empresaRouter.post('/agregar-usuarios/:id', [
    middlewares.validarJWT,
    express_validator_1.check('id').custom(helpers.existeIdEmpresa),
    express_validator_1.check('usuarios', 'debes agregar los usuarios').notEmpty(),
    middlewares.validarCampos
], controllers.agregarUsuariosEmpresas);
//# sourceMappingURL=empresa.router.js.map