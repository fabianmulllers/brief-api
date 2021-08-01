import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const conexion = new Sequelize('brief','root',`${ process.env.DB_PASS }`,{
    host:'localhost',
    dialect: 'mariadb'
});


export default conexion;