import db from '../db/connection'
import { DataTypes } from 'sequelize'
import { Area, Role } from './index'


export const Usuario = db.define('usuario',{
        
    usu_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
    },

    nombre:{
        type:DataTypes.STRING,
        allowNull: false
    },

    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail:{
                msg:"El correo no es valido"
            }
        }
    },

    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },

    avatar: {
        type: DataTypes.STRING
    },
})




