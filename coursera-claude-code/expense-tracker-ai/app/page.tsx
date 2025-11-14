'use client';

import { useState, useEffect } from 'react';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import Dashboard from '@/components/Dashboard';
import FilterBar from '@/components/FilterBar';
import { Expense, ExpenseCategory } from '@/types/expense';
import { getExpenses, saveExpenses } from '@/lib/storage';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | 'All'>('All');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });

  useEffect(() => {
    const loadedExpenses = getExpenses();
    setExpenses(loadedExpenses);
    setFilteredExpenses(loadedExpenses);
  }, []);

  useEffect(() => {
    let filtered = expenses;

    if (searchTerm) {
      filtered = filtered.filter(expense =>
        expense.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(expense => expense.category === selectedCategory);
    }

    if (dateRange.start) {
      filtered = filtered.filter(expense => expense.date >= dateRange.start);
    }

    if (dateRange.end) {
      filtered = filtered.filter(expense => expense.date <= dateRange.end);
    }

    setFilteredExpenses(filtered);
  }, [expenses, searchTerm, selectedCategory, dateRange]);

  const handleAddExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const handleEditExpense = (updatedExpense: Expense) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Expense Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your personal finances with ease
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Dashboard expenses={expenses} />

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                {editingExpense ? 'Edit Expense' : 'Add New Expense'}
              </h2>
              <ExpenseForm
                onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
                initialData={editingExpense || undefined}
                onCancel={editingExpense ? handleCancelEdit : undefined}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                Expense History
              </h2>
              <FilterBar
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                dateRange={dateRange}
                onSearchChange={setSearchTerm}
                onCategoryChange={setSelectedCategory}
                onDateRangeChange={setDateRange}
                expenses={expenses}
              />
              <ExpenseList
                expenses={filteredExpenses}
                onDelete={handleDeleteExpense}
                onEdit={setEditingExpense}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
