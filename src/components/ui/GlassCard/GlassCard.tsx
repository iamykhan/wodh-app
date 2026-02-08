import { cn } from "@/lib/utils/cn";
import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}
