import { Router } from 'express' 
import { check } from 'express-validator';

import * as controllers from '../controllers'
import * as helpers from '../helpers'
import * as middlewares from '../middlewares'


export const usuarioRouter = Router();

usuarioRouter.get('/', controllers.obtenerUsuarios);

usuarioRouter.get('/:id',[
   check('id').custom( helpers.existeIdUsuario ),
   middlewares.validarCampos 
], controllers.obtenerUsuario);

usuarioRouter.post('/',[
    check('nombre','El nombre es requerido').notEmpty(),
    check('email','Debes ingresar un email valido').isEmail(),
    check('password','El password es requerido').notEmpty(),
    check('area','El area es requerido').notEmpty(),
    check('role','El role es requerido').notEmpty(),
    middlewares.validarCampos,
    check('area').custom(helpers.existIdArea),
    check('role').custom(helpers.existeIdRole),
    middlewares.existEmailUsuario,
    middlewares.validarCampos
],controllers.crearUsuario);

usuarioRouter.put('/:id',[
    check('id').custom( helpers.existeIdUsuario ),
    middlewares.validarCampos
], controllers.actualizarUsuario);

usuarioRouter.delete('/:id',[
    check('id').custom( helpers.existeIdUsuario ),
    middlewares.validarCampos
], controllers.eliminarUsuario);
