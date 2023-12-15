import { Request, Response } from 'express';
import path from 'path';
import { getBook, getIdAndTitleOfBooks, getIdAndTitleOfBooksSearch, getImaheUrlByBookID } from '../db_API/books';
import { bookBook, bookMain } from './types';
import { getAuthorsByBookId } from '../db_API/authors';
import { validationResult } from 'express-validator';
import ejs from 'ejs';
import { off } from 'process';

const frontPath = path.join(__dirname, '..', '..','front')
const dirPath = path.join(__dirname, '..', '..')

export async function getBookPage(req:Request,res:Response) {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json( { "error": "bad request" } ); 
        } 
    
    const bookID: number | undefined = req.query.bookID as any
    
    let data: bookBook | undefined;

    if(bookID){
        const dataSQL = await getBook(bookID)
        const dataArray: bookBook[] = dataSQL[0] as any
        data = dataArray[0];
    }
    else{
        res.status(400).send(JSON.stringify({message: "error"}))
    }
    
    if(data){
        const authors:{author_name:string}[] = await getAuthorsByBookId(data.book_id) as any;
        const authorNamesArray = authors.map(author => author.author_name.trim());
        data.authors = authorNamesArray;

        const mainEjsPath = path.join(frontPath,'book-page.ejs')
        
        const book = {
            book_id : data.book_id,
            book_name : data.book_name,
            author: data.authors,
            year: data.publication_date,
            description: data.description
        }


        res.render(mainEjsPath, {book})
    }
    
    
    
    

    
    
        
    
}
