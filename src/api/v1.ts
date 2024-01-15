import express from "express"

import { query, body, param } from 'express-validator';
import { getLogin, getLogout, postLogin } from "../model/login";
import { postRegister } from "../model/register";
import { deleteBookByIndex, getAdmin, getAdminBooks, postAdmin } from "../model/admin";
import path from 'path'
import { getBookCover, getMainPage } from "../model/mainPage";
import { clickIncremet, getBookPage } from "../model/bookPage";



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

    router.route('/logout')
        .get(getLogout);

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
        .get([
            query('offset').optional().notEmpty().isNumeric(),
            query('search').optional().notEmpty().isString(),
            query('author').optional().notEmpty().isNumeric(),
            query('year').optional().notEmpty().isNumeric(),
            query('page').optional().notEmpty().isNumeric(),
            
        ],getMainPage)

    router.route('/api/v1/books')
        .get([
            query('offset').optional().notEmpty().isNumeric(),
            query('search').optional().notEmpty().isString(),
            query('author').optional().notEmpty().isNumeric(),
            query('year').optional().notEmpty().isNumeric(),
            query('page').optional().notEmpty().isNumeric(),
            
        ],getMainPage)
    router.route('/book/cover/:bookId')
        .get([
            param('bookId').notEmpty().isNumeric().isInt()
        ],getBookCover)
    
    router.route('/book/')
        .get([
            query('bookID').optional().notEmpty().isNumeric(),
        ],getBookPage)

    router.route('/book/')
        .post([
            body('click').notEmpty().isBoolean(),
            body('bookID').notEmpty().isNumeric()
        ],clickIncremet)
} catch (error) {
    console.error(error)
}

export default router;