import { DataTypes, INTEGER } from 'sequelize'
import db from '../db/connection'


export const NotificacionComentario = db.define( 'notificacion_comentario', {

    
    not_id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    
    esn_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }

},{
    freezeTableName: true
})