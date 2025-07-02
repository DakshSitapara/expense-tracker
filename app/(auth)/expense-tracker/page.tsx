'use client';

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { AddExpenseForm } from "@/components/add-expense-form";
import { EditExpenseForm } from "@/components/edit-expense-form";
import ViewExpense from "@/components/view-expense";
import DeleteExpenseForm from "@/components/delete-expense-form";
import FilterExpense from "@/components/filter-expense";
import DarkModeToggle from "@/components/dark-mode-toggle";
import { getCategoryColor } from "@/lib/utils";
import { MdDeleteOutline } from "react-icons/md";
import { FcViewDetails } from "react-icons/fc";
import { FaRegEdit } from "react-icons/fa";
import { LuClipboardCopy } from "react-icons/lu";
import toast from "react-hot-toast";
import { format } from "date-fns";
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
import {
  Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { Expense } from "@/types/expense";
import { MoreVertical } from "lucide-react";
import { IoIosLogOut } from "react-icons/io";
import { FcAddDatabase } from "react-icons/fc";

const ExpenseChart = dynamic(() => import('@/components/ExpenseChart'), { ssr: false });

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
  const [loading, setLoading] = useState(true);
  const [popoverOpen, setPopoverOpen] = useState<{ [key: string]: boolean }>({});
  const [isMobile, setIsMobile] = useState(false);

  const pageOptions = useMemo(() => {
    const len = filteredExpenses.length;
    const options = [5];
    if (len > 5) options.push(10);
    if (len > 15) options.push(20);
    if (len > 25) options.push(30);
    if (len > 40) options.push(50);
    if (len > 60) options.push(100);
    return options;
  }, [filteredExpenses.length]);

  const totalExpenses = useMemo(
    () => filteredExpenses.reduce((total, expense) => total + expense.amount, 0),
    [filteredExpenses]
  );

  const totalExpensesCount = useMemo(
    () => filteredExpenses.length,
    [filteredExpenses]
  );
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const paginatedExpenses = useMemo(() => filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ), [filteredExpenses, currentPage, itemsPerPage]);

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
    setLoading(true);
    const updated = [expense, ...expenses];
    setExpenses(updated);
    setFilteredExpenses(updated);
    setShowAddForm(false);
    setTimeout(() => setLoading(false), 300);
  };

  const handleDeleteExpenseClose = () => setDeleteExpense(null);

  const handleDeleteExpense = (expense: Expense) => {
    setPopoverOpen({ ...popoverOpen, [expense.id]: false });
    closeAllModals();
    setDeleteExpense(expense);
  };

  const handleExpenseDelete = () => {
    if (deleteExpense) {
      const updated = expenses.filter(expense => expense.id !== deleteExpense.id);
      setExpenses(updated);
      setFilteredExpenses(updated);
      toast.success(`${deleteExpense.title} deleted`);
      setDeleteExpense(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success(`${username} logged out`);
    router.push("/login");
  };

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 640);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUsername(JSON.parse(storedUser).name);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    setLoading(true);
    if (!username) return;
    const stored = localStorage.getItem(`expenses_${username}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      setExpenses(parsed);
      setFilteredExpenses(parsed);
    }
    setTimeout(() => setLoading(false), 300);
  }, [username]);

  useEffect(() => {
    if (username) {
      localStorage.setItem(`expenses_${username}`, JSON.stringify(expenses));
    }
  }, [expenses, username]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredExpenses, itemsPerPage]);

  if (!username) return null;

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-[100px]"></div>
      </div>

      <header className="sticky top-0 z-30 bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome, <span className="text-primary dark:text-primary-light">{username}</span>
          </h1>
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleAddExpenseClick} 
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300" 
              title="Add Expense"
            >
              <FcAddDatabase className="h-5 w-5" />
              <span className="hidden sm:inline">Add Expense</span>
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLogout} 
              className="flex items-center gap-2 hover:bg-red-700 transition-all duration-300" 
              title="Logout"
            >
              <IoIosLogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-2">Expense Dashboard</h2>
          <p className="text-center text-lg font-medium text-gray-600 dark:text-gray-300">
            Total Amount: <span className="text-primary dark:text-primary-light font-semibold">₹{totalExpenses.toFixed(2)}</span> 
             | Total Expenses: <span className="text-primary dark:text-primary-light font-semibold">{totalExpensesCount}</span>
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Left Side: Filter and Table */}
          <motion.div 
            className="lg:w-1/2 flex flex-col gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {expenses.length > 0 && (
              <div className="flex justify-end">
                <FilterExpense expenses={expenses} onFilter={setFilteredExpenses} />
              </div>
            )}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-700">
                    <TableHead className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">#</TableHead>
                    <TableHead className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Amount</TableHead>
                    <TableHead className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Category</TableHead>
                    <TableHead className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Title</TableHead>
                    <TableHead className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Date</TableHead>
                    <TableHead className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {loading ? (
                    Array(itemsPerPage).fill(0).map((_, i) => (
                      <TableRow key={i}>
                        {Array(6).fill(0).map((_, j) => (
                          <TableCell key={j} className="px-4 py-3">
                            <Skeleton className="h-8 w-full rounded-md" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : !filteredExpenses.length ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        {expenses.length ? 'No expenses found.' : 'Start adding expenses to track your spending.'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedExpenses.map((expense, idx) => (
                      <TableRow 
                        key={expense.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        <TableCell className="px-4 py-3">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                        <TableCell className="px-4 py-3 font-semibold text-primary dark:text-primary-light">₹{expense.amount.toFixed(2)}</TableCell>
                        <TableCell className="px-4 py-3">
                          <span className={`text-xs px-3 py-1 rounded-full font-medium text-white ${getCategoryColor(expense.category || "Other")}`}>
                            {expense.category || "Other"}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">{expense.title}</TableCell>
                        <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-400">{format(new Date(expense.date), "dd MMM yyyy")}</TableCell>
                        <TableCell className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Popover
                              open={popoverOpen[expense.id]}
                              onOpenChange={(open) => setPopoverOpen({ ...popoverOpen, [expense.id]: open })}
                            >
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" title="Actions" className="hover:bg-gray-200 dark:hover:bg-gray-600">
                                  <MoreVertical className="h-5 w-5" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                align="end"
                                side={isMobile ? "bottom" : "right"}
                                className={isMobile
                                  ? "p-2 border-none max-w-none bg-transparent shadow-none flex flex-col gap-2 w-auto"
                                  : "p-2 border-none max-w-none bg-transparent shadow-none flex flex-row gap-2 w-auto"}
                              >
                                <Button
                                  variant="outline"
                                  size="icon"
                                  title="View Details"
                                  onClick={() => setSelectedExpense(expense)}
                                  className="hover:bg-blue-100 dark:hover:bg-blue-900"
                                >
                                  <FcViewDetails className="h-5 w-5" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  title="Edit Expense"
                                  onClick={() => handleEditExpense(expense)}
                                  className="hover:bg-blue-100 dark:hover:bg-blue-900"
                                >
                                  <FaRegEdit className="h-5 w-5" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  title="Copy Details"
                                  aria-label="Copy expense details to clipboard"
                                  onClick={async () => {
                                    try {
                                      await navigator.clipboard.writeText(
                                        `You spent ₹${expense.amount.toFixed(2)} on "${expense.title}" on ${format(
                                          new Date(expense.date),
                                          "MMMM d, yyyy"
                                        )}.`
                                      );
                                      toast.success(
                                        <span>
                                          <span className="font-semibold text-primary dark:text-primary-light">Copied!</span>
                                          <br />
                                          <span className="text-gray-700 dark:text-gray-200">
                                            You spent <span className="font-bold">₹{expense.amount.toFixed(2)}</span> on
                                            <span className="italic"> {expense.title}</span> on
                                            <span className="font-mono"> {format(new Date(expense.date), "MMMM d, yyyy")}</span>.
                                          </span>
                                        </span>
                                      );
                                    } catch (err) {
                                      toast.error("Failed to copy to clipboard");
                                    }
                                  }}
                                  className="hover:bg-blue-100 dark:hover:bg-blue-900"
                                >
                                  <LuClipboardCopy className="h-5 w-5" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  title="Delete Expense"
                                  onClick={() => handleDeleteExpense(expense)}
                                  className="hover:bg-red-100 dark:hover:bg-red-900"
                                >
                                  <MdDeleteOutline className="h-5 w-5" />
                                </Button>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalExpensesCount > 5 && totalPages > 0 && (
              <div className="w-full flex flex-col items-center gap-4 py-6 mt-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Rows per page:</span>
                  <Select 
                    value={String(itemsPerPage)} 
                    onValueChange={(val) => {
                      setItemsPerPage(Number(val));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger title={`Show ${itemsPerPage} rows per page`} className="w-20 shadow-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-20">
                      {pageOptions.map(opt => (
                        <SelectItem key={opt} value={String(opt)}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        title="Go to previous page"
                        aria-label="Go to previous page"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className={`rounded-md ${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setCurrentPage(i + 1)}
                        disabled={currentPage === i + 1}
                        className="rounded-md"
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        title="Go to next page"
                        aria-label="Go to next page"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className={`rounded-md ${currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </motion.div>

          {/* Right Side: Chart */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {expenses.length > 0 ? (
              <div className="p-6">
                <ExpenseChart expenses={filteredExpenses} />
              </div>
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                No expenses to display in chart.
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleFormClose}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AddExpenseForm onClose={handleFormClose} onAddExpense={handleAddExpense} />
            </motion.div>
          </motion.div>
        )}

        {selectedExpense && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedExpense(null)}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ViewExpense expense={selectedExpense} />
            </motion.div>
          </motion.div>
        )}

        {editExpense && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleEditFormClose}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EditExpenseForm
                onClose={handleEditFormClose}
                onEditExpense={(updated) => {
                  const updatedList = expenses.map(expense => expense.id === updated.id ? updated : expense);
                  setExpenses(updatedList);
                  setFilteredExpenses(updatedList);
                  setEditExpense(null);
                }}
                expenseToEdit={editExpense}
              />
            </motion.div>
          </motion.div>
        )}

        {deleteExpense && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleDeleteExpenseClose}
          >
            <motion.div
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DeleteExpenseForm
                expense={deleteExpense}
                open={!!deleteExpense}
                onCancel={() => setDeleteExpense(null)}
                onDelete={handleExpenseDelete}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}