import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { Expense } from "@/types/expense";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

interface AddExpenseFormProps extends React.ComponentProps<"div"> {
  onClose?: () => void;
  onAddExpense?: (expense: Expense) => void;
}

export function AddExpenseForm({
  className,
  onClose,
  onAddExpense,
  ...props
}: AddExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !date) return;
    if (onAddExpense) {
      onAddExpense({
        id: Date.now().toString(),
        title: title.trim(),
        amount: parseFloat(amount),
        date,
        category: category.trim(),
      });
    }
    setTitle("");
    setAmount("");
    setDate(new Date().toISOString().split('T')[0]);
    setCategory("");
    if (onClose) onClose();
    toast.success(`${title} add in List`)
  };

  return (
    <div className={cn("flex flex-col gap-6 items-center", className)} {...props}>
      <Card className="w-[80%]">
        <CardHeader>
          <CardTitle className="text-center">Add Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-3">   
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Expense title"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="amount">Amount</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  min={0}
                  step="1"
                  placeholder="₹ 0"
                  required 
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  value={date}
                  onChange={e => setDate(e.target.value)} 
                />
              </div>
              <div  className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Travel">Travel</SelectItem>
                      <SelectItem value="Shopping">Shopping</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              </div>
              <div className="flex flex-row gap-3">
                <Button
                  variant="outline"
                  className="w-1/2"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2">
                  Add Expense
                </Button>
              </div>
            </div>         
          </form>
        </CardContent>
      </Card>
    </div>
  );
}