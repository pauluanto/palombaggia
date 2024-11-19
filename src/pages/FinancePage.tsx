import React from 'react';
import { Euro, TrendingUp, Download, Filter, FileText, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import DataCard from '../components/DataCard';

interface FinancePageProps {
  isDarkMode: boolean;
}

const transactions = [
  {
    id: 1,
    type: 'income',
    description: 'Réservation Suite Présidentielle',
    amount: 2500,
    date: '2024-03-20',
    status: 'completed',
    category: 'hébergement'
  },
  {
    id: 2,
    type: 'expense',
    description: 'Fournisseur Vin',
    amount: 4250,
    date: '2024-03-20',
    status: 'pending',
    category: 'restaurant'
  }
];

const FinancePage: React.FC<FinancePageProps> = ({ isDarkMode }) => {
  return (
    <div className="h-screen overflow-y-auto p-4 lg:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-xl lg:text-2xl font-bold ${
          isDarkMode ? 'text-gray-100' : 'text-luxury-brown'
        }`}>
          Finances
        </h1>
        <div className="flex items-center gap-4">
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700' 
              : 'border border-gray-200 hover:bg-gray-50'
          }`}>
            <Filter className="w-5 h-5" />
            <span>Filtres</span>
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-slate-800 hover:bg-slate-700' 
              : 'border border-gray-200 hover:bg-gray-50'
          }`}>
            <Download className="w-5 h-5" />
            <span>Exporter</span>
          </button>
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-secondary hover:bg-secondary-light'
          }`}>
            <FileText className="w-5 h-5" />
            <span>Nouvelle facture</span>
          </button>
        </div>
      </div>

      {/* Cartes de solde */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className={`rounded-xl p-6 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-500/20' 
            : 'bg-gradient-to-br from-[#0096D6] to-blue-700 text-white'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              <h3 className="font-semibold">Crédit Agricole Corse</h3>
            </div>
            <span className="text-sm opacity-80">••• 4589</span>
          </div>
          <div className="text-3xl font-bold mb-2">142,580.45 €</div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+12.5% ce mois</span>
          </div>
        </div>

        <div className={`rounded-xl p-6 ${
          isDarkMode ? 'bg-slate-800' : 'bg-white/90'
        }`}>
          <div className="flex items-center gap-2 text-green-500 mb-4">
            <ArrowUpRight className="w-5 h-5" />
            <h3 className="font-semibold">Revenus du mois</h3>
          </div>
          <div className="text-3xl font-bold mb-2">85,250.00 €</div>
          <div className="text-sm text-green-500">+18.3% vs mois dernier</div>
        </div>

        <div className={`rounded-xl p-6 ${
          isDarkMode ? 'bg-slate-800' : 'bg-white/90'
        }`}>
          <div className="flex items-center gap-2 text-red-500 mb-4">
            <ArrowDownRight className="w-5 h-5" />
            <h3 className="font-semibold">Dépenses du mois</h3>
          </div>
          <div className="text-3xl font-bold mb-2">32,680.00 €</div>
          <div className="text-sm text-red-500">+5.2% vs mois dernier</div>
        </div>
      </div>

      {/* Transactions */}
      <DataCard
        title="Transactions récentes"
        icon={Euro}
        isDarkMode={isDarkMode}
      >
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700' 
                  : 'bg-gray-50 hover:bg-gray-100'
              } transition-colors`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'income'
                    ? isDarkMode 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-green-100 text-green-600'
                    : isDarkMode
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'income' ? (
                    <ArrowUpRight className="w-5 h-5" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{transaction.description}</h4>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {transaction.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-lg font-medium ${
                  transaction.type === 'income'
                    ? isDarkMode ? 'text-green-400' : 'text-green-600'
                    : isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{transaction.amount} €
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  transaction.status === 'completed'
                    ? isDarkMode
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-green-100 text-green-600'
                    : isDarkMode
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {transaction.status === 'completed' ? 'Complété' : 'En attente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </DataCard>
    </div>
  );
};

export default FinancePage;