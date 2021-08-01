"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarNotificaciones = exports.guardarArchivosMultimedia = exports.getBrief = exports.asignarAreasBrief = exports.asignarUsuariosBrief = exports.existeIdBrief = void 0;
const models = __importStar(require("../models"));
const helpers = __importStar(require("./index"));
const brief_model_1 = require("../models/brief.model");
const existeIdBrief = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const brief = yield models.Brief.findOne({
        where: {
            estado: true,
            bri_id: id
        }
    });
    if (!brief) {
        throw new Error(`No existe ningun Brief con el id ${id}`);
    }
});
exports.existeIdBrief = existeIdBrief;
//Asignamos usuarios al brief recien creado
const asignarUsuariosBrief = (brief, res) => __awaiter(void 0, void 0, void 0, function* () {
    //el brief creado debe tener su ID y un cliente asociado
    if (!brief.cli_id || !brief.bri_id) {
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
    try {
        // buscamos la empresa a cual pertenece el cliente y los usuarios que estan asociados a esa empresa    
        const cliente = yield models.Cliente.findOne({
            attributes: ['cli_id'],
            where: {
                cli_id: brief.cli_id
            },
            include: [
                {
                    attributes: ['emp_id'],
                    model: models.Empresa,
                    include: [
                        {
                            model: models.Usuario,
                            attributes: ['usu_id']
                        }
                    ]
                }
            ]
        }).catch(error => {
            console.log(error);
            return res.status(500).json({
                msg: helpers.errorServidor()
            });
        });
        let usuarios;
        if (cliente.empresa.usuarios) {
            const empresaUsuario = cliente.empresa.usuarios;
            usuarios = empresaUsuario.map((usuario) => usuario.usu_id);
        }
        if (usuarios.length > 0) {
            brief.addUsuariosAsignados(usuarios);
        }
        return;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.asignarUsuariosBrief = asignarUsuariosBrief;
//asignamos areas al brief 
const asignarAreasBrief = (brief, areas, res) => {
    //si no existe brief o 
    // console.log( "ingresaste" )
    if (!brief || areas.length < 1) {
        console.log("ingresaste");
    }
    console.log("ingresaste");
    try {
        areas.forEach((area) => {
            brief.addArea(area.id, {
                through: {
                    fecha_revision: area.revision,
                    fecha_entrega: area.entrega
                }
            });
        });
        return;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
};
exports.asignarAreasBrief = asignarAreasBrief;
//obtener el brief 
const getBrief = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        return {};
    }
    const brief = yield models.Brief.findOne({
        attributes: [
            ['bri_id', 'id'],
            'titulo',
            'descripcion'
        ],
        where: {
            bri_id: id
        },
        include: [
            {
                attributes: [['usu_id', 'id'], 'nombre'],
                model: models.Usuario
            },
            {
                attributes: [['cli_id', 'id'], 'nombre'],
                model: models.Cliente,
            },
            {
                attributes: [['tib_id', 'id'], 'nombre'],
                model: models.TipoBrief
            }
        ]
    });
    return brief;
});
exports.getBrief = getBrief;
const guardarArchivosMultimedia = (archivos, id_comentario) => __awaiter(void 0, void 0, void 0, function* () {
    for (const archivo of archivos) {
        archivo['com_id'] = id_comentario;
        yield models.multimedia.create(archivo);
    }
    return true;
});
exports.guardarArchivosMultimedia = guardarArchivosMultimedia;
const generarNotificaciones = (comentario, brief_id) => __awaiter(void 0, void 0, void 0, function* () {
    const brief = yield brief_model_1.Brief.findOne({
        attributes: ['bri_id'],
        where: {
            bri_id: brief_id
        },
        include: [
            {
                model: models.Usuario,
                as: "usuariosAsignados",
                attributes: ['usu_id']
            }
        ]
    });
    yield comentario.addNotificar(brief.usuariosAsignados);
    return brief;
});
exports.generarNotificaciones = generarNotificaciones;
//# sourceMappingURL=brief.validator.js.map