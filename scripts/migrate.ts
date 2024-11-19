import { initializeDatabase } from '../src/db';
import { initializeSchema } from '../src/db/schema';

const main = async () => {
  try {
    console.log('Starting database migration...');
    
    const db = await initializeDatabase();
    await initializeSchema(db);
    
    console.log('Database migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during database migration:', error);
    process.exit(1);
  }
}

main();