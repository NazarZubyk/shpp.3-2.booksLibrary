import * as fs from 'fs';
import path from 'path';
import { connection } from './connect';

const getBooksTableScryptPath =  path.join( 'sqlscripts/operation', 'get_id_title_year_books.sql');
const getBooksIdTitleScryptPath =  path.join( 'sqlscripts/operation', 'get_id_title.sql');
const getBooksIdTitleScryptPathSearch =  path.join( 'sqlscripts/operation', 'get_id_title_serch.sql');
const deleteBookByBookIdScryptPath =  path.join( 'sqlscripts/operation', 'delete_book_by_index.sql');
const deleteBindsByBookIdScryptPath =  path.join( 'sqlscripts/operation', 'delete_binding_by_book_index.sql');
const getCoverByBookIDscryptPath = path.join( 'sqlscripts/operation', 'get_book_title_url.sql');
const getBookDataScryptPath = path.join( 'sqlscripts/operation', 'get_book.sql');

export async function  getBooksDate() {
    
    let sqlScript = fs.readFileSync(getBooksTableScryptPath, 'utf-8');
    const date =  await (await connection).query(sqlScript)
    return date;
}

export async function  getBook(bookID: number) {
    
    let sqlScript = fs.readFileSync(getBookDataScryptPath, 'utf-8');
    const date =  await (await connection).query(sqlScript,[bookID])
    return date;
}

export async function  getIdAndTitleOfBooks(quantyty: number, fromPosition : number) {
    
    let sqlScript = fs.readFileSync(getBooksIdTitleScryptPath, 'utf-8');
    const date =  await (await connection).query(sqlScript,[quantyty,fromPosition])
    return date;
}

export async function  getIdAndTitleOfBooksSearch(quantyty: number, fromPosition : number, search: string) {
    
    let sqlScript = fs.readFileSync(getBooksIdTitleScryptPathSearch, 'utf-8');
    const date =  await (await connection).query(sqlScript,[search,quantyty,fromPosition])
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