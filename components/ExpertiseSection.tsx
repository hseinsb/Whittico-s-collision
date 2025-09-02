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
    description: 'ASE and I-CAR certified technicians',
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
    stat: '$2M+',
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
  { year: '1962', event: 'Founded by Robert Whittico Sr.' },
  { year: '1987', event: 'Expanded to current 15,000 sq ft facility' },
  { year: '2003', event: 'Second generation takes leadership' },
  { year: '2018', event: 'Major equipment modernization' },
  { year: '2024', event: 'Third generation joins the business' },
];

export const ExpertiseSection = () => {
  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(209, 149, 51, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(209, 149, 51, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(209, 149, 51, 0.1) 0%, transparent 50%)',
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
        <InViewWrapper className="text-center mb-16">
          <motion.div
            variants={MOTION_CONFIG.variants.fadeSlideUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-display">
              <span className="text-gradient-gold">60+ Years</span> of
              <br />
              Collision Repair Expertise
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
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
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-default border border-gray-100 hover:border-gold-200 relative overflow-hidden"
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
                      <div className="text-sm text-gray-500">
                        {tile.unit}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gold-700 transition-colors">
                    {tile.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Our Journey Through the Decades
              </h3>
              <p className="text-gray-600 text-lg">
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
                        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3 mb-3 justify-center lg:justify-start">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-2xl font-bold text-gold-600">
                            {milestone.year}
                          </span>
                        </div>
                        <p className="text-gray-700 font-medium">
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

        {/* CTA */}
        <InViewWrapper delay={1000} className="text-center mt-16">
          <motion.div
            variants={MOTION_CONFIG.variants.fadeSlideUp}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Experience Six Decades of Excellence
            </h3>
            <p className="text-gray-600 mb-8">
              Trust your vehicle to the collision repair experts who have been 
              perfecting their craft for over 60 years.
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
              <span>Experience Our Legacy</span>
              <motion.div
                variants={{
                  rest: { x: 0 },
                  hover: { x: 4 },
                }}
              >
                <TrendingUp className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </InViewWrapper>
      </div>
    </section>
  );
};
