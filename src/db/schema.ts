import { Database } from 'sqlite3';

export const initializeSchema = async (db: Database): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          role TEXT NOT NULL,
          department TEXT,
          position TEXT,
          phone TEXT,
          avatar TEXT,
          status TEXT NOT NULL DEFAULT 'active',
          last_active DATETIME,
          password_hash TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Rooms
      db.run(`
        CREATE TABLE IF NOT EXISTS rooms (
          id TEXT PRIMARY KEY,
          number TEXT UNIQUE NOT NULL,
          type TEXT NOT NULL,
          floor TEXT NOT NULL,
          status TEXT NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          amenities TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Reservations
      db.run(`
        CREATE TABLE IF NOT EXISTS reservations (
          id TEXT PRIMARY KEY,
          room_id TEXT NOT NULL,
          guest_name TEXT NOT NULL,
          guest_email TEXT NOT NULL,
          guest_phone TEXT,
          check_in DATE NOT NULL,
          check_out DATE NOT NULL,
          status TEXT NOT NULL,
          payment_status TEXT NOT NULL,
          total_amount DECIMAL(10,2) NOT NULL,
          adults INTEGER NOT NULL,
          children INTEGER,
          special_requests TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (room_id) REFERENCES rooms(id)
        )
      `);

      // Housekeeping Tasks
      db.run(`
        CREATE TABLE IF NOT EXISTS housekeeping_tasks (
          id TEXT PRIMARY KEY,
          room_id TEXT NOT NULL,
          assigned_to TEXT,
          status TEXT NOT NULL,
          priority TEXT NOT NULL,
          notes TEXT,
          completed_at DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (room_id) REFERENCES rooms(id),
          FOREIGN KEY (assigned_to) REFERENCES users(id)
        )
      `);

      // Restaurant Tables
      db.run(`
        CREATE TABLE IF NOT EXISTS restaurant_tables (
          id TEXT PRIMARY KEY,
          number TEXT NOT NULL,
          capacity INTEGER NOT NULL,
          status TEXT NOT NULL,
          server_id TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (server_id) REFERENCES users(id)
        )
      `);

      // Restaurant Menu Items
      db.run(`
        CREATE TABLE IF NOT EXISTS menu_items (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          category TEXT NOT NULL,
          description TEXT,
          price DECIMAL(10,2) NOT NULL,
          available BOOLEAN DEFAULT TRUE,
          allergens TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Restaurant Reservations
      db.run(`
        CREATE TABLE IF NOT EXISTS restaurant_reservations (
          id TEXT PRIMARY KEY,
          guest_name TEXT NOT NULL,
          guest_phone TEXT,
          guest_email TEXT,
          date DATE NOT NULL,
          time TIME NOT NULL,
          guests INTEGER NOT NULL,
          table_id TEXT,
          status TEXT NOT NULL,
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (table_id) REFERENCES restaurant_tables(id)
        )
      `);

      // Spa Services
      db.run(`
        CREATE TABLE IF NOT EXISTS spa_services (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          duration INTEGER NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Spa Appointments
      db.run(`
        CREATE TABLE IF NOT EXISTS spa_appointments (
          id TEXT PRIMARY KEY,
          service_id TEXT NOT NULL,
          client_name TEXT NOT NULL,
          client_phone TEXT,
          client_email TEXT,
          date DATE NOT NULL,
          time TIME NOT NULL,
          therapist_id TEXT,
          status TEXT NOT NULL,
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (service_id) REFERENCES spa_services(id),
          FOREIGN KEY (therapist_id) REFERENCES users(id)
        )
      `);

      // Concierge Requests
      db.run(`
        CREATE TABLE IF NOT EXISTS concierge_requests (
          id TEXT PRIMARY KEY,
          guest_id TEXT,
          room_number TEXT,
          request_type TEXT NOT NULL,
          description TEXT NOT NULL,
          status TEXT NOT NULL,
          priority TEXT NOT NULL,
          assigned_to TEXT,
          due_date DATE,
          due_time TIME,
          completed_at DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (assigned_to) REFERENCES users(id)
        )
      `);

      // Activities
      db.run(`
        CREATE TABLE IF NOT EXISTS activities (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          date DATE NOT NULL,
          time TIME NOT NULL,
          duration TEXT NOT NULL,
          location TEXT NOT NULL,
          max_participants INTEGER NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          guide_id TEXT,
          status TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (guide_id) REFERENCES users(id)
        )
      `);

      // Activity Bookings
      db.run(`
        CREATE TABLE IF NOT EXISTS activity_bookings (
          id TEXT PRIMARY KEY,
          activity_id TEXT NOT NULL,
          guest_name TEXT NOT NULL,
          guest_phone TEXT,
          guest_email TEXT,
          participants INTEGER NOT NULL,
          status TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (activity_id) REFERENCES activities(id)
        )
      `);

      // Messages
      db.run(`
        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          sender_id TEXT NOT NULL,
          receiver_id TEXT NOT NULL,
          content TEXT NOT NULL,
          read BOOLEAN DEFAULT FALSE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (sender_id) REFERENCES users(id),
          FOREIGN KEY (receiver_id) REFERENCES users(id)
        )
      `);

      // Tasks
      db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          status TEXT NOT NULL,
          priority TEXT NOT NULL,
          assignee_id TEXT,
          due_date DATE,
          category TEXT,
          created_by TEXT NOT NULL,
          completed_at DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (assignee_id) REFERENCES users(id),
          FOREIGN KEY (created_by) REFERENCES users(id)
        )
      `);

      // Documents
      db.run(`
        CREATE TABLE IF NOT EXISTS documents (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          type TEXT NOT NULL,
          path TEXT NOT NULL,
          size INTEGER NOT NULL,
          uploaded_by TEXT NOT NULL,
          shared_with TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (uploaded_by) REFERENCES users(id)
        )
      `);

      // Projects
      db.run(`
        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT,
          status TEXT NOT NULL,
          start_date DATE,
          end_date DATE,
          manager_id TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (manager_id) REFERENCES users(id)
        )
      `);

      // Project Tasks
      db.run(`
        CREATE TABLE IF NOT EXISTS project_tasks (
          id TEXT PRIMARY KEY,
          project_id TEXT NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          status TEXT NOT NULL,
          assignee_id TEXT,
          due_date DATE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (project_id) REFERENCES projects(id),
          FOREIGN KEY (assignee_id) REFERENCES users(id)
        )
      `);

      resolve();
    });
  });
};