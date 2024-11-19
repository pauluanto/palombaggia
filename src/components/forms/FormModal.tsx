import React, { ReactNode } from 'react';
import { X } from 'lucide-react';

interface FormModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  isDarkMode: boolean;
}

const FormModal: React.FC<FormModalProps> = ({ title, children, onClose, isDarkMode }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className={`w-full max-w-2xl mx-4 p-6 rounded-xl ${
        isDarkMode ? 'bg-slate-800' : 'bg-white'
      }`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button 
            onClick={onClose}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default FormModal;