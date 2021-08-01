"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
exports.Usuario = connection_1.default.define('usuario', {
    usu_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: {
                msg: "el nombre solo puede contenerer letras"
            },
            len: {
                args: [3, 255],
                msg: "EL nombre tiene que ser entre 3 y 255 caracteres"
            },
            notNull: {
                msg: "el campo no puede ser nulo"
            }
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "El correo no es valido"
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    avatar: {
        type: sequelize_1.DataTypes.STRING
    },
});
//# sourceMappingURL=usuario.model.js.map