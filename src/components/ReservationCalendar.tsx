import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
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

const reservations = [
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

const ReservationCalendar = () => {
  return (
    <div className="h-[600px] bg-white/90 rounded-xl p-4">
      <Calendar
        localizer={localizer}
        events={reservations}
        startAccessor="start"
        endAccessor="end"
        culture="fr"
        views={['month', 'week', 'day']}
        defaultView="week"
        eventPropGetter={(event) => ({
          className: `bg-${event.type === 'hotel' ? 'luxury-gold' : 'primary'} text-white rounded-lg`
        })}
      />
    </div>
  );
};

export default ReservationCalendar;