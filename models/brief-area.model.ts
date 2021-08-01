import { DataTypes } from 'sequelize'    
import db from '../db/connection'


export const BriefArea = db.define( 'brief_area',{
    
    fecha_revision: {
        type: DataTypes.DATE,
        allowNull: false
        
        
    },

    fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: false
    }


},{
    freezeTableName: true
})