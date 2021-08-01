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
        allowNull: false,
        validate:{
            isAlpha: {
                msg:"el nombre solo puede contenerer letras"
            },
            len:{
                args:[3,255],
                msg:"EL nombre tiene que ser entre 3 y 255 caracteres"
            },
            notNull:{
                msg:"el campo no puede ser nulo"
            }
        },
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




