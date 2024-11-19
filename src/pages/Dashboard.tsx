import { useAuthStore } from '../stores/useAuthStore';
import { useTaskStore } from '../stores/useTaskStore';
import StatsCard from '../components/StatsCard';
import TaskList from '../components/TaskList';
import { Card } from '../components/ui/Card';
import { Users, Hotel, CreditCard, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface DashboardProps {
  isDarkMode: boolean;
}

const Dashboard = ({ isDarkMode }: DashboardProps) => {
  const { user, permissions } = useAuthStore();
  const { tasks } = useTaskStore();

  const stats = [
    {
      label: "Taux d'occupation",
      value: "85%",
      icon: Hotel,
      trend: { value: "+5%", isPositive: true },
      color: "blue"
    },
    {
      label: "Clients présents",
      value: "42",
      icon: Users,
      trend: { value: "+12", isPositive: true },
      color: "green"
    },
    {
      label: "Revenu mensuel",
      value: "85,250€",
      icon: CreditCard,
      trend: { value: "+18.3%", isPositive: true },
      color: "purple",
      hidden: !permissions?.canViewFinances
    },
    {
      label: "Réservations",
      value: "28",
      icon: Calendar,
      trend: { value: "+3", isPositive: true },
      color: "yellow"
    }
  ].filter(stat => !stat.hidden);

  const myTasks = tasks.filter(task => task.assignee === user?.id);
  const urgentTasks = myTasks.filter(task => task.priority === 'high');
  const todayTasks = myTasks.filter(task => {
    if (!task.dueDate) return false;
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate === today;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Dashboard
          </h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Bienvenue, {user?.name}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            trend={stat.trend}
            color={stat.color}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tâches urgentes */}
        <Card isDarkMode={isDarkMode}>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold">Tâches urgentes</h2>
          </div>
          <TaskList tasks={urgentTasks} isDarkMode={isDarkMode} />
        </Card>

        {/* Tâches du jour */}
        <Card isDarkMode={isDarkMode}>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold">Tâches du jour</h2>
          </div>
          <TaskList tasks={todayTasks} isDarkMode={isDarkMode} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;