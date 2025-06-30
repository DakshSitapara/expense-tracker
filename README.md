# Expense Tracker

![Next.js](https://img.shields.io/badge/Next.js-15.x-000000.svg?style=flat-square\&logo=next.js)
![React](https://img.shields.io/badge/React-19.x-61DAFB.svg?style=flat-square\&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=flat-square\&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?style=flat-square\&logo=tailwind-css)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-2.x-000000.svg?style=flat-square\&logo=shadcnui)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)

A modern and intuitive expense tracking application built with **Next.js 15**, **React 19**, and **TypeScript**. This application helps users efficiently manage and monitor their financial expenditures with a clean and responsive user interface.

---

## Table of Contents

* [Features](#features)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Available Scripts](#available-scripts)
* [Project Structure](#project-structure)
* [File Documentation](#file-documentation)
* [Screenshots](#screenshots)
* [Technologies Used](#technologies-used)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* 💸 **Expense Management**: Add, edit, delete, and view expenses with smooth modal transitions.
* 💾 **Persistent Storage**: Automatically saves and loads your data using `localStorage`.
* 🍿 **Category Tags**: Color-coded categories with support for dynamic creation.
* 📅 **Date Picker**: Easily assign dates to expenses with a calendar popover.
* 📊 **Pagination**: View expenses in pages, customizable row count.
* 🌗 **Theme Toggle**: Switch between light and dark themes.
* 🔔 **Toast Notifications**: Real-time feedback for all user actions.
* 📱 **Responsive Design**: Seamlessly works across mobile, tablet, and desktop.
* ⚙️ **Modern Stack**: Built with latest versions of Next.js, React, Tailwind CSS, and ShadCN UI.

---

## Getting Started

### Prerequisites

* **Node.js**: v16 or higher
* **npm** or **yarn**
* **Git**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DakshSitapara/expense-tracker.git
   cd expense-tracker
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env.local
   ```

4. Run the app:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

### Available Scripts

| Script           | Description                |
| ---------------- | -------------------------- |
| `npm run dev`    | Start development server   |
| `npm run build`  | Build app for production   |
| `npm run start`  | Start production server    |
| `npm run lint`   | Check for linting errors   |
| `npm run format` | Format code using Prettier |

---

## Project Structure

```plaintext
expense-tracker/
├── src/
│   ├── app/              # App directory for routes/layouts
│   ├── components/       # Reusable components (forms, modals, UI)
│   ├── lib/              # Utilities and helpers
│   ├── types/            # TypeScript types
│   ├── styles/           # Tailwind/global styles
├── public/               # Static assets (images, screenshots)
├── .env.example          # Example env config
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
├── .eslintrc.js          # ESLint rules
├── .prettierrc           # Prettier formatting config
├── package.json          # Project scripts & dependencies
```

---

## File Documentation

### `src/app/`

| File          | Description                                           |
| ------------- | ----------------------------------------------------- |
| `layout.tsx`  | Root layout with theme providers and global metadata. |
| `page.tsx`    | Main dashboard page with conditional UI rendering.    |
| `globals.css` | Base styles and Tailwind imports.                     |

### `src/components/`

| File                    | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| `AddExpenseForm.tsx`    | Form with `react-hook-form` and `zod` for adding expenses. |
| `EditExpenseForm.tsx`   | Modal for editing selected expense with validation.        |
| `ViewExpense.tsx`       | Popover/Modal to view detailed expense info.               |
| `DeleteExpenseForm.tsx` | Confirmation dialog before deleting expense.               |
| `SidebarFilter.tsx`     | UI to filter expenses by category, price, date, etc.       |
| `Pagination.tsx`        | Handles pagination logic and page controls.                |
| `Navbar.tsx`            | Top navigation bar with branding and theme toggle.         |
| `ThemeToggle.tsx`       | Toggle button for switching light/dark themes.             |

### `src/lib/`

| File         | Description                                         |
| ------------ | --------------------------------------------------- |
| `utils.ts`   | Reusable utility functions (e.g., currency format). |
| `storage.ts` | Helpers for saving/loading data from localStorage.  |

### `src/types/`

| File         | Description                               |
| ------------ | ----------------------------------------- |
| `expense.ts` | Type definitions for Expense and filters. |

---

## 🛠️ Technologies Used

* [Next.js 15](https://nextjs.org/)
* [React 19](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Shadcn UI](https://ui.shadcn.dev/)
* [Zod](https://zod.dev/)
* [React Hook Form](https://react-hook-form.com/)
* [Lucide Icons](https://lucide.dev/)
* [clsx](https://github.com/lukeed/clsx)

---

## 🚀 Deployment

### Vercel

This app is optimized for [Vercel](https://vercel.com/):

1. Push your project to GitHub.
2. Import into [Vercel Dashboard](https://vercel.com/dashboard).
3. Add required environment variables.
4. Deploy via Git or Vercel CLI.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork this repository
2. Create a new branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to your branch: `git push origin feature/my-feature`
5. Open a pull request

---

## 📆 Repository

Check out the full project on GitHub:
👉 **[DakshSitapara/expense-tracker](https://github.com/DakshSitapara/expense-tracker)**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
