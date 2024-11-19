import React from 'react';
import { Star, Clock, Paperclip } from 'lucide-react';

const emails = [
  {
    id: 1,
    sender: "Booking.com",
    subject: "Nouvelle réservation - Suite Deluxe",
    preview: "Une nouvelle réservation a été effectuée pour la période du...",
    time: "09:45",
    isStarred: true,
    hasAttachment: false,
    isUrgent: true
  },
  {
    id: 2,
    sender: "Service Comptabilité",
    subject: "Factures à valider",
    preview: "Veuillez trouver ci-joint les factures du mois en cours...",
    time: "Hier",
    isStarred: false,
    hasAttachment: true,
    isUrgent: false
  },
  {
    id: 3,
    sender: "Restaurant Manager",
    subject: "Menu du jour",
    preview: "Le chef propose pour ce soir une carte spéciale avec...",
    time: "Hier",
    isStarred: false,
    hasAttachment: false,
    isUrgent: false
  }
];

const EmailPreview = () => {
  return (
    <div className="space-y-2">
      {emails.map((email) => (
        <div 
          key={email.id}
          className="p-4 bg-white/50 rounded-lg hover:bg-white/80 transition-colors cursor-pointer border border-gray-100"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">{email.sender}</span>
              {email.isUrgent && (
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                  Urgent
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              {email.isStarred && <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
              {email.hasAttachment && <Paperclip className="w-4 h-4" />}
              <span className="text-sm">{email.time}</span>
            </div>
          </div>
          <h4 className="font-medium mb-1">{email.subject}</h4>
          <p className="text-sm text-gray-600 line-clamp-1">{email.preview}</p>
        </div>
      ))}
    </div>
  );
};

export default EmailPreview;