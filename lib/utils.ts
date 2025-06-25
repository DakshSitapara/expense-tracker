import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const categoryColors: Record<string, string> = {
  Food: "bg-gradient-to-r from-lime-400 to-emerald-500",
  Travel: "bg-gradient-to-r from-sky-400 to-cyan-500",
  Shopping: "bg-gradient-to-r from-rose-400 to-pink-500",
  Entertainment: "bg-gradient-to-r from-indigo-400 to-purple-500",
  Other: "bg-gradient-to-r from-gray-400 to-zinc-500"
};

function getCategoryColor(category: string | undefined) {
  return category
    ? categoryColors[category] ||
        "bg-zinc-400"
    : "bg-zinc-400";
}

  export { getCategoryColor };
