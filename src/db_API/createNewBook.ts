import * as fs from 'fs';
import { connection } from './connect';
import path from 'path';

const scriptPath =  path.join( 'sqlscripts/operation', 'create_new_book.sql');

let yourDate = new Date().toISOString().split('T')[0]

export async function createNewBook(
    bookName : string, 
    publicationDate : string, 
    description : string, 
    imageUrl : string 
        ): Promise<void> {
  try {
    // Read the content of the SQL file
    let sqlScript = fs.readFileSync(scriptPath, 'utf-8');
    sqlScript = sqlScript.replace('textField1',bookName);
    sqlScript = sqlScript.replace('textField2',publicationDate);
    sqlScript = sqlScript.replace('textField3',description);
    sqlScript = sqlScript.replace('textField4',imageUrl);
            
    await (await connection).query(sqlScript);

    console.log('--------------------------------')
    console.log(`SQL script executed successfully scrypt Path - ${scriptPath}`);
    console.log('--------------------------------')
  } catch (error) {
    console.error('Error executing SQL script:', error);
  }
}