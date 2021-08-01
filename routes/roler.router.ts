import { Router } from 'express';
import { check } from 'express-validator'

import * as controllers  from '../controllers'
import * as helpers from '../helpers'
import * as middlewares from  '../middlewares'

export const roleRouter = Router();


roleRouter.get('/', controllers.obtenerRoles);

roleRouter.get('/:id',[
    check('id').custom( helpers.existeIdRole ),
    middlewares.validarCampos
] ,controllers.obtenerRole );

roleRouter.post('/',[
    check('nombre','El nombre es requerido').notEmpty(),
    middlewares.validarCampos, 
    // check('nombre').custom( helpers.existeNombreRole),
    middlewares.existeNombreRoleUpdate,
    middlewares.validarCampos    

],controllers.crearRole );

roleRouter.put('/:id',[
    check('nombre','El nombre es requerido').notEmpty(),
    check('id').custom( helpers.existeIdRole ),
    middlewares.validarCampos, 
    middlewares.existeNombreRoleUpdate,
    middlewares.validarCampos    
], controllers.actualizarRole );

roleRouter.delete('/:id',[
    check('id').custom( helpers.existeIdRole ),
], controllers.eliminarRole );
