import express from 'express'
import http from 'http'
import path from 'path';
import ejs from 'ejs';
import { addBook } from './db_API/addNewBook';

//--------------------------------------------------------
const fs = require('fs').promises;
const mysql = require('mysql2/promise');

async function runMigrations() {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '88888888',
      database: 'myDB',
    });
  
    try {
      console.log('Connected to MySQL database');
  
      // Run the migration scripts in order
      await runMigrationScript('001_create_table.sql', connection);
      await runMigrationScript('002_add_test_data.sql' , connection);
      await runMigrationScript('003_create_books_table.sql' , connection);
      await runMigrationScript('004_create_authors_table.sql' , connection);
      await runMigrationScript('005_create_relationship_books_authors_table.sql' , connection);
  
      console.log('All migration scripts executed successfully');
    } catch (error) {
      console.error('Error running migration scripts:', error);
    } finally {
      // Close the connection after running all scripts
      await connection.end();
      console.log('MySQL connection closed');
    }
  }
  
  async function runMigrationScript(scriptFileName:string, connection : any) {
    const migrationPath = path.join( 'sqlscripts/migration', scriptFileName);
    const migrationScript = await fs.readFile(migrationPath, 'utf-8');
  
    try {
      await connection.execute(migrationScript);
      console.log(`Migration script ${scriptFileName} successfully`);
    } catch (error) {
      console.error(`Error executing migration script ${scriptFileName}:`, error);
      throw error; // Rethrow the error to propagate it to the calling function
    }
  }
  
  runMigrations();

  let yourDate = new Date().toISOString().split('T')[0]

  addBook("MyBookName",
  yourDate,
  'someDescription',
  'someURL',
  ['someAuthor']  )

  // Call the function to run migrations
  

// Create a connection to the MySQL database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '88888888',
//   database: 'myDB',
// });

// connection.connect((err: any) => {
//     if (err) {
//       console.error('Error connecting to MySQL:', err);
//       return;
//     }
//     console.log('Connected to MySQL database');
//   });

const app = express()
const port = 3005;

app.set('views', path.join('front', 'books-page')); 
app.set('view engine', 'ejs'); 
app.use('/static', express.static(path.join('front')));

http.createServer(app).listen(port,()=>{
    console.log(`Server start on ${port} port`)
})

// Mock data from SQL database
const books = [
    { id: 22, title: 'Book 1', author: 'Author 1' },
    { id: 23, title: 'Book 2', author: 'Author 2' },
    { id: 25, title: 'Book 1', author: 'Author 1' },
    { id: 26, title: 'Book 2', author: 'Author 2' },
    { id: 27, title: 'Book 1', author: 'Author 1' },
    { id: 28, title: 'Book 2', author: 'Author 2' },
    { id: 29, title: 'Book 1', author: 'Author 1' },
    { id: 31, title: 'Book 2', author: 'Author 2' },
    { id: 32, title: 'Book 1', author: 'Author 1' },
    { id: 33, title: 'Book 2', author: 'Author 2' },
    { id: 35, title: 'Book 1', author: 'Author 1' },
    { id: 36, title: 'Book 2', author: 'Author 2' },
    { id: 37, title: 'Book 1', author: 'Author 1' },
    { id: 38, title: 'Book 2', author: 'Author 2' },
    { id: 39, title: 'Book 1', author: 'Author 1' },
    { id: 40, title: 'Book 2', author: 'Author 2' },
    { id: 41, title: 'Book 2', author: 'Author 2' },
    { id: 42, title: 'Book 1', author: 'Author 1' },
    { id: 43, title: 'Book 2', author: 'Author 2' },
    { id: 45, title: 'Book 1', author: 'Author 1' },
    { id: 46, title: 'Book 2', author: 'Author 2' },
    { id: 47, title: 'Book 1', author: 'Author 1' },
    { id: 48, title: 'Book 2', author: 'Author 2' },
    { id: 49, title: 'Book 1', author: 'Author 1' },
    { id: 50, title: 'Book 2', author: 'Author 2' },
    // Add more books as needed
];

app.get('/',(req, res)=>{
    res.render('books-page', { books });
})
app.post('/',(req, res)=>{

    res.redirect('books-page/books-page.html')
})
