"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#020617] text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Navbar openAuth={() => {}} />
      <main className="flex-grow pt-20">
        {children}
      </main>
    </div>
  );
}
