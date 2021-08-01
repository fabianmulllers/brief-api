import { Area } from "../models"


export const existIdArea = async( id: number) =>{
    
    const area = await Area.findOne( { where: { are_id : id } } );

    if( !area ){
        throw new Error(`No existe un area con el id: ${ id }` );
    }
}