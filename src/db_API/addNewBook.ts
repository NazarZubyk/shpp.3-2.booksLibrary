import * as fs from 'fs';
import { connection } from './connect';
import { createNewBook } from './createNewBook';
import { addAuthors } from './addAuthor';
import { binding } from './bindindAuthorAndBook';


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
                const connection = await require('./connect').connection;
                
                for (const author of authors) {
                    
                    await binding(author, bookName, connection);
                  }
                        
                console.log(`adds new book - ${bookName}`)    
            } catch (error) {
                console.log(error)
            }  
            
}