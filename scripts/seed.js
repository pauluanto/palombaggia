import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';

const main = async () => {
  try {
    console.log('Starting database seeding...');
    const db = new Database('palombaggia360.db');

    // Insert demo user
    db.prepare(`
      INSERT INTO users (id, email, name, role, password_hash)
      VALUES (?, ?, ?, ?, ?)
    `).run(
      randomUUID(),
      'admin@palombaggia360.com',
      'Admin',
      'admin',
      '$2b$10$DEMO_HASH' // In production, use proper password hashing
    );

    // Insert demo rooms
    const roomTypes = ['Suite Présidentielle', 'Suite Deluxe', 'Chambre Vue Mer'];
    for (let i = 1; i <= 10; i++) {
      db.prepare(`
        INSERT INTO rooms (id, number, type, floor, status, price)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        randomUUID(),
        `${100 + i}`,
        roomTypes[i % 3],
        Math.ceil(i / 4).toString(),
        'available',
        500 + (i * 100)
      );
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
};

main();