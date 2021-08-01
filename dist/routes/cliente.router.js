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
exports.clienteRouter = void 0;
const express_1 = require("express");
const controllers = __importStar(require("../controllers"));
const middlewares = __importStar(require("../middlewares"));
const helpers = __importStar(require("../helpers"));
const express_validator_1 = require("express-validator");
exports.clienteRouter = express_1.Router();
exports.clienteRouter.get('/', [
    middlewares.validarJWT
], controllers.obtenerClientes);
exports.clienteRouter.get('/:id', [
    middlewares.validarJWT,
    express_validator_1.check('id').custom(helpers.existeIdCliente),
    middlewares.validarCampos
], controllers.obtenerCliente);
exports.clienteRouter.post('/', [
    middlewares.validarJWT,
    express_validator_1.check('nombre', 'El nombre de cliente es requerido').notEmpty(),
    express_validator_1.check('empresa', 'La empresa es requerido').notEmpty(),
    middlewares.validarCampos,
    express_validator_1.check('empresa').custom(helpers.existeIdEmpresa),
    middlewares.validarCampos,
    middlewares.existeNombreCliente
], controllers.agregarCliente);
exports.clienteRouter.put('/:id', [
    middlewares.validarJWT,
    express_validator_1.check('id').custom(helpers.existeIdCliente),
    express_validator_1.check('empresa').custom(helpers.existeIdEmpresa),
    middlewares.existeNombreCliente,
    middlewares.validarCampos
], controllers.actualizarCliente);
exports.clienteRouter.delete('/:id', [
    middlewares.validarJWT,
    express_validator_1.check('id').custom(helpers.existeIdCliente),
    middlewares.validarCampos
], controllers.eliminarCliente);
//# sourceMappingURL=cliente.router.js.map