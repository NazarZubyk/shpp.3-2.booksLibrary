import * as fs from 'fs';
import { connection  } from './connect';
import path from 'path';
import { runUpdates } from './runUpdates';
import { promises } from 'dns';
import { promisify } from 'util';

const migration =  path.join( 'sqlscripts/migration');
const dbV1 =  path.join( 'sqlscripts/secondDB');
const readFileAsync = promisify(fs.readFile);

export async function  getAllBooksDB1() { 
    try {
        
        let sqlScript = fs.readFileSync(path.join(migration,'select_all_booksDB1.sql'), 'utf-8');
        const date =  await (await connection).query(sqlScript) as any;
        return date;
    } catch (error) {
        console.log(error)
    }    
}

export async function  getAllBooksDB0() { 
    try {
        
        let sqlScript = fs.readFileSync(path.join(migration,'select_all_booksDB0.sql'), 'utf-8');
        const date =  await (await connection).query(sqlScript) as any;
        return date;
    } catch (error) {
        console.log(error)
    }    
}

// create table v1 (authors and books in 1 table)
export async function createTableV1() {
    try {
        
      
      const sqlScript = await readFileAsync(path.join(dbV1, '001_create_table.sql'), 'utf-8');
  
      await (await connection).query(sqlScript);
    
      
    } catch (error) {
      
      return Promise.reject(error);
    }
  }

// create tables v0, books, author and bindings in different tables
export async function  createTableV0() { 
    return await runUpdates() 
}

//delete all tables from v0
export async function  deleteDBV0() { 
    try {
        

        const sqlScript1 = fs.readFileSync(path.join(migration,'deop_book_author.sql'), 'utf-8');
        const sqlScript2 = fs.readFileSync(path.join(migration,'drop_authors.sql'), 'utf-8');
        const sqlScript3 = fs.readFileSync(path.join(migration,'drop_books.sql'), 'utf-8');

        await (await connection).query(sqlScript1);
        await (await connection).query(sqlScript2);
        await (await connection).query(sqlScript3);
        
        
          
    } catch (error) {
        console.log(error)
    }    
}

//delete all tables from v1
export async function  deleteDBV1() { 
    try {

        

        let sqlScript = fs.readFileSync(path.join(migration,'delete_db_v1.sql'), 'utf-8');
        await (await connection).query(sqlScript) as any;
          
    } catch (error) {
        console.log(error)
    }    
}



