import { useState } from 'react';
import './index.css';
import { useFinancial } from './hooks/useFinancial';
import { Dashboard } from './components/Dashboard';
import { IncomeSection } from './components/IncomeSection';
import { ExpensesSection } from './components/ExpensesSection';
import { SavingsSection } from './components/SavingsSection';
import { CreditCardSection } from './components/CreditCardSection';

type TabType = 'dashboard' | 'income' | 'expenses' | 'savings' | 'creditcard';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const { data, status, addTransaction, deleteTransaction, updateGoal } = useFinancial();

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>💰 Financial Coach MVP</h1>
        <p>Gestiona tus finanzas personales y alcanza tus metas de ahorro</p>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`tab-button ${activeTab === 'income' ? 'active' : ''}`}
          onClick={() => setActiveTab('income')}
        >
          💵 Ingresos
        </button>
        <button
          className={`tab-button ${activeTab === 'expenses' ? 'active' : ''}`}
          onClick={() => setActiveTab('expenses')}
        >
          💸 Gastos
        </button>
        <button
          className={`tab-button ${activeTab === 'savings' ? 'active' : ''}`}
          onClick={() => setActiveTab('savings')}
        >
          🎯 Ahorros
        </button>
        <button
          className={`tab-button ${activeTab === 'creditcard' ? 'active' : ''}`}
          onClick={() => setActiveTab('creditcard')}
        >
          💳 Tarjeta Crédito
        </button>
      </div>

      {/* Content */}
      {activeTab === 'dashboard' && (
        <Dashboard
          status={status}
          data={data}
          onUpdateGoal={updateGoal}
        />
      )}

      {activeTab === 'income' && (
        <IncomeSection
          transactions={data.transactions}
          totalIncome={status.totalIncome}
          onAddTransaction={addTransaction}
          onDeleteTransaction={deleteTransaction}
        />
      )}

      {activeTab === 'expenses' && (
        <ExpensesSection
          transactions={data.transactions}
          totalExpenses={status.totalExpenses}
          onAddTransaction={addTransaction}
          onDeleteTransaction={deleteTransaction}
        />
      )}

      {activeTab === 'savings' && (
        <SavingsSection
          data={data}
          totalIncome={status.totalIncome}
          totalExpenses={status.totalExpenses}
          onUpdateGoal={updateGoal}
        />
      )}

      {activeTab === 'creditcard' && (
        <CreditCardSection
          cards={data.creditCards}
          creditCardUsage={status.creditCardUsage}
        />
      )}
    </div>
  );
}

export default App;
