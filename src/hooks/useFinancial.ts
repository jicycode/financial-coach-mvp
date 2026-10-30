import { useState, useEffect, useCallback } from 'react';
import { FinancialData, FinancialStatus, Transaction } from '../types';
import { FinancialService } from '../services/financialService';

export function useFinancial() {
  const [data, setData] = useState<FinancialData>(FinancialService.getData());
  const [status, setStatus] = useState<FinancialStatus>(FinancialService.calculateStatus());

  const refreshStatus = useCallback(() => {
    setStatus(FinancialService.calculateStatus());
  }, []);

  useEffect(() => {
    refreshStatus();
  }, [data, refreshStatus]);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
    const newData = FinancialService.addTransaction(transaction);
    setData(newData);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    const newData = FinancialService.deleteTransaction(id);
    setData(newData);
  }, []);

  const updateGoal = useCallback((goalId: string, amount: number) => {
    const newData = FinancialService.updateGoal(goalId, amount);
    setData(newData);
  }, []);

  return {
    data,
    status,
    addTransaction,
    deleteTransaction,
    updateGoal,
  };
}
