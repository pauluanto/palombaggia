export type UserRole = 'owner' | 'director' | 'manager' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
  phone?: string;
  lastActive?: string;
  status: 'active' | 'inactive';
}

export interface UserPermissions {
  canManageUsers: boolean;
  canManageRoles: boolean;
  canViewFinances: boolean;
  canEditFinances: boolean;
  canManageBookings: boolean;
  canViewReports: boolean;
  canManageTasks: boolean;
  canAssignTasks: boolean;
}

export const getRolePermissions = (role: UserRole): UserPermissions => {
  switch (role) {
    case 'owner':
      return {
        canManageUsers: true,
        canManageRoles: true,
        canViewFinances: true,
        canEditFinances: true,
        canManageBookings: true,
        canViewReports: true,
        canManageTasks: true,
        canAssignTasks: true
      };
    case 'director':
      return {
        canManageUsers: true,
        canManageRoles: false,
        canViewFinances: true,
        canEditFinances: true,
        canManageBookings: true,
        canViewReports: true,
        canManageTasks: true,
        canAssignTasks: true
      };
    case 'manager':
      return {
        canManageUsers: false,
        canManageRoles: false,
        canViewFinances: true,
        canEditFinances: false,
        canManageBookings: true,
        canViewReports: true,
        canManageTasks: true,
        canAssignTasks: true
      };
    case 'employee':
      return {
        canManageUsers: false,
        canManageRoles: false,
        canViewFinances: false,
        canEditFinances: false,
        canManageBookings: false,
        canViewReports: false,
        canManageTasks: false,
        canAssignTasks: false
      };
  }
};