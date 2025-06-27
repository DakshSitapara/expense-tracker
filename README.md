# Expense Tracker

A modern and intuitive expense tracking application built with Next.js 15, React 19, and TypeScript. This application helps users efficiently manage and monitor their financial expenditures with a clean and responsive user interface.

## ✨ Features

- **Intuitive Expense Management**: Easily add, view, and categorize your expenses.
- **User Authentication**: Secure login and registration flows.
- **Responsive Design**: Seamless experience across various devices, from desktop to mobile.
- **Data Visualization (Planned)**: Future enhancements to include charts and graphs for financial insights.
- **Modern UI Components**: Built with Radix UI and styled with Tailwind CSS for a polished look and feel.

## 🚀 Technologies Used

This project leverages a powerful stack of modern web technologies:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/)
- **Schema Validation**: [Zod](https://zod.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)
- **Date Handling**: [date-fns](https://date-fns.org/) and [React Day Picker](https://react-day-picker.js.org/)
- **Table Management**: [@tanstack/react-table](https://tanstack.com/table/v8)
- **Unique IDs**: [uuid](https://www.npmjs.com/package/uuid)
- **Utility Libraries**: `clsx` and `tailwind-merge` for conditional styling.
- **Deployment**: Optimized for [Vercel](https://vercel.com/).

## 🛠️ Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js (v18.x or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Development Server

To start the development server with hot-reloading:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

This will create an optimized build in the `.next` directory.

### Running in Production Mode

To start the application in production mode after building:

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

## 📂 Project Structure

```
.
├── app/                  # Next.js App Router pages and layouts
│   ├── (no-auth)/        # Pages accessible without authentication (login, register)
│   ├── (hybrid)/         # Pages accessible with or without authentication
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout for the application
├── components/           # Reusable React components
│   ├── ui/               # Shadcn/ui components (button, card, etc.)
│   ├── add-expense-form.tsx # Component for adding new expenses
│   └── view-expense.tsx  # Component for viewing expense details
├── hooks/                # Custom React hooks
│   └── use-mobile.ts     # Hook to detect mobile view
├── lib/                  # Utility functions
│   └── utils.ts          # General utility functions
├── types/                # TypeScript type definitions
│   └── expense.ts        # Type definitions for expense objects
├── public/               # Static assets
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── package-lock.json     # Dependency lock file
└── README.md             # Project README (this file)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## 📄 License

This project is licensed under the MIT License.
