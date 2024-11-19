import { useState, useEffect } from 'react';
import { roomService, reservationService, userService } from '../services/database';

export const useRooms = (filters?: { floor?: string; status?: string }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        setLoading(true);
        const data = await roomService.getRooms(filters);
        setRooms(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, [filters]);

  return { rooms, loading, error };
};

export const useReservations = (filters?: {
  status?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadReservations = async () => {
      try {
        setLoading(true);
        const data = await reservationService.getReservations(filters);
        setReservations(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadReservations();
  }, [filters]);

  return { reservations, loading, error };
};

export const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await userService.getCurrentUser();
        setUser(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return { user, loading, error };
};