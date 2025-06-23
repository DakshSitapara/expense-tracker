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
import {ChevronLeft, ChevronRight} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterExpense from "@/components/filter-expense";

export default function ExpenseTracker() {
  const router = useRouter();

  const [showAddForm, setShowAddForm] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [deleteExpense, setDeleteExpense] = useState<Expense | null>(null);
  const [editExpense, setEditExpense] = useState<Expense | null>(null);
  const [username, setUsername] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const maxRows = expenses.length;
  const pageOptions = [5, 10, 20, 50].filter(opt => opt < maxRows);
    if (!pageOptions.includes(maxRows) && maxRows > 0) pageOptions.push(maxRows);

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
    const updated = [expense, ...expenses];
    setExpenses(updated);
    setFilteredExpenses(updated);
    setShowAddForm(false);
  };

  const handleDeleteExpense = (expense: Expense) => {
    closeAllModals();
    setDeleteExpense(expense);
  };

  const handleExpenseDelete = () => {
    if (deleteExpense) {
      const updated = expenses.filter(exp => exp.id !== deleteExpense.id);
      setExpenses(updated);
      setFilteredExpenses(updated);
      toast.success(`${deleteExpense.title} deleted`);
      setDeleteExpense(null);
    }
  };

  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((total, exp) => total + exp.amount, 0);
  }, [filteredExpenses]);

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success(`${username} logged out`);
    router.push("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUsername(JSON.parse(storedUser).name);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const stored = localStorage.getItem(`expenses_${username}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setExpenses(parsed);
      setFilteredExpenses(parsed);
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      localStorage.setItem(`expenses_${username}`, JSON.stringify(expenses));
    }
  }, [expenses, username]);

  useEffect(() => {
  setCurrentPage(1);
}, [filteredExpenses, itemsPerPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 transition">
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 shadow-md backdrop-blur-sm">
        <div className="max-w-10xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Welcome, <span className="text-primary dark:text-primary-light">{username}</span>
          </h1>
          <div className="flex items-center gap-3">
            <Button onClick={handleAddExpenseClick}>+ Add Expense</Button>
            <Button variant="destructive" onClick={handleLogout}>Logout</Button>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Expense Dashboard</h2>
        <p className="text-center text-lg font-medium text-gray-600 dark:text-gray-300 mb-8">
          Total Expenses: <span className="text-primary dark:text-primary-light">₹{totalExpenses}</span>
        </p>

        <div className="flex flex-col gap-6 mb-1">
          <FilterExpense expenses={expenses} onFilter={setFilteredExpenses} />
        </div>

          <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredExpenses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-400 dark:text-gray-500">
                      No expenses found.
                    </td>
                  </tr>
                ) : (
                  paginatedExpenses.map((exp, idx) => (
                    <tr key={exp.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                      <td className="px-4 py-3 font-semibold text-primary dark:text-primary-light">₹{exp.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(exp.category || "Other")}`}>
                          {exp.category || "Other"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{exp.title}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{new Date(exp.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 flex justify-center gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button 
                            variant="outline" 
                            size="icon"
                            title="View"
                            onClick={() => setSelectedExpense(exp)}
                            >
                              <FcViewDetails />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 border-none bg-transparent shadow-none w-auto">
                            {selectedExpense?.id === exp.id && (
                              <ViewExpense expense={selectedExpense} />
                            )}
                          </PopoverContent>
                        </Popover>
                        <Button variant="outline" size="icon" onClick={() => handleEditExpense(exp)} title="Edit">
                          <FaRegEdit />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDeleteExpense(exp)} title="Delete">
                          <MdDeleteOutline />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
            {totalPages > 0 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Rows per page:</span>
                  <Select value={String(itemsPerPage)} onValueChange={val => setItemsPerPage(Number(val))}>
                    <SelectTrigger className="w-20" size="sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {pageOptions.map(opt => (
                        <SelectItem key={opt} value={String(opt)}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    title="Previous Page"
                    variant="ghost"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  >
                    <ChevronLeft />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      title={`Page ${i + 1}`}
                      key={i}
                      variant={currentPage === i + 1 ? "outline" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    title="Next Page"
                    variant="ghost"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            )}
      </main>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={handleFormClose}>
          <div onClick={e => e.stopPropagation()}>
            <AddExpenseForm onClose={handleFormClose} onAddExpense={handleAddExpense} />
          </div>
        </div>
      )}

      {/* Edit Form Modal */}
      {editExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={handleEditFormClose}>
          <div onClick={e => e.stopPropagation()}>
            <EditExpenseForm
              onClose={handleEditFormClose}
              onEditExpense={(updated) => {
                const updatedList = expenses.map(exp => exp.id === updated.id ? updated : exp);
                setExpenses(updatedList);
                setFilteredExpenses(updatedList);
                setEditExpense(null);
              }}
              expenseToEdit={editExpense}
            />
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setDeleteExpense(null)}>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-center text-red-600 dark:text-red-400 mb-3">Delete Expense</h3>
            <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete <strong>{deleteExpense.title}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setDeleteExpense(null)}>Cancel</Button>
              <Button variant="destructive" onClick={handleExpenseDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
