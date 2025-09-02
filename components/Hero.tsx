'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Shield, Award, Users, ArrowRight } from 'lucide-react';
import { MOTION_CONFIG } from '@/lib/motion-config';

interface HeroFormData {
  name: string;
  email: string;
  phone: string;
  userType: string;
  message: string;
}

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
  const [formData, setFormData] = useState<HeroFormData>({
    name: '',
    email: '',
    phone: '',
    userType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

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

  const handleInputChange = (field: keyof HeroFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      return;
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submissionData = {
        timestamp: new Date().toISOString(),
        source: 'hero-estimate',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: 'Free Estimate Request',
        message: formData.message.trim(),
        vehicle: '', // Will be discussed during estimate
        insurer: '',
        claimNo: '',
        photos: '',
        userType: formData.userType,
        ip: '', // Will be set server-side
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      };

      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          userType: '',
          message: '',
        });
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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

  const buttonHoverVariants = {
    rest: {
      scale: 1,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(209, 149, 51, 0.3)',
      transition: {
        duration: MOTION_CONFIG.durations.fast / 1000,
        ease: MOTION_CONFIG.easing.easeOut,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const arrowVariants = {
    rest: { x: 0 },
    hover: { 
      x: 4,
      transition: {
        duration: MOTION_CONFIG.durations.fast / 1000,
        ease: MOTION_CONFIG.easing.easeOut,
      },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        {/* Placeholder for video - in real implementation use actual video */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(209, 149, 51, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(209, 149, 51, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(209, 149, 51, 0.08) 0%, transparent 50%)
            `,
          }}
        />
        
        {/* Animated particles/sparks effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gold-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
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
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 text-shadow-lg font-display"
          >
            Continuity You Can{' '}
            <span className="text-gradient-gold">Count On</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={subheadVariants}
            className="text-xl sm:text-2xl lg:text-3xl text-gray-200 mb-8 text-shadow-md font-light"
          >
            Premium collision repair with 60+ years of family expertise.
            <br className="hidden sm:block" />
            Trusted by insurance companies and rental partners.
          </motion.p>

          {/* Quick Contact Form */}
          <motion.div
            variants={ctaVariants}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="glass-effect p-8 rounded-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2 text-center">
                Schedule Your Free Estimate
              </h3>
              <p className="text-gray-200 text-center mb-6">
                We'll inspect your vehicle and provide a detailed estimate on-site
              </p>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent backdrop-blur-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent backdrop-blur-sm"
                    />
                  </div>
                  <div>
                    <select 
                      value={formData.userType}
                      onChange={(e) => handleInputChange('userType', e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent backdrop-blur-sm"
                    >
                      <option value="" className="bg-gray-800">I'm an...</option>
                      <option value="insurance" className="bg-gray-800">Insurance Adjuster</option>
                      <option value="rental" className="bg-gray-800">Rental Company</option>
                      <option value="fleet" className="bg-gray-800">Fleet Manager</option>
                      <option value="individual" className="bg-gray-800">Individual Customer</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <textarea
                    rows={3}
                    placeholder="Describe the damage and preferred appointment time..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent backdrop-blur-sm resize-none"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    variants={buttonHoverVariants}
                    initial="rest"
                    whileHover={!isSubmitting ? "hover" : "rest"}
                    whileTap={!isSubmitting ? "tap" : "rest"}
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 px-6 py-3 rounded-lg font-semibold focus-ring transition-colors flex items-center justify-center space-x-2 ${
                      submitStatus === 'success' 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : submitStatus === 'error'
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : isSubmitting
                        ? 'bg-gold-400 text-white cursor-not-allowed'
                        : 'bg-gold-500 text-white btn-shimmer hover:bg-gold-600'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Submitting...</span>
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-white flex items-center justify-center"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        </motion.div>
                        <span>Request Sent!</span>
                      </>
                    ) : submitStatus === 'error' ? (
                      <>
                        <span>❌</span>
                        <span>Try Again</span>
                      </>
                    ) : (
                      <>
                        <span>Schedule Free Estimate</span>
                        <motion.div variants={arrowVariants}>
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    variants={buttonHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    type="button"
                    onClick={handleWatchVideo}
                    className="glass-effect text-white px-6 py-3 rounded-lg font-semibold focus-ring hover:bg-white/20 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Watch Story</span>
                  </motion.button>
                </div>
              </form>
            </div>
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
                className="group glass-effect text-white p-6 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-default"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 bg-gold-500/20 rounded-full group-hover:bg-gold-500/30 transition-colors">
                    <badge.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white">
                      {badge.text}
                    </h3>
                    <p className="text-gray-300 text-sm">
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
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
