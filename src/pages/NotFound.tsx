import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

interface NotFoundProps {
  isDarkMode: boolean;
}

const NotFound = ({ isDarkMode }: NotFoundProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-lg mb-8">Page non trouvée</p>
        <Link
          to="/"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-secondary hover:bg-secondary-light'
          } text-white`}
        >
          <Home className="w-5 h-5" />
          <span>Retour à l'accueil</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;