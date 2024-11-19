import React from 'react';
import { Cloud, Sun, Droplets } from 'lucide-react';

const WeatherWidget = () => {
  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Palombaggia Beach</h3>
          <p className="text-sm opacity-90">Parfait pour la plage</p>
        </div>
        <Sun className="w-10 h-10" />
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold">27°C</div>
        <div className="flex gap-4 mt-2 text-sm">
          <div className="flex items-center gap-1">
            <Cloud className="w-4 h-4" />
            <span>0%</span>
          </div>
          <div className="flex items-center gap-1">
            <Droplets className="w-4 h-4" />
            <span>65%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;