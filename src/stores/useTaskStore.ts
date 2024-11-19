import { create } from 'zustand';
import { Task, TaskStatus } from '../types/task';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  assignTask: (id: string, assigneeId: string, assigneeName: string) => void;
  setTasks: (tasks: Task[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  addTask: (task: Task) => {
    set((state) => ({
      tasks: [...state.tasks, task]
    }));
  },

  updateTask: (id: string, updates: Partial<Task>) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    }));
  },

  deleteTask: (id: string) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    }));
  },

  updateTaskStatus: (id: string, status: TaskStatus) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    }));
  },

  assignTask: (id: string, assigneeId: string, assigneeName: string) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, assignee: assigneeId, assigneeName } : task
      )
    }));
  },

  setTasks: (tasks: Task[]) => {
    set({ tasks });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error: string | null) => {
    set({ error });
  }
}));