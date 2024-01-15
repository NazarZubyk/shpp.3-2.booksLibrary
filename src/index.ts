import express from 'express'
import http from 'http'
import path from 'path';
import ejs from 'ejs';
import { addBook } from './db_API/addNewBook';
import { clearDB } from './db_API/clearAllBd';
import router from './api/v1';
import { createBackup, loadBackup, updateDB } from './model/cron';
import session from 'express-session';
import { runUpdates } from './db_API/runUpdates';
import { migrateDBfrotmV0toV1, migrateDBfrotmV1toV0 } from './model/migrationModel';

//--------------------------------------------------------
const fs = require('fs').promises;
const mysql = require('mysql2/promise');
const expressValidator = require('express-validator');

const cron = require('node-cron');


// console.log('*********************************************************************')
//clearDB();
//   console.log('*********************************************************************')
  
  //runUpdates();
//migrateDBfrotmV0toV1()
migrateDBfrotmV1toV0()
//loadBackup('/home/nazar/jsFromGit/3.2/3.2/source/dump/backup_1705010400053.sql')



const app = express()
const port = 3005;

app.use(session({
  secret: 'mySupeSecretKey2389fncnddjc8eycsdcijsm', 
  resave: true,
  saveUninitialized: true,
}));

declare module 'express-session' {
  interface SessionData {
    authenticated: boolean;
    isAdmin: boolean;
    
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join('front', 'books-page')); 
app.set('view engine', 'ejs'); 

app.use('/static', express.static(path.join('front')));

app.use('/',router)

http.createServer(app).listen(port,()=>{
    console.log(`Server start on ${port} port`)
})


cron.schedule('0 0 * * *', () => {
  updateDB();
  createBackup();
});






