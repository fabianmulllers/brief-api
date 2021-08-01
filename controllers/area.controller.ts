import { Request, Response } from 'express'

import * as helpers from '../helpers'
import { Area } from '../models'
import { param } from 'express-validator';
import { Role } from '../models/role.model';


export const obtenerAreas = async (req: Request, res: Response) => {
    
    try {

        const areas = await Area.findAll( { where: { estado: true } } )
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
        const area = await Area.findByPk( id )
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
    
        const area = await Area.create( { nombre })
    
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
    
        const area = await Area.findByPk( id )

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
    
        const area = await Area.findByPk( id )
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
        
        const area:any = await Area.findByPk( id );

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
        
        // await Area.findByPk( id ).then( (area:any) => {
        //     area.getRoles( { attributes:['nombre'] } ).then( (roles:any) => { 
        //         res.json( roles );
        //     })
        // })

        const area = await Area.findByPk( id, { include:{ 
            model: Role,
            attributes:['nombre']
        }});

        res.json( area )


    } catch (error) {
        
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }



}

