import { useState } from 'react';
import type { FinancialGoal } from '../types';

interface GoalCardProps {
  goal: FinancialGoal;
  onUpdateGoal?: (goalId: string, amount: number) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdateGoal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newAmount, setNewAmount] = useState(goal.currentAmount);

  const percentage = (goal.currentAmount / goal.targetAmount) * 100;
  const isCompleted = goal.currentAmount >= goal.targetAmount;

  const handleSave = () => {
    onUpdateGoal?.(goal.id, newAmount);
    setIsEditing(false);
  };

  return (
    <div className={`goal-card ${isCompleted ? 'completed' : ''}`}>
      <div className="goal-icon">{goal.icon}</div>
      <div className="goal-name">{goal.name}</div>
      <div className="goal-progress">
        ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            background: isCompleted
              ? 'linear-gradient(90deg, #A8C5A0, #8FB596)'
              : 'linear-gradient(90deg, #A8C5A0, #244C3C)'
          }}
        ></div>
      </div>

      <div style={{ marginTop: '8px', textAlign: 'center', fontWeight: 'bold' }}>
        {isCompleted ? '🎉 ¡Meta alcanzada!' : `${percentage.toFixed(0)}% completado`}
      </div>

      <div className="goal-description">{goal.description}</div>

      {!isCompleted && (
        <div style={{ marginTop: '12px', display: 'grid', gap: '8px' }}>
          {isEditing ? (
            <>
              <input
                type="number"
                value={newAmount}
                onChange={(e) => setNewAmount(parseFloat(e.target.value))}
                style={{ padding: '8px', border: '1px solid #D4C7D8', borderRadius: '6px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button className="btn btn-success btn-sm" onClick={handleSave}>Guardar</button>
                <button className="btn btn-sm" style={{ background: '#D4C7D8', color: '#333' }} onClick={() => setIsEditing(false)}>Cancelar</button>
              </div>
            </>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={() => setIsEditing(true)}>
              Actualizar progreso
            </button>
          )}
        </div>
      )}
    </div>
  );
};
