import React from 'react';
import { Task } from '../types/task';
import { CheckCircle2, Clock, AlertCircle, User } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  isDarkMode: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, isDarkMode }) => {
  if (tasks.length === 0) {
    return (
      <div className={`text-center py-8 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        Aucune tâche à afficher
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className={`p-4 rounded-lg ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700' 
              : 'bg-gray-50 hover:bg-gray-100'
          } transition-colors`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {task.status === 'completed' ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : task.priority === 'high' ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : (
                <Clock className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <h4 className={`font-medium ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  {task.title}
                </h4>
                {task.description && (
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {task.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {task.dueDate && (
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
              {task.assigneeName && (
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{task.assigneeName}</span>
                </div>
              )}
              <span className={`px-2 py-1 rounded-full text-xs ${
                task.priority === 'high'
                  ? isDarkMode
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-red-100 text-red-600'
                  : task.priority === 'medium'
                  ? isDarkMode
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-yellow-100 text-yellow-600'
                  : isDarkMode
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-green-100 text-green-600'
              }`}>
                {task.priority}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;