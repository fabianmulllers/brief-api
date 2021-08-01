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
exports.areaRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const controllers = __importStar(require("../controllers"));
const middlewares = __importStar(require("../middlewares"));
const helpers = __importStar(require("../helpers"));
exports.areaRouter = express_1.Router();
exports.areaRouter.get('/', controllers.obtenerAreas);
exports.areaRouter.get('/:id', [
    express_validator_1.check('id').custom(helpers.existIdArea),
    middlewares.validarJWT,
    middlewares.validarCampos
], controllers.obtenerArea);
exports.areaRouter.post('/', [
    express_validator_1.check('nombre', 'El nombres es requerido').notEmpty(),
    middlewares.validarCampos
], controllers.crearArea);
exports.areaRouter.put('/:id', [
    express_validator_1.check('id').custom(helpers.existIdArea),
    middlewares.validarCampos
], controllers.actualizarArea);
exports.areaRouter.delete('/:id', [
    express_validator_1.check('id').custom(helpers.existIdArea),
    middlewares.validarCampos
], controllers.eliminarArea);
exports.areaRouter.post('/agregar-roles', controllers.agregarRoles);
exports.areaRouter.get('/ver-roles/:id', controllers.verRoles);
//# sourceMappingURL=area.router.js.map