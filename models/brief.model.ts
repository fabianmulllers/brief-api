import { DataTypes } from 'sequelize'    
import db from '../db/connection'


export const Brief = db.define( 'brief',{
    
    bri_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    titulo:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    descripcion:{
        type: DataTypes.TEXT,
    },

    estado: {
        type:DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }

})