import { Router } from "express";

import * as controllers from '../controllers'
import * as middlewares from '../middlewares'
import * as helpers from '../helpers'
import { check } from "express-validator";
import { existeIdTipoBrief } from '../helpers/tipo-brief.validator';


export const briefRouter = Router();

briefRouter.get('/',[
    middlewares.validarJWT
],controllers.obtenerBriefs);

briefRouter.get('/:id',[
    middlewares.validarJWT,
    check('id').custom(helpers.existeIdBrief),
    middlewares.validarCampos
], controllers.obtenerBrief);

briefRouter.post('/',[
    middlewares.validarJWT,
    check('titulo','El titulo es requerido').notEmpty(),
    check('descripcion','La descripcion es requerido').notEmpty(),
    check('cliente','El cliente es requerido').notEmpty(),
    check('tipo_brief','EL tipo de brief es requerido').notEmpty(),
    middlewares.validarCampos,
    check('cliente').custom( helpers.existeIdCliente ),
    check('tipo_brief').custom( helpers.existeIdTipoBrief),
    middlewares.validarCampos,

],controllers.crearBrief);

briefRouter.put('/:id',[
    middlewares.validarJWT,
    check('id').custom(helpers.existeIdBrief),
    check('cliente').custom( helpers.existeIdCliente ).optional(),
    check('tipo_brief').custom( helpers.existeIdTipoBrief).optional(),
    middlewares.validarCampos
], controllers.actualizarBrief);

briefRouter.delete('/:id',[
    middlewares.validarJWT,
    check('id').custom(helpers.existeIdBrief),
    middlewares.validarCampos
], controllers.eliminarBrief);

briefRouter.post('/agregar-comentario',[
    middlewares.validarJWT,
    check('brief','El campo brief es requerido').notEmpty(),
    middlewares.validarCampos,
    check('brief').custom(helpers.existeIdBrief),
    check('comentario','El comentario es requerido').notEmpty(),
    middlewares.validarCampos
], controllers.agregarComentario)

