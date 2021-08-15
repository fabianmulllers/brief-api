import { Router } from "express";
import { check } from "express-validator";

import * as controllers from '../controllers'
import * as middlewares from '../middlewares'


export const authRouter = Router();


authRouter.post('/', [
    check('email','Ingresa un email valido').isEmail(),
    check('password','Ingresa password').notEmpty(),
    middlewares.verificarUsuario,
    middlewares.validarCampos
],controllers.login);

authRouter.get('/validar-token', [
    middlewares.validarJWT,
],controllers.validarToken);