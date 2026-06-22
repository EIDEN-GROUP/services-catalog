import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import iconLogo from "@/assets/icon.png";

interface PageLoaderProps {
  onComplete?: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 2000; // 2 seconds total
    const interval = 16; // ~60fps
    const steps = duration / interval;
    const increment = 100 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 400); // slight pause at 100%
      }
      setCount(Math.min(Math.round(current), 100));
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-canvas"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle grid background */}
          <div className="absolute inset-0 paper-grid opacity-30" />

          <div className="relative flex flex-col items-center gap-8">
            {/* Icon with subtle pulse */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={iconLogo}
                  alt="EIDEN"
                  className="h-16 w-16 md:h-20 md:w-20"
                  style={{ filter: "brightness(0.2) sepia(0.5)" }}
                />
              </motion.div>
            </motion.div>

            {/* Counter */}
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative h-px w-24 bg-forest/10 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-forest"
                  initial={{ width: "0%" }}
                  animate={{ width: `${count}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
              <span
                className="font-mono text-xs tracking-[0.2em] text-forest/50"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {count}
                <span className="text-forest/30 ml-0.5">%</span>
              </span>
            </motion.div>
          </div>

          {/* Corner label */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-forest/30 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Eiden Group
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
