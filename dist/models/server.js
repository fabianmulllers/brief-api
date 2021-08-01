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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const routes = __importStar(require("../routes"));
const connection_1 = __importDefault(require("../db/connection"));
require('../db/associates');
class Server {
    constructor() {
        this.apiPaths = {
            usuario: '/api/usuario',
            role: '/api/role',
            area: '/api/area',
            auth: '/api/auth',
            empresa: '/api/empresa',
            cliente: '/api/cliente',
            brief: '/api/brief',
            tipo_brief: '/api/tipo-brief'
        };
        this.app = express_1.default();
        this.port = process.env.PORT || '8000';
        console.log(process.env.DB_PASS);
        //metodos iniciales
        this.dbConexion();
        this.middleware();
        this.routes();
    }
    dbConexion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Force tru: DROp TABLE
                yield connection_1.default.authenticate();
                console.log('Conectado a la BD');
            }
            catch (error) {
                console.log(`no se logro conectar la BD: ${error}`);
            }
        });
    }
    middleware() {
        // CORS
        this.app.use(cors_1.default());
        //Carpeta publica
        this.app.use(express_1.default.static('./public'));
        // Lectura de parametros en json
        this.app.use(express_1.default.json());
        //fileupload carga de archivo
        this.app.use(express_fileupload_1.default({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }
    routes() {
        this.app.use(this.apiPaths.usuario, routes.usuarioRouter);
        this.app.use(this.apiPaths.role, routes.roleRouter);
        this.app.use(this.apiPaths.area, routes.areaRouter);
        this.app.use(this.apiPaths.auth, routes.authRouter);
        this.app.use(this.apiPaths.empresa, routes.empresaRouter);
        this.app.use(this.apiPaths.cliente, routes.clienteRouter);
        this.app.use(this.apiPaths.brief, routes.briefRouter);
        this.app.use(this.apiPaths.tipo_brief, routes.tipoBriefRouter);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor conectado en el puerto: ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map