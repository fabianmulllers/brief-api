import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import * as helpers from '../helpers'

export const validarCampos = (req: Request, res: Response, next: NextFunction) => {
    
    try {    
        
        // verificamos si existen errores en los campos validados
        const errors = validationResult( req );
        if( !errors.isEmpty() ){
            return res.status(400).json(errors)
        }
        
        next();
    } catch (error) {

        console.log( error );
        return res.status(500).json({
            msg: helpers.errorServidor()
        })

    }
}