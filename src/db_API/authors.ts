import * as fs from 'fs';
import path from 'path';
import { connection } from './connect';

const getAuthorsByBookIdScryptPath =  path.join( 'sqlscripts/operation', 'get_authors_by_book_id.sql');
const getAuthorsForDeletingScryptPath =  path.join( 'sqlscripts/operation', 'get_authors_for_deleting.sql');
const deleteAuthorByIDScryptPath =  path.join( 'sqlscripts/operation', 'get_authors_for_deleting.sql');
export async function  deleteFreeAuthors() {
    let sqlScript = fs.readFileSync(getAuthorsForDeletingScryptPath, 'utf-8');
    let sqlScriptDelete = fs.readFileSync(deleteAuthorByIDScryptPath, 'utf-8');

    const dateSQl =  await (await connection).query(sqlScript) 
    const date: { author_id: string }[]= dateSQl[0] as any;

    for(const author of date){
        await (await connection).query(sqlScriptDelete,[author.author_id]) 
    }

}

export async function  getAuthorsByBookId(book_id:number) {
    let sqlScript = fs.readFileSync(getAuthorsByBookIdScryptPath, 'utf-8');
    const authors =  await (await connection).query(sqlScript,[book_id])
    return authors[0];
}