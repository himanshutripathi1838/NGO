"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedWordItem {
  text: string;
  color?: string;
}

export interface AnimatedTextRollerProps {
  staticPrefix?: string;
  words?: AnimatedWordItem[];
  intervalMs?: number;
  className?: string;
}

const defaultWords: AnimatedWordItem[] = [
  { text: "future.", color: "text-[#bbf05c]" },
  { text: "community.", color: "text-[#34d399]" },
  { text: "ecosystem.", color: "text-[#38bdf8]" },
  { text: "tomorrow.", color: "text-[#fde047]" },
];

export const AnimatedTextRoller = ({
  staticPrefix = "Every farmer. One connected",
  words = defaultWords,
  intervalMs = 2000,
  className,
}: AnimatedTextRollerProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [words.length, intervalMs]);

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      <p className="text-xl sm:text-2xl font-bold text-foreground">
        {staticPrefix}
      </p>
      <div className="overflow-hidden h-8 text-left">
        <div
          className="transition-transform duration-700 ease-in-out"
          style={{ transform: `translateY(-${index * 2}rem)` }}
        >
          {words.map((w, i) => (
            <p
              key={i}
              className={cn(
                "h-8 flex items-center justify-start text-xl sm:text-2xl font-bold",
                w.color ?? "text-primary"
              )}
            >
              {w.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedTextRoller;
