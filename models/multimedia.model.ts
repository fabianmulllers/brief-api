import { DataTypes } from 'sequelize'
import db from '../db/connection'


export const multimedia = db.define( 'multimedia', {

    mul_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull:false
    },

    extension: {
        type: DataTypes.STRING,
        allowNull:false
    },

    public_id:{
        type: DataTypes.STRING,
    },

    url:{
        type: DataTypes.STRING,
    }
},{
    freezeTableName: true
}

)