import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getThaisInstance, type Reservation, type Room } from '../services/thais';

export const useReservations = (params?: {
  startDate?: string;
  endDate?: string;
  status?: 'confirmed' | 'pending' | 'cancelled';
}) => {
  return useQuery({
    queryKey: ['reservations', params],
    queryFn: () => getThaisInstance().getReservations(params)
  });
};

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Reservation, 'id'>) => 
      getThaisInstance().createReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    }
  });
};

export const useUpdateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Reservation> }) =>
      getThaisInstance().updateReservation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    }
  });
};

export const useCancelReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      getThaisInstance().cancelReservation(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    }
  });
};

export const useRooms = (params?: {
  floor?: string;
  status?: Room['status'];
}) => {
  return useQuery({
    queryKey: ['rooms', params],
    queryFn: () => getThaisInstance().getRooms(params)
  });
};

export const useUpdateRoomStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Room['status'] }) =>
      getThaisInstance().updateRoomStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });
};

export const useOccupancyStats = (params: {
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: ['stats', 'occupancy', params],
    queryFn: () => getThaisInstance().getOccupancyStats(params)
  });
};

export const useRevenueStats = (params: {
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: ['stats', 'revenue', params],
    queryFn: () => getThaisInstance().getRevenueStats(params)
  });
};