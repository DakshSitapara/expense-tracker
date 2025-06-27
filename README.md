# Next.js Starter Kit

![Next.js](https://img.shields.io/badge/Next.js-15.x-000000.svg?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)

A modern, lightweight, and production-ready boilerplate for building scalable web applications with **Next.js**, **TypeScript**, and **Tailwind CSS**. This starter kit is designed to streamline your development process with pre-configured tools and best practices.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [File Documentation](#file-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Next.js 15**: Utilize the latest App Router, Server Components, and performance optimizations.
- **TypeScript**: Type-safe development for enhanced code reliability.
- **Tailwind CSS**: Rapid UI development with a utility-first CSS framework.
- **ESLint & Prettier**: Enforce consistent code quality and formatting.
- **Husky & Lint-Staged**: Pre-commit hooks for clean code.
- **Environment Variables**: Secure configuration with `.env` support.
- **SEO Ready**: Built-in metadata and SEO best practices.
- **Vercel Optimized**: Seamless deployment to Vercel.

## Getting Started

### Prerequisites

- **Node.js**: v16 or higher
- **npm** or **yarn**: Package manager
- **Git**: Version control

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DakshSitapara/next.js-starter_kit.git
   cd next.js-starter_kit
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
   Edit `.env.local` to add your API keys or other settings.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Script          | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Starts the development server            |
| `npm run build` | Builds the app for production            |
| `npm run start` | Runs the production server               |
| `npm run lint`  | Checks code for linting issues           |
| `npm run format`| Formats code with Prettier               |

## Project Structure

```plaintext
next.js-starter_kit/
├── src/
│   ├── app/            # App Router (pages, layouts)
│   ├── components/     # Reusable React components
│   ├── styles/         # Global and Tailwind CSS
│   ├── lib/            # Utility functions
│   ├── types/          # TypeScript definitions
├── public/             # Static assets (images, favicon)
├── .eslintrc.js        # ESLint configuration
├── .prettierrc         # Prettier configuration
├── .husky/             # Git hooks
├── .env.example        # Environment variable template
├── next.config.js      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies and scripts
```

## File Documentation

### `src/app/`

| File            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `layout.tsx`    | Root layout for the app, defining global structure, metadata, and styles.   |
| `page.tsx`      | Default homepage component rendered at the root route (`/`).                |
| `globals.css`   | Global CSS with Tailwind imports and custom styles.                         |

### `src/components/`

| File            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `Header.tsx`    | Reusable header component for navigation.                                   |
| `Footer.tsx`    | Reusable footer component for the app.                                      |

### `src/styles/`

| File            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `tailwind.css`  | Custom Tailwind CSS configurations and additional styles.                   |

### `src/lib/`

| File            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `utils.ts`      | Utility functions for API calls, data formatting, or other helpers.         |

### `src/types/`

| File            | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `index.ts`      | TypeScript type definitions for the application.                            |

### `public/`

| File/Folder     | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `favicon.ico`   | Application favicon displayed in browser tabs.                              |
| `images/`       | Directory for static images and other assets.                               |

### Root Files

| File              | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `.eslintrc.js`    | ESLint config with Airbnb rules for code quality.                           |
| `.prettierrc`     | Prettier config for consistent code formatting.                             |
| `.husky/pre-commit` | Git hook to run linting and formatting before commits.                     |
| `.env.example`    | Template for environment variables (e.g., API keys).                        |
| `next.config.js`  | Next.js configuration for image optimization, env vars, etc.                |
| `tsconfig.json`   | TypeScript compiler options for the project.                                |
| `package.json`    | Project metadata, dependencies, and scripts.                                |

## Deployment

Optimized for **Vercel**, but compatible with any Next.js-compatible hosting provider.

### Vercel Deployment

1. Push the repository to GitHub.
2. Connect the repository to a new Vercel project.
3. Add environment variables in Vercel’s dashboard.
4. Deploy via Vercel’s CLI or Git integration.

See [Next.js Deployment Docs](https://nextjs.org/docs/deployment) for details.

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

Ensure code adheres to linting and formatting rules.

## License

Licensed under the [MIT License](LICENSE).