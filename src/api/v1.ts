import express from "express"

import { body } from 'express-validator';
import { getLogin, postLogin } from "../model/login";
import { postRegister } from "../model/register";
import { getAdmin } from "../model/admin";

const router = express.Router();

try {
    

    router.route('/login')
        .get(getLogin)
        .post([
            body('username').notEmpty(),
            body('password').notEmpty()
        ],postLogin);

    router.route('/register')
        .post([
            body('username').notEmpty(),
            body('password').notEmpty()
        ],postRegister)
    router.route('/admin')
        .get(getAdmin)

    
} catch (error) {
    console.error(error)
}

export default router;