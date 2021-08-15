import { Request, Response } from "express";
import bcrypt from 'bcrypt'

import * as helpers from '../helpers'
import { Area, Role, Usuario } from "../models";
import { Model } from "sequelize/types";
import Server from "../models/server";


export const obtenerUsuarios = async ( req: Request, res: Response) => {

    try {

        const usuarios = await Usuario.findAll( { 
            where:{ estado: true },
            attributes:[['usu_id','id'],'nombre','email','avatar','estado'],
            include:[
                {
                    model: Area,
                    attributes:[['are_id','id'],'nombre']
                },
                {
                    model:Role,
                    attributes:[['rol_id','id'],'nombre']
                }
            ],

         });
        
        return res.json( usuarios );

    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }

}

export const obtenerUsuario = async ( req: Request, res: Response) => {
    
    try {
         
        const { id } = req.params

        const usuario = await Usuario.findOne( {
            where:{
                estado: true,
                usu_id: id
            },
            attributes:[['usu_id','id'],'nombre','email','avatar','estado'],
            include:[
                {
                    model: Area,
                    attributes:[['are_id','id'],'nombre']
                },
                {
                    model:Role,
                    attributes:[['rol_id','id'],'nombre']
                }
            ],

        });


        return res.json( usuario )

    } catch (error) {
        
        console.log( error );
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }

}

export const crearUsuario = async( req: Request, res: Response) => {
    
    try {

        const {area, role, ...user} = req.body;
        
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
        
        user.are_id = area;
        user.rol_id = role;
        
        const usuario: any = await Usuario.create( user )
            .catch( (error) => {
                return res.status(400).json({
                   msg: error.errors[0].message
                })
            } );

        
        const resp = await Usuario.findByPk( 
            usuario.usu_id,
            {    
                attributes:[['usu_id','id'],'nombre','email','avatar','estado'],
                include:[
                    {
                        model: Area,
                        attributes:[['are_id','id'],'nombre']
                    },
                    {
                        model: Role,
                        attributes:[['rol_id','id'],'nombre']
                    }
                ]
            })
       
        return res.json( resp )
        
    } catch (error) {
        
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor()
        })

    }

}

export const actualizarUsuario = async( req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const { estado, password, role, area, ...user } = req.body;
        
        const usuario = await Usuario.findByPk( id );

        if( password ){
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync( password, salt );
        }

        ( role )?user.rol_id = role :  '';
        ( area )?user.are_id = area :  '';
        
        await usuario?.update( user, { 
            where: { usu_id: id } 
        } );

        res.json( usuario);

    } catch (error) {
        
        console.log( error )
        return res.status(500).json({
            msg: "verificar"
        })

    }

}

export const eliminarUsuario = async( req: Request, res: Response) => {
    
    try {
            
        const { id } = req.params;
        
        const usuario =  await Usuario.findByPk( id )

        await usuario?.update(  {estado: false} , { where: { usu_id : id } } );

        return res.json( usuario )

    } catch (error) {

        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }

}
