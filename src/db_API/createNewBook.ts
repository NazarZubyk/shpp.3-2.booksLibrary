import * as fs from 'fs';
import { connection } from './connect';
import path from 'path';

const scriptPath =  path.join( 'sqlscripts/operation', 'create_new_book.sql');



export async function createNewBook(
    bookName : string, 
    publicationDate : string, 
    description : string, 
    imageUrl : string 
        ): Promise<void> {
  try {
    // Read the content of the SQL file
    let sqlScript = fs.readFileSync(scriptPath, 'utf-8');
            
    await (await connection).execute(sqlScript, [
      bookName,
      publicationDate,
      description,
      imageUrl,
    ]);

  
    console.log(`adds book wwith informatio - ${bookName}`);
    
  } catch (error) {
    console.error('Error executing SQL script:', error);
  }
}