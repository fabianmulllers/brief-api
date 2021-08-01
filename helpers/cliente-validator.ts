import * as models from '../models'



export const existeIdCliente = async ( id: number) => {
        
    const cliente = await models.Cliente.findOne( {
        where:{
            cli_id: id,
            estado: true,
        }
    } );

    if( !cliente ){
        throw new Error(`No existe ningun cliente con el id: ${ id }`)    
    }
}