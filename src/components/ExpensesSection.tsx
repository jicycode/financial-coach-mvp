import { useState } from 'react';
import type { Transaction } from '../types';
import { TransactionList } from './TransactionList';

interface ExpensesSectionProps {
  transactions: Transaction[];
  totalExpenses: number;
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  onDeleteTransaction: (id: string) => void;
}

const EXPENSE_CATEGORIES = ['Housing', 'Food', 'Transportation', 'Entertainment', 'Health', 'Shopping', 'Other'];

export const ExpensesSection: React.FC<ExpensesSectionProps> = ({
  transactions,
  totalExpenses,
  onAddTransaction,
  onDeleteTransaction,
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description && amount) {
      onAddTransaction({
        description,
        amount: parseFloat(amount),
        date: new Date().toISOString().split('T')[0],
        category,
        type: 'expense',
      });
      setDescription('');
      setAmount('');
      setCategory('Food');
    }
  };

  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  // Calculate expenses by category
  const expensesByCategory = expenseTransactions.reduce((acc, trans) => {
    const existing = acc.find(e => e.category === trans.category);
    if (existing) {
      existing.amount += trans.amount;
    } else {
      acc.push({ category: trans.category, amount: trans.amount });
    }
    return acc;
  }, [] as { category: string; amount: number }[]).sort((a, b) => b.amount - a.amount);

  return (
    <div className="grid grid-2" style={{ gap: '30px' }}>
      {/* Form */}
      <div className="card">
        <h2>Registrar Gasto</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Descripción</label>
            <input
              type="text"
              placeholder="ej: Comida en restaurante"
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
              {EXPENSE_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-danger">
            ✗ Agregar Gasto
          </button>
        </form>
      </div>

      {/* Expenses Stats and List */}
      <div>
        <div className="card" style={{ marginBottom: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💸</div>
            <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>Total Gastos</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444' }}>
              ${totalExpenses.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Category breakdown */}
        {expensesByCategory.length > 0 && (
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3>Por Categoría</h3>
            <ul className="list" style={{ margin: 0 }}>
              {expensesByCategory.map((item) => (
                <li key={item.category} className="list-item">
                  <span>{item.category}</span>
                  <span style={{ fontWeight: 'bold', color: '#ef4444' }}>
                    ${item.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="card">
          <h2>Historial de Gastos</h2>
          <TransactionList
            transactions={expenseTransactions}
            onDelete={onDeleteTransaction}
          />
        </div>
      </div>
    </div>
  );
};
