import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import path from 'path'
import { getAdminPass } from '../db_API/admins';

//logout admin
export async function getLogout (req: Request, res: Response){
    try {
        req.session.authenticated = false;
        req.session.isAdmin = false;

        res.redirect('/')
    } catch (error) {
        console.error(error)
        res.status(500).json({ "error": "fatal server error" } )
    }

}

//get login page
export async function getLogin (req: Request, res: Response){
    try {
        //validation part
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json( { "error": "bad request" } ); 
        }  
        res.sendFile(path.join(__dirname, '..', '..','front','admin', 'login.html'))
        
        
            
    } catch (error) {
        console.error(error)
        res.status(500).json({ "error": "fatal server error" } )
    }
}

//login admin
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
            req.session.authenticated = true;
            req.session.isAdmin = true;
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
