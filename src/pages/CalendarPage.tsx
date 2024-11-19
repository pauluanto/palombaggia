import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import { Plus, Filter } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'fr': fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    id: 1,
    title: 'Suite Deluxe - M. Dupont',
    start: new Date(2024, 2, 20),
    end: new Date(2024, 2, 23),
    resourceId: 'room-1',
    type: 'hotel'
  },
  {
    id: 2,
    title: 'Restaurant - Table 4 (6 pers)',
    start: new Date(2024, 2, 20, 20, 0),
    end: new Date(2024, 2, 20, 22, 0),
    resourceId: 'restaurant',
    type: 'restaurant'
  }
];

const CalendarPage = () => {
  const [filters, setFilters] = useState({
    rooms: true,
    restaurant: true,
    events: true,
    confirmed: true,
    pending: true,
    cancelled: true
  });

  const handleFilterChange = (key: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6 mt-12 lg:mt-0">
        <h1 className="text-xl lg:text-2xl font-bold text-luxury-brown">Calendrier</h1>
        <div className="flex items-center gap-2 lg:gap-4">
          <button className="flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 rounded-lg border border-gray-200 hover:bg-white/50">
            <Filter className="w-5 h-5" />
            <span className="hidden sm:inline">Filtres</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-colors">
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Nouveau</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 rounded-xl p-4 space-y-4">
            <div>
              <h3 className="font-medium mb-2">Types</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={filters.rooms}
                    onChange={() => handleFilterChange('rooms')}
                    className="w-4 h-4" 
                  />
                  <span>Chambres</span>
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={filters.restaurant}
                    onChange={() => handleFilterChange('restaurant')}
                    className="w-4 h-4" 
                  />
                  <span>Restaurant</span>
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={filters.events}
                    onChange={() => handleFilterChange('events')}
                    className="w-4 h-4" 
                  />
                  <span>Événements</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Statut</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={filters.confirmed}
                    onChange={() => handleFilterChange('confirmed')}
                    className="w-4 h-4" 
                  />
                  <span>Confirmé</span>
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={filters.pending}
                    onChange={() => handleFilterChange('pending')}
                    className="w-4 h-4" 
                  />
                  <span>En attente</span>
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={filters.cancelled}
                    onChange={() => handleFilterChange('cancelled')}
                    className="w-4 h-4" 
                  />
                  <span>Annulé</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="lg:col-span-10 bg-white/90 rounded-xl p-4">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 'calc(100vh - 200px)' }}
            views={['month', 'week', 'day', 'agenda']}
            defaultView="week"
            culture="fr"
            eventPropGetter={(event: any) => ({
              className: `bg-${event.type === 'hotel' ? 'secondary' : 'primary'} text-white rounded-lg`,
              style: {
                backgroundColor: event.type === 'hotel' ? '#B8860B' : '#2C3E50',
                borderRadius: '8px',
                border: 'none',
                padding: '2px 8px'
              }
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;