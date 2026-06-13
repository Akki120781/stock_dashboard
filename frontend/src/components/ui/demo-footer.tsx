import React from "react";
import FooterTapedComponent from "@/components/ui/footer-taped-design";

export default function DemoFooter() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] py-20 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-display font-extrabold text-slate-900 mb-4">
          Footer Taped Design
        </h1>
        <p className="text-slate-600 max-w-md mx-auto">
          This is a preview of the taped footer style for BullTrade, featuring custom branding, links, and clean tape graphics.
        </p>
      </div>
      <FooterTapedComponent />
    </div>
  );
}
