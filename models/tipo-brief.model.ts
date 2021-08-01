import { DataTypes } from 'sequelize'
import  db  from '../db/connection'


export const TipoBrief = db.define( 'tipo_brief',{
    
    tib_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nombre: {
        type : DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }

},{
    freezeTableName: true
})

