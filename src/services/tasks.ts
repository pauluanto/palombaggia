import api from './api';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'completed';
  assignee?: string;
  category?: string;
  attachments?: Array<{
    name: string;
    url: string;
  }>;
  checklist?: Array<{
    id: string;
    text: string;
    completed: boolean;
  }>;
}

export const taskService = {
  async getTasks(filters?: {
    status?: Task['status'];
    priority?: Task['priority'];
    assignee?: string;
    category?: string;
  }): Promise<Task[]> {
    const { data } = await api.get('/tasks', { params: filters });
    return data;
  },

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const { data } = await api.post('/tasks', task);
    return data;
  },

  async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
    const { data } = await api.patch(`/tasks/${id}`, updates);
    return data;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async updateTaskStatus(id: string, status: Task['status']): Promise<Task> {
    const { data } = await api.patch(`/tasks/${id}/status`, { status });
    return data;
  },

  async assignTask(id: string, assigneeId: string): Promise<Task> {
    const { data } = await api.patch(`/tasks/${id}/assign`, { assigneeId });
    return data;
  },

  async addChecklistItem(taskId: string, text: string): Promise<Task> {
    const { data } = await api.post(`/tasks/${taskId}/checklist`, { text });
    return data;
  },

  async toggleChecklistItem(taskId: string, itemId: string): Promise<Task> {
    const { data } = await api.patch(`/tasks/${taskId}/checklist/${itemId}/toggle`);
    return data;
  }
};