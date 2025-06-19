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
    <main className="flex min-h-screen flex-col items-center justify-between p-60 ">
        <div className="flex text-9xl font-bold items-center">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
        </div>
          <h1 
          className="font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-300 dark:to-white animate-gradient-x pb-2"
          >
            Expense Tracker
          </h1>
        </div>
    <div className="flex grid-rows-1 gap-3 items-center">
      <Link href="/login">
      <Button>login</Button>
      </Link>
      <Link href="/register">
      <Button>register</Button>
      </Link>
      <Link href="/expense-tracker">
      <Button>Expense Tracker</Button>
      </Link>
    </div>
    </main>
  );  
}
