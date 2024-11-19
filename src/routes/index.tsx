import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import RoomsPage from '../pages/RoomsPage';
import ReservationsPage from '../pages/ReservationsPage';
import StaffPage from '../pages/StaffPage';
import MessagesPage from '../pages/MessagesPage';
import EmailsPage from '../pages/EmailsPage';
import DocumentsPage from '../pages/DocumentsPage';
import StatsPage from '../pages/StatsPage';
import FinancePage from '../pages/FinancePage';
import SchedulePage from '../pages/SchedulePage';
import ProjectsPage from '../pages/ProjectsPage';
import SettingsPage from '../pages/SettingsPage';
import HousekeepingPage from '../pages/HousekeepingPage';
import RestaurantTablesPage from '../pages/restaurant/TablesPage';
import RestaurantMenuPage from '../pages/restaurant/MenuPage';
import RestaurantReservationsPage from '../pages/restaurant/ReservationsPage';
import SpaPage from '../pages/SpaPage';
import ConciergePage from '../pages/ConciergePage';
import ActivitiesPage from '../pages/ActivitiesPage';
import ChatbotPage from '../pages/ChatbotPage';
import NotFound from '../pages/NotFound';

interface AppRoutesProps {
  isDarkMode: boolean;
}

const AppRoutes = ({ isDarkMode }: AppRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />
      <Route path="/rooms" element={<RoomsPage isDarkMode={isDarkMode} />} />
      <Route path="/reservations" element={<ReservationsPage isDarkMode={isDarkMode} />} />
      <Route path="/housekeeping" element={<HousekeepingPage isDarkMode={isDarkMode} />} />
      
      <Route path="/restaurant/tables" element={<RestaurantTablesPage isDarkMode={isDarkMode} />} />
      <Route path="/restaurant/menu" element={<RestaurantMenuPage isDarkMode={isDarkMode} />} />
      <Route path="/restaurant/reservations" element={<RestaurantReservationsPage isDarkMode={isDarkMode} />} />
      
      <Route path="/spa" element={<SpaPage isDarkMode={isDarkMode} />} />
      <Route path="/concierge" element={<ConciergePage isDarkMode={isDarkMode} />} />
      <Route path="/activities" element={<ActivitiesPage isDarkMode={isDarkMode} />} />
      
      <Route path="/staff" element={<StaffPage isDarkMode={isDarkMode} />} />
      <Route path="/messages" element={<MessagesPage isDarkMode={isDarkMode} />} />
      <Route path="/emails" element={<EmailsPage isDarkMode={isDarkMode} />} />
      <Route path="/chatbot" element={<ChatbotPage isDarkMode={isDarkMode} />} />
      <Route path="/documents" element={<DocumentsPage isDarkMode={isDarkMode} />} />
      <Route path="/stats" element={<StatsPage isDarkMode={isDarkMode} />} />
      <Route path="/finance" element={<FinancePage isDarkMode={isDarkMode} />} />
      <Route path="/schedule" element={<SchedulePage isDarkMode={isDarkMode} />} />
      <Route path="/projects" element={<ProjectsPage isDarkMode={isDarkMode} />} />
      <Route path="/settings" element={<SettingsPage isDarkMode={isDarkMode} setIsDarkMode={(value: boolean) => {}} />} />
      
      <Route path="*" element={<NotFound isDarkMode={isDarkMode} />} />
    </Routes>
  );
};

export default AppRoutes;