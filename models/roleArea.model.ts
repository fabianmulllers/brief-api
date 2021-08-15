import { DataTypes } from 'sequelize'
import  db  from '../db/connection'


export const RoleArea = db.define('role_area',{
        
    roa_id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
},{
    freezeTableName: true
});

