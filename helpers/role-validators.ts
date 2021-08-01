import { Role } from "../models"


export const existeNombreRole = async (nombre: string) =>{ 
    
    const role = await Role.findOne({
        where: {
            nombre: nombre.toLowerCase(),
            estado: true
        }
    })
    
    
    if(role){
        throw new Error(`EL nombre de role : ${ nombre } ya existe`)
    }
}


export const existeIdRole = async (id: number) =>{ 
    
    const role = await Role.findOne({
        where: {
            rol_id : id,
            estado: true
        }
    })
    
    if(!role){
        throw new Error(`EL role con el id : ${ id } no existe`)
    }
}