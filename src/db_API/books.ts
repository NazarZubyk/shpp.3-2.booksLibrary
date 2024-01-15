import * as fs from 'fs';
import path from 'path';
import { connection } from './connect';
import { create } from 'domain';


const getBooksTableScryptPath =  path.join( 'sqlscripts/operation', 'get_id_title_year_books_clicks.sql');
const getBooksIdTitleScryptPath =  path.join( 'sqlscripts/operation', 'get_id_title.sql');
const getBooksIdTitleScryptPathSearch =  path.join( 'sqlscripts/operation', 'get_id_title_serch.sql');
const deleteBookByBookIdScryptPath =  path.join( 'sqlscripts/operation', 'delete_book_by_index.sql');
const deleteBindsByBookIdScryptPath =  path.join( 'sqlscripts/operation', 'delete_binding_by_book_index.sql');
const getCoverByBookIDscryptPath = path.join( 'sqlscripts/operation', 'get_book_title_url.sql');
const getBookDataScryptPath = path.join( 'sqlscripts/operation', 'get_book.sql');
const incrementViewByIDScryptPath = path.join( 'sqlscripts/operation', 'increment_view.sql');
const incrementClicksByIDScryptPath = path.join( 'sqlscripts/operation', 'increment_click.sql');
const isDeletedByIDScryptPath = path.join( 'sqlscripts/operation', 'is_book_deleted_by_id.sql');
const addInDeletedListByIDScryptPath = path.join( 'sqlscripts/operation', 'add_to_delete_list.sql');
const getDeleteBookList = path.join( 'sqlscripts/operation', 'get_delete_book_list.sql');

const getBookForMainWithSearchAll = path.join( 'sqlscripts/operation', 'get_id_title_serch_all.sql');
const getBookForMainWithSearchPopular = path.join( 'sqlscripts/operation', 'get_id_title_serch_popular.sql');
const getBookForMainWithSearchNew = path.join( 'sqlscripts/operation', 'get_id_title_serch_new.sql');

const getBookForMainWithoutSearchAll = path.join( 'sqlscripts/operation', 'get_id_title_all.sql');
const getBookForMainWithoutSearchPopular = path.join( 'sqlscripts/operation', 'get_id_title_popular.sql');
const getBookForMainWithoutSearchNew = path.join( 'sqlscripts/operation', 'get_id_title_new.sql');


export async function  deletBookCoverImage(bookID:number) {
    const result = await getImaheUrlByBookID(bookID) as any;
    const url: { image_url: string }= result[0];
    const deletedPath = path.join(__dirname,'..','..',url.image_url)
    
    fs.unlink(deletedPath,(err)=>{
        if(err) return console.log(err);
        console.log(`${url.image_url} - file deleted successfully`)
    });
    
    
    
}

export async function  getDeletBookList() {
    
    let sqlScript = fs.readFileSync(getDeleteBookList, 'utf-8');
    const date =  await (await connection).query(sqlScript) 
    
    return date;
    
}

export async function  addBookInDeletedList(bookID: number) {
    
    let sqlScript = fs.readFileSync(addInDeletedListByIDScryptPath, 'utf-8');
    const date =  await (await connection).query(sqlScript,[bookID]) 
    
    if (date) {
        return { success: true };
    } else {
        return { success: false, error: 'Failed to add book in delete list' };
    }
    
}

export async function  isBookDeleted(bookID: number) { 
    try {
        let sqlScript = fs.readFileSync(isDeletedByIDScryptPath, 'utf-8');
        const date =  await (await connection).query(sqlScript,[bookID]) as any;
        let unpachedDate :{deleted:number}[]= date[0]
        return !!unpachedDate[0].deleted ;
    } catch (error) {
        console.log(error)
    }   
    
}

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

export async function  getIdAndTitleOfBooks(quantyty: number, fromPosition : number, sort:string) {
    let sqlScript = '';
    switch (sort) {
        case 'all':
            sqlScript = fs.readFileSync(getBookForMainWithoutSearchAll, 'utf-8');
            break;
        case 'popular':
            sqlScript = fs.readFileSync(getBookForMainWithoutSearchPopular, 'utf-8');
            break;
        case 'new':
            sqlScript = fs.readFileSync(getBookForMainWithoutSearchNew, 'utf-8');
            break; 
        default:
            
            break;
    }
    
    
    const date =  await (await connection).query(sqlScript,[quantyty,fromPosition])
    return date;
}

export async function  getIdAndTitleOfBooksSearch(quantyty: number, fromPosition : number, search: string, sort:string) {
    
    let sqlScript = '';
    switch (sort) {
        case 'all':
            sqlScript = fs.readFileSync(getBookForMainWithSearchAll, 'utf-8');
            break;
        case 'popular':
            sqlScript = fs.readFileSync(getBookForMainWithSearchPopular, 'utf-8');
            break;
        case 'new':
            sqlScript = fs.readFileSync(getBookForMainWithSearchNew, 'utf-8');
            break; 
        default:
            
            break;
    }
    const date =  await (await connection).query(sqlScript,[search,quantyty,fromPosition]);
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

export async function incrementViewByID(bookId:number) {
    let scryptPath = fs.readFileSync(incrementViewByIDScryptPath, 'utf-8');

    const imageUrl = await (await connection).query(scryptPath,[bookId])
    return imageUrl[0];
}

export async function incrementClickByID(bookId:number) {
    let scryptPath = fs.readFileSync(incrementClicksByIDScryptPath, 'utf-8');

    const imageUrl = await (await connection).query(scryptPath,[bookId])
    return imageUrl[0];
}