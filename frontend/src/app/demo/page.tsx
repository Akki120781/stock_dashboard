import DemoOne from "@/components/ui/demo";

export default function Page() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Brand Scroller Demo</h1>
        <p className="text-gray-400 text-sm">Infinite marquee scrolling showing corporate branding of leading global financial institutions.</p>
      </div>
      <DemoOne />
    </div>
  );
}
