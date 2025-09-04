// Central motion configuration for Whittico's Collision
// Premium, subtle, cinematic animations with accessibility support

export const MOTION_CONFIG = {
  // Durations
  durations: {
    fast: 280,
    medium: 350,
    slow: 420,
    hero: 700,
    ultra: 800,
  },

  // Easing curves
  easing: {
    easeOut: [0.25, 0.46, 0.45, 0.94],
    spring: [0.6, 0.01, 0.05, 0.9],
    expo: [0.16, 1, 0.3, 1],
    bounce: [0.68, 0.55, 0.265, 1.35],
  },

  // Transform distances
  distances: {
    subtle: 10,
    medium: 20,
    large: 30,
  },

  // Scale values
  scale: {
    subtle: 0.98,
    normal: 1,
    hover: 1.02,
    lift: 1.06,
  },

  // Stagger timing
  stagger: {
    fast: 0.06,
    medium: 0.08,
    slow: 0.1,
    ultra: 0.12,
  },

  // Common variants
  variants: {
    // Fade and slide up
    fadeSlideUp: {
      hidden: {
        opacity: 0,
        y: 30,
        scale: 0.98,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.42,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },

    // Hero entrance sequence
    heroText: {
      hidden: {
        opacity: 0,
        y: 20,
        scale: 0.98,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.7,
          ease: [0.6, 0.01, 0.05, 0.9],
        },
      },
    },

    // Card hover effects
    cardHover: {
      rest: {
        scale: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
      },
      hover: {
        scale: 1.02,
        y: -6,
        transition: {
          duration: 0.35,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    },

    // Button interactions
    buttonHover: {
      rest: {
        scale: 1,
      },
      hover: {
        scale: 1.02,
        transition: {
          duration: 0.28,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
      tap: {
        scale: 0.98,
        transition: {
          duration: 0.15,
        },
      },
    },

    // Stagger container
    staggerContainer: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.1,
        },
      },
    },

    // Shimmer effect
    shimmer: {
      hidden: {
        x: '-100%',
      },
      visible: {
        x: '100%',
        transition: {
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 3,
        },
      },
    },
  },

  // Accessibility settings
  accessibility: {
    // Reduced motion variants
    reducedMotion: {
      fadeSlideUp: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
      },
      heroText: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      },
      cardHover: {
        rest: {},
        hover: {},
      },
      buttonHover: {
        rest: {},
        hover: {},
        tap: {},
      },
      staggerContainer: {
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } },
      },
      shimmer: {
        hidden: {},
        visible: {},
      },
    },
  },
} as const;

// Utility function to get motion preferences
export const getMotionVariants = (variantName: keyof typeof MOTION_CONFIG.variants) => {
  // Check for reduced motion preference
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return MOTION_CONFIG.accessibility.reducedMotion[variantName] || MOTION_CONFIG.variants[variantName];
  }
  return MOTION_CONFIG.variants[variantName];
};

// Custom hook for motion preferences
export const useMotionPreference = () => {
  if (typeof window === 'undefined') return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
