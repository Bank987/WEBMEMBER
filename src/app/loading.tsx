import { InfinityLoader } from "@/components/ui/loader-13";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm text-[#ededed]">
      <div className="flex flex-col items-center gap-6">
        <InfinityLoader 
          size={100} 
          className="[&>svg>path:first-child]:stroke-[#111111] [&>svg>path:last-child]:stroke-[#ef4444]" 
        />
      </div>
    </div>
  );
}
