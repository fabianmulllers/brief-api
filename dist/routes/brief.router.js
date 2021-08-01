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
exports.briefRouter = void 0;
const express_1 = require("express");
const controllers = __importStar(require("../controllers"));
const middlewares = __importStar(require("../middlewares"));
const helpers = __importStar(require("../helpers"));
const express_validator_1 = require("express-validator");
exports.briefRouter = express_1.Router();
exports.briefRouter.get('/', [
    middlewares.validarJWT
], controllers.obtenerBriefs);
exports.briefRouter.get('/:id', [
    middlewares.validarJWT,
    express_validator_1.check('id').custom(helpers.existeIdBrief),
    middlewares.validarCampos
], controllers.obtenerBrief);
exports.briefRouter.post('/', [
    middlewares.validarJWT,
    express_validator_1.check('titulo', 'El titulo es requerido').notEmpty(),
    express_validator_1.check('descripcion', 'La descripcion es requerido').notEmpty(),
    express_validator_1.check('cliente', 'El cliente es requerido').notEmpty(),
    express_validator_1.check('tipo_brief', 'EL tipo de brief es requerido').notEmpty(),
    middlewares.validarCampos,
    express_validator_1.check('cliente').custom(helpers.existeIdCliente),
    express_validator_1.check('tipo_brief').custom(helpers.existeIdTipoBrief),
    middlewares.validarCampos,
], controllers.crearBrief);
exports.briefRouter.put('/:id', [
    middlewares.validarJWT,
    express_validator_1.check('id').custom(helpers.existeIdBrief),
    express_validator_1.check('cliente').custom(helpers.existeIdCliente).optional(),
    express_validator_1.check('tipo_brief').custom(helpers.existeIdTipoBrief).optional(),
    middlewares.validarCampos
], controllers.actualizarBrief);
exports.briefRouter.delete('/:id', [
    middlewares.validarJWT,
    express_validator_1.check('id').custom(helpers.existeIdBrief),
    middlewares.validarCampos
], controllers.eliminarBrief);
exports.briefRouter.post('/agregar-comentario', [
    middlewares.validarJWT,
    express_validator_1.check('brief', 'El campo brief es requerido').notEmpty(),
    middlewares.validarCampos,
    express_validator_1.check('brief').custom(helpers.existeIdBrief),
    express_validator_1.check('comentario', 'El comentario es requerido').notEmpty(),
    middlewares.validarCampos
], controllers.agregarComentario);
//# sourceMappingURL=brief.router.js.map