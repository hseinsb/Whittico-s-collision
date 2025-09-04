'use client';

import { motion } from 'framer-motion';
import { Calendar, Award, Users, Wrench, Shield, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { InViewWrapper } from './motion/InViewWrapper';
import { StaggerContainer } from './motion/StaggerContainer';
import { MOTION_CONFIG } from '@/lib/motion-config';

const expertiseTiles = [
  {
    icon: Calendar,
    title: 'Since 1962',
    description: 'Three generations of collision repair mastery',
    stat: '60+',
    unit: 'Years',
  },
  {
    icon: Award,
    title: 'Master Certified',
    description: 'Certified by the State of Michigan in mechanical systems, collision repair, and structural body restoration—fully licensed and trained to meet rigorous industry standards, with additional I-CAR certification in advanced collision and structural repair techniques.',
    stat: '15+',
    unit: 'Certifications',
  },
  {
    icon: Users,
    title: 'Family Legacy',
    description: 'Whittico family tradition of excellence',
    stat: '3rd',
    unit: 'Generation',
  },
  {
    icon: Wrench,
    title: 'Advanced Equipment',
    description: 'State-of-the-art repair technology',
    stat: '$1M+',
    unit: 'Investment',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: 'Lifetime warranty on all repairs',
    stat: '100%',
    unit: 'Guaranteed',
  },
  {
    icon: Star,
    title: 'Customer Satisfaction',
    description: 'Consistently rated 5-star service',
    stat: '98%',
    unit: 'Satisfaction',
  },
];

const milestones = [
  { year: '1962', event: 'Where it all began' },
  { year: '1987', event: 'Expanded to current  ≈13,000 sq ft facility' },
  { year: '2003', event: 'Second generation takes leadership' },
  { year: '2018', event: 'Major equipment modernization' },
  { year: '2025', event: 'Third generation joins the business' },
];

export const ExpertiseSection = () => {
  return (
    <section id="about" className="py-12 lg:py-20 bg-gradient-to-b from-white-900 to-pure-white relative overflow-hidden border-t border-gray-100/50">
      {/* Background gradient animation */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <InViewWrapper className="text-center mb-12">
          <motion.div
            variants={MOTION_CONFIG.variants.fadeSlideUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 font-display">
              <span className="text-gradient-gold">60+ Years</span> of
              <br />
              Collision Repair Expertise
            </h2>
            <p className="text-xl text-black-50 leading-relaxed">
              Three generations of the Whittico family have built a legacy of 
              premium collision repair, combining traditional craftsmanship 
              with cutting-edge technology.
            </p>
          </motion.div>
        </InViewWrapper>

        {/* Expertise Tiles Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {expertiseTiles.map((tile, index) => (
            <InViewWrapper
              key={tile.title}
              delay={index * MOTION_CONFIG.stagger.medium * 1000}
              className="h-full"
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: {
                    duration: MOTION_CONFIG.durations.fast / 1000,
                    ease: MOTION_CONFIG.easing.easeOut,
                  },
                }}
                className="group bg-pure-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-default border border-white-800 hover:border-gold-200 relative overflow-hidden"
              >
                {/* Background pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                  <tile.icon className="w-full h-full text-gold-500" />
                </div>

                <div className="relative">
                  {/* Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gold-100 rounded-xl group-hover:bg-gold-200 transition-colors">
                      <tile.icon className="w-6 h-6 text-gold-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gold-600">
                        {tile.stat}
                      </div>
                      <div className="text-sm text-black-50">
                        {tile.unit}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-black mb-2 group-hover:text-gold-700 transition-colors">
                    {tile.title}
                  </h3>
                  <p className="text-black-50 leading-relaxed">
                    {tile.description}
                  </p>

                  {/* Underline animation */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="h-0.5 bg-gold-400 mt-4"
                  />
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.div>
            </InViewWrapper>
          ))}
        </StaggerContainer>

        {/* Timeline Section */}
        <InViewWrapper delay={600}>
          <motion.div
            variants={MOTION_CONFIG.variants.fadeSlideUp}
            className="bg-gradient-to-r from-gold-50 via-yellow-50 to-gold-50 rounded-3xl p-8 lg:p-12"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-black mb-4">
                Our Journey Through the Decades
              </h3>
              <p className="text-black-50 text-lg">
                Building trust and expertise one repair at a time
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gold-300 hidden lg:block" />

              <div className="space-y-8 lg:space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: MOTION_CONFIG.durations.medium / 1000,
                      delay: index * MOTION_CONFIG.stagger.slow,
                    }}
                    viewport={{ once: true }}
                    className={`flex items-center ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } flex-col lg:text-left text-center`}
                  >
                    {/* Content */}
                    <div className="flex-1 lg:px-8">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-pure-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3 mb-3 justify-center lg:justify-start">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-2xl font-bold text-gold-600">
                            {milestone.year}
                          </span>
                        </div>
                        <p className="text-black-50 font-medium">
                          {milestone.event}
                        </p>
                      </motion.div>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden lg:flex w-4 h-4 bg-gold-500 rounded-full border-4 border-white shadow-lg z-10 my-4 lg:my-0" />

                    {/* Spacer */}
                    <div className="flex-1 lg:px-8" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </InViewWrapper>

      </div>
    </section>
  );
};
