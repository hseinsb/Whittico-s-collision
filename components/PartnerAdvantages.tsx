'use client';

import { motion } from 'framer-motion';
import { CheckCircle, X, Clock, Shield, Users, Award, Wrench, Phone } from 'lucide-react';
import { InViewWrapper } from './motion/InViewWrapper';
import { StaggerContainer } from './motion/StaggerContainer';
import { MOTION_CONFIG } from '@/lib/motion-config';

const advantages = [
  {
    icon: Clock,
    title: 'Rapid Response Times',
    whitticos: 'Same-day estimates, 24-48 hour start times',
    typical: 'Week-long waits, delayed responses',
  },
  {
    icon: Shield,
    title: 'Insurance Partnerships',
    whitticos: 'Direct billing with 100+ insurers, zero paperwork',
    typical: 'Customer handles all insurance coordination',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    whitticos: 'Personal project manager for every job',
    typical: 'Generic customer service, no continuity',
  },
  {
    icon: Award,
    title: 'Quality Guarantee',
    whitticos: 'Lifetime warranty on all work',
    typical: 'Limited 90-day warranties',
  },
  {
    icon: Wrench,
    title: 'Equipment & Technology',
    whitticos: 'State-of-the-art spray booths, laser measuring',
    typical: 'Outdated equipment, manual processes',
  },
  {
    icon: Phone,
    title: 'Communication',
    whitticos: 'Real-time updates, photo progress reports',
    typical: 'Call if you need updates',
  },
];

const AdvantageRow = ({ advantage, index }: { advantage: typeof advantages[0]; index: number }) => {
  return (
    <motion.div
      variants={MOTION_CONFIG.variants.fadeSlideUp}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center group"
    >
      {/* Whittico's Advantages */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: index * 0.1,
        }}
        viewport={{ once: true, margin: '-50px' }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 lg:p-8 rounded-2xl border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
            <advantage.icon className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-bold text-black">
                Whittico's Advantage
              </h3>
            </div>
            <h4 className="text-xl font-semibold text-green-800 mb-3">
              {advantage.title}
            </h4>
            <p className="text-black-50 leading-relaxed">
              {advantage.whitticos}
            </p>
          </div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-400/5 rounded-2xl pointer-events-none"
        />
      </motion.div>

      {/* Typical Shops */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: (index * 0.1) + 0.15,
        }}
        viewport={{ once: true, margin: '-50px' }}
        className="bg-gradient-to-br from-red-50 to-rose-50 p-6 lg:p-8 rounded-2xl border border-red-100 hover:border-red-200 transition-all duration-300 hover:shadow-lg"
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
            <X className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center space-x-2 mb-2">
              <X className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-black">
                Typical Collision Shops
              </h3>
            </div>
            <h4 className="text-xl font-semibold text-red-800 mb-3">
              {advantage.title}
            </h4>
            <p className="text-black-50 leading-relaxed">
              {advantage.typical}
            </p>
          </div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-red-400/5 to-rose-400/5 rounded-2xl pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
};

export const PartnerAdvantages = () => {
  return (
    <section id="services" className="py-12 lg:py-20 bg-pure-white border-t border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <InViewWrapper className="text-center mb-12">
          <motion.div
            variants={MOTION_CONFIG.variants.fadeSlideUp}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 font-display">
              Why Insurance Companies{' '}
              <span className="text-gradient-gold">Choose Us</span>
            </h2>
            <p className="text-xl text-black-50 leading-relaxed">
              See the clear difference between Whittico's premium service 
              and typical collision repair shops.
            </p>
          </motion.div>
        </InViewWrapper>

        {/* Advantages Comparison */}
        <div className="space-y-12">
          {advantages.map((advantage, index) => (
            <AdvantageRow
              key={advantage.title}
              advantage={advantage}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <InViewWrapper delay={800} className="mt-20">
          <motion.div
            variants={MOTION_CONFIG.variants.fadeSlideUp}
            className="bg-gradient-to-r from-gold-50 via-yellow-50 to-gold-50 rounded-3xl p-8 lg:p-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-black mb-4">
                The Numbers Speak for Themselves
              </h3>
              <p className="text-black-50 text-lg">
                Our partnership results in measurable benefits for everyone involved.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-center p-6 bg-pure-white rounded-2xl shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-4xl font-bold text-gold-600 mb-2">98%</div>
                <div className="text-black font-semibold mb-1">Customer Satisfaction</div>
                <div className="text-black-50 text-sm">Insurance partner feedback</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-center p-6 bg-pure-white rounded-2xl shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-4xl font-bold text-gold-600 mb-2">5.0</div>
                <div className="text-black font-semibold mb-1">Star Rating</div>
                <div className="text-black-50 text-sm">Consistently excellent reviews</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-center p-6 bg-pure-white rounded-2xl shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-4xl font-bold text-gold-600 mb-2">$0</div>
                <div className="text-black font-semibold mb-1">Customer Paperwork</div>
                <div className="text-black-50 text-sm">We handle all insurance coordination</div>
              </motion.div>
            </div>
          </motion.div>
        </InViewWrapper>

        {/* CTA */}
        <InViewWrapper delay={1000} className="text-center mt-16">
          <motion.div
            variants={MOTION_CONFIG.variants.fadeSlideUp}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-black mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-black-50 mb-8">
              Partner with us for seamless collision repair that exceeds expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                variants={MOTION_CONFIG.variants.buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="bg-gold-500 text-black px-8 py-3 rounded-lg font-semibold btn-shimmer focus-ring hover:bg-gold-600 transition-colors"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Become a Partner
              </motion.button>
              <motion.button
                variants={MOTION_CONFIG.variants.buttonHover}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className="bg-white text-gold-600 border-2 border-gold-500 px-8 py-3 rounded-lg font-semibold focus-ring hover:bg-gold-50 transition-colors"
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </InViewWrapper>
      </div>
    </section>
  );
};
