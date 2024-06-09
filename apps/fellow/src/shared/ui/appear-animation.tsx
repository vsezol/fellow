import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export const AppearAnimation = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      className="h-full w-full"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      {children}
    </motion.div>
  );
};
