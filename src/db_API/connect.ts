import mysql from 'mysql2/promise';

interface DbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

const connectWithRetry = async (config: DbConfig, retries = 5, delay = 5000): Promise<mysql.Connection> => {
  let attempt = 0;
  console.log(config)
  while (attempt < retries) {
    try {
      const connection = await mysql.createConnection(config);
      console.log('Database connected successfully');
      return connection;
    } catch (err) {
      const error = err as Error;
      console.error(`Database connection failed (attempt ${attempt + 1}/${retries}):`, error.message);
      attempt++;
      if (attempt < retries) {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise(res => setTimeout(res, delay));
      } else {
        throw new Error('Connection is not established');
      }
    }
  }

  throw new Error('Connection is not established');
};

const dbConfig: DbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '88888888',
  database: process.env.DB_NAME || 'myDB'
};

export const connection = connectWithRetry(dbConfig);

