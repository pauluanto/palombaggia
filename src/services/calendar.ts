import api from './api';
import { parseISO, format } from 'date-fns';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
  type: 'reservation' | 'task' | 'meeting';
  status: 'confirmed' | 'tentative' | 'cancelled';
  attendees?: Array<{
    email: string;
    name: string;
    response?: 'accepted' | 'declined' | 'tentative';
  }>;
}

export const calendarService = {
  async getEvents(start: Date, end: Date): Promise<CalendarEvent[]> {
    const { data } = await api.get('/calendar/events', {
      params: {
        start: format(start, 'yyyy-MM-dd'),
        end: format(end, 'yyyy-MM-dd')
      }
    });
    
    return data.map((event: any) => ({
      ...event,
      start: parseISO(event.start),
      end: parseISO(event.end)
    }));
  },

  async createEvent(event: Omit<CalendarEvent, 'id'>): Promise<CalendarEvent> {
    const { data } = await api.post('/calendar/events', {
      ...event,
      start: format(event.start, "yyyy-MM-dd'T'HH:mm:ss"),
      end: format(event.end, "yyyy-MM-dd'T'HH:mm:ss")
    });
    
    return {
      ...data,
      start: parseISO(data.start),
      end: parseISO(data.end)
    };
  },

  async updateEvent(id: string, event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const { data } = await api.patch(`/calendar/events/${id}`, {
      ...event,
      start: event.start ? format(event.start, "yyyy-MM-dd'T'HH:mm:ss") : undefined,
      end: event.end ? format(event.end, "yyyy-MM-dd'T'HH:mm:ss") : undefined
    });
    
    return {
      ...data,
      start: parseISO(data.start),
      end: parseISO(data.end)
    };
  },

  async deleteEvent(id: string): Promise<void> {
    await api.delete(`/calendar/events/${id}`);
  },

  async syncWithGoogle(): Promise<void> {
    await api.post('/calendar/sync/google');
  },

  async syncWithOutlook(): Promise<void> {
    await api.post('/calendar/sync/outlook');
  }
};