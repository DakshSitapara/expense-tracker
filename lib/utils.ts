import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

  const categoryColors: Record<string, string> = {
    Food: "bg-green-100",
    Travel: "bg-blue-100",
    Shopping: "bg-pink-100",
    Entertainment: "bg-yellow-100",
    Other: "bg-gray-200",
  };
  function getCategoryColor(category: string | undefined) {
    return category ? categoryColors[category] || "bg-gray-100" : "bg-gray-100";
  }

  export { getCategoryColor };
