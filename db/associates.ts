import * as models from '../models'
import { obtenerAreas } from '../controllers/area.controller';
import { Brief } from '../models/brief.model';



/**
 * USUARIOS
 */
// Un usuario puede tener 1 area
models.Usuario.belongsTo( models.Area,{
    foreignKey:'are_id',
})
// Un usuario puede tener 1 role
models.Usuario.belongsTo( models.Role, {
    foreignKey: 'rol_id',
})

//un usuario puede pertenecer a muchas empresas
models.Usuario.belongsToMany( models.Empresa,{ through:"usuario_empresa", foreignKey: "usu_id"});

//un usuario puede crear varios brief
models.Usuario.hasMany( models.Brief, {
    foreignKey: 'usu_id'
})
//un usuario puede estas asociado a varios brief
models.Usuario.belongsToMany( models.Brief, { through:"brief_usuario", foreignKey:"usu_id", as:"usuariosAsignados"} );

// un usuario puede hacer varios comentarios en un brief
models.Usuario.hasMany( models.ComentarioBrief, { foreignKey: 'usu_id'})

//un usuario puede tener varias notificaciones
models.Usuario.belongsToMany( models.ComentarioBrief, { through: models.NotificacionComentario, foreignKey:"usu_id", as: "notificar"})

/**
 * ROLE
 */
// un Role puede pertenecer a varios usuarios
models.Role.hasMany( models.Usuario,{
    foreignKey: 'rol_id'
} );

//Un role puede permanecer a varias areas
models.Role.belongsToMany( models.Area,{ through: "role_area", foreignKey:'rol_id' })


/**
 * AREA
 */
// un Area puede pertenecer a varios usuarios
models.Area.hasMany( models.Usuario,{
    foreignKey: 'are_id'
} );

// Un area puede tener varios roles
models.Area.belongsToMany( models.Role,{ through: "role_area", foreignKey:'are_id' } );

// un area puede estar asociado a varios Brief
models.Area.belongsToMany( models.Brief,{ through:models.BriefArea, foreignKey:'are_id'} ); 

/**
 * CLIENTE
 */
//Un cliente pertenece a una empresa
models.Cliente.belongsTo( models.Empresa, {
    foreignKey:'emp_id'
});

//un cliente puede estar asociado a varios brief
models.Cliente.hasMany( models.Brief, {
    foreignKey:'cli_id'
})

/**
 * EMPRESA
 */
// Una empresa puede tener muchas empresas
models.Empresa.hasMany( models.Cliente, {
    foreignKey:'emp_id'
})

// una empresa puede tener muchos usuarios
models.Empresa.belongsToMany( models.Usuario,{ through:"usuario_empresa", foreignKey: "emp_id"});



//Brief
//un brief tiene un tipo de brief
models.Brief.belongsTo( models.TipoBrief, { 
    foreignKey: 'tib_id' 
});

//un brief es asignado a un cliente
models.Brief.belongsTo( models.Cliente, {
    foreignKey: 'cli_id'
});

//un brief es crearo por un usuario
models.Brief.belongsTo( models.Usuario, {
    foreignKey: 'usu_id'
});

//un brief puede tener muchos usuarios asociados
models.Brief.belongsToMany( models.Usuario,{ through:"brief_usuario", foreignKey: "bri_id", as:"usuariosAsignados" } );

// un brief contiene varios comentarios de usuarios
models.Brief.hasMany( models.ComentarioBrief,{ foreignKey:"bri_id"} )

// un brief puede asociarse con varias obtenerAreas
models.Brief.belongsToMany( models.Area,{ through:models.BriefArea, foreignKey: "bri_id" } );


/**
 * tipo brief
 */
//un tipo de brief puede estar asociado a varios brief
models.TipoBrief.hasMany( models.Brief, {
    foreignKey: 'tib_id'
});

/**
 * Comentarios brief
 */
//un comentario puede tener varios archivos
models.ComentarioBrief.hasMany( models.multimedia, {
    foreignKey: 'com_id',
    as:"adjunto"
});

//un comentario pertenece a un usuario
models.ComentarioBrief.belongsTo( models.Usuario,{ foreignKey: 'usu_id'} )

//un comentario pertenece a un brief
models.ComentarioBrief.belongsTo( models.Brief, { foreignKey:'bri_id' } );

// un comentario tiene varias notificaciones
models.ComentarioBrief.belongsToMany( models.Usuario,{ through: models.NotificacionComentario, foreignKey: "com_id", as:"notificar" } );


/**
 * multimedia
 */
// un archivo multimedia pertecenece a 1 comentario
models.multimedia.belongsTo( models.ComentarioBrief, {
    foreignKey: 'com_id'
});

/**
 * Notificaciones
 */
