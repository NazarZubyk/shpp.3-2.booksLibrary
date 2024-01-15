import * as fs from 'fs';
import { createNewBook } from './createNewBook';
import { addAuthors } from './addAuthor';
import { binding } from './bindindAuthorAndBook';
import path from 'path';
import { connection } from './connect';

const migration =  path.join( 'sqlscripts/migration');

// adds book with information and authors
// also do binding authors and authoers in new tabke in db
export async function addBook(
    bookName : string,
    publicationDate : string,
    description : string,
    imageUrl : string,
    authors: string[]
        ): Promise<void> {  
            try {
                await createNewBook(bookName,publicationDate, description,imageUrl);
                await addAuthors(authors);
                const conc = await require('./connect').connection;
                
                for (const author of authors) {
                    
                    await binding(author, bookName, conc);
                  }
                        
                console.log(`adds new book - ${bookName}`)    
            } catch (error) {
                console.log(error)
            }  
            
}

export async function addBookToV0db(
    book_id : number,
    book_name : string,
    image_url : string,
    publication_date: number,
    description : string,
    clicks : number,
    views : number,
    deleted: number,
    authors : string[]
        ): Promise<void> {  
            try {
                let sqlScript = fs.readFileSync(path.join(migration,'add_new_position_in_v0.sql'), 'utf-8');
                await  (await connection).query(sqlScript,[
                    book_id,
                    book_name,
                    image_url,
                    publication_date,
                    description,
                    clicks,
                    views,
                    deleted
                ]);

                await addAuthors(authors);

                const conect = await require('./connect').connection;
                
                for (const author of authors) {                    
                    await binding(author, book_name, conect);
                  }
                 
            } catch (error) {
                console.log(error)
            }  
            
}

export async function addBookToV1db(
    book_id : number,
    book_name : string,
    image_url : string,
    publication_date: number,
    description : string,
    clicks : number,
    views : number,
    deleted: number,
    authors : string
        ): Promise<void> {  
            try {
                let sqlScript = fs.readFileSync(path.join(migration,'add_new_position_in_v1.sql'), 'utf-8');
                await (await connection).query(sqlScript,[
                    book_id,
                    book_name,
                    image_url,
                    publication_date,
                    description,
                    clicks,
                    views,
                    deleted,
                    authors
                ]);
                  
            } catch (error) {
                console.log(error)
            }  
            
}

