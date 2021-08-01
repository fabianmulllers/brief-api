import { Router } from "express";
import { check } from "express-validator";

import * as controllers from '../controllers'
import * as helpers from '../helpers'
import * as middlewares from '../middlewares'

export const empresaRouter = Router();

empresaRouter.get('/',[
    middlewares.validarJWT
],controllers.obtenerEmpresas);

empresaRouter.get('/:id',[

    middlewares.validarJWT,
    check('id').custom( helpers.existeIdEmpresa ),
    middlewares.validarCampos
],controllers.obtenerEmpresa);

empresaRouter.post('/',[
    middlewares.validarJWT,
    check('nombre','EL nombre es requerido').notEmpty(),
    middlewares.validarCampos,
    middlewares.existeNombreEmpresa,
],controllers.crearEmpresa);

empresaRouter.put('/:id',[
    middlewares.validarJWT,
    check('id').custom( helpers.existeIdEmpresa ),
    check('nombre','EL nombre es requerido').notEmpty(),
    middlewares.validarCampos,
    middlewares.existeNombreEmpresa,
],controllers.actualizarEmpresa);

empresaRouter.delete('/:id',[
    middlewares.validarJWT,
    check('id').custom( helpers.existeIdEmpresa ),
    middlewares.validarCampos
],controllers.eliminarEmpresa)

empresaRouter.post('/agregar-usuarios/:id',[
    middlewares.validarJWT,
    check('id').custom( helpers.existeIdEmpresa ),
    check('usuarios','debes agregar los usuarios').notEmpty(),
    middlewares.validarCampos
],controllers.agregarUsuariosEmpresas)