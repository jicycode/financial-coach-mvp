import React from 'react';
import { CreditCard } from '../types';

interface CreditCardListProps {
  cards: CreditCard[];
}

export const CreditCardList: React.FC<CreditCardListProps> = ({ cards }) => {
  return (
    <div className="grid grid-2">
      {cards.map(card => {
        const usage = (card.balance / card.limit) * 100;
        const available = card.limit - card.balance;

        return (
          <div key={card.id} className="card">
            <h3 style={{ marginBottom: '16px' }}>{card.name}</h3>

            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#6b7280' }}>Saldo utilizado</span>
                <span style={{ fontWeight: 'bold' }}>${card.balance.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#6b7280' }}>Límite</span>
                <span style={{ fontWeight: 'bold' }}>${card.limit.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ color: '#6b7280' }}>Disponible</span>
                <span style={{ fontWeight: 'bold', color: '#10b981' }}>${available.toFixed(2)}</span>
              </div>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(usage, 100)}%`,
                  background: usage > 80 ? 'linear-gradient(90deg, #ef4444, #dc2626)' : 'linear-gradient(90deg, #6366f1, #ec4899)'
                }}
              ></div>
            </div>

            <div style={{ marginTop: '12px', textAlign: 'center', color: usage > 80 ? '#ef4444' : '#10b981' }}>
              {usage > 80 ? '⚠️' : '✓'} {usage.toFixed(0)}% utilizado
            </div>

            <div style={{ marginTop: '12px', fontSize: '0.9rem', color: '#6b7280', textAlign: 'center' }}>
              Vence el {card.dueDate}
            </div>
          </div>
        );
      })}
    </div>
  );
};
