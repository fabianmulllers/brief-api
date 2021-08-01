"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComentarioBrief = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.ComentarioBrief = connection_1.default.define('comentario_brief', {
    com_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    comentario: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
});
//# sourceMappingURL=comentario-brief.model.js.map