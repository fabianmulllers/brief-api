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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarComentario = exports.eliminarBrief = exports.actualizarBrief = exports.crearBrief = exports.obtenerBrief = exports.obtenerBriefs = void 0;
const models = __importStar(require("../models"));
const helpers = __importStar(require("../helpers"));
const uuid_1 = require("uuid");
const obtenerBriefs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const briefs = yield models.Brief.findAndCountAll({
            attributes: [
                ['bri_id', 'id'],
                'titulo',
                'descripcion'
            ],
            where: {
                estado: true,
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
            ],
            offset: 1,
            limit: 2
        });
        return res.json(briefs);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.obtenerBriefs = obtenerBriefs;
const obtenerBrief = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const brief = yield helpers.getBrief(id);
        return res.json(brief);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.obtenerBrief = obtenerBrief;
const crearBrief = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { titulo, descripcion, cliente, tipo_brief } = req.body;
        const usuario = req.usuario;
        const createBrief = yield models.Brief.create({
            bri_id: uuid_1.v4(),
            titulo,
            descripcion,
            usu_id: usuario.usu_id,
            cli_id: cliente,
            tib_id: tipo_brief
        });
        //asignar usuarios al brief
        if (createBrief.cli_id) {
            yield helpers.asignarUsuariosBrief(createBrief, res);
        }
        //si existe areas 
        if (req.body.areas) {
            yield helpers.asignarAreasBrief(createBrief, req.body.areas, res);
        }
        const brief = yield helpers.getBrief(createBrief.bri_id);
        return res.json(brief);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.crearBrief = crearBrief;
const actualizarBrief = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { estado } = _a, resto = __rest(_a, ["estado"]);
        const brief = yield models.Brief.findOne({
            where: {
                bri_id: id,
                estado: true
            }
        });
        yield (brief === null || brief === void 0 ? void 0 : brief.update(resto, {
            where: {
                bri_id: id
            }
        }));
        const resulBrief = yield helpers.getBrief(id);
        return res.json(resulBrief);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.actualizarBrief = actualizarBrief;
const eliminarBrief = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const brief = yield models.Brief.findByPk(id);
        console.log(brief);
        yield (brief === null || brief === void 0 ? void 0 : brief.update({ estado: false }, {
            where: {
                bri_id: id
            }
        }));
        const resulBrief = yield helpers.getBrief(id);
        return res.json(resulBrief);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.eliminarBrief = eliminarBrief;
const agregarComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comentario, brief } = req.body;
        const usuario = req.usuario;
        //creamos la data del comentario
        let dataComentario = {
            comentario,
            bri_id: brief,
            usu_id: usuario.usu_id
        };
        let comentarioBrief;
        //validamos si adjunta archivos y lo asociamos al comentario, si no, se crea solo el comentario
        if (req.files) {
            const archivosSubidos = yield helpers.subirArchivos(req.files.archivo);
            if (archivosSubidos.length > 0) {
                dataComentario['adjunto'] = archivosSubidos;
                comentarioBrief = yield models.ComentarioBrief.create(dataComentario, {
                    include: "adjunto"
                });
            }
        }
        else {
            comentarioBrief = yield models.ComentarioBrief.create(dataComentario);
        }
        //validamos si se creo el comentairo
        if (!comentarioBrief) {
            return res.json(400).json({
                msg: "No se logro crear el comentario"
            });
        }
        //crear notificaciones a los usuarios pertenecientes al brief
        const notificaciones = yield helpers.generarNotificaciones(comentarioBrief, brief);
        return res.json(notificaciones);
        //obtenemos el comentario creado y lo filtramos
        const lastComentario = yield models.ComentarioBrief.findOne({
            attributes: [['com_id', 'id'], 'comentario'],
            where: {
                com_id: comentarioBrief.com_id
            },
            order: [['com_id', 'desc']],
            include: [
                {
                    model: models.multimedia,
                    as: 'adjunto'
                }
            ]
        });
        return res.json(lastComentario);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: helpers.errorServidor()
        });
    }
});
exports.agregarComentario = agregarComentario;
//# sourceMappingURL=brief.controller.js.map