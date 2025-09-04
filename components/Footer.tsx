'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { InViewWrapper } from './motion/InViewWrapper';
import { MOTION_CONFIG } from '@/lib/motion-config';


export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pure-black text-pure-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255, 215, 0, 0.2) 0%, transparent 50%)
          `,
        }} />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 border-t border-gray-100/30">
          <InViewWrapper>
            <motion.div
              variants={MOTION_CONFIG.variants.fadeSlideUp}
              className="flex justify-center mb-12"
            >
              {/* Company Info - Centered */}
              <div className="max-w-md text-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mb-6"
                >
                  <h3 className="text-2xl font-bold text-gradient-gold font-display mb-4">
                    Whittico's Collision
                  </h3>
                  <p className="text-white-100 leading-relaxed mb-6">
                    Premium collision repair services with 60+ years of family expertise. 
                    Trusted by insurance companies and customers alike.
                  </p>
                </motion.div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <motion.a
                    href="tel:+13133862660"
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-center space-x-3 text-white-100 hover:text-gold-500 transition-colors focus-ring rounded-md p-2 -m-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>(313) 386-2660</span>
                  </motion.a>
                  
                  <motion.a
                    href="mailto:info@whitticoscollision.co"
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-center space-x-3 text-white-100 hover:text-gold-500 transition-colors focus-ring rounded-md p-2 -m-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>info@whitticoscollision.co</span>
                  </motion.a>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-center space-x-3 text-white-100 p-2 -m-2"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>1031 Dix Lincoln Park, Michigan, 48146</span>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-center space-x-3 text-white-100 p-2 -m-2"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Mon-Fri: 8:30AM-6PM, Sat: 9AM-5PM</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </InViewWrapper>


          {/* Bottom Bar */}
          <InViewWrapper delay={600}>
            <motion.div
              variants={MOTION_CONFIG.variants.fadeSlideUp}
              className="border-t border-white-900 pt-8"
            >
              <div className="text-center">
                <p className="text-white-200 text-sm">
                  © {currentYear} Whittico's Collision. All rights reserved.
                </p>
                <p className="text-white-300 text-xs mt-1">
                  Serving the community since 1962
                </p>
              </div>
            </motion.div>
          </InViewWrapper>
        </div>
      </div>
    </footer>
  );
};
