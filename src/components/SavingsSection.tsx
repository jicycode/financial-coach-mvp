import React from 'react';
import { FinancialData } from '../types';
import { GoalCard } from './GoalCard';

interface SavingsSectionProps {
  data: FinancialData;
  totalIncome: number;
  totalExpenses: number;
  onUpdateGoal: (goalId: string, amount: number) => void;
}

export const SavingsSection: React.FC<SavingsSectionProps> = ({
  data,
  totalIncome,
  totalExpenses,
  onUpdateGoal,
}) => {
  const totalSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;
  const totalGoals = data.goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const completedGoals = data.goals.filter(g => g.currentAmount >= g.targetAmount).length;

  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-4" style={{ marginBottom: '30px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>💵</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>Saldo Actual</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
            ${totalSavings.toFixed(2)}
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📊</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>% Ahorrado</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6366f1' }}>
            {savingsRate.toFixed(1)}%
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🎯</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>Metas Activas</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>
            {data.goals.length}
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>✅</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>Completadas</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
            {completedGoals}/{data.goals.length}
          </div>
        </div>
      </div>

      {/* Goals */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', borderBottom: '2px solid #6366f1', paddingBottom: '10px' }}>
          🎯 Mis Metas de Ahorro
        </h2>
        <div className="grid grid-3">
          {data.goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdateGoal={onUpdateGoal}
            />
          ))}
        </div>
      </div>

      {/* Savings Tips */}
      <div className="card">
        <h2>💡 Tips de Ahorro</h2>
        <ul className="list">
          <li className="list-item" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <span>📌 Establece metas específicas y realistas</span>
          </li>
          <li className="list-item" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <span>🏦 Abre una cuenta separada para ahorros</span>
          </li>
          <li className="list-item" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <span>💳 Reduce gastos en tarjeta de crédito</span>
          </li>
          <li className="list-item" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <span>📊 Revisa tus gastos regularmente</span>
          </li>
          <li className="list-item">
            <span>🎯 Ahorra al menos el 20% de tus ingresos</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
