"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={pathname}
          initial={{ x: "100%", opacity: 0, position: "absolute", top: 0, left: 0, right: 0 }}
          animate={{ x: 0, opacity: 1, position: "relative" }}
          exit={{ x: "-50%", opacity: 0, position: "absolute", top: 0, left: 0, right: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full min-h-screen z-10"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
