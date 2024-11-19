import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Users, Euro } from 'lucide-react';
import DataCard from '../components/DataCard';

interface StatsPageProps {
  isDarkMode: boolean;
}

const monthlyData = [
  { month: 'Jan', revenue: 125000, occupancy: 75, avgPrice: 450 },
  { month: 'Fév', revenue: 118000, occupancy: 70, avgPrice: 440 },
  { month: 'Mar', revenue: 135000, occupancy: 85, avgPrice: 460 },
  { month: 'Avr', revenue: 140000, occupancy: 90, avgPrice: 470 },
  { month: 'Mai', revenue: 155000, occupancy: 95, avgPrice: 480 },
  { month: 'Juin', revenue: 180000, occupancy: 100, avgPrice: 500 }
];

const roomTypeData = [
  { name: 'Suite Présidentielle', value: 30 },
  { name: 'Suite Deluxe', value: 25 },
  { name: 'Chambre Vue Mer', value: 25 },
  { name: 'Chambre Standard', value: 20 }
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const StatsPage: React.FC<StatsPageProps> = ({ isDarkMode }) => {
  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-xl lg:text-2xl font-bold ${
          isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
        }`}>
          Statistiques
        </h1>
        <div className="flex items-center gap-4">
          <select className={`px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-slate-800 text-gray-100 border-slate-700' 
              : 'bg-white text-gray-900 border-gray-200'
          } border focus:outline-none focus:ring-2 focus:ring-secondary`}>
            <option>6 derniers mois</option>
            <option>Année en cours</option>
            <option>Année précédente</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DataCard
          title="Revenu total"
          icon={Euro}
          isDarkMode={isDarkMode}
        >
          <div className="mt-2">
            <div className="text-2xl font-bold">853,000 €</div>
            <div className="text-sm text-green-500">+12.5% vs période précédente</div>
          </div>
        </DataCard>
        
        <DataCard
          title="Taux d'occupation"
          icon={Users}
          isDarkMode={isDarkMode}
        >
          <div className="mt-2">
            <div className="text-2xl font-bold">85%</div>
            <div className="text-sm text-green-500">+5% vs période précédente</div>
          </div>
        </DataCard>

        <DataCard
          title="Prix moyen/nuit"
          icon={TrendingUp}
          isDarkMode={isDarkMode}
        >
          <div className="mt-2">
            <div className="text-2xl font-bold">470 €</div>
            <div className="text-sm text-green-500">+8% vs période précédente</div>
          </div>
        </DataCard>

        <DataCard
          title="Durée moyenne séjour"
          icon={Calendar}
          isDarkMode={isDarkMode}
        >
          <div className="mt-2">
            <div className="text-2xl font-bold">4.2 jours</div>
            <div className="text-sm text-green-500">+0.5 jour vs période précédente</div>
          </div>
        </DataCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <DataCard
          title="Revenus mensuels"
          isDarkMode={isDarkMode}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDarkMode ? '#374151' : '#E5E7EB'} 
                />
                <XAxis 
                  dataKey="month" 
                  stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                />
                <YAxis 
                  stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1F2937' : 'white',
                    borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                    color: isDarkMode ? '#E5E7EB' : '#111827'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="revenue" 
                  fill={isDarkMode ? '#3B82F6' : '#4F46E5'} 
                  name="Revenu (€)" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DataCard>

        {/* Occupancy Chart */}
        <DataCard
          title="Taux d'occupation"
          isDarkMode={isDarkMode}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDarkMode ? '#374151' : '#E5E7EB'} 
                />
                <XAxis 
                  dataKey="month" 
                  stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                />
                <YAxis 
                  stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1F2937' : 'white',
                    borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                    color: isDarkMode ? '#E5E7EB' : '#111827'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="occupancy" 
                  stroke={isDarkMode ? '#10B981' : '#047857'} 
                  name="Occupation (%)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DataCard>

        {/* Average Price Chart */}
        <DataCard
          title="Prix moyen par nuit"
          isDarkMode={isDarkMode}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={isDarkMode ? '#374151' : '#E5E7EB'} 
                />
                <XAxis 
                  dataKey="month" 
                  stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
                />
                <YAxis 
                  stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1F2937' : 'white',
                    borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                    color: isDarkMode ? '#E5E7EB' : '#111827'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="avgPrice" 
                  stroke={isDarkMode ? '#F59E0B' : '#D97706'} 
                  name="Prix moyen (€)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DataCard>

        {/* Room Type Distribution */}
        <DataCard
          title="Distribution par type de chambre"
          isDarkMode={isDarkMode}
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roomTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roomTypeData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#1F2937' : 'white',
                    borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                    color: isDarkMode ? '#E5E7EB' : '#111827'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DataCard>
      </div>
    </div>
  );
};

export default StatsPage;