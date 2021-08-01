import { DataTypes } from 'sequelize'
import db  from '../db/connection'



export const Empresa = db.define('empresa',{
    
    emp_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },

    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

})