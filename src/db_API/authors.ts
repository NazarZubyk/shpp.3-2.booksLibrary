import * as fs from 'fs';
import path from 'path';
import { connection } from './connect';

const getAuthorsByBookIdScryptPath =  path.join( 'sqlscripts/operation', 'get_authors_by_book_id.sql');

export async function  getAuthorsByBookId(book_id:number) {
    let sqlScript = fs.readFileSync(getAuthorsByBookIdScryptPath, 'utf-8');
    const authors =  await (await connection).query(sqlScript,[book_id])
    return authors[0];
}