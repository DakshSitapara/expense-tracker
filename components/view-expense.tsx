import { Button } from "@/components/ui/button";
import type { Expense } from "@/types/expense";
import { X } from "lucide-react";
import { getCategoryColor } from "@/lib/utils";

interface ViewExpenseProps {
  expense: Expense;
  onClose: () => void;
  onDelete: () => void;
}

export default function ViewExpense({ expense, onClose, onDelete }: ViewExpenseProps) {
  return (
    <div
      className={`inline-block rounded-lg shadow-lg p-5 min-w-[300px] max-w-md ${getCategoryColor(expense.category)}`}
      aria-label={expense.category}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{expense.title}</h3>
        <Button 
          variant={"ghost"}
          className="size-5" 
          size={"icon"}
          onClick={onClose}><X /></Button>
      </div>
      <div className="space-y-2">
        <p><strong>Amount:</strong> ₹ {expense.amount}</p>
        <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
        {expense.category && (
          <p className="flex items-center gap-2 mt-2">
            <span><strong>Category:</strong> {expense.category}</span>
          </p>
        )}
      </div>
      <Button
        variant={"destructive"}
        className="mt-4 w-full"
        onClick={onDelete}
      >
        Delete
      </Button>
    </div>
  );
}