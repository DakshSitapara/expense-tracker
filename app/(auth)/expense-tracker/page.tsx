'use client';

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { Expense } from "@/types/expense";
import {MoreVertical} from "lucide-react";
import { IoIosLogOut } from "react-icons/io";
import { FcAddDatabase } from "react-icons/fc";

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

  const pageOptions = [5, 10];

  const totalExpenses = useMemo(
    () => filteredExpenses.reduce((total, exp) => total + exp.amount, 0),
    [filteredExpenses]
  );

  const totalExpensesCount = useMemo(
    () => filteredExpenses.length,
    [filteredExpenses]
  )
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      const updated = expenses.filter(exp => exp.id !== deleteExpense.id);
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

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[180px] w-[180px] sm:h-[250px] sm:w-[250px] md:h-[310px] md:w-[310px] rounded-full opacity-20 blur-[80px] md:blur-[100px]"></div>
      </div>

      <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 shadow-md backdrop-blur-sm">
        <div className="max-w-10xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Welcome, <span className="text-primary dark:text-primary-light">{username}</span>
          </h1>
          <div className="flex items-center gap-3">
            <Button onClick={handleAddExpenseClick} className="flex items-center gap-2" title="Add Expense">
              <FcAddDatabase />
              <span className="hidden sm:inline">Add Expense</span>
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="flex items-center gap-2" title="Logout">
              <IoIosLogOut />
              <span className="hidden sm:inline">Logout</span>
            </Button>
            <DarkModeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-2 items-center">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-1">Expense Dashboard</h2>
        <p className="text-center text-lg font-medium text-gray-600 dark:text-gray-300">
          Total Amount: <span className="text-primary dark:text-primary-light">₹{totalExpenses}</span> 
          &nbsp;| Total Expenses: <span className="text-primary dark:text-primary-light">{totalExpensesCount}</span>
        </p>

        <div className="flex flex-col gap-6 mb-1">
          <FilterExpense expenses={expenses} onFilter={setFilteredExpenses} />
        </div>

        <div className="max-w-2xl mx-auto bg-transparent dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="px-2 py-1 text-left">#</TableHead>
                <TableHead className="px-2 py-1 text-left">Amount</TableHead>
                <TableHead className="px-2 py-1 text-left">Category</TableHead>
                <TableHead className="px-2 py-1 text-left">Title</TableHead>
                <TableHead className="px-2 py-1 text-left">Date</TableHead>
                <TableHead className="px-2 py-1 text-left">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
            {loading ? (
              Array.from({ length: itemsPerPage }).map((_, idx) => (
                <TableRow key={idx}>
                  {Array.from({ length: 6 }).map((_, col) => (
                    <TableCell key={col} className="px-2 py-1">
                      <Skeleton className="h-9 w-full rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredExpenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-400 dark:text-gray-500">
                  No expenses found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedExpenses.map((exp, idx) => (
                <TableRow key={exp.id}>
                  <TableCell className="px-2 py-1">{(currentPage - 1) * itemsPerPage + idx + 1}</TableCell>
                  <TableCell className="px-2 py-1 font-semibold text-primary dark:text-primary-light">₹{exp.amount}</TableCell>
                  <TableCell className="px-2 py-1">
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(exp.category || "Other")}`}>
                      {exp.category || "Other"}
                    </span>
                  </TableCell>
                  <TableCell className="px-2 py-1 text-gray-700 dark:text-gray-300">{exp.title}</TableCell>
                  <TableCell className="px-2 py-1 text-gray-600 dark:text-gray-400">{new Date(exp.date).toLocaleDateString()}</TableCell>
                  <TableCell className="px-2 py-1">
                      <div className="flex items-center gap-2">
                        <Popover
                          open={popoverOpen[exp.id]}
                          onOpenChange={(open) => setPopoverOpen({ ...popoverOpen, [exp.id]: open })}
                        >                          
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" title="Actions">
                              <MoreVertical />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            align="end"
                            side="right"
                            className="p-0 items-center bg-transparent shadow-none border-none flex flex-row gap-2"
                          >

                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  title="View Details"
                                  onClick={() => setSelectedExpense(exp)}
                                >
                                  <FcViewDetails />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="p-0 border-none bg-transparent shadow-none w-auto">
                                {selectedExpense?.id === exp.id && <ViewExpense expense={selectedExpense} />}
                              </PopoverContent>
                            </Popover>

                            <Button
                              variant="outline"
                              size="icon"
                              title="Edit Expense"
                              onClick={() => handleEditExpense(exp)}
                            >
                              <FaRegEdit />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              title="Copy Details"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  `You spent ₹${exp.amount} on "${exp.title}" on ${new Date(exp.date).toLocaleDateString()}.`
                                );
                                toast.success(
                                  <span>
                                    <span className="font-semibold text-primary dark:text-primary-light">Copied!</span>
                                    <br />
                                    <span className="text-gray-700 dark:text-gray-200">
                                      You spent <span className="font-bold">₹{exp.amount}</span> on
                                      <span className="italic"> {exp.title}</span> on
                                      <span className="font-mono"> {format(new Date(exp.date), "MMMM d, yyyy")}</span>.
                                    </span>
                                  </span>
                                );
                              }}
                            >
                              <LuClipboardCopy />
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              title="Delete Expense"
                              onClick={() => handleDeleteExpense(exp)}
                            >
                              <MdDeleteOutline />
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
        {totalPages > 0 && (
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2 py-4">
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
                    className="bg-transparent"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={handleDeleteExpenseClose}>
          <div onClick={e => e.stopPropagation()}>
            <DeleteExpenseForm
              expense={deleteExpense}
              open={!!deleteExpense}
              onCancel={() => setDeleteExpense(null)}
              onDelete={handleExpenseDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}