import React from "react";
import { cn } from "@/lib/utils";

export function BullLogo({ className, ...props }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-red-600 fill-red-600", className)}
      {...props}
    >
      {/* Left Horn: Thick, powerful curved shape sweeping outward then upward */}
      <path d="M 32,38 C 22,34 6,18 12,2 C 20,16 30,24 35,32 Z" />
      
      {/* Right Horn: Thick, powerful curved shape sweeping outward then upward */}
      <path d="M 68,38 C 78,34 94,18 88,2 C 80,16 70,24 65,32 Z" />
      
      {/* Upper Head Crest (Forehead) */}
      <path d="M 32,32 C 40,36 60,36 68,32 L 67,48 C 67,48 50,56 33,48 Z" />
      
      {/* Strong, square jaw and muzzle (Main Face) */}
      <path d="M 28,42 H 72 L 64,80 H 36 Z" />
      
      {/* Nostrils/Muzzle bottom block */}
      <path d="M 40,78 H 60 L 58,88 H 42 Z" fill="#991b1b" />
      
      {/* Angry Eyes (glow white/yellow) */}
      <polygon points="35,52 47,58 45,61 33,55" fill="white" />
      <polygon points="65,52 53,58 55,61 67,55" fill="white" />
    </svg>
  );
}
