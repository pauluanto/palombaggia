import React from 'react';
import { Mail, Bell, MessageSquare, Calendar, Settings } from 'lucide-react';

interface NotificationSettingsProps {
  isDarkMode: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    reservations: boolean;
    messages: boolean;
    tasks: boolean;
    updates: boolean;
  };
  onNotificationChange: (key: string, value: boolean) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  isDarkMode,
  notifications,
  onNotificationChange
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-4">Canaux de notification</h4>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => onNotificationChange('email', e.target.checked)}
                  className="rounded text-secondary focus:ring-secondary"
                />
              </label>
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5" />
                  <span>Notifications push</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => onNotificationChange('push', e.target.checked)}
                  className="rounded text-secondary focus:ring-secondary"
                />
              </label>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Types de notifications</h4>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5" />
                  <span>Réservations</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.reservations}
                  onChange={(e) => onNotificationChange('reservations', e.target.checked)}
                  className="rounded text-secondary focus:ring-secondary"
                />
              </label>
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  <span>Messages</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.messages}
                  onChange={(e) => onNotificationChange('messages', e.target.checked)}
                  className="rounded text-secondary focus:ring-secondary"
                />
              </label>
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  <span>Mises à jour système</span>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.updates}
                  onChange={(e) => onNotificationChange('updates', e.target.checked)}
                  className="rounded text-secondary focus:ring-secondary"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;