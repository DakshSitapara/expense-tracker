import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const categoryColors: Record<string, string> = {
  Food: "bg-gradient-to-br from-lime-900 via-emerald-600 to-teal-400 dark:from-lime-800 dark:via-emerald-500 dark:to-teal-300",
  Travel: "bg-gradient-to-br from-indigo-900 via-indigo-600 to-purple-400 dark:from-indigo-800 dark:via-indigo-500 dark:to-purple-300",
  Shopping: "bg-gradient-to-br from-red-900 via-rose-600 to-orange-400 dark:from-red-800 dark:via-rose-500 dark:to-orange-300",
  Entertainment: "bg-gradient-to-br from-yellow-900 via-amber-600 to-lime-300 dark:from-yellow-800 dark:via-amber-500 dark:to-lime-200",
  Other: "bg-gradient-to-br from-slate-800 via-gray-500 to-zinc-300 dark:from-slate-900 dark:via-gray-600 dark:to-zinc-400",
};

function getCategoryColor(category: string | undefined) {
  return category
    ? categoryColors[category] ||
        "bg-gradient-to-br from-slate-800 via-gray-500 to-zinc-300 dark:from-slate-900 dark:via-gray-600 dark:to-zinc-400"
    : "bg-gradient-to-br from-slate-800 via-gray-500 to-zinc-300 dark:from-slate-900 dark:via-gray-600 dark:to-zinc-400";
}

  export { getCategoryColor };
