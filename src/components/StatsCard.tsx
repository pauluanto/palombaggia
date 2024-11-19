import React from 'react';
import Card from './Card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
  isDarkMode?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  label,
  value,
  trend,
  color = 'blue',
  isDarkMode = false
}) => {
  const getColorClasses = (color: string) => {
    const colors = {
      blue: isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-100 text-blue-600',
      green: isDarkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-600',
      yellow: isDarkMode ? 'bg-yellow-500/10 text-yellow-400' : 'bg-yellow-100 text-yellow-600',
      purple: isDarkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-600',
      red: isDarkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-100 text-red-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <Card isDarkMode={isDarkMode}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
            <Icon className="w-6 h-6" />
          </div>
          {trend && (
            <span className={`text-sm font-medium ${
              trend.isPositive 
                ? isDarkMode ? 'text-green-400' : 'text-green-600'
                : isDarkMode ? 'text-red-400' : 'text-red-600'
            }`}>
              {trend.value}
            </span>
          )}
        </div>
        <h3 className={`text-sm mb-1 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {label}
        </h3>
        <p className={`text-2xl font-bold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-900'
        }`}>
          {value}
        </p>
      </div>
    </Card>
  );
};

export default StatsCard;