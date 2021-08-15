import { NextFunction, Request, Response } from "express";
import { Op } from 'sequelize'
import * as helpers from '../helpers'
import * as models from '../models'

export const existeNombreCliente = async ( req: Request, res: Response, next: NextFunction ) => {

    try {
    
        const { id } = req.params;
        const { nombre } = req.body;
        
        //si no existe el nombre no lo validamos
        if(! nombre ){
            next()
        }

        let filtro;
        if( id ){
            
            filtro = {
                [Op.not] : [{ cli_id: id }],
                nombre: helpers.estandarizarString( nombre ),
                estado: true
            }
    
        }else{
    
            filtro = {
                nombre: helpers.estandarizarString( nombre ),
                estado: true
             }
    
        }
    
        const cliente = await models.Cliente.findOne( { where: filtro });
    
        if( cliente ){
            
            return res.status(400).json({
                msg: `EL cliente con el nombre: ${ nombre } ya existe`
            })
        }
    
        next()
    

    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            msg: helpers.errorServidor()
        })
    }

}