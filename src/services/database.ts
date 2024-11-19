import { dbAll, dbGet, dbRun } from '../db';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Room {
  id: string;
  number: string;
  type: string;
  floor: string;
  status: string;
  price: number;
  amenities?: string[];
}

export interface Reservation {
  id: string;
  roomId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  adults: number;
  children?: number;
  specialRequests?: string;
}

// Services
export const userService = {
  async getCurrentUser(): Promise<User | null> {
    return dbGet('SELECT * FROM users WHERE role = ?', ['admin']);
  },

  async updateUser(id: string, data: Partial<User>): Promise<void> {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    await dbRun(`UPDATE users SET ${fields} WHERE id = ?`, values);
  }
};

export const roomService = {
  async getRooms(filters?: { floor?: string; status?: string }): Promise<Room[]> {
    let query = 'SELECT * FROM rooms';
    const params: any[] = [];

    if (filters) {
      const conditions: string[] = [];
      if (filters.floor) {
        conditions.push('floor = ?');
        params.push(filters.floor);
      }
      if (filters.status) {
        conditions.push('status = ?');
        params.push(filters.status);
      }
      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
      }
    }

    return dbAll(query, params);
  },

  async updateRoomStatus(id: string, status: string): Promise<void> {
    await dbRun('UPDATE rooms SET status = ? WHERE id = ?', [status, id]);
  }
};

export const reservationService = {
  async getReservations(filters?: {
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<Reservation[]> {
    let query = 'SELECT * FROM reservations';
    const params: any[] = [];

    if (filters) {
      const conditions: string[] = [];
      if (filters.status) {
        conditions.push('status = ?');
        params.push(filters.status);
      }
      if (filters.startDate) {
        conditions.push('check_in >= ?');
        params.push(filters.startDate);
      }
      if (filters.endDate) {
        conditions.push('check_out <= ?');
        params.push(filters.endDate);
      }
      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
      }
    }

    return dbAll(query, params);
  },

  async createReservation(data: Omit<Reservation, 'id'>): Promise<string> {
    const id = crypto.randomUUID();
    const fields = Object.keys(data).join(', ');
    const placeholders = Array(Object.keys(data).length).fill('?').join(', ');
    
    await dbRun(
      `INSERT INTO reservations (id, ${fields}) VALUES (?, ${placeholders})`,
      [id, ...Object.values(data)]
    );

    return id;
  },

  async updateReservation(id: string, data: Partial<Reservation>): Promise<void> {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    await dbRun(`UPDATE reservations SET ${fields} WHERE id = ?`, values);
  }
};