import { Request, Response } from "express"
import * as models from '../models'
import * as helpers from '../helpers'
import { v4 as uuidv4 } from 'uuid';
import { Cliente } from '../models/cliente.model';
import { where } from 'sequelize/types';
import { Brief } from '../models/brief.model';
import { ComentarioBrief } from '../models/comentario-brief.model';




export const obtenerBriefs = async ( req:Request , res: Response ) => {
    
    try {
        
        const briefs = await models.Brief.findAndCountAll({
            attributes:[
                ['bri_id', 'id'],
                'titulo',
                'descripcion'
            ],
            where:{
                estado:true,
            },
            include:[
                {
                    attributes: [['usu_id','id'],'nombre'],
                    model: models.Usuario
                },
                {
                    attributes:[['cli_id','id'],'nombre'],
                    model: models.Cliente,
                },
                {
                    attributes:[['tib_id','id'],'nombre'],
                    model: models.TipoBrief
                }
            ],
            offset:1,
            limit: 2
        })

        return res.json( briefs )
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg:helpers.errorServidor()
        })
    }

}



export const obtenerBrief = async ( req:Request , res: Response ) => {

    try {
        
        const { id } = req.params

        const brief = await helpers.getBrief( id );

        return res.json(brief)

    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg:helpers.errorServidor()
        })
    }

}


export const crearBrief = async ( req:Request , res: Response ) => {

    try {
        
        const { titulo, descripcion, cliente, tipo_brief } = req.body

        const usuario = req.usuario;

        const createBrief: any = await models.Brief.create({
            bri_id: uuidv4(),
            titulo,
            descripcion,
            usu_id: usuario.usu_id,
            cli_id: cliente,
            tib_id: tipo_brief
        });
        
        //asignar usuarios al brief
        if( createBrief.cli_id ){
            
            await helpers.asignarUsuariosBrief( createBrief , res );
        }

        //si existe areas 
        if(req.body.areas){
            await helpers.asignarAreasBrief( createBrief, req.body.areas, res );
        }
                
        const brief = await helpers.getBrief( createBrief.bri_id );
        
        return res.json( brief )

    } catch (error) {
        
        console.log( error )
        return res.status(500).json({
            msg:helpers.errorServidor()
        })
        
    }

}


export const actualizarBrief = async ( req:Request , res: Response ) => {

    try {
    
        const { id } = req.params;
        const { estado, ...resto } = req.body;

        
        const brief: any = await models.Brief.findOne({
            where:{
                bri_id: id,
                estado: true                
            }
        });

        await brief?.update( resto ,{
            where:{
                bri_id: id
            }
        } )

        const resulBrief = await helpers.getBrief( id );

        return res.json( resulBrief );

    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg:helpers.errorServidor()
        })
    }

}


export const eliminarBrief = async ( req:Request , res: Response ) => {

    try {

        const { id } = req.params;

        const brief:any = await models.Brief.findByPk( id );

        console.log( brief );

        await brief?.update( { estado: false },{
            where:{
                bri_id: id
            }
        })
        
        const resulBrief = await helpers.getBrief( id );

        return res.json( resulBrief );
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg:helpers.errorServidor()
        })
    }

}


export const agregarComentario = async( req:Request, res: Response ) => {

    try {

        const { comentario, brief } = req.body
        const usuario = req.usuario
        
        //creamos la data del comentario
        let dataComentario:any ={ 

            comentario,
            bri_id: brief,
            usu_id: usuario.usu_id
        }
        
        let comentarioBrief: any;
        //validamos si adjunta archivos y lo asociamos al comentario, si no, se crea solo el comentario
        if( req.files ){
            
            const archivosSubidos = await helpers.subirArchivos( req.files.archivo );
            
            if( archivosSubidos.length > 0 ){

                dataComentario['adjunto'] = archivosSubidos;
                comentarioBrief = await models.ComentarioBrief.create( dataComentario,{
                    include: "adjunto"
                });
            }

        }else{
            comentarioBrief = await models.ComentarioBrief.create( dataComentario );
        }
        
        //validamos si se creo el comentairo
        if( !comentarioBrief ){
            return res.json(400).json({
                msg:"No se logro crear el comentario"
            })
        }    

        //crear notificaciones a los usuarios pertenecientes al brief
        
        const notificaciones = await helpers.generarNotificaciones( comentarioBrief, brief );
        
        return res.json( notificaciones );
    
        //obtenemos el comentario creado y lo filtramos
        const lastComentario: any = await models.ComentarioBrief.findOne({
            attributes:[['com_id','id'],'comentario'],
            where:{
               com_id: comentarioBrief.com_id
            },
            order: [['com_id','desc']],
            include:[
                {
                    model: models.multimedia,
                    as:'adjunto'
                }
            ]
        })

        return res.json(lastComentario);
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg:helpers.errorServidor()
        })
    }
}



