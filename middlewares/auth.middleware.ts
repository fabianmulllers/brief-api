import { NextFunction, Request, Response } from "express"
import * as models from '../models'
import bcrypt from 'bcrypt'





export const verificarUsuario = async( req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;
    const usuario: any = await models.Usuario.findOne({ 
        where: { email }
    })
    
    // verificamos si el usuario existe
    if( !usuario ){
        return res.status(400).json({
            msg:`No existe un usuario con el email`
        })
    }
    // verificamos si el usuarioe sta activo
    if( !usuario.estado){
        return res.status(400).json({
            msg:`El usuario actualmente esta inactivo`
        })
    }

    //verificamos si el password esta correcto
    if( !bcrypt.compareSync( password, usuario.password ) ){
        
        return res.status(400).json({
            msg:`El password ingresado es incorrecto`
        })
    }

    next()
}