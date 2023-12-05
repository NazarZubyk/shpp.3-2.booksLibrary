const mysql = require('mysql2/promise');
import path from 'path';
const fs = require('fs').promises;

export async function runMigrations() {
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
      await runMigrationScript('003_create_books_table.sql' , connection);
      await runMigrationScript('004_create_authors_table.sql' , connection);
      await runMigrationScript('005_create_relationship_books_authors_table.sql' , connection);
      await runMigrationScript('006_update_authors.sql' , connection);
      await runMigrationScript('007_create_admins.sql' , connection);
      await runMigrationScript('008_update_books.sql' , connection);
      await runMigrationScript('009_add_space_for_description.sql' , connection);
      await runMigrationScript('010_update_books.sql' , connection);
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