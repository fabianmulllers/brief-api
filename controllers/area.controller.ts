import { Request, Response } from 'express'

import * as helpers from '../helpers'
import * as models from '../models'


export const obtenerAreas = async (req: Request, res: Response) => {
    
    try {

        const areas = await models.Area.findAll( { 
            attributes:[['are_id','id'],'nombre'],
            where: { estado: true },
            include:{
                model: models.Role,
                where:{
                    estado: true,
                },
                attributes:[['rol_id','id'],'nombre'],
                through: { attributes: [] }
            }
        });


        return res.json(areas)
        
    } catch (error) {
            
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor
        })
    }

}

export const obtenerArea = async (req: Request, res: Response) => {
    
    try {
        
        const { id } = req.params;
        const area = await models.Area.findByPk( id )
        return res.json( area )
        
    } catch (error) {
    
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor
        })
    }

}


export const crearArea = async(req: Request, res: Response) => {
    
    try {
        
        const { nombre } = req.body
    
        const area = await models.Area.create( { nombre })
    
        return res.json( area )
        
    } catch (error) {
        
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor
        })
    }
}


export const actualizarArea = async(req: Request, res: Response) => {
     
    try {    
    
        const { id } = req.params
        const { nombre } = req.body
    
        const area = await models.Area.findByPk( id )

        await area?.update( { nombre }, { where : { are_id : id } } )

        return res.json( area )

    } catch (error) {
        
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor
        })
    }
}

export const eliminarArea = async(req: Request, res: Response) => {
    
    try {
        
        const { id } = req.params
    
        const area = await models.Area.findByPk( id )
        await area?.update( { estado : false }, { where : {are_id: id } } )
        
        return res.json( area )

    } catch (error) {
          
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor
        })
    }
}


export const agregarRoles = async( req:Request, res:Response ) => {


    try {
        
        const { id, role } = req.body
        
        const area:any = await models.Area.findByPk( id );

        area.addRoles(role);

    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }

}


export const verRoles = async (req: Request, res: Response) => {
        
    try {
        
        const { id } = req.params;
        const area: any = await models.Area.findByPk( 
            id, 
            { 
                attributes:[],
                include:{ 
                        model: models.Role,
                        where:{
                            estado: true
                        },
                        attributes:[['rol_id','id'],'nombre'],
                        through: { attributes: [] }
                    }
            }
        );

        res.json( area.roles )


    } catch (error) {
        
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }



}

