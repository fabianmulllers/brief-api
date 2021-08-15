import { Request, Response } from "express"

import * as models from '../models'
import * as helpers from '../helpers'
import { Empresa } from "../models";
import { estandarizarString } from '../helpers/auxiliares';

export const obtenerEmpresas = async ( req:Request, res:Response ) => {

    try {
        
        const empresas = await models.Empresa.findAll( { 
            attributes:[['emp_id','id'],'nombre'],
            where: {
                estado: true
            }
        });

        return res.json( empresas );
        
    } catch (error) {

        console.log( error )
        return res.status(500).json({
            msg:helpers.errorServidor()
        })

    }
    
}

export const obtenerEmpresa = async ( req:Request, res:Response ) => {

    try {
        
        const { id } = req.params;
        
        const empresa = await models.Empresa.findByPk( 
            id,
            {
                attributes:[['emp_id','id'], 'nombre']
            }
        )
            .catch( error => {
                return res.status(400).json({
                     msg: error.errors[0].messages  
                })
            });

        return res.json( empresa );

    } catch (error) {
        
        console.log( error )
        return res.status(500).json({
            msg:helpers.errorServidor()
        })

    }

    
}



export const crearEmpresa = async ( req:Request, res:Response ) => {
    
    try {

        const { nombre } = req.body;

        const empresa = await Empresa.create( { nombre: helpers.estandarizarString(nombre) } )
            .catch( error => {
                res.status(400).json({
                    msg : error.errors[0].messages
                })
            });

        return res.json( empresa );
        
    } catch (error) {
        
        console.log( error )
        return res.status(500).json({
            msg:helpers.errorServidor()
        });

    }
    
}
export const actualizarEmpresa = async ( req:Request, res:Response ) => {

    try {

        const { id } = req.params;
        const { nombre } = req.body;
    
        const empresa = await models.Empresa.findByPk( id )
            .catch( error => {
                res.status(400).json({
                    msg : error.errors[0].messages
                })
            });
    
        
        await empresa?.update( { nombre: helpers.estandarizarString(nombre) }, {
            where:{
                emp_id : id 
            }
        })

        return res.json( empresa );
        
    } catch (error) {
        
        console.log( error )
        return res.status(500).json({
            msg:helpers.errorServidor()
        });

    }
    
}
export const eliminarEmpresa = async ( req:Request, res:Response ) => {

    try {

        const { id } = req.params

        const empresa = await Empresa.findByPk( id )
            .catch( error => {
                res.status(400).json({
                    msg : error.errors[0].messages
                })
            });

        await empresa?.update( { estado: false }, {
            where:{
                estado: false
            }
        })
    
        res.json( empresa );

    } catch (error) {
        
        console.log( error )
        return res.status(500).json({
            msg:helpers.errorServidor()
        });

    }
    
}

export const agregarUsuariosEmpresas = async ( req: Request, res: Response) =>{

    try {

        const { id, usuarios } = req.body;
        
        const empresa: any = await models.Empresa.findOne( {
            where:{
                emp_id: id,
                estado: true
            }
        });
        

        empresa.addUsuario( usuarios);
        
        return res.json(empresa);

    } catch (error) {
        
        console.log( error )
        return res.status(500).json({
            msg:helpers.errorServidor()
        });
        
    }
}