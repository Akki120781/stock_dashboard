"use client";

import React from "react";
import Navbar from "@/components/common/Navbar";
import FooterTapedComponent from "@/components/ui/footer-taped-design";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-[#050812] text-white isolate flex flex-col font-sans">
      {/* Scrollable content wrapper */}
      <div className="relative flex-grow z-10 bg-[#050812] overflow-x-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] pb-12">
        {/* Structural fine grid overlay */}
        <div className="absolute inset-0 fine-grid opacity-[0.18] pointer-events-none z-0" />
        
        {/* Background glow spotlights */}
        <div className="absolute top-[-25%] left-[-15%] w-[60rem] h-[60rem] bg-blue-950/15 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-[-25%] right-[-15%] w-[60rem] h-[60rem] bg-cyan-950/20 rounded-full blur-3xl pointer-events-none z-0" />

        <Navbar />
        
        <main className="relative pt-20 pb-4 px-3 sm:px-4 lg:px-6 z-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Sticky Reveal Footer */}
      <div className="sticky bottom-0 -z-10 w-full bg-[#050812]">
        <FooterTapedComponent />
      </div>
    </div>
  );
}
