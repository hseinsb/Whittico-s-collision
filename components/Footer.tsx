'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';
import { InViewWrapper } from './motion/InViewWrapper';
import { MOTION_CONFIG } from '@/lib/motion-config';

const footerLinks = {
  services: [
    'Collision Repair',
    'Insurance Claims',
    'Auto Painting',
    'Dent Repair',
    'Frame Straightening',
    'Glass Replacement',
  ],
  company: [
    'About Us',
    'Our Team',
    'Certifications',
    'Testimonials',
    'Careers',
    'Contact',
  ],
  partners: [
    'Insurance Companies',
    'Rental Partners',
    'Fleet Services',
    'Dealerships',
    'Become a Partner',
    'Partner Portal',
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(209, 149, 51, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(209, 149, 51, 0.2) 0%, transparent 50%)
          `,
        }} />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <InViewWrapper>
            <motion.div
              variants={MOTION_CONFIG.variants.fadeSlideUp}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            >
              {/* Company Info */}
              <div className="lg:col-span-1">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mb-6"
                >
                  <h3 className="text-2xl font-bold text-gradient-gold font-display mb-4">
                    Whittico's Collision
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Premium collision repair services with 60+ years of family expertise. 
                    Trusted by insurance companies and customers alike.
                  </p>
                </motion.div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <motion.a
                    href="tel:+15551234567"
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-gray-300 hover:text-gold-400 transition-colors focus-ring rounded-md p-2 -m-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>(555) 123-4567</span>
                  </motion.a>
                  
                  <motion.a
                    href="mailto:info@whitticoscollision.com"
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-gray-300 hover:text-gold-400 transition-colors focus-ring rounded-md p-2 -m-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>info@whitticoscollision.com</span>
                  </motion.a>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-3 text-gray-300 p-2 -m-2"
                  >
                    <MapPin className="w-4 h-4 mt-0.5" />
                    <span>123 Collision Way<br />Auto City, AC 12345</span>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-gray-300 p-2 -m-2"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Mon-Fri: 8AM-6PM<br />Sat: 9AM-4PM</span>
                  </motion.div>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">
                  Services
                </h4>
                <ul className="space-y-3">
                  {footerLinks.services.map((link, index) => (
                    <motion.li
                      key={link}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href="#"
                        whileHover={{ x: 5, color: '#f6e197' }}
                        className="text-gray-300 hover:text-gold-300 transition-colors focus-ring rounded-md p-1 -m-1 flex items-center group"
                      >
                        <span>{link}</span>
                        <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <motion.li
                      key={link}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href="#"
                        whileHover={{ x: 5, color: '#f6e197' }}
                        className="text-gray-300 hover:text-gold-300 transition-colors focus-ring rounded-md p-1 -m-1 flex items-center group"
                      >
                        <span>{link}</span>
                        <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Partners */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-6">
                  Partners
                </h4>
                <ul className="space-y-3">
                  {footerLinks.partners.map((link, index) => (
                    <motion.li
                      key={link}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.3,
                      }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href="#"
                        whileHover={{ x: 5, color: '#f6e197' }}
                        className="text-gray-300 hover:text-gold-300 transition-colors focus-ring rounded-md p-1 -m-1 flex items-center group"
                      >
                        <span>{link}</span>
                        <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </InViewWrapper>

          {/* Photo Strip */}
          <InViewWrapper delay={400}>
            <motion.div
              variants={MOTION_CONFIG.variants.fadeSlideUp}
              className="mb-12"
            >
              <h4 className="text-lg font-semibold text-white mb-6 text-center">
                Our Facility
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden cursor-pointer group"
                  >
                    {/* Placeholder for photos - in real implementation use Next.js Image */}
                    <div className="w-full h-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-gold-900/20 group-hover:to-gold-800/20 transition-all">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-gold-400/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <span className="text-gold-400 text-xs font-bold">
                            {index}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 group-hover:text-gold-300 transition-colors">
                          {index === 1 && 'Spray Booth'}
                          {index === 2 && 'Work Bay'}
                          {index === 3 && 'Office'}
                          {index === 4 && 'Team'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </InViewWrapper>

          {/* Social Links & Bottom Bar */}
          <InViewWrapper delay={600}>
            <motion.div
              variants={MOTION_CONFIG.variants.fadeSlideUp}
              className="border-t border-gray-700 pt-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {/* Social Links */}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm">Follow us:</span>
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-gold-400 hover:bg-gray-700 transition-colors focus-ring"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>

                {/* Copyright */}
                <div className="text-center md:text-right">
                  <p className="text-gray-400 text-sm">
                    © {currentYear} Whittico's Collision. All rights reserved.
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    Serving the community since 1962
                  </p>
                </div>
              </div>
            </motion.div>
          </InViewWrapper>
        </div>
      </div>
    </footer>
  );
};
