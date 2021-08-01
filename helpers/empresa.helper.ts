import * as models from '../models'

export const existeIdEmpresa = async ( id: string ) => {

    const empresa = await models.Empresa.findOne({
        where:{
            emp_id: id,
            estado: true
        }
    } )

    if( !empresa ){ 
        throw new Error(`No existe empresa con el id ${ id }`)
    }

}