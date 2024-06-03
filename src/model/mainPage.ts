import { Request, Response } from 'express';
import path from 'path';
import { getIdAndTitleOfBooks, getIdAndTitleOfBooksSearch, getImaheUrlByBookID, isBookDeleted } from '../db_API/books';
import { bookMain } from './types';
import { getAuthorsByBookId } from '../db_API/authors';
import { validationResult } from 'express-validator';
import ejs from 'ejs';
import { off } from 'process';
import { ImagesService } from './aws';

const frontPath = path.join(__dirname, '..', '..','front','books-page')
const dirPath = path.join(__dirname, '..', '..')

export async function getMainPage(req:Request,res:Response) {
   
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json( { "error": "bad request" } ); 
        } 
    
    const offset: number = req.query.offset ? parseInt(req.query.offset as string, 10) : 20;
    const page: number = req.query.page ? parseInt(req.query.page as string, 10) : 0;
    const filter: string = req.query.filter ? req.query.filter as string : "all";
    let searchText: string = req.query.search ? req.query.search.toString() : '';

    
        
    const from: number = page*offset;
    
    let dateReturned;

    if(searchText.length === 0){
        dateReturned = await getIdAndTitleOfBooks(offset,from, filter)
    }
    else{
        searchText = `%${searchText}%`
        dateReturned = await getIdAndTitleOfBooksSearch(offset,from,searchText,filter)
    }
    
        let books : bookMain[] = dateReturned[0] as any
        
        // let booksWithoutDeleted:Partial<bookMain[]>={} as bookMain[]; 
        // for(const book of books) {
        //     if(!await isBookDeleted(book.book_id)){
        //         booksWithoutDeleted.push(book)
        //     }
            
        // }
        // books = booksWithoutDeleted as bookMain[];
        for(const book of books) {
            const authors:{author_name:string}[] = await getAuthorsByBookId(book.book_id) as any;
            const authorNamesArray = authors.map(author => author.author_name.trim());
            book.authors = authorNamesArray;
        }
    const mainEjsPath = path.join(frontPath,'books-page.ejs')
    books.reverse()
        
    res.render(mainEjsPath, {books,page, searchText, filter})
    
}


export async function getBookCover(req:Request,res:Response) {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json( { "error": "bad request" } ); 
        } 

    const params:{bookId: number} = req.params as any
        /// return image need here
    try {
        const result = await getImaheUrlByBookID(params.bookId) as any;
        const url: { image_url: string }= result[0];
        
        //version with local storage
        //const urlOfImage = path.join(dirPath, url.image_url);
        
        const aws =  new ImagesService;
        const imageData = await aws.getImage(url.image_url)
        
        if (imageData && imageData.data.Body) {
            // Set content type header
            res.setHeader('Content-Type', imageData.contentType);

            // Convert the stream to Buffer and send it as a binary response
            const chunks: Uint8Array[] = [];
            for await (const chunk of imageData.data.Body as AsyncIterable<Uint8Array>) {
                chunks.push(chunk);
            }
            const buffer = Buffer.concat(chunks);

            res.send(buffer);
        } else {
            res.status(404).json({ error: 'Image not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }     

      
      

}