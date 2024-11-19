import Database from 'better-sqlite3';
import { initializeDatabase } from '../src/db/schema.js';

const main = async () => {
  try {
    console.log('Starting database migration...');
    const db = new Database('palombaggia360.db');
    
    initializeDatabase(db);
    
    console.log('Database migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during database migration:', error);
    process.exit(1);
  }
};

main();