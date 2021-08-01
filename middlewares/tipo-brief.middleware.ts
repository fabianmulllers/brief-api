import { NextFunction, Request, Response } from "express";
import { Op } from 'sequelize'
import * as models from '../models'
import * as helpers from '../helpers'


export const existeNombreTipoBrief = async( req: Request, res: Response, next: NextFunction ) => {
    
    
    try {
        
        const { id } = req.params;
        const { nombre } = req.body;
        
        console.log( nombre )
        if( !nombre ){
            next();
            return;
        }
        
        let filtro;
        if( id ){
            
            filtro = {
                [Op.not] : [{tib_id: id}],
                nombre: nombre
            }
    
        }else{
    
            filtro = {
                nombre: nombre
            }
        }
    
        const tipoBrief = await models.TipoBrief.findOne( { 
            where: filtro
        })

        if( tipoBrief ){
            return res.status(400).json({
                msg: `EL tipo brief con el nombre: ${ nombre } ya existe`
            })
        }
        
        next();
    
    } catch (error) {
        
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }

}