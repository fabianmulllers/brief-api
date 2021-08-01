"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const conexion = new sequelize_1.Sequelize('brief', 'root', `${process.env.DB_PASS}`, {
    host: 'localhost',
    dialect: 'mariadb'
});
exports.default = conexion;
//# sourceMappingURL=connection.js.map