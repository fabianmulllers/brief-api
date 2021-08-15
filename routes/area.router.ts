import { Router } from "express";
import { check } from 'express-validator'

import * as controllers from '../controllers'
import * as middlewares from '../middlewares'
import * as helpers from '../helpers'

export const areaRouter = Router() ;


areaRouter.get('/',[
    middlewares.validarJWT,
],
controllers.obtenerAreas);

areaRouter.get('/:id',[
    check('id').custom( helpers.existIdArea ),
    middlewares.validarJWT,
    middlewares.validarCampos
], controllers.obtenerArea);

areaRouter.post('/',[
    check('nombre','El nombres es requerido').notEmpty(),
    middlewares.validarCampos
],controllers.crearArea);


areaRouter.put('/:id',[
    check('id').custom( helpers.existIdArea ),
    middlewares.validarCampos
], controllers.actualizarArea);


areaRouter.delete('/:id',[
    check('id').custom( helpers.existIdArea ),
    middlewares.validarCampos
],controllers.eliminarArea);


areaRouter.post('/agregar-roles',controllers.agregarRoles)


areaRouter.get('/ver-roles/:id',[
    check('id').custom( helpers.existIdArea ),
    middlewares.validarJWT,
    middlewares.validarCampos
],controllers.verRoles)