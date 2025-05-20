import { Button } from "@/components/ui/button";

export function NavBar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur border-b border-gray-100 sticky top-0 z-30">
      <div className="flex items-center gap-2 font-bold text-xl text-[#00c9a7]">
        <span role="img" aria-label="book">📖</span> Read-Ease
      </div>
      <Button variant="outline" className="border-[#00c9a7] text-[#00c9a7] hover:bg-[#00c9a7] hover:text-white">
        Upgrade to Pro
      </Button>
    </nav>
  );
} 