export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee?: string;
  assigneeName?: string;
  dueDate?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  department?: string;
  tags?: string[];
  checklist?: {
    id: string;
    text: string;
    completed: boolean;
  }[];
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
  }[];
  comments?: {
    id: string;
    userId: string;
    userName: string;
    content: string;
    createdAt: string;
  }[];
}