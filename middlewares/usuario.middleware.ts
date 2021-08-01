import { NextFunction, Request, Response, text } from "express"
import { Op, QueryInterface } from 'sequelize'

import * as helpers from '../helpers'
import { Usuario } from "../models";




export const existEmailUsuario = async ( req: Request, res: Response, next: NextFunction ) => {


    try {
        
        const { id } = req.params;
        const { email } = req.body;
        
        let filtro;
        if( id ){
            filtro = {
                where:{
                    [Op.not]: [{usu_id: id}],
                    email : email
                }
            }
        }else{
            filtro = {
                where:{
                    email : email
                }
            }
        }

        const usuario = await Usuario.findOne(filtro)
    
        if( usuario ){
            return res.status(400).json({
                msg: `El email : ${ email } ya esta asignado a otro usuario`
            })
        }

        next()

    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }


}