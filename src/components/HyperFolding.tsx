"use client";
import { motion } from 'framer-motion';

export const HyperFolding = ({ isActive, children }: { isActive: boolean; children: React.ReactNode }) => (
  <motion.div
    initial={false}
    animate={isActive ? "folded" : "flat"}
    variants={{
      flat: { scale: 1, filter: "blur(0px)", opacity: 1 },
      folded: {
        rotateX: [0, 45, 90],
        scale: [1, 0.8, 0],
        opacity: [1, 1, 0],
        transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] }
      }
    }}
    style={{ transformStyle: 'preserve-3d', perspective: '1500px' }}
    className="fixed inset-0 z-50 pointer-events-none origin-center"
  >
    {children}
  </motion.div>
);

export default HyperFolding;
