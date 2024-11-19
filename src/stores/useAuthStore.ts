import { create } from 'zustand';
import { User, UserRole, UserPermissions, getRolePermissions } from '../types/user';

interface AuthState {
  user: User | null;
  permissions: UserPermissions | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  permissions: null,
  isAuthenticated: false,

  login: (user: User) => {
    const permissions = getRolePermissions(user.role);
    set({ user, permissions, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, permissions: null, isAuthenticated: false });
  },

  updateUser: (data: Partial<User>) => {
    set((state) => {
      if (!state.user) return state;
      
      const updatedUser = { ...state.user, ...data };
      const permissions = getRolePermissions(updatedUser.role);
      
      return {
        user: updatedUser,
        permissions,
        isAuthenticated: true
      };
    });
  }
}));