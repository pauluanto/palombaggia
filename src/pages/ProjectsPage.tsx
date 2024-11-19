import React, { useState } from 'react';
import { 
  Kanban, 
  MessageSquare, 
  FileText, 
  Calendar, 
  Users, 
  Plus,
  Filter,
  Clock,
  Bot,
  Folder,
  Link
} from 'lucide-react';
import DataCard from '../components/DataCard';
import ProjectKanban from '../components/projects/ProjectKanban';
import ProjectChat from '../components/projects/ProjectChat';
import ProjectFiles from '../components/projects/ProjectFiles';
import ProjectTimeline from '../components/projects/ProjectTimeline';

interface ProjectsPageProps {
  isDarkMode: boolean;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ isDarkMode }) => {
  const [activeView, setActiveView] = useState('kanban');
  const [selectedProject, setSelectedProject] = useState('hotel-renovation');

  const views = [
    { id: 'kanban', name: 'Kanban', icon: Kanban },
    { id: 'chat', name: 'Discussions', icon: MessageSquare },
    { id: 'files', name: 'Fichiers', icon: FileText },
    { id: 'timeline', name: 'Timeline', icon: Calendar }
  ];

  const projects = [
    { 
      id: 'hotel-renovation',
      name: 'Rénovation Hôtel',
      progress: 65,
      members: 8,
      dueDate: '2024-06-30'
    },
    { 
      id: 'restaurant-menu',
      name: 'Nouveau Menu Restaurant',
      progress: 40,
      members: 4,
      dueDate: '2024-04-15'
    }
  ];

  const integrations = [
    { id: 'chatgpt', name: 'ChatGPT', icon: Bot, status: 'connected' },
    { id: 'drive', name: 'Google Drive', icon: Folder, status: 'connected' },
    { id: 'notion', name: 'Notion', icon: FileText, status: 'disconnected' }
  ];

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6 mt-12 lg:mt-0">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Gestion de Projets
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Centralisez et gérez tous vos projets
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700' 
              : 'border border-gray-200 hover:bg-gray-50'
          }`}>
            <Filter className="w-5 h-5" />
            <span>Filtres</span>
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}>
            <Plus className="w-5 h-5" />
            <span>Nouveau projet</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Projets */}
        <div className="col-span-3">
          <div className="space-y-6">
            {/* Liste des projets */}
            <DataCard
              title="Projets"
              isDarkMode={isDarkMode}
            >
              <div className="space-y-4">
                {projects.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className={`w-full p-4 rounded-lg text-left transition-colors ${
                      selectedProject === project.id
                        ? isDarkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-indigo-600 text-white'
                        : isDarkMode
                        ? 'bg-slate-800 hover:bg-slate-700'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <h4 className="font-medium mb-2">{project.name}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{project.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{project.members}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className={`h-2 rounded-full ${
                        isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                      }`}>
                        <div 
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </DataCard>

            {/* Intégrations */}
            <DataCard
              title="Intégrations"
              isDarkMode={isDarkMode}
            >
              <div className="space-y-4">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      isDarkMode 
                        ? 'bg-slate-800' 
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <integration.icon className="w-5 h-5" />
                      <span>{integration.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      integration.status === 'connected'
                        ? isDarkMode
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-green-100 text-green-600'
                        : isDarkMode
                        ? 'bg-gray-700 text-gray-400'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {integration.status === 'connected' ? 'Connecté' : 'Déconnecté'}
                    </span>
                  </div>
                ))}
              </div>
            </DataCard>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="col-span-9">
          {/* Navigation des vues */}
          <div className="flex gap-4 mb-6">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeView === view.id
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-indigo-600 text-white'
                    : isDarkMode
                    ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <view.icon className="w-5 h-5" />
                <span>{view.name}</span>
              </button>
            ))}
          </div>

          {/* Vue active */}
          {activeView === 'kanban' && (
            <ProjectKanban isDarkMode={isDarkMode} projectId={selectedProject} />
          )}
          {activeView === 'chat' && (
            <ProjectChat isDarkMode={isDarkMode} projectId={selectedProject} />
          )}
          {activeView === 'files' && (
            <ProjectFiles isDarkMode={isDarkMode} projectId={selectedProject} />
          )}
          {activeView === 'timeline' && (
            <ProjectTimeline isDarkMode={isDarkMode} projectId={selectedProject} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;