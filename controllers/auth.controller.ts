import { Request, Response } from "express";

import * as helpers from '../helpers'
import * as models from '../models'

export const login = async( req: Request, res: Response) => {

    try {

        const { email } = req.body;
            
        //obtenemos el usuario por el email
        let usuario:any = await models.Usuario.findOne({ 
            attributes:['nombre','email','avatar'],
            where: {email:email},
            include:[
                {
                    attributes:[['are_id','id'],'nombre'],
                    model:models.Area
                },
                {
                    attributes:[['rol_id','id'],'nombre'],
                    model:models.Role
                }
            ]
        } )      

        const token = await helpers.generarJWT( usuario.email )
        usuario 
        
        
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


export const validarToken =  async( req: Request, res: Response) => {
   
    try {

        const {email} = req.usuario;

        let usuario:any = await models.Usuario.findOne({ 
            attributes:['nombre','email','avatar'],
            where: {email:email},
            include:[
                {
                    attributes:[['are_id','id'],'nombre'],
                    model:models.Area
                },
                {
                    attributes:[['rol_id','id'],'nombre'],
                    model:models.Role
                }
            ]
        } )
        
        const token = await helpers.generarJWT( usuario.email )
        
        return res.json({
            usuario,
            token: token
        });

    } catch (error) {
                                    
    
        console.log( error );
        return res.status(500).json({
            msg: helpers.errorServidor()
        })

    }

}