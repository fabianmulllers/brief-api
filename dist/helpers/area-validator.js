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
Object.defineProperty(exports, "__esModule", { value: true });
exports.existIdArea = void 0;
const models_1 = require("../models");
const existIdArea = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const area = yield models_1.Area.findOne({ where: { are_id: id } });
    if (!area) {
        throw new Error(`No existe un area con el id: ${id}`);
    }
});
exports.existIdArea = existIdArea;
//# sourceMappingURL=area-validator.js.map