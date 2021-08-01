import { NextFunction, Request, Response } from "express";
import { Op } from 'sequelize';

import { Role } from "../models";
import * as helpers from '../helpers'

export const existeNombreRoleUpdate = async ( req: Request, res: Response, next: NextFunction) => {
    
    try {

        const { id } = req.params // obtenemos el id si es una actualizacion
        const { nombre } = req.body // obtenemos el nombre del role         

        let filtro: any =  { // se crea el filtro por el nombre
            nombre: helpers.estandarizarString(nombre),
        }
    
        if( id  ){ // si existe el id en los parametros se agrega al filtro
            filtro = {
                nombre: helpers.estandarizarString(nombre),
                [Op.not]: [{rol_id : id }]
            }         
        }
        
        //obtenemos el role 
        const role = await Role.findOne( { 
            where: filtro
        } )

        // si existe el role enviamos mensaje
        if( role ){
            return res.status(400).json({
                msg:`EL nombre de role : ${ nombre } ya existe`
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