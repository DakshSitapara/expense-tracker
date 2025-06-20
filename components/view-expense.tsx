import type { Expense } from "@/types/expense";
import { getCategoryColor } from "@/lib/utils";
import { motion } from "framer-motion";

interface ViewExpenseProps {
  expense: Expense;

}

export default function ViewExpense({ expense }: ViewExpenseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl shadow-md p-4 w-[100px] sm:w-[200px] ${getCategoryColor(expense.category)} border border-white/10 dark:border-white/20 backdrop-blur-sm`}
      aria-label={expense.category}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold">
          {expense.title}
        </h3>
      </div>
      <div className="space-y-1 text-sm">
        <p><strong>Amount:</strong> ₹ {expense.amount}</p>
        <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
        {expense.category && (
          <p><strong>Category:</strong> {expense.category}</p>
        )}
      </div>
    </motion.div>
  );
}
