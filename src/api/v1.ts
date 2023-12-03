import express from "express"

import { body } from 'express-validator';
import { getLogin, postLogin } from "../model/login";
import { postRegister } from "../model/register";
import { getAdmin, postAdmin } from "../model/admin";
import path from 'path'


const multer  = require('multer')
const upload = multer()

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
        .post(
            [
            body('bookData.*.bookTitle').notEmpty().isString(),
            body('bookData.*.publicationYear').notEmpty().isNumeric(),
            body('bookData.*.authors').notEmpty(),
            body('bookData.*.description.').notEmpty().isString(),
            
        
        ],
        upload.single('coverImage'),
        postAdmin)
    

    
} catch (error) {
    console.error(error)
}

export default router;