import express, { Application } from "express";
import  fileUpload  from 'express-fileupload'
import cors from 'cors'

import * as routes from '../routes';
import db from '../db/connection';
require('../db/associates');

class Server {
    
    private app: Application;
    private port: string;
    private apiPaths = {
        usuario:   '/api/usuario',
        role:      '/api/role',
        area:      '/api/area',
        auth:      '/api/auth',
        empresa:   '/api/empresa',
        cliente:   '/api/cliente',
        brief:     '/api/brief',
        tipo_brief:'/api/tipo-brief'
    }

    constructor(){
        this.app  = express();
        this.port = process.env.PORT || '8000';
    
        console.log( process.env.DB_PASS )
        //metodos iniciales
        this.dbConexion();
        this.middleware();
        this.routes();
    }
    


    async dbConexion(){
        try {
            
            //Force tru: DROp TABLE
            await db.authenticate();
            console.log( 'Conectado a la BD' )
            
        } catch (error) {
            console.log( `no se logro conectar la BD: ${ error }` );
        }
    }

    middleware(){
    
        // CORS
        this.app.use( cors() )

        //Carpeta publica
        this.app.use( express.static('./public') );

        // Lectura de parametros en json
        this.app.use( express.json() );

        //fileupload carga de archivo
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }
    
    routes(){
    
        this.app.use( this.apiPaths.usuario, routes.usuarioRouter );
        this.app.use( this.apiPaths.role, routes.roleRouter );
        this.app.use( this.apiPaths.area, routes.areaRouter );
        this.app.use( this.apiPaths.auth, routes.authRouter );
        this.app.use( this.apiPaths.empresa, routes.empresaRouter );
        this.app.use( this.apiPaths.cliente, routes.clienteRouter );
        this.app.use( this.apiPaths.brief, routes.briefRouter );
        this.app.use( this.apiPaths.tipo_brief, routes.tipoBriefRouter );


    }

    listen(){
        this.app.listen(this.port, () => {
            console.log( `Servidor conectado en el puerto: ${ this.port }` );
        });
    }
    
}


export default Server;