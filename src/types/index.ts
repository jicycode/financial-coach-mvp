export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'income' | 'expense';
}

export interface CreditCard {
  id: string;
  name: string;
  balance: number;
  limit: number;
  dueDate: string;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  icon: string;
  description: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface FinancialData {
  transactions: Transaction[];
  creditCards: CreditCard[];
  goals: FinancialGoal[];
  unlockedRewards: Reward[];
  savingsTarget: number;
}

export interface FinancialStatus {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  creditCardUsage: number;
  healthScore: number;
  emoji: string;
  message: string;
}
