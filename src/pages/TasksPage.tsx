import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus,
  Filter,
  Calendar,
  User,
  Tag
} from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: "Préparer la Suite Présidentielle",
    description: "Nettoyage complet et mise en place pour l'arrivée de M. Smith",
    priority: "high",
    status: "pending",
    dueDate: "2024-03-21 14:00",
    assignee: "Marie Dubois",
    category: "housekeeping"
  },
  // ... autres tâches
];

const TasksPage = () => {
  return (
    <div className="h-screen overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-luxury-brown">Tâches</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-white/50">
            <Filter className="w-5 h-5" />
            <span>Filtres</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-colors">
            <Plus className="w-5 h-5" />
            <span>Nouvelle tâche</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-2">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Statut</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-white">
                  <Clock className="w-5 h-5" />
                  <span>À faire</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Terminé</span>
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Catégories</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50">
                  <Tag className="w-5 h-5 text-blue-500" />
                  <span>Ménage</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50">
                  <Tag className="w-5 h-5 text-green-500" />
                  <span>Restaurant</span>
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-white/50">
                  <Tag className="w-5 h-5 text-purple-500" />
                  <span>Maintenance</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="col-span-10 space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white/90 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {task.priority === 'high' ? (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-800">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{task.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{task.assignee}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;