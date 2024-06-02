import { Request, Response, json } from 'express';
import { validationResult } from 'express-validator';
import path from 'path'
import { getAdminPass } from '../db_API/admins';
import fileUpload from 'express-fileupload';
import { addAuthors } from '../db_API/addAuthor';
import { addBook } from '../db_API/addNewBook';
import { getLastCreatedFilePath } from './myFileSys';
import { addBookInDeletedList, getBooksDate, isBookDeleted } from '../db_API/books';
import { bookAdmin } from './types';
import { getAuthorsByBookId } from '../db_API/authors';
import { ImagesService } from './aws';

const fs = require('fs').promises;
const sourcePath = path.join(__dirname, '..', '..','source', 'images','bookCovers')



export async function getAdmin (req: Request, res: Response){
    if(req.session.authenticated && req.session.isAdmin){
        try {
            //validation part
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json( { "error": "bad request" } ); 
            }  
            res.sendFile(path.join(__dirname, '..', '..','front','admin', 'admin.html'))
               
                
        } catch (error) {
            console.error(error)
            res.status(500).json({ "error": "fatal server error" } )
        }
    }
    else{
        res.redirect('/login')
    }
}

//adds a new book to db
export async function postAdmin (req: Request, res: Response){
    if(req.session.authenticated && req.session.isAdmin){
        try {
            //validation part
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors)
                return res.status(400).json( { "error": "bad request" } ); 
            }  
    
            const image = req.file
            if(!image){
                return res.status(400).json( { "error": "bad request. image has not upload" } ); 
            }
            
    
            const date :{
                bookTitle : string,
                publicationYear : string
                authors : string[],
                description : string,
            } = await JSON.parse(req.body.bookData) 
            
            
            //get image extention        
            const extention = image.mimetype.split('/')[1]
            const sanitizedBookTitle = date.bookTitle.replace(/\s+/g, '_');
    
            //will be use fro aws key
            const newName = `${sanitizedBookTitle}${Date.now()}.${extention}`;
    

            // local storage
            //const destinationPath = path.join(sourcePath, newName);
            //const relativeImagePath = path.join('source', 'images','bookCovers',newName)
            //await fs.writeFile(destinationPath, image.buffer) 

            //need to adds aws stroage here

            const aws = new ImagesService;
            await aws.create( image , newName );

                
            
            //at now in relative path to file will be contains aws key       
            addBook(sanitizedBookTitle,date.publicationYear,date.description, newName ,date.authors)
    
            res.send(JSON.stringify({ success: true }))
                
        } catch (error) {
            console.error(error)
            res.status(500).json({ "error": "fatal server error" } )
        }
    }
    else{
        res.redirect('/login')
    }
    
}

export async function getAdminBooks (req: Request, res: Response){
    if(req.session.authenticated && req.session.isAdmin){
        try {
            //validation part
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors)
                return res.status(400).json( { "error": "bad request" } ); 
            }  
            
            const dateReturned = await getBooksDate()
            let date : bookAdmin[] = dateReturned[0] as any
    
            // let booksWithoutDeleted:Partial<bookAdmin[]>={} as bookAdmin[]; 
            // for(const book of date) {
            //     if(!await isBookDeleted(book.book_id)){
            //         booksWithoutDeleted.push(book)
            //     }
                
            // }
            // date = booksWithoutDeleted as bookAdmin[];
    
            for(const book of date) {
                const authors:{author_name:string}[] = await getAuthorsByBookId(book.book_id) as any;
                const authorNamesArray = authors.map(author => author.author_name.trim());
                book.authors = authorNamesArray;
            }
            
            res.send(JSON.stringify(date))
        } catch (error) {
            console.error(error)
            res.status(500).json({ "error": "fatal server error" } )
        }
    }
    else{
        res.redirect('/login')
    }
    
}

export async function deleteBookByIndex (req: Request, res: Response){
    if(req.session.authenticated && req.session.isAdmin){
        try {
            //validation part
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors)
                return res.status(400).json( { "error": "bad request" } ); 
            }  
            const params:{bookId: number} = req.params as any
            
            //const result:{success:boolean, error?:string} = await deleteBookAndBindsByBookId(params.bookId)
            const result:{success:boolean, error?:string} = await addBookInDeletedList(params.bookId)
            
            res.status(result.success ? 200 : 400).json(result);
        } catch (error) {
            console.error(error)
            res.status(500).json({ "error": "fatal server error" } )
        }
    }
    else{
        res.redirect('/login')
    }
    
}