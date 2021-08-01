import { DataTypes } from 'sequelize'    
import db  from '../db/connection'
import { Area,Usuario } from './index'

export const Role = db.define('role',{
    
    rol_id: {
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },

    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

})
    



// Role.belongsToMany(Area, { through: 'role_area', foreignKey: 'rol_id' })