import React from 'react';
import { Euro, TrendingUp, AlertCircle } from 'lucide-react';

const FinanceWidget = () => {
  return (
    <div className="space-y-4">
      {/* Solde Compte */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-[#0096D6] to-blue-700 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Euro className="w-5 h-5" />
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

      {/* Factures en attente */}
      <div className="p-4 rounded-xl bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Factures à payer</h3>
          <span className="text-sm text-[#0096D6]">Voir tout</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <div>
                <h4 className="text-sm font-medium">Fournisseur Vin</h4>
                <p className="text-xs text-gray-500">Échéance: Aujourd'hui</p>
              </div>
            </div>
            <span className="font-medium text-red-600">4,250 €</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <Euro className="w-5 h-5 text-gray-400" />
              <div>
                <h4 className="text-sm font-medium">Maintenance Piscine</h4>
                <p className="text-xs text-gray-500">Échéance: 28 Mars</p>
              </div>
            </div>
            <span className="font-medium">1,800 €</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceWidget;