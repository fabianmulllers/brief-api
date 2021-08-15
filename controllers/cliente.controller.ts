import { Request, Response } from "express"

import * as models from '../models';
import * as helpers from '../helpers'

export const obtenerClientes = async ( req: Request, res: Response ) => {

    try {
        
        const clientes = await models.Cliente.findAll( { 
            attributes:[['cli_id','id'],'nombre'],
            where: {
                estado: true
            },
            include:{
                model: models.Empresa,
                attributes:['nombre',['emp_id','id']]
            } 
        } )
            .catch( error => {
                return res.status(400).json({
                    msg: error.errors[0].messages
                })
            })

        return res.json( clientes);

        return 

    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }

}


export const obtenerCliente = async ( req: Request, res: Response ) => {
    
    try {
        
        const { id } = req.params;

        const cliente = await models.Cliente.findOne( { 
                attributes:[['cli_id','id'],'nombre'],
                where: {
                    cli_id: id,
                    estado: true
                },
                include:{
                    model: models.Empresa,
                    attributes:['nombre',['emp_id','id']]
                } 
            } )
            .catch( error => {
                return res.status(400).json({
                    msg: error.errors[0].messages
                })
            })

        
        return res.json(cliente)

    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }

}


export const agregarCliente = async ( req: Request, res: Response ) => {

    try {

        const { nombre,empresa } = req.body;

        
        
        const crearCliente: any = await models.Cliente.create( 
            { 
                nombre: helpers.estandarizarString( nombre ),
                emp_id : empresa
            } )
            .catch( error => {
                return res.status(400).json({
                    msg: error.errors[0].messages
                })
            })


        const cliente = await models.Cliente.findOne({
            attributes:[['cli_id','id'],'nombre'],
            where: {
                cli_id: crearCliente.cli_id
            },
            include:{
                model: models.Empresa,
                attributes:['nombre',['emp_id','id']]
            } 
         });    
     
        return res.json(cliente);
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }

}


export const actualizarCliente = async ( req: Request, res: Response ) => {


    try {

        const { id } = req.params
        const { nombre, empresa } = req.body
        
        const cliente = await models.Cliente.findByPk( id )
        
        await cliente?.update({
            nombre: helpers.estandarizarString(nombre),
            emp_id : empresa
        })

        return res.json( cliente )
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }

}


export const eliminarCliente = async ( req: Request, res: Response ) => {


    try {
        
        const { id } = req.params;

        const cliente = await models.Cliente.findByPk( id )

        cliente?.update( { estado: false}, { where: {
            emp_id: id
        }})

        return res.json( cliente );

    } catch (error) {
        console.log
        ( error );
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }

}

