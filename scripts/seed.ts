import { initializeDatabase, dbRun } from '../src/db';
import { randomUUID } from 'crypto';

const main = async () => {
  try {
    console.log('Starting database seeding...');
    
    const db = await initializeDatabase();

    // Insert demo users
    const users = [
      {
        id: randomUUID(),
        email: 'admin@palombaggia360.com',
        name: 'Admin',
        role: 'owner',
        password_hash: '$2b$10$DEMO_HASH',
        department: 'Management',
        position: 'Owner',
        status: 'active'
      },
      {
        id: randomUUID(),
        email: 'director@palombaggia360.com',
        name: 'Jean Dupont',
        role: 'director',
        password_hash: '$2b$10$DEMO_HASH',
        department: 'Management',
        position: 'Director',
        status: 'active'
      },
      {
        id: randomUUID(),
        email: 'housekeeping@palombaggia360.com',
        name: 'Marie Dubois',
        role: 'manager',
        password_hash: '$2b$10$DEMO_HASH',
        department: 'Housekeeping',
        position: 'Manager',
        status: 'active'
      }
    ];

    for (const user of users) {
      await dbRun(`
        INSERT OR IGNORE INTO users (id, email, name, role, password_hash, department, position, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        user.id,
        user.email,
        user.name,
        user.role,
        user.password_hash,
        user.department,
        user.position,
        user.status
      ]);
    }

    // Insert demo rooms
    const rooms = [
      {
        id: randomUUID(),
        number: '101',
        type: 'Suite Présidentielle',
        floor: '1',
        status: 'available',
        price: 850,
        amenities: JSON.stringify(['vue-mer', 'balcon', 'jacuzzi'])
      },
      {
        id: randomUUID(),
        number: '102',
        type: 'Suite Deluxe',
        floor: '1',
        status: 'occupied',
        price: 550,
        amenities: JSON.stringify(['vue-mer', 'balcon'])
      }
    ];

    for (const room of rooms) {
      await dbRun(`
        INSERT OR IGNORE INTO rooms (id, number, type, floor, status, price, amenities)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        room.id,
        room.number,
        room.type,
        room.floor,
        room.status,
        room.price,
        room.amenities
      ]);
    }

    // Insert demo restaurant tables
    const tables = [
      {
        id: randomUUID(),
        number: '1',
        capacity: 4,
        status: 'available'
      },
      {
        id: randomUUID(),
        number: '2',
        capacity: 6,
        status: 'occupied'
      }
    ];

    for (const table of tables) {
      await dbRun(`
        INSERT OR IGNORE INTO restaurant_tables (id, number, capacity, status)
        VALUES (?, ?, ?, ?)
      `, [
        table.id,
        table.number,
        table.capacity,
        table.status
      ]);
    }

    // Insert demo menu items
    const menuItems = [
      {
        id: randomUUID(),
        name: 'Langouste grillée',
        category: 'Plats',
        description: 'Langouste fraîche grillée, beurre aux herbes',
        price: 85,
        available: true,
        allergens: JSON.stringify(['Crustacés', 'Lactose'])
      },
      {
        id: randomUUID(),
        name: 'Carpaccio de Daurade',
        category: 'Entrées',
        description: 'Daurade royale, huile d\'olive vierge, citron',
        price: 28,
        available: true,
        allergens: JSON.stringify(['Poisson'])
      }
    ];

    for (const item of menuItems) {
      await dbRun(`
        INSERT OR IGNORE INTO menu_items (id, name, category, description, price, available, allergens)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        item.id,
        item.name,
        item.category,
        item.description,
        item.price,
        item.available,
        item.allergens
      ]);
    }

    // Insert demo spa services
    const spaServices = [
      {
        id: randomUUID(),
        name: 'Massage Relaxant',
        description: 'Massage complet du corps aux huiles essentielles',
        duration: 60,
        price: 120
      },
      {
        id: randomUUID(),
        name: 'Soin du Visage',
        description: 'Soin complet avec produits naturels',
        duration: 90,
        price: 150
      }
    ];

    for (const service of spaServices) {
      await dbRun(`
        INSERT OR IGNORE INTO spa_services (id, name, description, duration, price)
        VALUES (?, ?, ?, ?, ?)
      `, [
        service.id,
        service.name,
        service.description,
        service.duration,
        service.price
      ]);
    }

    // Insert demo activities
    const activities = [
      {
        id: randomUUID(),
        name: 'Excursion en bateau',
        description: 'Découverte des calanques en bateau',
        date: '2024-03-21',
        time: '09:00',
        duration: '4h',
        location: 'Port de Porto-Vecchio',
        max_participants: 12,
        price: 120,
        status: 'scheduled'
      },
      {
        id: randomUUID(),
        name: 'Dégustation de vins',
        description: 'Dégustation des meilleurs vins corses',
        date: '2024-03-21',
        time: '17:00',
        duration: '2h',
        location: 'Cave de l\'hôtel',
        max_participants: 10,
        price: 45,
        status: 'scheduled'
      }
    ];

    for (const activity of activities) {
      await dbRun(`
        INSERT OR IGNORE INTO activities (
          id, name, description, date, time, duration, location, 
          max_participants, price, status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        activity.id,
        activity.name,
        activity.description,
        activity.date,
        activity.time,
        activity.duration,
        activity.location,
        activity.max_participants,
        activity.price,
        activity.status
      ]);
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
};

main();