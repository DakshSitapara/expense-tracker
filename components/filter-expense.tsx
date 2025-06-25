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
      filtered = filtered.filter(exp => selectedCategories.includes(exp.category));
    }

    if (dateRange.from) {
      filtered = filtered.filter(exp =>
        isAfter(parseISO(exp.date), dateRange.from!) ||
        format(parseISO(exp.date), "yyyy-MM-dd") === format(dateRange.from!, "yyyy-MM-dd")
      );
    }

    if (dateRange.to) {
      filtered = filtered.filter(exp =>
        isBefore(parseISO(exp.date), dateRange.to!) ||
        format(parseISO(exp.date), "yyyy-MM-dd") === format(dateRange.to!, "yyyy-MM-dd")
      );
    }

    if (selectedRanges.length > 0) {
      filtered = filtered.filter(exp =>
        selectedRanges.some(rangeId => {
          const range = predefinedRanges.find(r => r.id === rangeId);
          return range && exp.amount >= range.from && exp.amount <= range.to;
        })
      );
    }

    onFilter(filtered);
  }, [selectedCategories, dateRange, selectedRanges, expenses, onFilter]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
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
      {/* Category Filter */}
      <div className="flex flex-col space-y-1">
        <label className="text-xs font-medium">Category</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-44 justify-between truncate bg-transparent">
              <TagIcon className="mr-2 h-4 w-4" />
              {selectedCategories.length > 0
                ? selectedCategories.join(", ")
                : "Select category"}
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

      {/* Price Filter */}
      <div className="flex flex-col space-y-1">
        <label className="text-xs font-medium">Price Range</label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-44 justify-between truncate bg-transparent">
              <FilterIcon className="mr-2 h-4 w-4" />
              {selectedRanges.length > 0
                ? predefinedRanges
                    .filter(r => selectedRanges.includes(r.id))
                    .map(r => r.label)
                    .join(", ")
                : "Select price range"}
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

      {/* Date Range Picker */}
      <div className="flex flex-col space-y-1">
        <label className="text-xs font-medium">Date Range</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-56 justify-start text-left font-normal truncate  bg-transparent"
              type="button"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from && dateRange.to
                ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                : "Pick a date range"}
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

      {/* Reset Button */}
      <div className="h-10 flex items-end">
        <Button
          title="Reset filters"
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-4 w-4" /> 
        </Button>
      </div>
    </form>
  );
}
