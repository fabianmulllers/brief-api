import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

import { Usuario } from "../models";
export interface IGetUserAuthInfoRequest extends Request {
    usuario: string // or any other type
}


export const validarJWT = async ( req: Request, res: Response, next: NextFunction) => {

    const token = req.header('x-token');

    if( !token){

        return res.status(401).json({
            msg: "no hay token en la peticion"
        });
    }

    try {
        
        //obtenemos el payload de el token
        const { email }: any = jwt.verify( token!, process.env.SECRETPRIVATEKEY! );
    
        //verificamos si el usuario existe 
        const usuario: any = await Usuario.findOne({ where:{ email: email } } );
        if(!usuario){
            return res.status(401).json({
                msg:'token no valido - usuario no existe en BD'
            })
        }
        // verificamos si el usuario esta en estado activo
        if( !usuario.estado ){
            return res.status(401).json({
                msg:'el usuario esta desactivado'
            })
        }

        req.usuario = usuario;

        next()
        
    } catch (error) {
        console.log( error );
        return res.status(401).json({
            msg:'Token no valido'
        })
    }

    

}

