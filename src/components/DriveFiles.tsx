import React from 'react';
import { FileText, Folder, Image, Download, Share2 } from 'lucide-react';

const files = [
  {
    id: 1,
    name: 'Contrats Personnel 2024',
    type: 'folder',
    items: 14,
    updatedAt: '2024-03-20'
  },
  {
    id: 2,
    name: 'Menu Restaurant Mars.pdf',
    type: 'pdf',
    size: '2.4 MB',
    updatedAt: '2024-03-19'
  },
  {
    id: 3,
    name: 'Photos Chambres',
    type: 'folder',
    items: 45,
    updatedAt: '2024-03-18'
  }
];

const DriveFiles = () => {
  return (
    <div className="bg-white/90 rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-luxury-brown">Documents Google Drive</h3>
        <button className="text-sm text-secondary hover:text-secondary-light">
          Voir tout
        </button>
      </div>
      <div className="space-y-2">
        {files.map((file) => (
          <div key={file.id} className="flex items-center justify-between p-3 hover:bg-luxury-sand/20 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              {file.type === 'folder' ? (
                <Folder className="w-5 h-5 text-secondary" />
              ) : file.type === 'pdf' ? (
                <FileText className="w-5 h-5 text-red-500" />
              ) : (
                <Image className="w-5 h-5 text-blue-500" />
              )}
              <div>
                <p className="text-sm font-medium text-luxury-brown">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {file.type === 'folder' ? `${file.items} éléments` : file.size}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-luxury-sand/30 rounded">
                <Share2 className="w-4 h-4 text-gray-500" />
              </button>
              <button className="p-1 hover:bg-luxury-sand/30 rounded">
                <Download className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriveFiles;