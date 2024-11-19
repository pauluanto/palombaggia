import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Hotel, 
  Calendar, 
  Users, 
  MessageSquare, 
  FileText,
  Mail,
  BarChart2,
  Settings,
  CreditCard,
  Clock,
  Briefcase,
  Bot,
  Building,
  ChefHat,
  Sparkles,
  Waves,
  Wine
} from 'lucide-react';

interface SidebarProps {
  isDarkMode: boolean;
}

interface MenuItem {
  path: string;
  icon: any;
  label: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    title: 'Principal',
    items: [
      { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/stats', icon: BarChart2, label: 'Statistiques' },
      { path: '/finance', icon: CreditCard, label: 'Finance' }
    ]
  },
  {
    title: 'Hébergement',
    items: [
      { path: '/rooms', icon: Hotel, label: 'Chambres' },
      { path: '/reservations', icon: Calendar, label: 'Réservations' },
      { path: '/housekeeping', icon: Sparkles, label: 'Housekeeping' }
    ]
  },
  {
    title: 'Restaurant',
    items: [
      { path: '/restaurant/tables', icon: ChefHat, label: 'Tables' },
      { path: '/restaurant/menu', icon: Wine, label: 'Menu' },
      { path: '/restaurant/reservations', icon: Calendar, label: 'Réservations' }
    ]
  },
  {
    title: 'Services',
    items: [
      { path: '/spa', icon: Waves, label: 'Spa & Bien-être' },
      { path: '/concierge', icon: Building, label: 'Conciergerie' },
      { path: '/activities', icon: Calendar, label: 'Activités' }
    ]
  },
  {
    title: 'Communication',
    items: [
      { path: '/messages', icon: MessageSquare, label: 'Messages' },
      { path: '/emails', icon: Mail, label: 'Emails' },
      { path: '/chatbot', icon: Bot, label: 'Assistant IA' }
    ]
  },
  {
    title: 'Gestion',
    items: [
      { path: '/staff', icon: Users, label: 'Personnel' },
      { path: '/schedule', icon: Clock, label: 'Planning' },
      { path: '/documents', icon: FileText, label: 'Documents' },
      { path: '/projects', icon: Briefcase, label: 'Projets' }
    ]
  }
];

const Sidebar = ({ isDarkMode }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside className={`hidden lg:flex lg:flex-col w-64 ${
      isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
    } border-r`}>
      <div className="p-4">
        <h1 className={`text-xl font-bold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Palombaggia 360°
        </h1>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        {menuCategories.map((category, index) => (
          <div key={index} className="mb-6">
            <h2 className={`px-4 mb-2 text-xs font-semibold uppercase ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {category.title}
            </h2>
            <ul className="space-y-1">
              {category.items.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? isDarkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-secondary text-white'
                        : isDarkMode
                          ? 'text-gray-300 hover:bg-slate-700'
                          : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/settings"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              location.pathname === '/settings'
                ? isDarkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-secondary text-white'
                : isDarkMode
                  ? 'text-gray-300 hover:bg-slate-700'
                  : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;