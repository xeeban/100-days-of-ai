'use client';

import { useMemo } from 'react';
import { Expense, ExpenseCategory } from '@/types/expense';
import { formatCurrency, getMonthName } from '@/lib/utils';

interface SpendingChartProps {
  expenses: Expense[];
  categoryTotals: { [key in ExpenseCategory]?: number };
}

const categoryColors: { [key: string]: string } = {
  Food: '#10b981',
  Transportation: '#3b82f6',
  Entertainment: '#a855f7',
  Shopping: '#ec4899',
  Bills: '#f97316',
  Other: '#6b7280',
};

export default function SpendingChart({ expenses, categoryTotals }: SpendingChartProps) {
  const monthlyData = useMemo(() => {
    const last6Months: { month: string; amount: number }[] = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === date.getMonth() &&
          expenseDate.getFullYear() === date.getFullYear()
        );
      });

      const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      last6Months.push({
        month: getMonthName(date.getMonth()),
        amount: total,
      });
    }

    return last6Months;
  }, [expenses]);

  const maxAmount = Math.max(...monthlyData.map((d) => d.amount), 1);

  const categoryData = useMemo(() => {
    const total = Object.values(categoryTotals).reduce((sum, amount) => sum + (amount || 0), 0);
    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount: amount || 0,
        percentage: total > 0 ? ((amount || 0) / total) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [categoryTotals]);

  if (expenses.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Monthly Spending (Last 6 Months)
        </h3>
        <div className="space-y-3">
          {monthlyData.map((data, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">{data.month}</span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {formatCurrency(data.amount)}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(data.amount / maxAmount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Spending by Category
        </h3>
        <div className="space-y-3">
          {categoryData.map((data, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">{data.category}</span>
                <span className="font-medium text-gray-800 dark:text-white">
                  {formatCurrency(data.amount)} ({data.percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${data.percentage}%`,
                    backgroundColor: categoryColors[data.category] || '#6b7280',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
