import path from "path";
import { deleteFreeAuthors } from "../db_API/authors";
import { deletBookCoverImage, deleteBookAndBindsByBookId, getDeletBookList } from "../db_API/books";
import mysqldump from 'mysqldump';

import { exec } from 'child_process';
import util, { promisify } from 'util';
import { connection } from "../db_API/connect";
const execAsync = promisify(exec);


export async function updateDB() {
    const dateDBformat = await getDeletBookList();
    const data:{book_id:number}[] = dateDBformat[0] as any;
    
    for(const book of data) {
        await deletBookCoverImage(book.book_id);
        await deleteBookAndBindsByBookId(book.book_id);
        await deleteFreeAuthors()
    }
}

export async function createBackup() {
    const newName = `backup_${Date.now()}.sql`;
    const dumpPath = path.join(__dirname,'..','..','source','dump',newName)
    mysqldump({
        connection: {
            host: 'localhost',
            user: 'root',
            password: '88888888',
            database: 'myDB',
        },
        dumpToFile: dumpPath,
    });
}

export async function loadBackup(dumpPath: string) {
    try {
      // Use the MySQL command-line tool to load data from the dump file
      await (await connection).execute(`myDB < ${dumpPath}`);

      
    } catch (error) {
      console.error('Error loading backup:', error);
    }
  }