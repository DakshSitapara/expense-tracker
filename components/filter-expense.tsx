'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Expense } from "@/types/expense";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, parseISO, isAfter, isBefore } from "date-fns";
import { CalendarIcon, FilterIcon, TagIcon, RotateCcw } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DateRange } from "react-day-picker";

interface FilterExpenseProps {
  expenses: Expense[];
  onFilter: (filtered: Expense[]) => void;
}

const categories = ["Food", "Travel", "Shopping", "Entertainment", "Other"];

export default function FilterExpense({ expenses, onFilter }: FilterExpenseProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({ from: undefined, to: undefined });
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);

  const predefinedRanges = [
    { id: "0-100", label: "₹0 - ₹100", from: 0, to: 100 },
    { id: "100-500", label: "₹100 - ₹500", from: 100, to: 500 },
    { id: "500-1000", label: "₹500 - ₹1000", from: 500, to: 1000 },
    { id: "1000+", label: "₹1000+", from: 1000, to: Infinity },
  ];

  useEffect(() => {
    let filtered = [...expenses];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(expenses => selectedCategories.includes(expenses.category));
    }

    if (dateRange.from) {
      filtered = filtered.filter(expenses =>
        isAfter(parseISO(expenses.date), dateRange.from!) ||
        format(parseISO(expenses.date), "yyyy-MM-dd") === format(dateRange.from!, "yyyy-MM-dd")
      );
    }

    if (dateRange.to) {
      filtered = filtered.filter(expenses =>
        isBefore(parseISO(expenses.date), dateRange.to!) ||
        format(parseISO(expenses.date), "yyyy-MM-dd") === format(dateRange.to!, "yyyy-MM-dd")
      );
    }

    if (selectedRanges.length > 0) {
      filtered = filtered.filter(expenses =>
        selectedRanges.some(rangeId => {
          const range = predefinedRanges.find(r => r.id === rangeId);
          return range && expenses.amount >= range.from && expenses.amount <= range.to;
        })
      );
    }

    onFilter(filtered);
  }, [selectedCategories, dateRange, selectedRanges, expenses, onFilter]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedRanges(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setDateRange({ from: undefined, to: undefined });
    setSelectedRanges([]);
    onFilter(expenses);
  };

  return (
    <form
      className="flex flex-wrap items-end justify-center gap-4 px-4 py-2"
      onSubmit={e => e.preventDefault()}
    >
      <div className="flex flex-col space-y-1">
      <label className="text-xs font-medium hidden sm:block">Category</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-10 justify-center bg-transparent sm:w-44 sm:justify-between sm:truncate"
        >
          <TagIcon className="h-5 w-5" />
          <span className="hidden sm:inline">
          {selectedCategories.length > 0
            ? selectedCategories.join(", ")
            : "Select category"}
          </span>
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
        {categories.map(cat => (
          <DropdownMenuCheckboxItem
          key={cat}
          checked={selectedCategories.includes(cat)}
          onCheckedChange={() => handleCategoryChange(cat)}
          className="capitalize"
          >
          {cat}
          </DropdownMenuCheckboxItem>
        ))}
        </DropdownMenuContent>
      </DropdownMenu>
      </div>

      <div className="flex flex-col space-y-1">
      <label className="text-xs font-medium hidden sm:block">Price Range</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-10 justify-center bg-transparent sm:w-44 sm:justify-between sm:truncate"
        >
          <FilterIcon className="h-5 w-5" />
          <span className="hidden sm:inline">
          {selectedRanges.length > 0
            ? predefinedRanges
              .filter(r => selectedRanges.includes(r.id))
              .map(r => r.label)
              .join(", ")
            : "Select price range"}
          </span>
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
        {predefinedRanges.map(range => (
          <DropdownMenuCheckboxItem
          key={range.id}
          checked={selectedRanges.includes(range.id)}
          onCheckedChange={() => handleCheckboxChange(range.id)}
          >
          {range.label}
          </DropdownMenuCheckboxItem>
        ))}
        </DropdownMenuContent>
      </DropdownMenu>
      </div>

      <div className="flex flex-col space-y-1">
      <label className="text-xs font-medium hidden sm:block">Date Range</label>
      <Popover>
        <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-10 justify-center bg-transparent sm:w-56 sm:justify-start sm:text-left sm:font-normal sm:truncate"
          type="button"
        >
          <CalendarIcon className="h-5 w-5" />
          <span className="hidden sm:inline">
          {dateRange.from && dateRange.to
            ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
            : "Pick a date range"}
          </span>
        </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange as DateRange}
          onSelect={(range) => setDateRange(range ?? { from: undefined, to: undefined })}
          numberOfMonths={1}
          disabled={(date) => date > new Date()}
        />
        </PopoverContent>
      </Popover>
      </div>

      <div className="h-10 flex items-end">
      <Button
        title="Reset filters"
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleReset}
        className="gap-1 text-sm text-muted-foreground hover:text-foreground w-10 justify-center sm:w-auto"
      >
        <RotateCcw className="h-5 w-5" />
      </Button>
      </div>
    </form>
  );
}
