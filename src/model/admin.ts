import { Request, Response, json } from 'express';
import { validationResult } from 'express-validator';
import path from 'path'
import { getAdminPass } from '../db_API/admins';
import fileUpload from 'express-fileupload';

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
        } = JSON.parse(req.body.bookData) 
        
        
        
        const extention = image.mimetype.split('/')[1]
        const destinationPath = path.join(sourcePath, `${date.bookTitle}${Date.now()}.${extention}`);
        const relativeImagePath = path.join('source', 'images','bookCovers',`${date.bookTitle}${Date.now()}.${extention}`)
        await fs.writeFile(destinationPath, image.buffer)     
        
        // console.log(date.bookTitle)
        // console.log(date.publicationYear)
        // console.log(date.authors)
        // console.log(date.description)

        res.send(JSON.stringify({ success: true }))
            
    } catch (error) {
        console.error(error)
        res.status(500).json({ "error": "fatal server error" } )
    }
}