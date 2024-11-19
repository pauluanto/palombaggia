import { useState } from 'react';
import { MessageSquare, Mail, Bot, Sun, Moon, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { menuCategories } from './Sidebar';

interface MobileNavProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const MobileNav = ({ isDarkMode, setIsDarkMode }: MobileNavProps) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const quickActions = [
    { path: '/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/emails', icon: Mail, label: 'Emails' },
    { path: '/chatbot', icon: Bot, label: 'Assistant' }
  ];

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryTitle)
        ? prev.filter(cat => cat !== categoryTitle)
        : [...prev, categoryTitle]
    );
  };

  return (
    <>
      {/* Quick Actions Bar */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 ${
        isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
      } border-t`}>
        <div className="flex items-center justify-around p-4">
          {quickActions.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 ${
                location.pathname === item.path
                  ? isDarkMode
                    ? 'text-blue-400'
                    : 'text-secondary'
                  : isDarkMode
                  ? 'text-gray-400'
                  : 'text-gray-600'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex flex-col items-center gap-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-6 h-6" />
                <span className="text-xs">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-6 h-6" />
                <span className="text-xs">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Floating Menu Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className={`lg:hidden fixed left-4 bottom-24 z-50 p-4 rounded-full shadow-lg ${
          isDarkMode 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-secondary text-white hover:bg-secondary-light'
        }`}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Full Screen Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className={`absolute left-0 top-0 bottom-0 w-4/5 max-w-sm p-6 overflow-y-auto ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h1 className={`text-xl font-bold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Palombaggia 360°
              </h1>
              <button
                onClick={() => setIsMenuOpen(false)}
                className={`p-2 rounded-lg ${
                  isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-4">
              {menuCategories.map((category) => (
                <div key={category.title}>
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'hover:bg-slate-700 text-gray-200'
                        : 'hover:bg-gray-100 text-gray-800'
                    }`}
                  >
                    <span className="font-medium">{category.title}</span>
                    {expandedCategories.includes(category.title) ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </button>
                  
                  {/* Category Items */}
                  <div className={`mt-1 space-y-1 overflow-hidden transition-all duration-200 ${
                    expandedCategories.includes(category.title)
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}>
                    {category.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-2 px-8 py-2 rounded-lg transition-colors ${
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
                    ))}
                  </div>
                </div>
              ))}

              {/* Settings Link */}
              <Link
                to="/settings"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg mt-4 ${
                  location.pathname === '/settings'
                    ? isDarkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-secondary text-white'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-slate-700'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Bot className="w-5 h-5" />
                <span>Paramètres</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;