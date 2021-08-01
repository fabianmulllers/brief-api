import { NextFunction, Request, Response } from "express";
import { Op } from 'sequelize'
import * as helpers from '../helpers'
import { Empresa } from '../models/empresa.model';



export const existeNombreEmpresa = async ( req: Request, res: Response, next: NextFunction ) => {

    try {

        const { id } = req.params;
        const { nombre }= req.body;
    
        if( !nombre ){
            next();
        }

        let filter;
        if( id ){   
            filter = {
                [Op.not] : [{ emp_id: id }],
                nombre: helpers.estandarizarString(nombre),
                estado: true
            }
        }else{
            filter = {
                nombre: helpers.estandarizarString(nombre),
                estado: true
            }
        }
    
        const empresa = await Empresa.findOne( { where: filter } );

        if( empresa ){
            return res.status(400).json({
                msg:`Ya existe una empresa con el nombre ${ nombre }`
            })
        }
            
        next();

    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }


}