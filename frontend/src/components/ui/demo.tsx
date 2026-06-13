"use client";

import React from "react";
import { BrandScroller, BrandScrollerReverse } from "@/components/ui/brand-scoller";

export const DemoOne = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full max-w-4xl mx-auto py-10">
      <BrandScroller />
      <div className="h-4" />
      <BrandScrollerReverse />
    </div>
  );
};

export default DemoOne;
