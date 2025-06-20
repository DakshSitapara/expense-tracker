import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

  const categoryColors: Record<string, string> = {
    Food: "bg-gradient-to-r from-green-900 via-green-500 to-green-200 dark:from-green-900 dark:via-green-700 dark:to-green-500",
    Travel: "bg-gradient-to-r from-blue-900 via-blue-500 to-blue-200 dark:from-blue-900 dark:via-blue-700 dark:to-blue-500",
    Shopping: "bg-gradient-to-r from-pink-900 via-pink-500 to-pink-200 dark:from-pink-900 dark:via-pink-700 dark:to-pink-500",
    Entertainment: "bg-gradient-to-r from-yellow-900 via-yellow-500 to-yellow-200 dark:from-yellow-900 dark:via-yellow-700 dark:to-yellow-500",
    Other: "bg-gradient-to-r from-gray-700 via-gray-400 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500",
  };
  function getCategoryColor(category: string | undefined) {
    return category
      ? categoryColors[category] ||
          "bg-gradient-to-r from-gray-700 via-gray-400 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500"
      : "bg-gradient-to-r from-gray-700 via-gray-400 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500";
  }

  export { getCategoryColor };
