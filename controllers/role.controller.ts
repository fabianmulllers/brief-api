import { Request, Response} from 'express'
import Sequelize  from 'sequelize'

import { Role } from '../models'
import * as helpers from '../helpers'
export const obtenerRoles = async ( req: Request, res: Response) => {
    
    try {

        // obtenemos todos los roles con estado: true (No han sido eliminado)
        const roles = await Role.findAll( { 
            attributes:[['rol_id','id'],'nombre'],
            where: {estado : true } 
        } );
        return res.json( roles );    

    } catch (error) {

        console.log( error );
        return res.status(500).json({
            msg: helpers.errorServidor()
        });

    }

}

export const obtenerRole = async( req: Request, res: Response) => {

        try {
            
            const { id } = req.params

            const role = await Role.findOne({
                    
                attributes: [['rol_id','id'],'nombre'],
                where:{
                    estado: true,
                    rol_id: id
                }

            })

            return res.json( role );

        } catch (error) {
            return res.status(500).json({
                msg: helpers.errorServidor()
            });
        }
}

export const crearRole = async (req: Request, res: Response) => {
    
    try {
        
        //obtenemos el nombre y guardamos en base de datos
        let { nombre } =  req.body;
        nombre = helpers.estandarizarString( nombre );
        const role = await Role.create( { nombre } );
        
        res.json( role );
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }

}

export const actualizarRole = async (req: Request, res: Response) => {
    
    try {
        const { id } = req.params
        const { nombre } = req.body

        const role = await Role.findByPk( id );

        await role!.update( { nombre }, { where: { rol_id : id } } )
        
        res.json(role)

        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }
    
}

export const eliminarRole = async (req: Request, res: Response) => {
    
    try {

        const { id } = req.params;
        
        const role = await Role.findByPk( id )

        await role?.update( {estado: false}, {where: { rol_id : id } })

        res.json( role )
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }



}