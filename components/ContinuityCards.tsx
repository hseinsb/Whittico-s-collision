'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Clock, Shield, Wrench, Phone, CheckCircle, Star } from 'lucide-react';
import { InViewWrapper } from './motion/InViewWrapper';
import { StaggerContainer } from './motion/StaggerContainer';
import { MOTION_CONFIG } from '@/lib/motion-config';

const continuityFeatures = [
  {
    icon: Clock,
    title: 'Rapid Response',
    description: 'Quick estimates and fast turnaround times to get you back on the road.',
    image: '/api/placeholder/400/300',
    stats: '24-48 Hour Estimates',
    highlight: 'Industry Leading Speed',
  },
  {
    icon: Shield,
    title: 'Insurance Partnership',
    description: 'Direct billing and seamless claims processing with all major insurers.',
    image: '/api/placeholder/400/300',
    stats: '100+ Insurance Partners',
    highlight: 'Zero Hassle Claims',
  },
  {
    icon: Wrench,
    title: 'Premium Craftsmanship',
    description: 'State-of-the-art equipment and master technicians ensure perfect results.',
    image: '/api/placeholder/400/300',
    stats: 'Lifetime Warranty',
    highlight: 'Master Certified Techs',
  },
  {
    icon: Phone,
    title: 'Personal Service',
    description: 'Dedicated project managers keep you informed throughout the entire process.',
    image: '/api/placeholder/400/300',
    stats: '1-on-1 Support',
    highlight: 'Family-Owned Care',
  },
];

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

const Card3D = ({ children, className = '' }: Card3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        z: 50,
        transition: {
          duration: MOTION_CONFIG.durations.medium / 1000,
          ease: MOTION_CONFIG.easing.easeOut,
        },
      }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const ContinuityCards = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <InViewWrapper className="text-center mb-16">
          <motion.div
            variants={MOTION_CONFIG.variants.fadeSlideUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-display">
              Continuity You Can{' '}
              <span className="text-gradient-gold">Count On</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              When accidents happen, our seamless process and premium service 
              ensure your experience is smooth from start to finish.
            </p>
          </motion.div>
        </InViewWrapper>

        {/* Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {continuityFeatures.map((feature, index) => (
            <InViewWrapper
              key={feature.title}
              delay={index * MOTION_CONFIG.stagger.medium * 1000}
              className="h-full"
            >
              <Card3D className="h-full">
                <motion.div
                  whileHover={{
                    y: -6,
                    transition: {
                      duration: MOTION_CONFIG.durations.medium / 1000,
                      ease: MOTION_CONFIG.easing.easeOut,
                    },
                  }}
                  className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-default"
                >
                  {/* Image Section with Overlay */}
                  <div className="relative h-48 overflow-hidden">
                    {/* Placeholder for image - in real implementation use Next.js Image */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 group-hover:scale-110 transition-transform duration-700"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at 30% 40%, rgba(209, 149, 51, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 70% 60%, rgba(209, 149, 51, 0.05) 0%, transparent 50%)
                        `,
                      }}
                    />
                    
                    {/* Sliding photo transition effect */}
                    <motion.div
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="absolute inset-0 bg-gradient-to-r from-gold-400/20 to-gold-600/20"
                    />

                    {/* Icon */}
                    <div className="absolute top-4 left-4 p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                      <feature.icon className="w-6 h-6 text-gold-600 group-hover:text-white transition-colors" />
                    </div>

                    {/* Highlight Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gold-500 text-white text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {feature.highlight}
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gold-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {feature.stats}
                          </span>
                        </div>
                        <Star className="w-4 h-4 text-gold-400 group-hover:text-gold-500 transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/5 via-transparent to-gold-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              </Card3D>
            </InViewWrapper>
          ))}
        </StaggerContainer>

        {/* Bottom CTA */}
        <InViewWrapper delay={600} className="text-center mt-16">
          <motion.div
            variants={MOTION_CONFIG.variants.fadeSlideUp}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Experience the Whittico's Difference
            </h3>
            <p className="text-gray-600 mb-8">
              Join thousands of satisfied customers who trust us with their vehicles.
            </p>
            <motion.button
              variants={MOTION_CONFIG.variants.buttonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="bg-gold-500 text-white px-8 py-3 rounded-lg font-semibold btn-shimmer focus-ring hover:bg-gold-600 transition-colors inline-flex items-center space-x-2"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>Start Your Repair Journey</span>
              <motion.div
                variants={{
                  rest: { x: 0 },
                  hover: { x: 4 },
                }}
              >
                <CheckCircle className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </InViewWrapper>
      </div>
    </section>
  );
};
