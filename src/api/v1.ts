import express from "express"

import { body, param } from 'express-validator';
import { getLogin, postLogin } from "../model/login";
import { postRegister } from "../model/register";
import { deleteBookByIndex, getAdmin, getAdminBooks, postAdmin } from "../model/admin";
import path from 'path'
import { getBookCover, getMainPage } from "../model/mainPage";


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
    router.route('/books')
        .get(getAdminBooks)
    router.route('/books/:bookId')
        .delete([
            param('bookId').notEmpty().isNumeric().isInt()
        ],deleteBookByIndex)
    
    router.route('/')
        .get(getMainPage)
    
    router.route('/book/cover/:bookId')
        .get([
            param('bookId').notEmpty().isNumeric().isInt()
        ],getBookCover)
} catch (error) {
    console.error(error)
}

export default router;