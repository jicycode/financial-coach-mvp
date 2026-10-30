import React from 'react';
import { FinancialStatus, FinancialData } from '../types';
import { StatBox } from './StatBox';
import { TransactionList } from './TransactionList';
import { GoalCard } from './GoalCard';
import { RewardBadge } from './RewardBadge';

interface DashboardProps {
  status: FinancialStatus;
  data: FinancialData;
  onUpdateGoal: (goalId: string, amount: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ status, data, onUpdateGoal }) => {
  return (
    <div>
      {/* Emotional Indicator */}
      <div className="grid grid-2" style={{ marginBottom: '30px' }}>
        <div className="emotional-indicator">
          <span className="emoji">{status.emoji}</span>
          <div className="message">{status.message}</div>
          <div className="health-score">{status.healthScore}% Salud Financiera</div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-2">
          <StatBox label="Ingresos" amount={status.totalIncome} type="income" />
          <StatBox label="Gastos" amount={status.totalExpenses} type="expense" />
          <StatBox label="Ahorros" amount={status.totalSavings} type="savings" />
          <StatBox label="Tarjeta" amount={status.creditCardUsage} type="credit" prefix="" />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card" style={{ marginBottom: '30px' }}>
        <h2>Transacciones Recientes</h2>
        <TransactionList transactions={data.transactions.slice(-5).reverse()} maxItems={5} />
      </div>

      {/* Goals Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', borderBottom: '2px solid #6366f1', paddingBottom: '10px' }}>
          🎯 Metas de Ahorro
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

      {/* Rewards Section */}
      {data.unlockedRewards.length > 0 && (
        <div className="card">
          <h2>🏆 Recompensas Desbloqueadas</h2>
          {data.unlockedRewards.map(reward => (
            <RewardBadge key={reward.id} reward={reward} />
          ))}
        </div>
      )}

      {data.unlockedRewards.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🎁</div>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Alcanza tus metas de ahorro para desbloquear recompensas increíbles
          </p>
        </div>
      )}
    </div>
  );
};
