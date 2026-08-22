"use client";

import { Plus } from "lucide-react";

export function FloatingButton() {
  return (
    <div className="relative bg-[#eeebe3] p-10 mt-16 rounded-xl w-full max-w-md mx-auto text-center shadow-sm">
      <p className="text-gray-600 mb-4">Parent container background is #eeebe3</p>
      
      {/* The button container (using absolute positioning to offset, or transform) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[32px]">
        <button 
          className="w-[56px] h-[56px] rounded-full bg-[#ca0013] border-4 border-[#eeebe3] flex items-center justify-center shadow-lg shadow-[#ca0013]/30 hover:bg-[#a80010] hover:scale-105 transition-all active:scale-95"
          aria-label="Add"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}

// You can use this button by importing it:
// import { FloatingButton } from '@/components/FloatingButton';
