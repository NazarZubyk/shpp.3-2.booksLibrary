import { addBookToV0db, addBookToV1db } from "../db_API/addNewBook";
import { getAuthorsByBookId } from "../db_API/authors";
import { createTableV0, createTableV1, deleteDBV0, deleteDBV1, getAllBooksDB0, getAllBooksDB1 } from "../db_API/migartion";
import { dbV0books, dbV1books } from "./types";

export async function  migrateDBfrotmV0toV1() { 
    await createTableV1();

    let dbV0mySqlFormat = await getAllBooksDB0();
    let dbV0 : dbV0books[]  = dbV0mySqlFormat[0];

    try {
        
        
        for(const book of dbV0) {
            const authors:{author_name:string}[] = await getAuthorsByBookId(book.book_id) as any;
           
            let concatenatedAuthors;
            if(authors){
                const authorNamesArray = authors.map(author => author.author_name.trim());
                concatenatedAuthors = authorNamesArray.join(', ');
            }else{
                concatenatedAuthors = 'Автор Відсутній';
            }
                   
            
            await addBookToV1db(
                    book.book_id,
                    book.book_name,
                    book.image_url,
                    book.publication_date,
                    book.description,
                    book.clicks,
                    book.views,
                    book.deleted,
                    concatenatedAuthors
            )
        }

        await deleteDBV0()

    } catch (error) {
        console.log(error)
    }  
}



export async function  migrateDBfrotmV1toV0() { 
    
    await createTableV0();

    let dbV1mySqlFormat = await getAllBooksDB1();
    let dbV0 : dbV1books[]  = dbV1mySqlFormat[0];


    try {
        
        
        for(const book of dbV0) {
            
            let authorsArray;
            if(book.authors_names){
                authorsArray = book.authors_names.split(',').map(author => author.trim());
            }else{
                authorsArray = ['Автор відсутній']
            }
            

            await addBookToV0db(
                    book.book_id,
                    book.book_name,
                    book.image_url,
                    book.publication_date,
                    book.description,
                    book.clicks,
                    book.views,
                    book.deleted,
                    authorsArray
            )
            

            
        }
          
        await deleteDBV1();

    } catch (error) {
        console.log(error)
    }    
}


