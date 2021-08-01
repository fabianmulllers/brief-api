import { Usuario } from "../models"



export const existeIdUsuario = async ( id : number) => {
    
    const usuario = await Usuario.findByPk( id );

    if( !usuario ){

        throw new Error(` No existe usuario con el : ${ id } `);
    }

}