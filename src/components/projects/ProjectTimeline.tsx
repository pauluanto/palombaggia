import React from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import DataCard from '../DataCard';

interface ProjectTimelineProps {
  isDarkMode: boolean;
  projectId: string;
}

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'milestone' | 'task' | 'update';
  status: 'completed' | 'pending' | 'delayed';
}

const events: TimelineEvent[] = [
  {
    id: '1',
    title: 'Début du projet',
    description: 'Lancement officiel de la rénovation',
    date: '2024-03-15',
    type: 'milestone',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Phase 1 : Démontage',
    description: 'Retrait du mobilier existant',
    date: '2024-03-18',
    type: 'task',
    status: 'completed'
  },
  {
    id: '3',
    title: 'Phase 2 : Peinture',
    description: 'Application des nouvelles couleurs',
    date: '2024-03-20',
    type: 'task',
    status: 'pending'
  },
  {
    id: '4',
    title: 'Retard livraison',
    description: 'Mobilier retardé de 2 jours',
    date: '2024-03-22',
    type: 'update',
    status: 'delayed'
  }
];

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({ isDarkMode, projectId }) => {
  return (
    <DataCard
      title="Timeline du projet"
      isDarkMode={isDarkMode}
    >
      <div className="relative">
        {/* Ligne verticale */}
        <div className={`absolute left-4 top-0 bottom-0 w-0.5 ${
          isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
        }`} />

        {/* Événements */}
        <div className="space-y-6 ml-12">
          {events.map(event => (
            <div key={event.id} className="relative">
              {/* Point sur la timeline */}
              <div className={`absolute -left-[44px] w-6 h-6 rounded-full flex items-center justify-center ${
                event.status === 'completed'
                  ? isDarkMode
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-green-100 text-green-600'
                  : event.status === 'delayed'
                  ? isDarkMode
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-red-100 text-red-600'
                  : isDarkMode
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {event.status === 'completed' && <CheckCircle className="w-4 h-4" />}
                {event.status === 'delayed' && <AlertCircle className="w-4 h-4" />}
                {event.status === 'pending' && <Clock className="w-4 h-4" />}
              </div>

              {/* Contenu */}
              <div className={`p-4 rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{event.title}</h4>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {event.date}
                    </span>
                  </div>
                </div>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {event.description}
                </p>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    event.type === 'milestone'
                      ? isDarkMode
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-purple-100 text-purple-600'
                      : event.type === 'task'
                      ? isDarkMode
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-blue-100 text-blue-600'
                      : isDarkMode
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {event.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DataCard>
  );
};

export default ProjectTimeline;