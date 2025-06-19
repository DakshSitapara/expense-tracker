// 'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button";
// import { useEffect } from "react";

export default function Home() {

//   useEffect(() => {
//   if(typeof window !== "undefined"){
//     const storedUsername = localStorage.getItem("currentUser");
//     if (storedUsername) {
//       window.location.href = "/expense-tracker";
//     }
//   }
// })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:px-8 md:px-16 lg:px-24">
      <div className="relative flex flex-col items-center w-full">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[180px] w-[180px] sm:h-[250px] sm:w-[250px] md:h-[310px] md:w-[310px] rounded-full bg-blue-500 opacity-20 blur-[80px] md:blur-[100px]"></div>
        </div>
        <h1
          className="font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white animate-gradient-x pb-2 text-4xl sm:text-6xl md:text-7xl lg:text-9xl text-center"
        >
          Expense Tracker
        </h1>
      </div>
      <div className="flex flex-col-3 items-center gap-4 p-10">
        <Link href="/login" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">Login</Button>
        </Link>
        <Link href="/register" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">Register</Button>
        </Link>
        <Link href="/expense-tracker" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">Expense Tracker</Button>
        </Link>
      </div>
    </main>
  ); 
}
