"use client";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function DarkModeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        // On mount, check localStorage or system preference
        const saved = localStorage.getItem("theme");
        if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
            setDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setDark(false);
        }
    }, []);

    let toastId: string | undefined;

    const toggle = () => {
        if (toastId) {
            toast.dismiss(toastId);
        }
        if (dark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDark(false);
            toastId = toast("☀️ Light mode enabled");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDark(true);
            toastId = toast("🌙 Dark mode enabled");
        }
    };

    return (
        <>
            <button
                onClick={toggle}
                className="rounded px-3 py-1 transition"
                aria-label="Toggle dark mode"
                type="button"
            >
                {dark ? "🌙" : "☀️"}
            </button>
        </>
    );
}
