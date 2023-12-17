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
const expressValidator = require('express-validator');


// console.log('*********************************************************************')
//   clearDB();
//   console.log('*********************************************************************')
  
  runMigrations();






const app = express()
const port = 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join('front', 'books-page')); 
app.set('view engine', 'ejs'); 

app.use('/static', express.static(path.join('front')));

app.use('/',router)

http.createServer(app).listen(port,()=>{
    console.log(`Server start on ${port} port`)
})






