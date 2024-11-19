import React, { useState } from 'react';
import { 
  FileText, 
  Folder, 
  Image as ImageIcon, 
  Upload, 
  Search,
  Filter,
  Plus,
  Download,
  Share2,
  MoreVertical,
  File
} from 'lucide-react';
import DataCard from '../components/DataCard';

interface DocumentsPageProps {
  isDarkMode: boolean;
}

interface Document {
  id: string;
  name: string;
  type: 'folder' | 'document' | 'image';
  size?: string;
  modifiedAt: string;
  modifiedBy: string;
  shared?: boolean;
}

const documents: Document[] = [
  {
    id: '1',
    name: 'Contrats',
    type: 'folder',
    modifiedAt: '2024-03-20',
    modifiedBy: 'Paul A.',
    shared: true
  },
  {
    id: '2',
    name: 'Factures_Mars_2024.pdf',
    type: 'document',
    size: '2.4 MB',
    modifiedAt: '2024-03-19',
    modifiedBy: 'Marie D.'
  },
  {
    id: '3',
    name: 'Photos_Hotel',
    type: 'folder',
    modifiedAt: '2024-03-18',
    modifiedBy: 'Thomas R.',
    shared: true
  }
];

const DocumentsPage: React.FC<DocumentsPageProps> = ({ isDarkMode }) => {
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-xl lg:text-2xl font-bold ${
            isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
          }`}>
            Documents
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Gestion des fichiers
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className={`pl-10 pr-4 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-800 text-gray-100' 
                  : 'bg-white text-gray-900'
              } border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary`}
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
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
              : 'bg-secondary hover:bg-secondary-light'
          }`}>
            <Upload className="w-5 h-5" />
            <span>Importer</span>
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-secondary hover:bg-secondary-light'
          }`}>
            <Plus className="w-5 h-5" />
            <span>Nouveau dossier</span>
          </button>
        </div>
      </div>

      <DataCard
        title="Fichiers"
        icon={File}
        isDarkMode={isDarkMode}
      >
        <div className={`rounded-lg overflow-hidden ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        }`}>
          <table className="w-full">
            <thead className={`text-sm ${
              isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
            }`}>
              <tr>
                <th className="px-6 py-4 text-left">Nom</th>
                <th className="px-6 py-4 text-left">Taille</th>
                <th className="px-6 py-4 text-left">Modifié le</th>
                <th className="px-6 py-4 text-left">Par</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className={`${
                  isDarkMode 
                    ? 'hover:bg-slate-700' 
                    : 'hover:bg-gray-50'
                } transition-colors`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {doc.type === 'folder' && <Folder className="w-5 h-5 text-blue-500" />}
                      {doc.type === 'document' && <FileText className="w-5 h-5 text-red-500" />}
                      {doc.type === 'image' && <ImageIcon className="w-5 h-5 text-green-500" />}
                      <span className="font-medium">{doc.name}</span>
                      {doc.shared && (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          isDarkMode
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-blue-100 text-blue-600'
                        }`}>
                          Partagé
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {doc.size || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {doc.modifiedAt}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {doc.modifiedBy}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className={`p-2 rounded-lg ${
                        isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-100'
                      }`}>
                        <Download className="w-4 h-4" />
                      </button>
                      <button className={`p-2 rounded-lg ${
                        isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-100'
                      }`}>
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className={`p-2 rounded-lg ${
                        isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-100'
                      }`}>
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DataCard>
    </div>
  );
};

export default DocumentsPage;