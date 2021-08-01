import { Router } from "express";

import * as controllers from '../controllers'
import * as middlewares from '../middlewares'
import * as helpers from '../helpers'
import { check } from "express-validator";


export const clienteRouter = Router();

clienteRouter.get('/',[
    middlewares.validarJWT
],controllers.obtenerClientes)

clienteRouter.get('/:id',[
    middlewares.validarJWT,
    check('id').custom(helpers.existeIdCliente),
    middlewares.validarCampos
], controllers.obtenerCliente)

clienteRouter.post('/',[
    middlewares.validarJWT,
    check('nombre','El nombre de cliente es requerido').notEmpty(),
    check('empresa','La empresa es requerido').notEmpty(),
    middlewares.validarCampos,
    check('empresa').custom( helpers.existeIdEmpresa ),
    middlewares.validarCampos,
    middlewares.existeNombreCliente
],controllers.agregarCliente)

clienteRouter.put('/:id',[
    middlewares.validarJWT,
    check('id').custom(helpers.existeIdCliente),
    check('empresa').custom( helpers.existeIdEmpresa),
    middlewares.existeNombreCliente,
    middlewares.validarCampos
],controllers.actualizarCliente)

clienteRouter.delete('/:id',[
    middlewares.validarJWT,
    check('id').custom(helpers.existeIdCliente),
    middlewares.validarCampos
],controllers.eliminarCliente)


