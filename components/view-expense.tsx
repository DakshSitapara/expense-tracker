import { Button } from "@/components/ui/button";
import type { Expense } from "@/types/expense";

interface ViewExpenseProps {
  expense: Expense;
  onClose: () => void;
}

export default function ViewExpense({ expense, onClose }: ViewExpenseProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] max-w-md">
        <h3 className="text-lg font-bold mb-2">{expense.title}</h3>
        <p><strong>Amount:</strong> ₹ {expense.amount}</p>
        <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
        {expense.category && (
          <p><strong>Category:</strong> {expense.category}</p>
        )}
        <Button className="mt-4 w-full" onClick={onClose}>Close</Button>
        {/* <Button className="mt-4 w-full" onClick={onClose}>Delete</Button> */}
      </div>
    </div>
  );
}