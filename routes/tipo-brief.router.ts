import { Router } from "express";
import { check } from "express-validator";

import * as controllers from '../controllers'
import * as helpers from '../helpers'
import * as middlewares from '../middlewares'
import { validarCampos } from '../middlewares/validar-campos';


export const tipoBriefRouter = Router();

tipoBriefRouter.get('/',[
    middlewares.validarJWT
], controllers.obtenerTipoBriefs);

tipoBriefRouter.get('/:id',[
    middlewares.validarJWT,
    check('id').custom( helpers.existeIdTipoBrief ),
    middlewares.validarCampos
], controllers.obtenerTipoBrief);

tipoBriefRouter.post('/',[
    middlewares.validarJWT,
    check('nombre','El nombre es requerido').notEmpty(),
    middlewares.validarCampos,
    middlewares.existeNombreTipoBrief,
],controllers.crearTipoBrief);

tipoBriefRouter.put('/:id',[
    middlewares.validarJWT,
    check('id').custom( helpers.existeIdTipoBrief ),
    check('nombre','El nombre es requerido').notEmpty(),
    middlewares.validarCampos,
    middlewares.existeNombreTipoBrief,
], controllers.actualizarTipoBrief);

tipoBriefRouter.delete('/:id',[
    middlewares.validarJWT,
    check('id').custom( helpers.existeIdTipoBrief ),
    middlewares.validarCampos
], controllers.eliminarTipoBrief);
