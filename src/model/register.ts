import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import path from 'path'
import { addAdmin } from '../db_API/admins';

export async function postRegister (req: Request, res: Response){
    try {

        const body:{username:string,password:string} = req.body;
        //validation part
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( { "error": "bad request" } ); 
        }  

        
        const successful = addAdmin(body.username,body.password)
        
        if(await successful){
            res.redirect('/admin');
        }else{
            return res.status(400).json( { "error": "bad request" } ); 
        }
                
    } catch (error) {
        console.error(error)
        res.status(500).json({ "error": "fatal server error" } )
    }
}