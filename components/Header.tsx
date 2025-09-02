'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { MOTION_CONFIG } from '@/lib/motion-config';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    // Set up scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Set up intersection observer for active section
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
      rootMargin: '-20% 0px -80% 0px',
    });

    // Observe all sections
    navigation.forEach((item) => {
      const element = document.getElementById(item.href.slice(1));
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const headerVariants = {
    normal: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      backdropFilter: 'blur(0px)',
      borderColor: 'rgba(255, 255, 255, 0)',
      y: 0,
    },
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      y: 0,
      transition: {
        duration: MOTION_CONFIG.durations.medium / 1000,
        ease: MOTION_CONFIG.easing.easeOut,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: MOTION_CONFIG.durations.fast / 1000,
        ease: MOTION_CONFIG.easing.easeOut,
      },
    },
    open: {
      opacity: 1,
      x: '0%',
      transition: {
        duration: MOTION_CONFIG.durations.medium / 1000,
        ease: MOTION_CONFIG.easing.easeOut,
      },
    },
  };

  const linkVariants = {
    rest: { 
      scale: 1,
      color: '#374151',
    },
    hover: { 
      scale: 1.02,
      color: '#d19533',
      transition: {
        duration: MOTION_CONFIG.durations.fast / 1000,
        ease: MOTION_CONFIG.easing.easeOut,
      },
    },
  };

  const underlineVariants = {
    inactive: {
      width: '0%',
      opacity: 0,
    },
    active: {
      width: '100%',
      opacity: 1,
      transition: {
        duration: MOTION_CONFIG.durations.medium / 1000,
        ease: MOTION_CONFIG.easing.easeOut,
      },
    },
  };

  const handleNavClick = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        animate={isScrolled ? 'scrolled' : 'normal'}
        className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
        style={{ willChange: 'backdrop-filter, background-color' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: MOTION_CONFIG.durations.slow / 1000,
                ease: MOTION_CONFIG.easing.easeOut,
              }}
              className="flex-shrink-0"
            >
              <h1 className="text-xl lg:text-2xl font-bold text-gradient-gold font-display">
                Whittico's Collision
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  className="relative"
                  variants={linkVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="relative px-3 py-2 text-sm font-medium focus-ring transition-colors"
                  >
                    {item.name}
                    <motion.div
                      variants={underlineVariants}
                      animate={activeSection === item.href.slice(1) ? 'active' : 'inactive'}
                      className="absolute bottom-0 left-0 h-0.5 bg-gold-500"
                    />
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: MOTION_CONFIG.durations.slow / 1000,
                ease: MOTION_CONFIG.easing.easeOut,
                delay: 0.1,
              }}
              className="hidden lg:flex items-center space-x-4"
            >
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gold-600 transition-colors focus-ring rounded-md px-2 py-1"
              >
                <Phone className="w-4 h-4" />
                <span>(123) 456-7890</span>
              </a>
              <motion.button
                variants={MOTION_CONFIG.variants.buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleNavClick('#contact')}
                className="bg-gold-500 text-white px-4 py-2 rounded-lg text-sm font-medium btn-shimmer focus-ring hover:bg-gold-600 transition-colors"
              >
                Get Quote
              </motion.button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: MOTION_CONFIG.durations.medium / 1000,
                ease: MOTION_CONFIG.easing.easeOut,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gold-600 focus-ring"
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            />
            
            {/* Mobile Menu */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-sm bg-white shadow-xl lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-gradient-gold font-display">
                  Whittico's Collision
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-600 hover:text-gold-600 focus-ring"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              
              <nav className="p-4">
                <div className="space-y-1">
                  {navigation.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * MOTION_CONFIG.stagger.fast,
                        duration: MOTION_CONFIG.durations.medium / 1000,
                      }}
                      onClick={() => handleNavClick(item.href)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium focus-ring transition-colors ${
                        activeSection === item.href.slice(1)
                          ? 'text-gold-600 bg-gold-50'
                          : 'text-gray-900 hover:text-gold-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t space-y-4">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center space-x-3 text-gray-600 hover:text-gold-600 transition-colors focus-ring rounded-md px-3 py-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>(123) 456-7890</span>
                  </a>
                  
                  <motion.button
                    variants={MOTION_CONFIG.variants.buttonHover}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleNavClick('#contact')}
                    className="w-full bg-gold-500 text-white px-4 py-3 rounded-lg font-medium btn-shimmer focus-ring hover:bg-gold-600 transition-colors"
                  >
                    Get Quote
                  </motion.button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
