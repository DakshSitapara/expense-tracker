import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

  const categoryColors: Record<string, string> = {
    Food: "bg-green-100 dark:bg-green-900",
    Travel: "bg-blue-100 dark:bg-blue-900",
    Shopping: "bg-pink-100 dark:bg-pink-900",
    Entertainment: "bg-yellow-100 dark:bg-yellow-900",
    Other: "bg-gray-200 dark:bg-gray-800",
  };
  function getCategoryColor(category: string | undefined) {
    return category ? categoryColors[category] || "bg-gray-100 dark:bg-gray-700" : "bg-gray-100 dark:bg-gray-700";
  }

  export { getCategoryColor };
