import slug from 'slug'
import * as interfaces from '../interfaces'
const cloudinary  =  require ( 'cloudinary' ) . v2
cloudinary.config( process.env.CLOUDINARY_URL )

export const subirArchivos =  async ( archivos: any , extensionesValidas = ['jpg','jpeg','png'], carpeta = '' ) => {
    
        
        const archivosArray = convertirArchivoEnArray( archivos );

        let imagenesSubidas:any = [] ;
            
        for (const archivo of archivosArray) {
            
            const extension = extensionArchivo( archivo.name );
            const nombre = nombreArchivo( archivo.name );
            
            if( extensionesValidas.includes( extension ) ){
                
                const {public_id, secure_url} = await cloudinary.uploader.upload( archivo.tempFilePath,{ folder: carpeta });
    
                imagenesSubidas.push( {
                    'nombre': nombre,
                    'extension': extension,
                    'public_id': public_id,
                    'url': secure_url
                } )
                
    
            }  

        }
        
        return imagenesSubidas;
        
}



export const extensionArchivo = ( archivo: string) =>{
    
    const nombreCortado = archivo.split('.');
    const extension = nombreCortado[ nombreCortado.length - 1];

    return extension

}

export const nombreArchivo = ( archivo: string ) => {

    const nombreCortado = archivo.split('.');
    return slug(nombreCortado[0],{lower: false});

}

export const convertirArchivoEnArray = ( archivos: any) => {
        
        let array_archivos = []
        if( Array.isArray( archivos ) ){
            console.log( "eres array" )
            array_archivos = archivos;
        }else{
            console.log( "no eres array" )
            array_archivos.push(archivos);
        } 
        
        return array_archivos;

}