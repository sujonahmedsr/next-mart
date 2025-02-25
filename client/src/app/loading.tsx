// app/loading.tsx
'use client';
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <motion.div
        className="w-16 h-16 border-4 border-t-blue-500 border-r-blue-500 rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'linear',
        }}
      />
      <span className="ml-4 text-xl font-semibold">
        Loading...
      </span>
    </div>
  );
}
