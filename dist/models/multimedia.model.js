"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multimedia = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.multimedia = connection_1.default.define('multimedia', {
    mul_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    extension: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    public_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
    }
}, {
    freezeTableName: true
});
//# sourceMappingURL=multimedia.model.js.map