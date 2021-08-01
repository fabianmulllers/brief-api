import { DataTypes } from 'sequelize'
import  db  from '../db/connection'


export const ComentarioBrief = db.define( 'comentario_brief',{
    
    com_id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,  
    },
    comentario:{
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    freezeTableName: true
})
