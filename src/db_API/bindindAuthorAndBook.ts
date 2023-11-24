import * as fs from 'fs';
import { connection } from './connect';
import path from 'path';

const scriptPath =  path.join( 'sqlscripts/operation', 'binding.sql');


export async function binding(author: string, book: string): Promise<void> {
  try {
    const connection = await require('./connect').connection;

    const sqlScript = fs.readFileSync(scriptPath, 'utf-8');
    
    const statements = sqlScript.split(';').filter(Boolean);

    for (const statement of statements) {
      await connection.execute(statement.replace('textField1', author).replace('textField2', book));
    }

    console.log('--------------------------------')
    console.log(`SQL script executed successful scrypt Path - ${scriptPath}`);
    console.log('--------------------------------')
  } catch (error) {
    console.error('Error executing SQL script:', error);
  }
}
