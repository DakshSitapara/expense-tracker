'use client';

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AddExpenseForm } from "@/components/add-expense-form";
import ViewExpense from "@/components/view-expense";
import type { Expense } from "@/types/expense";
import { getCategoryColor } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import DarkModeToggle from "@/components/dark-mode-toggle";
import { EditExpenseForm } from "@/components/edit-expense-form";
import { MdDeleteOutline } from "react-icons/md";
import { FcViewDetails } from "react-icons/fc";
import { FaRegEdit } from "react-icons/fa";

export default function ExpenseTracker() {
  const router = useRouter();

  const [showAddForm, setShowAddForm] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [deleteExpense, setDeleteExpense] = useState<Expense | null>(null);
  const [editExpense, setEditExpense] = useState<Expense | null>(null);
  const [username, setUsername] = useState<string>("");

  const closeAllModals = () => {
    setShowAddForm(false);
    setEditExpense(null);
    setSelectedExpense(null);
    setDeleteExpense(null);
  };

  const handleAddExpenseClick = () => {
    closeAllModals();
    setShowAddForm(true);
  };

  const handleFormClose = () => setShowAddForm(false);

  const handleEditExpense = (expense: Expense) => {
    closeAllModals();
    setEditExpense(expense);
  };

  const handleEditFormClose = () => setEditExpense(null);

  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [expense, ...prev]);
    setShowAddForm(false);
  };

  const handleExpenseClick = (expense: Expense) => {
    closeAllModals();
    setSelectedExpense(expense);
  };

  const handleViewClose = () => setSelectedExpense(null);

  const handleDeleteExpense = (expense: Expense) => {
    closeAllModals();
    setDeleteExpense(expense);
  };

  const handleExpenseDelete = () => {
    if (deleteExpense) {
      setExpenses(prev => prev.filter(exp => exp.id !== deleteExpense.id));
      toast.success(`${deleteExpense.title} deleted from List`);
      setDeleteExpense(null);
    }
  };

    const totalExpenses = useMemo(() => {
    return expenses.reduce((total, exp) => total + exp.amount, 0);
  }, [expenses]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success(`${username} Logout successful!`);
    router.push("/login");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
          setUsername(JSON.parse(storedUser).name);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        toast.error("Failed to access user data");
        router.push("/login");
      }
    }
  }, [router]);

  useEffect(() => {
    if (username) {
      try {
        const storedExpenses = localStorage.getItem(`expenses_${username}`);
        if (storedExpenses) {
          setExpenses(JSON.parse(storedExpenses));
        }
      } catch (error) {
        console.error("Error reading expenses from localStorage:", error);
        toast.error("Failed to load expenses");
      }
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      try {
        localStorage.setItem(`expenses_${username}`, JSON.stringify(expenses));
      } catch (error) {
        console.error("Error saving expenses to localStorage:", error);
        toast.error("Failed to save expenses");
      }
    }
  }, [expenses, username]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <nav className="bg-white/80 dark:bg-gray-900/80 shadow sticky top-0 z-20 backdrop-blur">
        <div className="flex h-16 items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-4">
            {username && (
              <span className="text-base font-medium text-gray-600 dark:text-gray-300">
                Welcome, <span className="font-semibold text-primary dark:text-primary-light">{username}</span>
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <Button onClick={handleAddExpenseClick} className="font-semibold">
              + Add Expense
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
            <DarkModeToggle />
          </div>
        </div>
      </nav>
      <main className="flex flex-col items-center mt-10 px-2">
        <section className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-200 text-center">Expense Tracker</h2>
          <div className="text-center text-lg font-semibold mb-6 text-gray-700 dark:text-gray-200">
            Total Expenses: <span className="text-primary dark:text-primary-light">₹ {totalExpenses}</span>
          </div>
          {expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 py-16">
              <svg className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-400 dark:text-gray-500 text-lg text-center">
                No expenses yet.<br />
                <span className="font-semibold text-primary dark:text-primary-light cursor-pointer" onClick={handleAddExpenseClick}>
                  Click "+ Add Expense" to get started!
                </span>
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-900 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {expenses.map((exp, idx) => (
                    <tr key={exp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{idx + 1}</td>
                      <td className="px-4 py-3 text-primary dark:text-primary-light font-bold">₹ {exp.amount}</td>
                      <td className={`px-4 py-3`}>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getCategoryColor(exp.category || "Other")}`}>
                          {exp.category || "Other"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{exp.title}</td>
                      <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{new Date(exp.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 flex justify-center gap-2">
                        <Button
                          title="View Expense"
                          size="sm"
                          variant="outline"
                          onClick={() => handleExpenseClick(exp)}
                          aria-label="View expense details"
                        >
                          <FcViewDetails />
                        </Button>
                        <Button
                          title="Edit Expense"
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditExpense(exp)}
                          aria-label="Edit expense"
                        >
                          <FaRegEdit />
                        </Button>
                        <Button
                          title="Delete Expense"
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteExpense(exp)}
                          aria-label="Delete expense"
                        >
                          <MdDeleteOutline />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Add Expense Modal */}
      {showAddForm && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm"
          onClick={handleFormClose}
        >
          <div onClick={e => e.stopPropagation()}>
            <AddExpenseForm onClose={handleFormClose} onAddExpense={handleAddExpense} />
          </div>
        </div>
      )}

      {/* Edit Expense Modal */}
      {editExpense && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm"
          onClick={handleEditFormClose}
        >
          <div onClick={e => e.stopPropagation()}>
            <EditExpenseForm
              onClose={handleEditFormClose}
              onEditExpense={(updated) => {
                setExpenses(prev =>
                  prev.map(exp => exp.id === updated.id ? updated : exp)
                );
                setEditExpense(null);
              }}
              expenseToEdit={editExpense}
            />
          </div>
        </div>
      )}

      {/* View Expense Modal */}
      {selectedExpense && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm"
          onClick={handleViewClose}
        >
          <div onClick={e => e.stopPropagation()}>
            <ViewExpense
              expense={selectedExpense}
              onClose={handleViewClose}
              onDelete={() => handleDeleteExpense(selectedExpense)}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteExpense && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm"
          onClick={() => setDeleteExpense(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-sm w-full"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2 text-center text-red-600 dark:text-red-400">Delete Expense</h3>
            <p className="mb-6 text-gray-700 dark:text-gray-200 text-center">
              Are you sure you want to delete <span className="font-semibold">{deleteExpense.title}</span>?
            </p>
            <div className="flex justify-center gap-4 mt-6">
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