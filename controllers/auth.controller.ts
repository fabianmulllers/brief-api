import { Request, Response } from "express";
import bcrypt from 'bcrypt';



import { Usuario } from '../models/usuario.model';
import * as helpers from '../helpers'


export const login = async( req: Request, res: Response) => {
        

    try {

        const { email, password } = req.body;
            
        //obtenemos el usuario por el email
        const usuario:any = await Usuario.findOne({ where: {email:email} } )
        if( !usuario ){
            return res.status(400).json({
                msg:`No existe un usuario con el email`
            })
        }
        console.log( usuario );
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

        const token = await helpers.generarJWT( usuario.email )
        
        
        return res.json({ 
            usuario,
            token 
        })
        
    } catch (error) {

            
        console.log( error );
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }


}