import * as models from '../models'




export const existeIdTipoBrief = async ( id: string) => {

    const tipoBrief = await models.TipoBrief.findOne( {
        where:{
            estado: true,
            tib_id : id
        }
    });

    if( !tipoBrief ){
        throw new Error(` EL tipo de brief con el id : ${ id } no existe `);
    }

}