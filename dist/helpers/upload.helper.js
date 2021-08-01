"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertirArchivoEnArray = exports.nombreArchivo = exports.extensionArchivo = exports.subirArchivos = void 0;
const slug_1 = __importDefault(require("slug"));
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const subirArchivos = (archivos, extensionesValidas = ['jpg', 'jpeg', 'png'], carpeta = '') => __awaiter(void 0, void 0, void 0, function* () {
    const archivosArray = exports.convertirArchivoEnArray(archivos);
    let imagenesSubidas = [];
    for (const archivo of archivosArray) {
        const extension = exports.extensionArchivo(archivo.name);
        const nombre = exports.nombreArchivo(archivo.name);
        if (extensionesValidas.includes(extension)) {
            const { public_id, secure_url } = yield cloudinary.uploader.upload(archivo.tempFilePath, { folder: carpeta });
            imagenesSubidas.push({
                'nombre': nombre,
                'extension': extension,
                'public_id': public_id,
                'url': secure_url
            });
        }
    }
    return imagenesSubidas;
});
exports.subirArchivos = subirArchivos;
const extensionArchivo = (archivo) => {
    const nombreCortado = archivo.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];
    return extension;
};
exports.extensionArchivo = extensionArchivo;
const nombreArchivo = (archivo) => {
    const nombreCortado = archivo.split('.');
    return slug_1.default(nombreCortado[0], { lower: false });
};
exports.nombreArchivo = nombreArchivo;
const convertirArchivoEnArray = (archivos) => {
    let array_archivos = [];
    if (Array.isArray(archivos)) {
        console.log("eres array");
        array_archivos = archivos;
    }
    else {
        console.log("no eres array");
        array_archivos.push(archivos);
    }
    return array_archivos;
};
exports.convertirArchivoEnArray = convertirArchivoEnArray;
//# sourceMappingURL=upload.helper.js.map