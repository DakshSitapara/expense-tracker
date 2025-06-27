'use client'

import {useState, useEffect} from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button";

export default function Home() {

//   useEffect(() => {
//   if(typeof window !== "undefined"){
//     const storedUsername = localStorage.getItem("currentUser");
//     if (storedUsername) {
//       window.location.href = "/expense-tracker";
//     }
//   }
// })
const [username, setUsername] = useState<string>("");
const [islogine, setIslogine] = useState<boolean>(false);
const colors = [
  "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-green-500",
  "bg-emerald-500", "bg-teal-500", "bg-cyan-500", "bg-sky-500", "bg-blue-500",
  "bg-indigo-500", "bg-violet-500", "bg-purple-500", "bg-fuchsia-500", "bg-pink-500",
  "bg-rose-500", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-lime-400",
  "bg-green-400", "bg-emerald-400", "bg-teal-400", "bg-cyan-400", "bg-sky-400", "bg-blue-400",
  "bg-indigo-400", "bg-violet-400", "bg-purple-400", "bg-fuchsia-400", "bg-pink-400",
  "bg-rose-400", "bg-red-300", "bg-orange-300", "bg-yellow-300", "bg-lime-300",
  "bg-green-300", "bg-emerald-300", "bg-teal-300", "bg-cyan-300", "bg-sky-300", "bg-blue-300",
  "bg-indigo-300", "bg-violet-300", "bg-purple-300", "bg-fuchsia-300", "bg-pink-300",
  "bg-rose-300", "bg-red-200", "bg-orange-200", "bg-yellow-200", "bg-lime-200",
  "bg-green-200", "bg-emerald-200", "bg-teal-200", "bg-cyan-200", "bg-sky-200", "bg-blue-200",
  "bg-indigo-200", "bg-violet-200", "bg-purple-200", "bg-fuchsia-200", "bg-pink-200",
  "bg-rose-200", "bg-red-100", "bg-orange-100", "bg-yellow-100", "bg-lime-100",
  "bg-green-100", "bg-emerald-100", "bg-teal-100", "bg-cyan-100", "bg-sky-100", "bg-blue-100",
  "bg-indigo-100", "bg-violet-100", "bg-purple-100", "bg-fuchsia-100", "bg-pink-100",
  "bg-rose-100",   
];

const getInitial = (name: string) => name.charAt(0).toUpperCase();

function getColor(): string {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

useEffect(() => {
  if(typeof window !== "undefined"){
    const storedUsername = localStorage.getItem("currentUser");
    if (storedUsername) {
      setUsername(JSON.parse(storedUsername).name);
    }
  }
})

useEffect(() => {
  if(typeof window !== "undefined"){
    const storedUsername = localStorage.getItem("currentUser");
    if (storedUsername) {
      setIslogine(true);
    }
  }
})

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-2 py-6 sm:px-4 md:px-16 lg:px-24">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[120px] w-[120px] sm:h-[180px] sm:w-[180px] md:h-[310px] md:w-[310px] rounded-full bg-blue-500 opacity-20 blur-[60px] md:blur-[100px]"></div>
        </div>
      {islogine && (
        <div className={`flex flex-col-1 absolute top-2 right-2 z-50 mt-1`}>
          <Button size={"icon"} className={`w-8 h-8 rounded-full items-center justify-center ${getColor()}`}>
          <Link href="/expense-tracker">
            {getInitial(username)}
          </Link>
          </Button>
        </div>
      )}
      <div className="relative flex flex-col items-center w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white animate-gradient-x pb-2 text-center">
          Track your Expense with <span className="font-bold" />
        </h1>
        <h1
          className="font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white animate-gradient-x pb-2 text-3xl sm:text-5xl md:text-7xl lg:text-9xl text-center"
        >
          Expense Tracker
        </h1>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 items-center p-4 w-full max-w-xs sm:max-w-md">
        <Link href="/login" className="flex-1 w-full">
          <Button className="w-full bg-blue-900 rounded-xl py-4 text-base sm:py-6 sm:text-lg font-semibold shadow-md transition hover:scale-105 hover:bg-blue-600">
            Login
          </Button>
        </Link>
        <Link href="/register" className="flex-1 w-full">
          <Button className="w-full bg-green-900 rounded-xl py-4 text-base sm:py-6 sm:text-lg font-semibold shadow-md transition hover:scale-105 hover:bg-green-600">
            Register
          </Button>
        </Link>
        <Link href="https://github.com/DakshSitapara/expense-tracker" className="flex-1 w-full">
          <Button className="w-full bg-gray-900 rounded-xl py-4 text-base sm:py-6 sm:text-lg font-semibold shadow-md transition hover:scale-105 hover:bg-gray-700">
            Git Hub
          </Button>
        </Link>
      </div>
    </main>
  ); 
}
