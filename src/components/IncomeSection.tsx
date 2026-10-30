import React, { useState } from 'react';
import { Transaction } from '../types';
import { TransactionList } from './TransactionList';

interface IncomeSectionProps {
  transactions: Transaction[];
  totalIncome: number;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onDeleteTransaction: (id: string) => void;
}

const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Bonus', 'Other'];

export const IncomeSection: React.FC<IncomeSectionProps> = ({
  transactions,
  totalIncome,
  onAddTransaction,
  onDeleteTransaction,
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Salary');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && amount) {
      onAddTransaction({
        description,
        amount: parseFloat(amount),
        date: new Date().toISOString().split('T')[0],
        category,
        type: 'income',
      });
      setDescription('');
      setAmount('');
      setCategory('Salary');
    }
  };

  const incomeTransactions = transactions.filter(t => t.type === 'income');

  return (
    <div className="grid grid-2" style={{ gap: '30px' }}>
      {/* Form */}
      <div className="card">
        <h2>Registrar Ingreso</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Descripción</label>
            <input
              type="text"
              placeholder="ej: Pago de proyecto"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Monto</label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Categoría</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {INCOME_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-success">
            ✓ Agregar Ingreso
          </button>
        </form>
      </div>

      {/* Income Stats and List */}
      <div>
        <div className="card" style={{ marginBottom: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💰</div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>Total Ingresos</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>
              ${totalIncome.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Historial de Ingresos</h2>
          <TransactionList
            transactions={incomeTransactions}
            onDelete={onDeleteTransaction}
          />
        </div>
      </div>
    </div>
  );
};
