import * as fs from 'fs';
import { connection } from './connect';
import { createNewBook } from './createNewBook';
import { addAuthors } from './addAuthor';
import { binding } from './bindindAuthorAndBook';



export async function addBook(
    bookName : string,
    publicationDate : string,
    description : string,
    imageUrl : string,
    authors: string[]
        ): Promise<void> {    
            await createNewBook(bookName,publicationDate, description,imageUrl);
            await addAuthors(authors);
            authors.map(async (author)=>{
                await binding(author,bookName)})
}