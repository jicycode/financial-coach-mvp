import type { FinancialData, FinancialStatus, Transaction, CreditCard, FinancialGoal, Reward } from '../types';

const STORAGE_KEY = 'financial_coach_data';

const DEFAULT_DATA: FinancialData = {
  transactions: [
    {
      id: '1',
      description: 'Salario mensual',
      amount: 2500,
      date: '2024-10-25',
      category: 'Salary',
      type: 'income',
    },
    {
      id: '2',
      description: 'Freelance project',
      amount: 800,
      date: '2024-10-20',
      category: 'Freelance',
      type: 'income',
    },
    {
      id: '3',
      description: 'Renta',
      amount: 1200,
      date: '2024-10-01',
      category: 'Housing',
      type: 'expense',
    },
    {
      id: '4',
      description: 'Groceries',
      amount: 350,
      date: '2024-10-28',
      category: 'Food',
      type: 'expense',
    },
    {
      id: '5',
      description: 'Streaming services',
      amount: 45,
      date: '2024-10-15',
      category: 'Entertainment',
      type: 'expense',
    },
  ],
  creditCards: [
    {
      id: '1',
      name: 'Visa Platinum',
      balance: 2150,
      limit: 5000,
      dueDate: '2024-11-10',
    },
    {
      id: '2',
      name: 'Mastercard Gold',
      balance: 890,
      limit: 3000,
      dueDate: '2024-11-15',
    },
  ],
  goals: [
    {
      id: '1',
      name: 'Fondo de emergencia',
      targetAmount: 5000,
      currentAmount: 3500,
      deadline: '2024-12-31',
      icon: '🏥',
      description: 'Ahorros para emergencias',
    },
    {
      id: '2',
      name: 'Vacaciones',
      targetAmount: 3000,
      currentAmount: 1800,
      deadline: '2025-06-30',
      icon: '✈️',
      description: 'Viaje a la playa',
    },
    {
      id: '3',
      name: 'Laptop nueva',
      targetAmount: 2000,
      currentAmount: 1400,
      deadline: '2025-03-31',
      icon: '💻',
      description: 'Actualizar equipo de trabajo',
    },
  ],
  unlockedRewards: [],
  savingsTarget: 5000,
};

const REWARDS_LIBRARY: Reward[] = [
  {
    id: 'coffee',
    name: 'Café especial',
    description: 'Cómprate un café en tu lugar favorito ☕',
    icon: '☕',
  },
  {
    id: 'cinema',
    name: 'Noche de cine',
    description: 'Ve al cine y disfruta de una película 🎬',
    icon: '🎬',
  },
  {
    id: 'dinner',
    name: 'Cena especial',
    description: 'Cena en ese restaurante que querías 🍽️',
    icon: '🍽️',
  },
  {
    id: 'spa',
    name: 'Día de spa',
    description: 'Relajate con un masaje o spa 💆',
    icon: '💆',
  },
  {
    id: 'games',
    name: 'Videojuego nuevo',
    description: 'Compra ese juego que querías 🎮',
    icon: '🎮',
  },
  {
    id: 'book',
    name: 'Libro que deseas',
    description: 'Lee ese libro que estabas esperando 📚',
    icon: '📚',
  },
];

export class FinancialService {
  static getData(): FinancialData {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_DATA;
  }

  static saveData(data: FinancialData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  static addTransaction(transaction: Omit<Transaction, 'id'>): FinancialData {
    const data = this.getData();
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    data.transactions.push(newTransaction);
    this.saveData(data);
    return data;
  }

  static deleteTransaction(id: string): FinancialData {
    const data = this.getData();
    data.transactions = data.transactions.filter(t => t.id !== id);
    this.saveData(data);
    return data;
  }

  static calculateStatus(): FinancialStatus {
    const data = this.getData();
    const totalIncome = data.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = data.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalSavings = totalIncome - totalExpenses;

    const totalCreditUsage = data.creditCards.reduce((sum, card) => sum + card.balance, 0);
    const totalCreditLimit = data.creditCards.reduce((sum, card) => sum + card.limit, 0);
    const creditCardUsage = totalCreditLimit > 0 ? (totalCreditUsage / totalCreditLimit) * 100 : 0;

    const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;
    const healthScore = Math.min(100, savingsRate + (100 - creditCardUsage));

    let emoji = '😢';
    let message = 'Necesitas mejorar tu situación financiera';

    if (healthScore >= 80) {
      emoji = '🤑';
      message = '¡Vas excelente! Eres muy disciplinado financieramente';
    } else if (healthScore >= 60) {
      emoji = '😊';
      message = 'Vas bien, sigue ahorrando y mantén el control';
    } else if (healthScore >= 40) {
      emoji = '😐';
      message = 'Necesitas revisar tus gastos y crear un presupuesto';
    } else if (healthScore >= 20) {
      emoji = '😟';
      message = 'Debes actuar ahora para mejorar tus finanzas';
    }

    return {
      totalIncome,
      totalExpenses,
      totalSavings,
      creditCardUsage,
      healthScore: Math.round(healthScore),
      emoji,
      message,
    };
  }

  static updateGoal(goalId: string, currentAmount: number): FinancialData {
    const data = this.getData();
    const goal = data.goals.find(g => g.id === goalId);

    if (goal) {
      goal.currentAmount = currentAmount;

      if (currentAmount >= goal.targetAmount) {
        const rewardIndex = Math.floor(Math.random() * REWARDS_LIBRARY.length);
        const baseReward = REWARDS_LIBRARY[rewardIndex];
        const reward: Reward = {
          ...baseReward,
          id: `${baseReward.id}-${Date.now()}`,
          unlockedAt: new Date().toISOString(),
        };

        data.unlockedRewards.push(reward);
      }

      this.saveData(data);
    }

    return data;
  }

  static getUnlockedRewards(): Reward[] {
    const data = this.getData();
    return data.unlockedRewards;
  }

  static resetData(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
