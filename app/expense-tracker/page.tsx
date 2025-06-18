
import { Button } from "@/components/ui/button";

export default function ExpenseTracker() {
  return (
<nav className="bg-accent">
    <div className="flex h-16 items-center text-2xl justify-between mx-auto max-w-11xl px-4 sm:px-6 lg:px-8">
        <h1>Expense Tracker</h1>
        <Button>
            + Add Expense
        </Button>
    </div>
</nav>
  );
}