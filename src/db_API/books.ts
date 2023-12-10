import * as fs from 'fs';
import path from 'path';
import { connection } from './connect';

const getBooksTableScryptPath =  path.join( 'sqlscripts/operation', 'get_id_title_year_books.sql');
const getBooksIdTitleScryptPath =  path.join( 'sqlscripts/operation', 'get_id_title.sql');
const deleteBookByBookIdScryptPath =  path.join( 'sqlscripts/operation', 'delete_book_by_index.sql');
const deleteBindsByBookIdScryptPath =  path.join( 'sqlscripts/operation', 'delete_binding_by_book_index.sql');
const getCoverByBookIDscryptPath = path.join( 'sqlscripts/operation', 'get_book_title_url.sql');

export async function  getBooksDate() {
    
    let sqlScript = fs.readFileSync(getBooksTableScryptPath, 'utf-8');
    const date =  await (await connection).query(sqlScript)
    return date;
}

export async function  getIdAndTitleOfBooks() {
    
    let sqlScript = fs.readFileSync(getBooksIdTitleScryptPath, 'utf-8');
    const date =  await (await connection).query(sqlScript)
    return date;
}

export async function  deleteBookAndBindsByBookId(bookId:number) {
    let book = fs.readFileSync(deleteBookByBookIdScryptPath, 'utf-8');
    let binds = fs.readFileSync(deleteBindsByBookIdScryptPath, 'utf-8');
    
    const resultBinds = await (await connection).query(binds,[bookId])
    const resultBook = await (await connection).query(book,[bookId])
    

    if (resultBook && resultBinds) {
        return { success: true };
    } else {
        return { success: false, error: 'Failed to delete book and binds' };
    }
}

export async function getImaheUrlByBookID(bookId:number) {
    let scryptPath = fs.readFileSync(getCoverByBookIDscryptPath, 'utf-8');

    const imageUrl = await (await connection).query(scryptPath,[bookId])
    return imageUrl[0];
}