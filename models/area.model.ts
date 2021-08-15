import { DataTypes } from 'sequelize'
import  db  from '../db/connection'
import { Role,Usuario } from './index';


export const Area = db.define('area',{
        
    are_id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    
    estado : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
});


