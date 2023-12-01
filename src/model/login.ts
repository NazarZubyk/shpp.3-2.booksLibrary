import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import path from 'path'
import { getAdminPass } from '../db_API/admins';

export async function getLogin (req: Request, res: Response){
    try {
        //validation part
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( { "error": "bad request" } ); 
        }  
        res.sendFile(path.join(__dirname, '..', '..','front', 'login.html'))
        
        
            
    } catch (error) {
        console.error(error)
        res.status(500).json({ "error": "fatal server error" } )
    }
}

export async function postLogin (req: Request, res: Response){
    try {
        //validation part
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( { "error": "bad request" } ); 
        }  
        
        const body:{username:string,password:string} = req.body;
        
        const adminPass = await getAdminPass(body.username);

        

        if(body.password === adminPass[0].password){
            res.redirect('/admin')

        }
        else{
            res.status(401).json({"error":"wrong password"})
        }
        
            
    } catch (error) {
        console.error(error)
        res.status(500).json({ "error": "fatal server error" } )
    }
}
