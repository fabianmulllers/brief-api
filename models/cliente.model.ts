import { DataTypes } from 'sequelize'
import db from '../db/connection'


export const Cliente = db.define('cliente',{
    
    cli_id:{
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

})