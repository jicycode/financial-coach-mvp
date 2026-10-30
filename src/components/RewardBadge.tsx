import type { Reward } from '../types';

interface RewardBadgeProps {
  reward: Reward;
}

export const RewardBadge: React.FC<RewardBadgeProps> = ({ reward }) => {
  return (
    <div className="reward-badge">
      <div className="reward-icon">{reward.icon}</div>
      <div className="reward-content">
        <h4>{reward.name}</h4>
        <p>{reward.description}</p>
        {reward.unlockedAt && (
          <small style={{ color: '#713f12', marginTop: '4px', display: 'block' }}>
            Desbloqueado: {new Date(reward.unlockedAt).toLocaleDateString('es-ES')}
          </small>
        )}
      </div>
    </div>
  );
};
