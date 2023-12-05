import { Request, Response, json } from 'express';
import { validationResult } from 'express-validator';
import path from 'path'
import { getAdminPass } from '../db_API/admins';
import fileUpload from 'express-fileupload';
import { addAuthors } from '../db_API/addAuthor';
import { addBook } from '../db_API/addNewBook';
import { getLastCreatedFilePath } from './myFileSys';

const fs = require('fs').promises;
const sourcePath = path.join(__dirname, '..', '..','source', 'images','bookCovers')

export async function getAdmin (req: Request, res: Response){
    try {
        //validation part
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( { "error": "bad request" } ); 
        }  
        res.sendFile(path.join(__dirname, '..', '..','front', 'admin.html'))
           
            
    } catch (error) {
        console.error(error)
        res.status(500).json({ "error": "fatal server error" } )
    }
}

//adds a new book to db
export async function postAdmin (req: Request, res: Response){
    try {
        //validation part
        // console.log('---------------------------------------------------------------')
        // console.log(req.body)
        // console.log(req.file);
        // console.log('---------------------------------------------------------------')
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

        const destinationPath = path.join(sourcePath, `${sanitizedBookTitle}${Date.now()}.${extention}`);
        const relativeImagePath = path.join('source', 'images','bookCovers',`${sanitizedBookTitle}${Date.now()}.${extention}`)
        
        await fs.writeFile(destinationPath, image.buffer)     
        
               
        addBook(sanitizedBookTitle,date.publicationYear,date.description,relativeImagePath,date.authors)

        res.send(JSON.stringify({ success: true }))
            
    } catch (error) {
        console.error(error)
        res.status(500).json({ "error": "fatal server error" } )
    }
}