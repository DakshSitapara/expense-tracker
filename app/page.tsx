import Link from "next/link"
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="items-center">
      <Link href="/login">
      <Button>login</Button>
      </Link>
      <Link href="/register">
      <Button>register</Button>
      </Link>
      <Link href="/expense-tracker">
      <Button>Expense Tracker</Button>
      </Link>
    </div>
  );
}
