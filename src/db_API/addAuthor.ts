import * as fs from 'fs';
import { connection } from './connect';
import path from 'path';

const scriptPath =  path.join( 'sqlscripts/operation', 'adds_author.sql');


// adds one author to db
// if author is exist will get error (it is fine)
export async function addsAuthor(
    author: string
        ): Promise<void> {
  try {
    // Read the content of the SQL file
    let sqlScript = fs.readFileSync(scriptPath, 'utf-8');
    sqlScript = sqlScript.replace('textField1', author)
            
    await (await connection).query(sqlScript);

    
    console.log(`adds author success - ${author}`);
    
  } catch (error) {
    console.error('Error executing SQL script:', error);
  }
}

//addns many authors
export async function addAuthors(authors:string[]){
    authors.forEach((author)=>{addsAuthor(author)})
}
    

