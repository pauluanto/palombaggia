import React, { useEffect, useState } from 'react';
import { 
  Mail, 
  Star, 
  Archive, 
  Trash2, 
  Tag, 
  Search,
  Plus,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { emailIntegration } from '../services/email-integration';
import EmailAuthButton from '../components/email/EmailAuthButton';
import { useAPI } from '../providers/APIProvider';
import DataCard from '../components/DataCard';

interface EmailsPageProps {
  isDarkMode: boolean;
}

interface Email {
  id?: string;
  subject?: string;
  from?: string;
  date?: string;
  snippet?: string;
}

const EmailsPage: React.FC<EmailsPageProps> = ({ isDarkMode }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { status } = useAPI();

  useEffect(() => {
    if (status.gmail === 'connected') {
      loadEmails();
    }
  }, [status.gmail]);

  const loadEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedEmails = await emailIntegration.listEmails(20);
      setEmails(fetchedEmails);
    } catch (err) {
      setError('Erreur lors du chargement des emails');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (status.gmail !== 'connected') {
    return (
      <div className="h-screen overflow-y-auto p-6">
        <div className="max-w-md mx-auto mt-20 text-center">
          <Mail className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-bold mb-4">Connectez votre compte Gmail</h2>
          <p className="text-gray-600 mb-8">
            Pour accéder à vos emails, connectez-vous avec votre compte Gmail.
          </p>
          <EmailAuthButton isDarkMode={isDarkMode} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-2xl font-bold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Emails
        </h1>
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
            <Plus className="w-5 h-5" />
            <span>Nouveau message</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-2">
          <div className="space-y-2">
            <button className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-blue-600 text-white'
                : 'bg-secondary text-white'
            }`}>
              <Mail className="w-5 h-5" />
              <span>Boîte de réception</span>
            </button>
            <button className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'text-gray-300 hover:bg-slate-800'
                : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <Star className="w-5 h-5" />
              <span>Important</span>
            </button>
            <button className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'text-gray-300 hover:bg-slate-800'
                : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <Archive className="w-5 h-5" />
              <span>Archive</span>
            </button>
            <button className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'text-gray-300 hover:bg-slate-800'
                : 'text-gray-700 hover:bg-gray-100'
            }`}>
              <Trash2 className="w-5 h-5" />
              <span>Corbeille</span>
            </button>
          </div>
        </div>

        {/* Liste des emails */}
        <div className="col-span-10">
          <DataCard
            title="Messages"
            icon={Mail}
            isDarkMode={isDarkMode}
          >
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-8 text-red-500">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>
            ) : (
              <div className="space-y-2">
                {emails.map((email) => (
                  <div
                    key={email.id}
                    className={`p-4 rounded-lg ${
                      isDarkMode
                        ? 'hover:bg-slate-700'
                        : 'hover:bg-gray-50'
                    } cursor-pointer transition-colors`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{email.from}</span>
                      <span className="text-sm text-gray-500">{email.date}</span>
                    </div>
                    <h4 className="font-medium mb-1">{email.subject}</h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    } line-clamp-1`}>
                      {email.snippet}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </DataCard>
        </div>
      </div>
    </div>
  );
};

export default EmailsPage;