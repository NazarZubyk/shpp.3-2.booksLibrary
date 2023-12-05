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

    for  (const statement of statements) {
      const trimmedStatement = statement.trim();
      if (trimmedStatement) {
        const replacedStatement = trimmedStatement
          .replace(/textField1/g, author)
          .replace(/textField2/g, book);
          
         await (await connection).execute(replacedStatement);
      }
    }

    console.log(`binding author ${author} and book ${book} success`)
  } catch (error) {
    console.error('Error executing SQL script:', error);
  }
}
