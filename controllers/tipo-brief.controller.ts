import { Request, Response } from "express"

import * as models from '../models';
import * as helpers from '../helpers'
import { TipoBrief } from '../models/tipo-brief.model';
import { where } from "sequelize/types";


export const obtenerTipoBriefs = async ( req: Request, res: Response) => {

    try {
        
        const tipoBrief = await models.TipoBrief.findAll( {
            attributes:[['tib_id','id'],'nombre'],
            where: {
                estado: true
            }
        })
        
        return res.json( tipoBrief );

    } catch (error) {

        console.log( error )
        return res.status( 500 ).json({
            msg: helpers.errorServidor()
        })
    }

}


export const obtenerTipoBrief = async ( req: Request, res: Response) => {


    try {

        const { id } = req.params;

        const tipoBrief = await models.TipoBrief.findOne( {
            attributes:[['tib_id','id'],'nombre'],
            where:{
                tib_id : id,
                estado: true
            }
        })
    
        return res.json( tipoBrief )
        
    } catch (error) {

        console.log( error )
        return res.status( 500 ).json({
            msg: helpers.errorServidor()
        })
    }

}


export const crearTipoBrief = async ( req: Request, res: Response) => {


    try {

        const { nombre } = req.body;

        const crearTipoBrief: any = await models.TipoBrief.create( { nombre });

        const tipoBrief = await models.TipoBrief.findOne( {
            attributes: [['tib_id','id'],'nombre' ],
            where:{
                tib_id: crearTipoBrief.tib_id,
            }
        })

        return res.json( tipoBrief );
        
    } catch (error) {

        console.log( error )
        return res.status( 500 ).json({
            msg: helpers.errorServidor()
        })
    }

}


export const actualizarTipoBrief = async ( req: Request, res: Response) => {


    try {

        const { id } = req.params;
        const { nombre } = req.body;

        const tipoBrief = await models.TipoBrief.findOne({
            where:{
                estado: true,
                tib_id : id
            }
        })

        await tipoBrief?.update({ nombre },{
            where:{
                tib_id : id 
            }
        })

        const tipoBriefResp = await models.TipoBrief.findOne({
            attributes:[['tib_id','id'],'nombre'],
            where:{
                tib_id: id
            }
        })
            

        return res.json( tipoBriefResp )
        
    } catch (error) {

        console.log( error )
        return res.status( 500 ).json({
            msg: helpers.errorServidor()
        })
    }

}


export const eliminarTipoBrief = async ( req: Request, res: Response) => {


    try {

        const { id } = req.params

        const tipoBrief = await models.TipoBrief.findByPk( id )

        await tipoBrief?.update({ estado: false }, {
            where:{
                tib_id : id
            }
        } )
        
        return res.json( tipoBrief );


    } catch (error) {

        console.log( error )
        return res.status( 500 ).json({
            msg: helpers.errorServidor()
        })
    }

}

