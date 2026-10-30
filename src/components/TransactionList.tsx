import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete?: (id: string) => void;
  maxItems?: number;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
  maxItems
}) => {
  const displayTransactions = maxItems ? transactions.slice(0, maxItems) : transactions;

  if (displayTransactions.length === 0) {
    return <p style={{ textAlign: 'center', color: '#9ca3af', padding: '20px' }}>No hay transacciones</p>;
  }

  return (
    <ul className="list">
      {displayTransactions.map(transaction => (
        <li key={transaction.id} className="list-item">
          <div className="list-item-content">
            <div className="list-item-description">{transaction.description}</div>
            <div className="list-item-category">{transaction.category} • {transaction.date}</div>
          </div>
          <div className={`list-item-amount ${transaction.type}`}>
            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
          </div>
          {onDelete && (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(transaction.id)}
              style={{ marginLeft: '12px' }}
            >
              Eliminar
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
