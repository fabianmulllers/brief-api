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
exports.usuarioRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers = __importStar(require("../controllers"));
const helpers = __importStar(require("../helpers"));
const middlewares = __importStar(require("../middlewares"));
exports.usuarioRouter = express_1.Router();
exports.usuarioRouter.get('/', controllers.obtenerUsuarios);
exports.usuarioRouter.get('/:id', [
    express_validator_1.check('id').custom(helpers.existeIdUsuario),
    middlewares.validarCampos
], controllers.obtenerUsuario);
exports.usuarioRouter.post('/', [
    express_validator_1.check('nombre', 'El nombre es requerido').notEmpty(),
    express_validator_1.check('email', 'Debes ingresar un email valido').isEmail(),
    express_validator_1.check('password', 'El password es requerido').notEmpty(),
    express_validator_1.check('area', 'El area es requerido').notEmpty(),
    express_validator_1.check('role', 'El role es requerido').notEmpty(),
    middlewares.validarCampos,
    express_validator_1.check('area').custom(helpers.existIdArea),
    express_validator_1.check('role').custom(helpers.existeIdRole),
    middlewares.existEmailUsuario,
    middlewares.validarCampos
], controllers.crearUsuario);
exports.usuarioRouter.put('/:id', [
    express_validator_1.check('id').custom(helpers.existeIdUsuario),
    middlewares.validarCampos
], controllers.actualizarUsuario);
exports.usuarioRouter.delete('/:id', [
    express_validator_1.check('id').custom(helpers.existeIdUsuario),
    middlewares.validarCampos
], controllers.eliminarUsuario);
//# sourceMappingURL=usuario.route.js.map