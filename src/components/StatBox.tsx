import React from 'react';

interface StatBoxProps {
  label: string;
  amount: number;
  type: 'income' | 'expense' | 'savings' | 'credit';
  prefix?: string;
}

export const StatBox: React.FC<StatBoxProps> = ({ label, amount, type, prefix = '$' }) => {
  return (
    <div className={`stat-box ${type}`}>
      <label>{label}</label>
      <div className="amount">{prefix}{amount.toFixed(2)}</div>
    </div>
  );
};
