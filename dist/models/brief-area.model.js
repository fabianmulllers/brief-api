"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BriefArea = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.BriefArea = connection_1.default.define('brief_area', {
    fecha_revision: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    fecha_entrega: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true
});
//# sourceMappingURL=brief-area.model.js.map