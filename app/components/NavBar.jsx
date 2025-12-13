"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const isApp = pathname.startsWith("/app") || pathname.startsWith("/dashboard");

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-950/70 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-extrabold tracking-tight text-lg">
            Aiexor
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100">
            AI Logo Generator
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {!isApp && (
            <Link href="/app" className="text-sm font-medium hover:underline">
              Launch App
            </Link>
          )}
          <Link href="/dashboard" className="text-sm font-medium hover:underline">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
