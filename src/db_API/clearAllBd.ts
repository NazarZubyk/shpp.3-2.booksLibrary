import * as fs from 'fs';
import { connection  } from './connect';
import path from 'path';

const scriptPath2 =  path.join( 'sqlscripts/operation', 'delete_all_authors.sql');
const scriptPath1 =  path.join( 'sqlscripts/operation', 'delete_all_binding.sql');
const scriptPath3 =  path.join( 'sqlscripts/operation', 'delete_all_books.sql');
const scriptPath4 =  path.join( 'sqlscripts/operation', 'delete_all_admins.sql');

export async function clearDB(
    
        ): Promise<void> {
  try {
    console.log(`start ${scriptPath1}`)
    // Read the content of the SQL file
    let sqlScript = fs.readFileSync(scriptPath1, 'utf-8');            
    await (await connection).query(sqlScript);
    console.log(`end ${scriptPath1}`)

    console.log(`start ${scriptPath2}`)
    sqlScript = fs.readFileSync(scriptPath2, 'utf-8');            
    await (await connection).query(sqlScript);
    console.log(`end ${scriptPath2}`)

    console.log(`start ${scriptPath3}`)
    sqlScript = fs.readFileSync(scriptPath3, 'utf-8');            
    await (await connection).query(sqlScript);
    console.log(`end ${scriptPath3}`)

    console.log(`start ${scriptPath4}`)
    sqlScript = fs.readFileSync(scriptPath4, 'utf-8');            
    await (await connection).query(sqlScript);
    console.log(`end ${scriptPath4}`)

    console.log('-----------------------------------------------------')
    console.log(`SQL CLEAR ALL DB`);
    console.log('-----------------------------------------------------')
  } catch (error) {
    console.error('Error executing SQL script:', error);
  }
}