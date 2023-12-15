import { Request, Response } from 'express';
import path from 'path';
import { getIdAndTitleOfBooks, getIdAndTitleOfBooksSearch, getImaheUrlByBookID } from '../db_API/books';
import { bookMain } from './types';
import { getAuthorsByBookId } from '../db_API/authors';
import { validationResult } from 'express-validator';
import ejs from 'ejs';
import { off } from 'process';

const frontPath = path.join(__dirname, '..', '..','front')
const dirPath = path.join(__dirname, '..', '..')

export async function getMainPage(req:Request,res:Response) {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.status(400).json( { "error": "bad request" } ); 
        } 
    
    const offset: number = req.query.offset ? parseInt(req.query.offset as string, 10) : 20;
    const page: number = req.query.page ? parseInt(req.query.page as string, 10) : 0;
    let searchText: string = req.query.search ? req.query.search.toString() : '';

    const from: number = page*offset;
    
    let dateReturned;

    if(searchText.length === 0){
        dateReturned = await getIdAndTitleOfBooks(offset,from)
    }
    else{
        searchText = `%${searchText}%`
        dateReturned = await getIdAndTitleOfBooksSearch(offset,from,searchText)
    }
    
        let books : bookMain[] = dateReturned[0] as any
        for(const book of books) {
            const authors:{author_name:string}[] = await getAuthorsByBookId(book.book_id) as any;
            const authorNamesArray = authors.map(author => author.author_name.trim());
            book.authors = authorNamesArray;
        }
    const mainEjsPath = path.join(frontPath,'books-page.ejs')
        
    res.render(mainEjsPath, {books,page, searchText})
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
        const url: { image_url: string }= result[0];
        
    
        const urlOfImage = path.join(dirPath, url.image_url);
    
        
        res.sendFile(urlOfImage);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
}