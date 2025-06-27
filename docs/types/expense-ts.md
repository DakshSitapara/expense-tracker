## `types/expense.ts`

This file defines the TypeScript type definition for an `Expense` object within the application. It ensures type safety and consistency across the codebase when handling expense-related data.

### `Expense` Type

```typescript
export type Expense = {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
};
```

#### Properties:

- `id`: A unique identifier for the expense (string).
- `title`: A brief description or name of the expense (string).
- `amount`: The monetary value of the expense (number).
- `date`: The date when the expense occurred (string, typically in ISO format or a consistent date string format).
- `category`: The category to which the expense belongs (string, e.g., "Food", "Transport", "Utilities").
