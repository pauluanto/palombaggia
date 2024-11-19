import axios from 'axios';
import { z } from 'zod';

// Validation schemas
const ReservationSchema = z.object({
  id: z.string(),
  guestName: z.string(),
  roomType: z.string(),
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z.number(),
  children: z.number().optional(),
  status: z.enum(['confirmed', 'pending', 'cancelled']),
  paymentStatus: z.enum(['paid', 'pending', 'refunded']),
  totalAmount: z.number(),
  notes: z.string().optional()
});

const RoomSchema = z.object({
  id: z.string(),
  number: z.string(),
  type: z.string(),
  status: z.enum(['available', 'occupied', 'maintenance', 'cleaning']),
  floor: z.string(),
  price: z.number(),
  amenities: z.array(z.string())
});

export type Reservation = z.infer<typeof ReservationSchema>;
export type Room = z.infer<typeof RoomSchema>;

class ThaisAPI {
  private apiKey: string;
  private baseURL: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseURL = import.meta.env.VITE_THAIS_API_URL || 'https://api.thais.fr/v1';
  }

  private async request<T>(endpoint: string, options: any = {}): Promise<T> {
    try {
      const response = await axios({
        url: `${this.baseURL}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        ...options
      });

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(`THAIS API Error: ${error.response.data.message}`);
      }
      throw error;
    }
  }

  // Réservations
  async getReservations(params?: { 
    startDate?: string; 
    endDate?: string;
    status?: 'confirmed' | 'pending' | 'cancelled';
  }): Promise<Reservation[]> {
    const response = await this.request<Reservation[]>('/reservations', {
      params
    });
    return response.map(res => ReservationSchema.parse(res));
  }

  async createReservation(data: Omit<Reservation, 'id'>): Promise<Reservation> {
    const response = await this.request<Reservation>('/reservations', {
      method: 'POST',
      data
    });
    return ReservationSchema.parse(response);
  }

  async updateReservation(id: string, data: Partial<Reservation>): Promise<Reservation> {
    const response = await this.request<Reservation>(`/reservations/${id}`, {
      method: 'PATCH',
      data
    });
    return ReservationSchema.parse(response);
  }

  async cancelReservation(id: string, reason?: string): Promise<Reservation> {
    const response = await this.request<Reservation>(`/reservations/${id}/cancel`, {
      method: 'POST',
      data: { reason }
    });
    return ReservationSchema.parse(response);
  }

  // Chambres
  async getRooms(params?: {
    floor?: string;
    status?: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  }): Promise<Room[]> {
    const response = await this.request<Room[]>('/rooms', {
      params
    });
    return response.map(room => RoomSchema.parse(room));
  }

  async updateRoomStatus(id: string, status: Room['status']): Promise<Room> {
    const response = await this.request<Room>(`/rooms/${id}/status`, {
      method: 'PATCH',
      data: { status }
    });
    return RoomSchema.parse(response);
  }

  // Statistiques
  async getOccupancyStats(params: {
    startDate: string;
    endDate: string;
  }) {
    return this.request('/stats/occupancy', {
      params
    });
  }

  async getRevenueStats(params: {
    startDate: string;
    endDate: string;
  }) {
    return this.request('/stats/revenue', {
      params
    });
  }
}

let thaisInstance: ThaisAPI | null = null;

export const initializeThais = (apiKey: string) => {
  thaisInstance = new ThaisAPI(apiKey);
  return thaisInstance;
};

export const getThaisInstance = () => {
  if (!thaisInstance) {
    throw new Error('THAIS API n\'est pas initialisé. Veuillez configurer votre clé API.');
  }
  return thaisInstance;
};