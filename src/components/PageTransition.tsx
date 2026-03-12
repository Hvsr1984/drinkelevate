import { motion } from "framer-motion";
import { ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
    animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
    exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
    transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    style={{ willChange: "clip-path, opacity" }}
  >
    <motion.div
      initial={{ y: 40, scale: 0.98 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ y: -30, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  </motion.div>
);

export default PageTransition;
