"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import toast from "react-hot-toast"
import type { Expense } from "@/types/expense"
import { useEffect } from "react"

const FormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    amount: z
        .string()
        .min(1, "Amount is required")
        .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
            message: "Amount must be a valid number greater than or equal to 0",
        }),
    date: z.date({ required_error: "Date is required" }),
    category: z.string().min(1, "Category is required"),
})

interface EditExpenseFormProps extends React.ComponentProps<"div"> {
    onClose?: () => void;
    onEditExpense?: (expense: Expense) => void;
    expenseToEdit?: Expense | null;
}

export function EditExpenseForm({
    className,
    onClose,
    onEditExpense,
    expenseToEdit,
    ...props
}: EditExpenseFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            amount: "",
            date: new Date(),
            category: "Other",
        },
    });

    useEffect(() => {
        if (expenseToEdit) {
            form.reset({
                title: expenseToEdit.title.trim(),
                amount: expenseToEdit.amount.toString(),
                date: new Date(expenseToEdit.date),
                category: expenseToEdit.category?.trim() || "Other",
            });
        }
    }, [expenseToEdit, form]);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (onEditExpense && expenseToEdit) {
            onEditExpense({
                ...expenseToEdit,
                title: data.title.trim(),
                amount: parseFloat(data.amount),
                date: format(data.date, "yyyy-MM-dd"),
                category: data.category.trim(),
            });

                const changes: string[] = [];

                if (expenseToEdit.title.trim() !== data.title.trim()) {
                changes.push(`title: "${expenseToEdit.title}" → "${data.title}"`);
                }

                if (expenseToEdit.amount !== parseFloat(data.amount)) {
                changes.push(`amount: ${expenseToEdit.amount} → ${data.amount}`);
                }

                const formattedDate = format(data.date, "yyyy-MM-dd");
                if (expenseToEdit.date !== formattedDate) {
                changes.push(`date: ${expenseToEdit.date} → ${formattedDate}`);
                }

                const oldCategory = expenseToEdit.category?.trim() || "Other";
                if (oldCategory !== data.category.trim()) {
                changes.push(`category: ${oldCategory} → ${data.category}`);
                }

                if (changes.length > 0) {
                toast.success(`"${data.title}" updated: ${changes.join(", ")}`);
                } else {
                toast.success("No changes made.");
                }

        }
        form.reset();
        if (onClose) onClose();
    }

    return (
        <Form {...form}>
            <div
                className={cn("flex flex-col gap-6 items-center", className)}
                {...props}
                onClick={(e) => e.stopPropagation()}
            >
                <Card className="w-[90%]">
                    <CardHeader>
                        <CardTitle className="text-center">Edit Expense</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Expense title" {...field} autoFocus />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    min={0}
                                                    step="1"
                                                    placeholder="₹ 0"
                                                    inputMode="decimal"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={
                                                            field.value instanceof Date && !isNaN(field.value.getTime())
                                                                ? field.value
                                                                : undefined
                                                        }
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("2000-01-01")
                                                        }
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select 
                                                value={field.value} 
                                                onValueChange={field.onChange}
                                                key={field.value}
                                            >
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a Category" />
                                                    </SelectTrigger>
                                                </FormControl>
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
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex flex-row gap-3 justify-end">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Form>
    )
}