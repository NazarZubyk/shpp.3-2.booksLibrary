import express from 'express'
import http from 'http'
import path from 'path';
import ejs from 'ejs';
import { addBook } from './db_API/addNewBook';
import { clearDB } from './db_API/clearAllBd';
import { runMigrations } from './db_API/runMigrations';
import router from './api/v1';

//--------------------------------------------------------
const fs = require('fs').promises;
const mysql = require('mysql2/promise');

console.log('*********************************************************************')
  clearDB();
  console.log('*********************************************************************')
  
  runMigrations();

  let yourDate = new Date().toISOString().split('T')[0]

  // addBook("MyBookName",
  // yourDate,
  // 'someDescription',
  // 'someURL',
  // ['someAuthor']  )

  // Call the function to run migrations
  

// Create a connection to the MySQL database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '88888888',
//   database: 'myDB',
// });



const app = express()
const port = 3005;

app.use(express.json());

app.set('views', path.join('front', 'books-page')); 
app.set('view engine', 'ejs'); 
app.use('/static', express.static(path.join('front')));

http.createServer(app).listen(port,()=>{
    console.log(`Server start on ${port} port`)
})




app.post('/',(req, res)=>{

    res.redirect('books-page/books-page.html')
})

app.use('/',router)


