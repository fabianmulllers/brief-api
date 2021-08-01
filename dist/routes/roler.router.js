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
exports.roleRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers = __importStar(require("../controllers"));
const helpers = __importStar(require("../helpers"));
const middlewares = __importStar(require("../middlewares"));
exports.roleRouter = express_1.Router();
exports.roleRouter.get('/', controllers.obtenerRoles);
exports.roleRouter.get('/:id', [
    express_validator_1.check('id').custom(helpers.existeIdRole),
    middlewares.validarCampos
], controllers.obtenerRole);
exports.roleRouter.post('/', [
    express_validator_1.check('nombre', 'El nombre es requerido').notEmpty(),
    middlewares.validarCampos,
    // check('nombre').custom( helpers.existeNombreRole),
    middlewares.existeNombreRoleUpdate,
    middlewares.validarCampos
], controllers.crearRole);
exports.roleRouter.put('/:id', [
    express_validator_1.check('nombre', 'El nombre es requerido').notEmpty(),
    express_validator_1.check('id').custom(helpers.existeIdRole),
    middlewares.validarCampos,
    middlewares.existeNombreRoleUpdate,
    middlewares.validarCampos
], controllers.actualizarRole);
exports.roleRouter.delete('/:id', [
    express_validator_1.check('id').custom(helpers.existeIdRole),
], controllers.eliminarRole);
//# sourceMappingURL=roler.router.js.map