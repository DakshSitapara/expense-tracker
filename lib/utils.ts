import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const categoryColors: Record<string, string> = {
  Food: "bg-teal-400",
  Travel: "bg-purple-300",
  Shopping: "bg-orange-300",
  Entertainment: "bg-lime-200",
  Other: "bg-zinc-400",
};

function getCategoryColor(category: string | undefined) {
  return category
    ? categoryColors[category] ||
        "bg-zinc-400"
    : "bg-zinc-400";
}

  export { getCategoryColor };
