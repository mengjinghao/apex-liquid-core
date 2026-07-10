"use client";
import { motion } from 'framer-motion';

export const HyperFolding = ({ isActive, children }: { isActive: boolean; children: React.ReactNode }) => {
  return (
    <motion.div
      initial={false}
      animate={isActive ? "folded" : "flat"}
      variants={{
        flat: { rotateX: 0, rotateY: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
        folded: {
          rotateX: [0, 45, 90],
          scale: [1, 0.4, 0],
          opacity: [1, 0.8, 0],
          transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
        }
      }}
      style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
      className="fixed inset-0 z-50 pointer-events-none origin-center"
    >
      {children}
    </motion.div>
  );
};

export default HyperFolding;
