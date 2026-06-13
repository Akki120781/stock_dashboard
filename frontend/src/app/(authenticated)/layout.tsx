"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#050812] text-white overflow-x-hidden font-sans">
      {/* Structural fine grid overlay */}
      <div className="absolute inset-0 fine-grid opacity-[0.18] pointer-events-none z-0" />
      
      {/* Background glow spotlights */}
      <div className="absolute top-[-25%] left-[-15%] w-[60rem] h-[60rem] bg-indigo-950/25 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-[-25%] right-[-15%] w-[60rem] h-[60rem] bg-cyan-950/20 rounded-full blur-3xl pointer-events-none z-0" />

      <Navbar />
      
      <main className="relative flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 z-10 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
