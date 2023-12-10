import { Request, Response } from 'express';
import path from 'path';
import { getIdAndTitleOfBooks, getImaheUrlByBookID } from '../db_API/books';
import { bookMain } from './types';
import { getAuthorsByBookId } from '../db_API/authors';
import { validationResult } from 'express-validator';
import ejs from 'ejs';

const frontPath = path.join(__dirname, '..', '..','front')
const dirPath = path.join(__dirname, '..', '..')

export async function getMainPage(req:Request,res:Response) {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json( { "error": "bad request" } ); 
        } 


    

    const dateReturned = await getIdAndTitleOfBooks()
        let books : bookMain[] = dateReturned[0] as any
        for(const book of books) {
            const authors:{author_name:string}[] = await getAuthorsByBookId(book.book_id) as any;
            const authorNamesArray = authors.map(author => author.author_name.trim());
            book.authors = authorNamesArray;
        }
    const mainEjsPath = path.join(frontPath,'books-page.ejs')
        
    res.render(mainEjsPath, {books})
}

export async function getBookCover(req:Request,res:Response) {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json( { "error": "bad request" } ); 
        } 

    const params:{bookId: number} = req.params as any
        
    try {
        const result = await getImaheUrlByBookID(params.bookId) as any;
        const urlInArray: { image_url: string }[] = result[0];
        const url = urlInArray[0].image_url;
    
        const urlOfImage = path.join(dirPath, url);
    
        
        res.sendFile(urlOfImage);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
}