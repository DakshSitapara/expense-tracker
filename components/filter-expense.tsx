'use client';

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Expense } from "@/types/expense";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { enIN } from "date-fns/locale/en-IN";
import { CalendarIcon, FilterIcon, TagIcon, RotateCcw, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DateRange } from "react-day-picker";
import { getCategoryColor } from "@/lib/utils";

interface FilterExpenseProps {
  expenses: Expense[];
  onFilter: (filtered: Expense[]) => void;
}

export default function FilterExpense({ expenses, onFilter }: FilterExpenseProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({ from: undefined, to: undefined });
  const [selectedRanges, setSelectedRanges] = useState<string[]>([]);

  const categories = Array.from(new Set(expenses.map(expense => expense.category)));

  const predefinedRanges = [
    { id: "0-100", label: "₹0 - ₹100", from: 0, to: 100 },
    { id: "100-500", label: "₹100 - ₹500", from: 100, to: 500 },
    { id: "500-1000", label: "₹500 - ₹1000", from: 500, to: 1000 },
    { id: "1000+", label: "₹1000+", from: 1000, to: Infinity },
  ];

  
const priceRangeColors: Record<string, string> = {
  "0-100": "bg-gradient-to-r from-blue-400 to-blue-600",
  "100-500": "bg-gradient-to-r from-green-400 to-green-600",
  "500-1000": "bg-gradient-to-r from-teal-400 to-teal-600",
  "1000+": "bg-gradient-to-r from-purple-400 to-purple-600"
};

function getPriceRangeColor(rangeId: string | undefined) {
  return rangeId
    ? priceRangeColors[rangeId] || "bg-zinc-400"
    : "bg-zinc-400";
}

const dateRangeColor = "bg-gradient-to-r from-orange-400 to-orange-600";

  const dateRangeLabel = useMemo(() => {
    if (dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "d MMM yyyy", { locale: enIN })} - ${format(dateRange.to, "d MMM yyyy", { locale: enIN })}`;
    }
    if (dateRange.from) {
      return `From ${format(dateRange.from, "d MMM yyyy", { locale: enIN })}`;
    }
    if (dateRange.to) {
      return `To ${format(dateRange.to, "d MMM yyyy", { locale: enIN })}`;
    }
    return null;
  }, [dateRange]);

  useEffect(() => {
    let filtered = [...expenses];

    if (selectedCategories.length) {
      filtered = filtered.filter(expenses => selectedCategories.includes(expenses.category));
    }

    if (dateRange.from || dateRange.to) {
      filtered = filtered.filter(expense => {
        const expenseDate = parseISO(expense.date);
        const from = dateRange.from;
        const to = dateRange.to;

        const isAfterFrom = from ? expenseDate >= from : true;
        const isBeforeTo = to ? expenseDate <= to : true;

        return isAfterFrom && isBeforeTo;
      });
    }

    if (selectedRanges.length) {
      filtered = filtered.filter(expense => {
        return selectedRanges.some(rangeId => {
          const range = predefinedRanges.find(range => range.id === rangeId);
          return range && expense.amount >= range.from && expense.amount <= range.to;
        });
      });
    }

    onFilter(filtered);
  }, [selectedCategories, dateRange, selectedRanges, expenses, onFilter]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]
    );
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedRanges(prev =>
      prev.includes(id) ? prev.filter(range => range !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setDateRange({ from: undefined, to: undefined });
    setSelectedRanges([]);
    onFilter(expenses);
  };

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(prev => prev.filter(cat => cat !== category));
  };

  const handleRemoveRange = (id: string) => {
    setSelectedRanges(prev => prev.filter(range => range !== id));
  };

  const handleRemoveDateRange = () => {
    setDateRange({ from: undefined, to: undefined });
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
              title={selectedCategories.length > 0 ? selectedCategories.join(", ") : "Select category"}
            >
              <TagIcon className="h-5 w-5" />
              <span className="hidden sm:inline mx-auto">
                {selectedCategories.length > 0
                  ? selectedCategories.join(", ")
                  : "Select category"}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-52">
            {categories.map(categorie => (
              <DropdownMenuCheckboxItem
                key={categorie}
                checked={selectedCategories.includes(categorie)}
                onCheckedChange={() => handleCategoryChange(categorie)}
                className="capitalize"
              >
                {categorie}
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
              title={selectedRanges.length > 0 ? predefinedRanges
                .filter(range => selectedRanges.includes(range.id))
                .map(range => range.label)
                .join(", ") : "Select price range"}
            >
              <FilterIcon className="h-5 w-5" />
              <span className="hidden sm:inline mx-auto">
                {selectedRanges.length > 0
                  ? predefinedRanges
                    .filter(range => selectedRanges.includes(range.id))
                    .map(range => range.label)
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
              title={dateRange.from && dateRange.to
                ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                : "Pick a date range"}
              variant="outline"
              className="w-10 justify-center bg-transparent sm:w-56 sm:justify-start sm:text-left sm:font-normal sm:truncate"
              type="button"
            >
              <CalendarIcon className="h-5 w-5" />
              <span className="hidden sm:inline mx-auto">
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

      <div className="h-10 flex items-end gap-2 flex-wrap">
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

      <div className="flex flex-wrap gap-2 w-full sm:w-1/2">
        {selectedCategories.map(category => (
          <Badge key={`category-${category}`} variant="secondary" className={`px-2 py-1 flex items-center gap-1 ${getCategoryColor(category)}`}>
            <span className="sr-only">Category filter: </span>
            {category}
            <button
              type="button"
              aria-label={`Remove ${category} filter`}
              className="ml-1 hover:text-red-500"
              onClick={() => handleRemoveCategory(category)}
            >
              <X className="h-4 w-4" />
            </button>
          </Badge>
        ))}
        {selectedRanges.map(rangeId => {
          const range = predefinedRanges.find(r => r.id === rangeId);
          return range ? (
            <Badge key={`range-${rangeId}`} variant="secondary" className={`px-2 py-1 flex items-center gap-1 ${getPriceRangeColor(range.id)}`}>
              <span className="sr-only">Price range filter: </span>
              {range.label}
              <button
                type="button"
                aria-label={`Remove ${range.label} filter`}
                className="ml-1 hover:text-red-500"
                onClick={() => handleRemoveRange(rangeId)}
              >
                <X className="h-4 w-4" />
              </button>
            </Badge>
          ) : null;
        })}
        {dateRangeLabel && (
          <Badge variant="secondary" className={`px-2 py-1 flex items-center gap-1 ${dateRangeColor}`}>
            <span className="sr-only">Date range filter: </span>
            {dateRangeLabel}
            <button
              type="button"
              aria-label="Remove date range filter"
              className="ml-1 hover:text-red-500"
              onClick={handleRemoveDateRange}
            >
              <X className="h-4 w-4" />
            </button>
          </Badge>
        )}
      </div>
    </form>
  );
}