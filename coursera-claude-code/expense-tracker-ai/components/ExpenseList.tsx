'use client';

import { Expense } from '@/types/expense';
import { formatCurrency, formatDate } from '@/lib/utils';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

const categoryColors: { [key: string]: string } = {
  Food: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Transportation: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Entertainment: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Shopping: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  Bills: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};

export default function ExpenseList({ expenses, onDelete, onEdit }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg">No expenses found</p>
        <p className="text-sm mt-2">Start by adding your first expense above</p>
      </div>
    );
  }

  const sortedExpenses = [...expenses].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="mt-4 space-y-3">
      {sortedExpenses.map((expense) => (
        <div
          key={expense.id}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[expense.category]}`}>
                {expense.category}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(expense.date)}
              </span>
            </div>
            <p className="text-gray-800 dark:text-gray-200 font-medium">{expense.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(expense.amount)}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(expense)}
                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors duration-200"
                aria-label={`Edit ${expense.description}`}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this expense?')) {
                    onDelete(expense.id);
                  }
                }}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition-colors duration-200"
                aria-label={`Delete ${expense.description}`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
