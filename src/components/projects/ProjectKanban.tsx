import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Plus, MoreHorizontal } from 'lucide-react';
import DataCard from '../DataCard';

interface ProjectKanbanProps {
  isDarkMode: boolean;
  projectId: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'À faire',
    tasks: [
      {
        id: 'task-1',
        title: 'Rénovation Suite 101',
        description: 'Mise à jour complète de la décoration',
        assignee: 'Marie D.',
        priority: 'high'
      },
      {
        id: 'task-2',
        title: 'Installation climatisation',
        description: 'Nouvelles unités éco-responsables',
        assignee: 'Thomas R.',
        priority: 'medium'
      }
    ]
  },
  {
    id: 'in-progress',
    title: 'En cours',
    tasks: [
      {
        id: 'task-3',
        title: 'Peinture couloirs',
        description: 'Rafraîchissement des murs',
        assignee: 'Sophie B.',
        priority: 'low'
      }
    ]
  },
  {
    id: 'done',
    title: 'Terminé',
    tasks: [
      {
        id: 'task-4',
        title: 'Commande mobilier',
        description: 'Nouveaux lits et armoires',
        assignee: 'Paul A.',
        priority: 'high'
      }
    ]
  }
];

const ProjectKanban: React.FC<ProjectKanbanProps> = ({ isDarkMode, projectId }) => {
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    if (source.droppableId === destination.droppableId) {
      const newTasks = Array.from(sourceColumn.tasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      const newColumns = columns.map(col =>
        col.id === source.droppableId ? { ...col, tasks: newTasks } : col
      );

      setColumns(newColumns);
    } else {
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      const newColumns = columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, tasks: sourceTasks };
        }
        if (col.id === destination.droppableId) {
          return { ...col, tasks: destTasks };
        }
        return col;
      });

      setColumns(newColumns);
    }
  };

  const renderTask = (task: Task, index: number) => (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 rounded-lg mb-3 ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700' 
              : 'bg-gray-50 hover:bg-gray-100'
          } transition-colors`}
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium">{task.title}</h4>
            <button className={`p-1 rounded-lg ${
              isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'
            }`}>
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <p className={`text-sm mb-3 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {task.description}
          </p>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {task.assignee}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${
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
      )}
    </Draggable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-6">
        {columns.map(column => (
          <DataCard
            key={column.id}
            title={column.title}
            isDarkMode={isDarkMode}
            action={{
              label: 'Ajouter',
              onClick: () => console.log('Ajouter une tâche')
            }}
          >
            <Droppable droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="min-h-[200px]"
                >
                  {column.tasks.map((task, index) => renderTask(task, index))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DataCard>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ProjectKanban;