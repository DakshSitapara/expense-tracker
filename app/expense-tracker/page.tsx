'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddExpenseForm } from "@/components/add-expense-from";
import ViewExpense from "@/components/view-expense";
import type { Expense } from "@/types/expense";

export default function ExpenseTracker() {
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  const handleAddExpenseClick = () => setShowForm(true);
  const handleFormClose = () => setShowForm(false);

  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
    setShowForm(false);
  };

  const handleExpenseClick = (expense: Expense) => setSelectedExpense(expense);
  const handleViewClose = () => setSelectedExpense(null);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <nav className="bg-white shadow sticky top-0 z-10">
        <div className="flex h-16 items-center text-2xl font-bold justify-between mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-primary">Expense Tracker</h1>
          <Button onClick={handleAddExpenseClick}>
            + Add Expense
          </Button>
        </div>
      </nav>
      <div className={`flex flex-col mt-10 px-2 transition-all duration-300`}>
        <section className="w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Expenses</h2>
          {expenses.length === 0 ? (
            <div className="text-gray-400 text-center py-12">
              No expenses yet. Click <span className="font-semibold">+ Add Expense</span> to get started!
            </div>
          ) : (
            <ul className="space-y-4">
              {expenses.map(exp => (
                <li key={exp.id}>
                  <Button
                    className="w-1/3 text-left bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-row items-center justify-between border border-gray-100 hover:bg-gray-50"
                    onClick={() => handleExpenseClick(exp)}
                  >
                    <div>
                      {/* <div className="font-semibold text-lg text-primary">{exp.title}</div> */}
                      <div className="text-gray-500 text-sm">{exp.category || "Uncategorized"}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-primary font-bold text-lg">₹ {exp.amount}</span>
                      {/* <span className="text-gray-400 text-xs">{new Date(exp.date).toLocaleDateString()}</span> */}
                    </div>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <AddExpenseForm
              onClose={handleFormClose}
              onAddExpense={handleAddExpense}
            />
          </div>
        </div>
      )}
      {selectedExpense && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <ViewExpense expense={selectedExpense} onClose={handleViewClose} />
        </div>
      )}
    </div>
  );
}