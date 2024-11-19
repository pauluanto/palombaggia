import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', revenue: 12500 },
  { name: 'Mar', revenue: 14800 },
  { name: 'Mer', revenue: 13200 },
  { name: 'Jeu', revenue: 15600 },
  { name: 'Ven', revenue: 18900 },
  { name: 'Sam', revenue: 22400 },
  { name: 'Dim', revenue: 19800 },
];

const RevenueChart = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0096D6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#0096D6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value: number) => `${value.toLocaleString()}€`}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              border: 'none',
              backdropFilter: 'blur(4px)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#0096D6" 
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;