import React from 'react';
import { User } from 'lucide-react';

const staff = [
  {
    id: 1,
    name: "Marie Dubois",
    role: "Femme de chambre",
    status: "active",
    tasks: 3
  },
  {
    id: 2,
    name: "Jean Martin",
    role: "Chef de cuisine",
    status: "break",
    tasks: 1
  },
  {
    id: 3,
    name: "Sophie Bernard",
    role: "Réception",
    status: "active",
    tasks: 2
  }
];

const StaffStatus = () => {
  return (
    <div className="space-y-3">
      {staff.map((member) => (
        <div 
          key={member.id}
          className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-800">{member.name}</h4>
              <p className="text-xs text-gray-500">{member.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              member.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
            }`} />
            <span className="text-xs text-gray-600">{member.tasks} tâches</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffStatus;