const mysql = require('mysql2/promise');
import path from 'path';
const fs = require('fs').promises;

export async function runUpdates() {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '88888888',
      database: 'myDB',
    });
  
    try {
      console.log('Connected to MySQL database');
      
  
      // Run the updates scripts in order
      await runUpdateScript('001_create_table.sql', connection);
      await runUpdateScript('003_create_books_table.sql' , connection);
      await runUpdateScript('004_create_authors_table.sql' , connection);
      await runUpdateScript('005_create_relationship_books_authors_table.sql' , connection);
      await runUpdateScript('006_update_authors.sql' , connection);
      await runUpdateScript('007_create_admins.sql' , connection);
      await runUpdateScript('008_update_books.sql' , connection);
      await runUpdateScript('009_add_space_for_description.sql' , connection);
      await runUpdateScript('010_update_books.sql' , connection);
      await runUpdateScript('011_clicks.sql' , connection);
      await runUpdateScript('012_views.sql' , connection);
      await runUpdateScript('013_soft_deleted.sql' , connection);
      console.log('All updates scripts executed successfully');
    } catch (error) {
      console.error('Error running update scripts:', error);
    } finally {
      // Close the connection after running all scripts
      await connection.end();
      console.log('MySQL connection closed');
    }
  }
  
  async function runUpdateScript(scriptFileName:string, connection : any) {
    const uodatePath = path.join( 'sqlscripts/firstBD', scriptFileName);
    const uodateScript = await fs.readFile(uodatePath, 'utf-8');
  
    try {
      await connection.execute(uodateScript);
      console.log(`Update script ${scriptFileName} successfully`);
    } catch (error) {
      console.error(`Error executing update script ${scriptFileName}:`+
      "this update already been complited" );
      
    }
  }