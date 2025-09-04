'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';
import { getMotionVariants, MOTION_CONFIG } from '@/lib/motion-config';

interface InViewWrapperProps {
  children: ReactNode;
  variant?: keyof typeof MOTION_CONFIG.variants;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

export const InViewWrapper = ({
  children,
  variant = 'fadeSlideUp',
  delay = 0,
  duration,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
}: InViewWrapperProps) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
    rootMargin: '-50px 0px',
  });

  const motionVariants = getMotionVariants(variant);
  
  // Type guard to check if variant has visible state with transition
  const hasVisibleState = (variants: any): variants is { visible: { transition?: any }, hidden: any } => {
    return variants && typeof variants === 'object' && 'visible' in variants && 'hidden' in variants;
  };

  // Only create custom variants if the base variant has visible/hidden states
  const customVariants = hasVisibleState(motionVariants) ? 
    (duration ? {
      ...motionVariants,
      visible: {
        ...motionVariants.visible,
        transition: {
          ...(motionVariants.visible.transition || {}),
          duration: duration / 1000, // Convert ms to seconds
          delay: delay / 1000,
        },
      },
    } : {
      ...motionVariants,
      visible: {
        ...motionVariants.visible,
        transition: {
          ...(motionVariants.visible.transition || {}),
          delay: delay / 1000,
        },
      },
    }) : motionVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={customVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
