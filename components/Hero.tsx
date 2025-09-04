'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Shield, Award, Users } from 'lucide-react';
import { MOTION_CONFIG } from '@/lib/motion-config';


const trustBadges = [
  {
    icon: Shield,
    text: 'Insurance Approved',
    description: 'Trusted by major insurance companies',
  },
  {
    icon: Award,
    text: '60+ Years Experience',
    description: 'Three generations of expertise',
  },
  {
    icon: Users,
    text: 'Family Owned',
    description: 'Personal service since 1962',
  },
];

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -200]);

  useEffect(() => {
    // Simulate video loading - in real implementation, use actual video
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
      setShowVideo(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetQuote = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchVideo = () => {
    // In real implementation, this would open a video modal
    console.log('Opening video modal');
  };


  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const headlineVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: MOTION_CONFIG.durations.hero / 1000,
        ease: MOTION_CONFIG.easing.easeOut,
      },
    },
  };

  const subheadVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: MOTION_CONFIG.durations.slow / 1000,
        ease: MOTION_CONFIG.easing.easeOut,
      },
    },
  };

  const ctaVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: MOTION_CONFIG.durations.medium / 1000,
        ease: MOTION_CONFIG.easing.easeOut,
      },
    },
  };

  const badgeVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
              transition: {
          duration: MOTION_CONFIG.durations.slow / 1000,
          ease: MOTION_CONFIG.easing.easeOut,
        },
    },
  };


  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-16"
    >
      {/* Video Background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        {/* Placeholder for video - in real implementation use actual video */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-pure-white via-white to-pure-white"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(255, 215, 0, 0.08) 0%, transparent 50%)
            `,
          }}
        />
        

        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-white/20" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Main Headline */}
          <motion.h1
            variants={headlineVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-black mb-6 font-display"
          >
            Premium Collision Repair{' '}
            <span className="text-gradient-gold">Excellence</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={subheadVariants}
            className="text-xl sm:text-2xl lg:text-3xl text-black-50 mb-8 font-light"
          >
            Premium collision repair with 60+ years of family expertise.
            <br className="hidden sm:block" />
            Trusted by insurance companies.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            variants={ctaVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
                  <motion.button
              variants={MOTION_CONFIG.variants.buttonHover}
                    initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gold-500 text-black px-8 py-4 rounded-lg text-lg font-semibold btn-shimmer focus-ring hover:bg-gold-600 transition-colors"
            >
              Get Free Estimate
                  </motion.button>
                  
                  <motion.button
              variants={MOTION_CONFIG.variants.buttonHover}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => {
                      const aboutSection = document.getElementById('about');
                      if (aboutSection) {
                        aboutSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
              className="glass-effect text-black px-8 py-4 rounded-lg text-lg font-semibold focus-ring hover:bg-black/10 transition-colors flex items-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
              <span>Our Story</span>
                  </motion.button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.text}
                variants={badgeVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: {
                    duration: MOTION_CONFIG.durations.fast / 1000,
                    ease: MOTION_CONFIG.easing.easeOut,
                  },
                }}
                className="group glass-effect text-black p-6 rounded-xl hover:bg-black/10 transition-all duration-300 cursor-default"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-gold-500/20 rounded-full group-hover:bg-gold-500/30 transition-colors">
                    <badge.icon className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-black">
                      {badge.text}
                    </h3>
                    <p className="text-black-50 text-sm">
                      {badge.description}
                    </p>
                  </div>
                </div>
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-black/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-black/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
