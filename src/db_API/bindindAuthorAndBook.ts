import * as fs from 'fs';
import { connection } from './connect';
import path from 'path';
import * as mysql from 'mysql2/promise'; 

const scriptPath =  path.join( 'sqlscripts/operation', 'binding.sql');

// creates pair in binding table with binding of book title id and authors id
export async function binding(author: string, book: string, connection:Promise<mysql.Connection>){
  try {
    

    const sqlScript = fs.readFileSync(scriptPath, 'utf-8');
    
    const statements = sqlScript.split(';').filter(Boolean);
    await (await connection).execute(statements[0],[author]);
    await (await connection).execute(statements[1],[book]);
    await (await connection).execute(statements[2]);
    

    //console.log(`binding author ${author} and book ${book} success`)
  } catch (error) {
    console.error('Error executing SQL script:', error);
  }
}
