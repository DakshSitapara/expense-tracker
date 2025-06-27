## `lib/utils.ts`

This file contains general utility functions used across the application, primarily for handling CSS class names and providing category-specific styling.

### `cn` Function

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- **Purpose**: A utility function that conditionally joins Tailwind CSS classes and merges them efficiently. It combines the functionalities of `clsx` (for conditional class application) and `tailwind-merge` (for resolving conflicting Tailwind classes).
- **Usage**: Useful for building dynamic class strings in React components, ensuring that Tailwind CSS classes are applied correctly without conflicts.

### `categoryColors` Constant

```typescript
const categoryColors: Record<string, string> = {
  Food: "bg-gradient-to-r from-lime-400 to-emerald-500",
  Travel: "bg-gradient-to-r from-sky-400 to-cyan-500",
  Shopping: "bg-gradient-to-r from-rose-400 to-pink-500",
  Entertainment: "bg-gradient-to-r from-indigo-400 to-purple-500",
  Other: "bg-gradient-to-r from-gray-400 to-zinc-500"
};
```

- **Purpose**: An object that maps predefined expense categories to specific Tailwind CSS gradient background classes. This provides a consistent visual theme for different expense types.

### `getCategoryColor` Function

```typescript
function getCategoryColor(category: string | undefined) {
  return category
    ? categoryColors[category] ||
        "bg-zinc-400"
    : "bg-zinc-400";
}

export { getCategoryColor };
```

- **Purpose**: A helper function that retrieves the appropriate background color class for a given expense category. If the category is not found in `categoryColors` or is undefined, it defaults to a neutral gray background.
- **Parameters**:
    - `category`: A string representing the expense category (e.g., "Food", "Travel"). Can be `undefined`.
- **Returns**: A string containing the Tailwind CSS class for the category's background color.
