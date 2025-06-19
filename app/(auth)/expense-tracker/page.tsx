'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AddExpenseForm } from "@/components/add-expense-from";
import ViewExpense from "@/components/view-expense";  
import type { Expense } from "@/types/expense";
import { getCategoryColor } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DarkModeToggle from "@/components/dark-mode-toggle";

export default function ExpenseTracker() {
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [deleteExpense, setDeleteExpense] = useState<Expense | null>(null);
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("currentUser");
      if (storedUsername) {
        setUsername(JSON.parse(storedUsername).name);
      } else {
        router.push("/login");
      }
    }
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem("username") || "";
    setUsername(storedUsername);

    if (storedUsername) {
      const storedExpenses = localStorage.getItem(`expenses_${storedUsername}`);
      if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
      }
    }
  }, []);

  useEffect(() => {
    if (username) {
      localStorage.setItem(`expenses_${username}`, JSON.stringify(expenses));
    }
  }, [expenses, username]);

  const handleAddExpenseClick = () => setShowForm(true);
  const handleFormClose = () => setShowForm(false);

  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
    setShowForm(false);
  };

  const handleExpenseClick = (expense: Expense) => setSelectedExpense(expense);
  const handleViewClose = () => setSelectedExpense(null);

  const handleDeleteExpense = (expense: Expense) => {
    setDeleteExpense(expense);
    setSelectedExpense(null);
  };

  const handleExpenseDelete = () => {
    if (deleteExpense) {
      setExpenses(prev => prev.filter(exp => exp.id !== deleteExpense.id));
      setDeleteExpense(null);
      toast.success(`${deleteExpense.title} deleted from List`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success(`${username} Logout successful!`);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative transition-colors">
      <nav className="bg-white dark:bg-gray-800 shadow sticky top-0 z-10 transition-colors">
        <div className="flex h-16 items-center text-2xl font-bold justify-between mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            {username && (
              <span className="text-base font-normal text-gray-500 dark:text-gray-300">
                Welcome, <span className="font-semibold text-primary dark:text-primary-light">{username}</span>
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <Button onClick={handleAddExpenseClick}>
              + Add Expense
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
            >
              Log Out
            </Button>
            <DarkModeToggle />
          </div>
        </div>
      </nav>
      <div className="flex flex-col mt-10 px-2 transition-all duration-300 items-center">
        <section className="w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 text-center">Expenses</h2>
          <div className="text-center text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
            Total Expenses: ₹ {expenses.reduce((total, exp) => total + exp.amount, 0)}
          </div>
          {expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 py-16">
              <svg
                className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-400 dark:text-gray-500 text-lg text-center">
                No expenses yet.<br />
                <span className="font-semibold text-primary dark:text-primary-light">
                  Click &quot;<span onClick={handleAddExpenseClick}>+ Add Expense&quot;</span>
                </span> to get started!
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {expenses.map(exp => (
                <li key={exp.id}>
                  <button
                    className={`
                      w-full rounded-xl shadow flex flex-row items-center justify-between border border-gray-100 dark:border-gray-700
                      hover:brightness-95 dark:hover:brightness-110 transition p-4 focus:outline-none
                      ${getCategoryColor(exp.category || "Uncategorized")}
                    `}
                    onClick={() => handleExpenseClick(exp)}
                  >
                    <div>
                      <div className="font-semibold text-lg text-gray-900 dark:text-gray-100">{exp.title}</div>
                      <div className="text-gray-700 dark:text-gray-300 text-xs mt-1">
                        {exp.category || "Uncategorized"}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-primary dark:text-primary-light font-bold text-lg">₹ {exp.amount}</span>
                      <span className="text-gray-800 dark:text-gray-200 text-xs">{new Date(exp.date).toLocaleDateString()}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md">
            <AddExpenseForm
              onClose={handleFormClose}
              onAddExpense={handleAddExpense}
            />
          </div>
        </div>
      )}
      {selectedExpense && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm">
          <ViewExpense
            expense={selectedExpense}
            onClose={handleViewClose}
            onDelete={() => handleDeleteExpense(selectedExpense)}
          />
        </div>
      )}
      {deleteExpense && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-2 text-center text-red-600 dark:text-red-400">Delete Expense</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-200">
              Are you sure you want to delete <span className="font-semibold">{deleteExpense.title}</span>?
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setDeleteExpense(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleExpenseDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}