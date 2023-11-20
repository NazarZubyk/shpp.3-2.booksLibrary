import * as mysql from 'mysql2/promise'; 

  export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '88888888',
    database: 'myDB',
  });