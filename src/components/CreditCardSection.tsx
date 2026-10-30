import type { CreditCard } from '../types';
import { CreditCardList } from './CreditCardList';

interface CreditCardSectionProps {
  cards: CreditCard[];
  creditCardUsage: number;
}

export const CreditCardSection: React.FC<CreditCardSectionProps> = ({ cards, creditCardUsage }) => {
  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);
  const totalLimit = cards.reduce((sum, card) => sum + card.limit, 0);
  const totalAvailable = totalLimit - totalBalance;

  const getHealthStatus = () => {
    if (creditCardUsage > 90) return { emoji: '🚨', message: 'Crítico: Límite de crédito casi alcanzado', color: '#ef4444' };
    if (creditCardUsage > 70) return { emoji: '⚠️', message: 'Alerta: Alto uso de tarjeta de crédito', color: '#f59e0b' };
    if (creditCardUsage > 50) return { emoji: '😐', message: 'Moderado: Considera reducir el uso', color: '#f59e0b' };
    return { emoji: '✅', message: 'Excelente: Bajo uso de tarjeta de crédito', color: '#10b981' };
  };

  const health = getHealthStatus();

  return (
    <div>
      {/* Credit Card Summary */}
      <div className="grid grid-3" style={{ marginBottom: '30px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>💳</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>Saldo Total</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>
            ${totalBalance.toFixed(2)}
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📊</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>Límite Total</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6366f1' }}>
            ${totalLimit.toFixed(2)}
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>💰</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '8px' }}>Disponible</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
            ${totalAvailable.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Health Status */}
      <div className="card" style={{ marginBottom: '30px', textAlign: 'center', padding: '30px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{health.emoji}</div>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: health.color, marginBottom: '8px' }}>
          {health.message}
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: health.color }}>
          {creditCardUsage.toFixed(1)}% Utilización
        </div>
        <div className="progress-bar" style={{ marginTop: '20px', marginBottom: '12px' }}>
          <div
            className="progress-fill"
            style={{
              width: `${Math.min(creditCardUsage, 100)}%`,
              background: creditCardUsage > 70
                ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                : creditCardUsage > 50
                ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                : 'linear-gradient(90deg, #10b981, #059669)'
            }}
          />
        </div>
      </div>

      {/* Cards List */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', borderBottom: '2px solid #6366f1', paddingBottom: '10px' }}>
          💳 Mis Tarjetas
        </h2>
        <CreditCardList cards={cards} />
      </div>

      {/* Recommendations */}
      <div className="card">
        <h2>💡 Recomendaciones</h2>
        <ul className="list">
          <li className="list-item" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <span>📅 Paga tus tarjetas a tiempo para evitar intereses</span>
          </li>
          <li className="list-item" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <span>⏰ Mantén la utilización por debajo del 30%</span>
          </li>
          <li className="list-item" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <span>🎯 Usa tarjeta solo para gastos planeados</span>
          </li>
          <li className="list-item" style={{ borderBottom: '1px solid #e5e7eb' }}>
            <span>🔍 Revisa estados de cuenta regularmente</span>
          </li>
          <li className="list-item">
            <span>🏦 Considera consolidar deuda si es necesario</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
