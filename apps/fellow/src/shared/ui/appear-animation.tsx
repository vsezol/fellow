import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { useIsMobile } from '../lib';

export const AppearAnimation = ({ children }: PropsWithChildren) => {
  const isMobile = useIsMobile();

  return isMobile
    ? MobileAppearAnimation({ children })
    : DesktopAppearAnimation({ children });
};

const DesktopAppearAnimation = ({ children }: PropsWithChildren) => {
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

const MobileAppearAnimation = ({ children }: PropsWithChildren) => {
  return (
    <motion.div
      className="h-full w-full"
      initial={{
        position: 'absolute',
        translateX: '100%',
      }}
      animate={{
        position: 'absolute',
        translateX: '0',
      }}
      exit={{
        position: 'absolute',
        translateX: '100%',
      }}
      transition={{
        translateX: { duration: 0.5, type: 'spring', bounce: 0 },
        ease: 'linear',
      }}
    >
      {children}
    </motion.div>
  );
};
