"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Expense } from "@/types/expense"
import { cn } from "@/lib/utils"

interface DeleteExpenseModalProps {
  expense?: Expense | null
  open: boolean
  onCancel: () => void
  onDelete: () => void
}

export default function DeleteExpenseForm({
  expense,
  open,
  onCancel,
  onDelete,
  ...props
}: DeleteExpenseModalProps) {
  if (!open || !expense) return null

  return (
    
    <div
        className={cn("flex flex-col gap-6 items-center")}
        {...props}
        onClick={(e) => e.stopPropagation()}
                >
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-red-600 dark:text-red-400">Delete Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 text-center text-gray-700 dark:text-gray-300">
              Are you sure you want to delete <strong>{expense.title}</strong>?
            </div>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={onCancel}>Cancel</Button>
              <Button variant="destructive" onClick={onDelete}>Delete</Button>
            </div>
          </CardContent>
        </Card>
        </div>
  )
}