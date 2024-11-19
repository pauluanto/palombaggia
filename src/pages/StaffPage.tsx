import { Users, Plus, Filter, Clock, CheckCircle2, Calendar, Mail, Phone, MapPin } from 'lucide-react';

const staff = [
  {
    id: 1,
    name: 'Marie Dubois',
    role: 'Femme de chambre',
    status: 'active',
    avatar: 'MD',
    email: 'marie.d@palombaggia.com',
    phone: '+33 6 12 34 56 78',
    location: 'Étage 1',
    schedule: '8:00 - 16:00',
    tasks: [
      { id: 1, title: 'Nettoyage Suite 101', status: 'completed' },
      { id: 2, title: 'Nettoyage Suite 102', status: 'pending' },
      { id: 3, title: 'Vérification minibar', status: 'pending' }
    ]
  },
  // ... autres membres du personnel
];

function StaffPage() {
  return (
    <div className="h-screen overflow-y-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-luxury-brown">Gestion du Personnel</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-white/50">
            <Filter className="w-5 h-5" />
            <span>Filtres</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-light transition-colors">
            <Plus className="w-5 h-5" />
            <span>Ajouter un employé</span>
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white/90 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Personnel actif</p>
              <h3 className="text-2xl font-bold">12/15</h3>
            </div>
          </div>
          <div className="text-sm text-blue-600">3 en congés</div>
        </div>

        <div className="bg-white/90 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tâches complétées</p>
              <h3 className="text-2xl font-bold">45</h3>
            </div>
          </div>
          <div className="text-sm text-green-600">+12 aujourd'hui</div>
        </div>

        <div className="bg-white/90 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-yellow-100">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tâches en cours</p>
              <h3 className="text-2xl font-bold">8</h3>
            </div>
          </div>
          <div className="text-sm text-yellow-600">2 prioritaires</div>
        </div>

        <div className="bg-white/90 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-purple-100">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Heures travaillées</p>
              <h3 className="text-2xl font-bold">156h</h3>
            </div>
          </div>
          <div className="text-sm text-purple-600">Cette semaine</div>
        </div>
      </div>

      {/* Liste du personnel */}
      <div className="grid grid-cols-3 gap-6">
        {staff.map((employee) => (
          <div key={employee.id} className="bg-white/90 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-xl font-bold text-secondary">
                {employee.avatar}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{employee.name}</h3>
                <p className="text-sm text-gray-600">{employee.role}</p>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${employee.status === 'active'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'}`}>
                  <span className={`w-2 h-2 rounded-full ${employee.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}`} />
                  {employee.status === 'active' ? 'En service' : 'Absent'}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{employee.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{employee.schedule}</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Tâches assignées</h4>
              <div className="space-y-2">
                {employee.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
                  >
                    <span className="text-sm">{task.title}</span>
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaffPage;