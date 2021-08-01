import dotenv from 'dotenv'
import Server from './models/server'


// configuracion de las variables de entornos personalizadas
dotenv.config()


const server = new Server();



server.listen();