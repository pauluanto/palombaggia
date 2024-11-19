import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DataCard from './DataCard';
import { BarChart2 } from 'lucide-react';

interface SocialMetricsProps {
  isDarkMode: boolean;
  activeNetwork: string;
}

const data = [
  { date: 'Lun', engagement: 85, reach: 1200 },
  { date: 'Mar', engagement: 92, reach: 1400 },
  { date: 'Mer', engagement: 78, reach: 1100 },
  { date: 'Jeu', engagement: 95, reach: 1600 },
  { date: 'Ven', engagement: 110, reach: 1800 },
  { date: 'Sam', engagement: 125, reach: 2200 },
  { date: 'Dim', engagement: 115, reach: 2000 }
];

const SocialMetrics: React.FC<SocialMetricsProps> = ({ isDarkMode, activeNetwork }) => {
  return (
    <DataCard
      title="Analyses"
      icon={BarChart2}
      isDarkMode={isDarkMode}
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDarkMode ? '#374151' : '#E5E7EB'} 
            />
            <XAxis 
              dataKey="date" 
              stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
            />
            <YAxis 
              stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
              yAxisId="left"
            />
            <YAxis 
              yAxisId="right" 
              orientation="right"
              stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1F2937' : 'white',
                borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                color: isDarkMode ? '#E5E7EB' : '#111827'
              }}
            />
            <Bar 
              yAxisId="left"
              dataKey="engagement" 
              fill={isDarkMode ? '#3B82F6' : '#4F46E5'} 
              name="Engagement"
            />
            <Bar 
              yAxisId="right"
              dataKey="reach" 
              fill={isDarkMode ? '#8B5CF6' : '#7C3AED'} 
              name="Portée"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DataCard>
  );
};

export default SocialMetrics;