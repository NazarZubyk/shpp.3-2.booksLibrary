import * as fs from 'fs';
import { connection } from './connect';
import path from 'path';

const scriptPath =  path.join( 'sqlscripts/operation', 'binding.sql');


export async function addsAuthor(
    author: string,
    book: string
        ): Promise<void> {
  try {
    // Read the content of the SQL file
    let sqlScript = fs.readFileSync(scriptPath, 'utf-8');

    sqlScript = sqlScript.replace('textFiel1', author)
    sqlScript = sqlScript.replace('textFiel2', book)
    
    await (await connection).query(sqlScript);

    console.log('--------------------------------')
    console.log('SQL script executed successfully');
    console.log(`scrypt Path - ${scriptPath}`)
  } catch (error) {
    console.error('Error executing SQL script:', error);
  }
}