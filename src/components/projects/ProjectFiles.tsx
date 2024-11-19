import React from 'react';
import { FileText, Image as ImageIcon, Download, MoreHorizontal, Upload, Folder } from 'lucide-react';
import DataCard from '../DataCard';

interface ProjectFilesProps {
  isDarkMode: boolean;
  projectId: string;
}

interface File {
  id: string;
  name: string;
  type: 'folder' | 'document' | 'image';
  size?: string;
  modifiedAt: string;
  modifiedBy: string;
}

const files: File[] = [
  {
    id: '1',
    name: 'Plans rénovation',
    type: 'folder',
    modifiedAt: '2024-03-20',
    modifiedBy: 'Paul A.'
  },
  {
    id: '2',
    name: 'Devis_final.pdf',
    type: 'document',
    size: '2.4 MB',
    modifiedAt: '2024-03-19',
    modifiedBy: 'Marie D.'
  },
  {
    id: '3',
    name: 'Photos_avant.jpg',
    type: 'image',
    size: '5.1 MB',
    modifiedAt: '2024-03-18',
    modifiedBy: 'Thomas R.'
  }
];

const ProjectFiles: React.FC<ProjectFilesProps> = ({ isDarkMode, projectId }) => {
  return (
    <DataCard
      title="Fichiers du projet"
      isDarkMode={isDarkMode}
      action={{
        label: 'Importer',
        onClick: () => console.log('Importer des fichiers')
      }}
    >
      <div className="space-y-4">
        {/* Actions rapides */}
        <div className="flex gap-4">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <Upload className="w-5 h-5" />
            <span>Importer</span>
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700' 
              : 'bg-gray-50 hover:bg-gray-100'
          }`}>
            <Folder className="w-5 h-5" />
            <span>Nouveau dossier</span>
          </button>
        </div>

        {/* Liste des fichiers */}
        <div className={`rounded-lg overflow-hidden ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        }`}>
          <table className="w-full">
            <thead className={`text-sm ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
            }`}>
              <tr>
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Taille</th>
                <th className="px-4 py-3 text-left">Modifié le</th>
                <th className="px-4 py-3 text-left">Par</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {files.map(file => (
                <tr key={file.id} className={`${
                  isDarkMode 
                    ? 'hover:bg-slate-700' 
                    : 'hover:bg-gray-50'
                } transition-colors`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {file.type === 'folder' && <Folder className="w-5 h-5 text-blue-500" />}
                      {file.type === 'document' && <FileText className="w-5 h-5 text-red-500" />}
                      {file.type === 'image' && <ImageIcon className="w-5 h-5 text-green-500" />}
                      <span>{file.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {file.size || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {file.modifiedAt}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {file.modifiedBy}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className={`p-1 rounded-lg ${
                        isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'
                      }`}>
                        <Download className="w-4 h-4" />
                      </button>
                      <button className={`p-1 rounded-lg ${
                        isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'
                      }`}>
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DataCard>
  );
};

export default ProjectFiles;