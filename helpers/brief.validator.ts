import * as models from '../models'
import * as helpers from './index'
import { Response } from 'express'
import { Brief } from '../models/brief.model';

export const existeIdBrief = async ( id: number ) => {
    
    const brief = await models.Brief.findOne({
        where:{
            estado: true,
            bri_id : id
        }
    })

    if( !brief ){
        throw new Error(`No existe ningun Brief con el id ${ id }`);
    }

}

//Asignamos usuarios al brief recien creado
export const asignarUsuariosBrief = async( brief: any, res: Response) => {
    
    //el brief creado debe tener su ID y un cliente asociado
    if( !brief.cli_id || !brief.bri_id ){
        return res.status(500).json({
            msg: helpers.errorServidor()
        })
    }

    try {
        
        // buscamos la empresa a cual pertenece el cliente y los usuarios que estan asociados a esa empresa    
        const cliente: any = await models.Cliente.findOne({
            attributes:['cli_id'],
            where:{
                cli_id:brief.cli_id
            },
            include: [
                {    
                    attributes:['emp_id'],
                    model: models.Empresa,
                    include:[
                        {
                            model:models.Usuario,
                            attributes:['usu_id']
                        }
                    ]
                }
            ]
        }).catch( error => {
            console.log( error )
            return res.status(500).json({
                msg: helpers.errorServidor()
            });
        });
        
        let usuarios
        if( cliente.empresa.usuarios ){
            const empresaUsuario = cliente.empresa.usuarios
            usuarios = empresaUsuario.map( (usuario: any) => usuario.usu_id )    
        }
        
        if( usuarios.length > 0){
            brief.addUsuariosAsignados(usuarios);
        }
        
        return;
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
    

}

//asignamos areas al brief 
 export const asignarAreasBrief = ( brief: any, areas:[], res: Response ) => { 
    
    //si no existe brief o 
    // console.log( "ingresaste" )
    if( !brief || areas.length < 1){
        console.log( "ingresaste" )
    }

    console.log( "ingresaste" )

    try {

        areas.forEach( (area: any) => {
            brief.addArea(area.id,{ 
                through:{
                    fecha_revision: area.revision,
                    fecha_entrega: area.entrega
                }
            })
        });

        return;
        
    } catch (error) {
        
        console.log( error );
        return res.status( 500 ).json({
            msg: helpers.errorServidor()
        })
    }
 }

//obtener el brief 
export const getBrief = async( id : string ) => {
    
    if( !id ){
        
        return {};
    }
    

    const brief = await models.Brief.findOne({ 
        attributes:[
            ['bri_id', 'id'],
            'titulo',
            'descripcion'
        ],
        where:{
            bri_id: id
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
        ]
    });

    return brief;

}

export const guardarArchivosMultimedia = async( archivos:any[] , id_comentario: number ) => {
    
    for (const archivo of archivos) {
        archivo['com_id'] = id_comentario
        await models.multimedia.create(archivo);
    }
    
    return true;
}

export const generarNotificaciones = async( comentario: any, brief_id: string ) => {

    const brief:any = await Brief.findOne( {
        attributes:['bri_id'],
        where: {

            bri_id: brief_id
        },
        include: [
            {    
                model: models.Usuario,
                as:"usuariosAsignados",
                attributes:['usu_id']
            }
        ]
    })

    await comentario.addNotificar( brief.usuariosAsignados );

    return brief;
}