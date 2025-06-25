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
      <div className="flex flex-col-1 gap-2 absolute top-2 right-2 z-50 mt-1">
        <Link href="/expense-tracker">
          {username}
        </Link>
      </div>
      <div className="relative flex flex-col items-center w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white animate-gradient-x pb-2 text-center">
          Track your Expense with <span className="font-bold" />
        </h1>
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[120px] w-[120px] sm:h-[180px] sm:w-[180px] md:h-[310px] md:w-[310px] rounded-full bg-blue-500 opacity-20 blur-[60px] md:blur-[100px]"></div>
        </div>
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
