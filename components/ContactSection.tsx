'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, User, MessageSquare } from 'lucide-react';
import { InViewWrapper } from './motion/InViewWrapper';
import { MOTION_CONFIG } from '@/lib/motion-config';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Call Us',
    content: '(313) 386-2660',
    href: 'tel:+13133862660',
    description: 'Speak with our team',
  },
  {
    icon: Mail,
    title: 'Email Us',
    content: 'info@whitticoscollision.co',
    href: 'mailto:info@whitticoscollision.co',
    description: 'Get a written quote',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '1031 Dix Lincoln Park, Michigan, 48146',
    href: 'https://www.google.com/maps/place/1031+Dix+Ave,+Lincoln+Park,+MI+48146',
    description: 'See our facility',
  },
  {
    icon: Clock,
    title: 'Hours',
    content: 'Mon-Fri: 8:30AM-6PM, Sat: 9AM-5PM',
    href: null,
    description: 'We\'re here when you need us',
  },
];

const serviceOptions = [
  'Collision Repair',
  'Insurance Claims',
  'Paintless Dent Repair',
  'Auto Painting',
  'Frame Straightening',
  'Glass Replacement',
  'Other Services',
];

export const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation for invalid fields
      Object.keys(errors).forEach(field => {
        const element = document.getElementById(field);
        if (element) {
          element.classList.add('animate-pulse');
          setTimeout(() => element.classList.remove('animate-pulse'), 500);
        }
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const inputVariants = {
    rest: {
      borderColor: '#d1d5db',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    },
    focus: {
      borderColor: '#d19533',
      boxShadow: '0 0 0 3px rgba(209, 149, 51, 0.1), 0 1px 2px rgba(0, 0, 0, 0.05)',
      transition: {
        duration: 0.2,
      },
    },
    error: {
      borderColor: '#ef4444',
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    },
  };

  return (
    <section id="contact" className="py-12 lg:py-20 bg-gradient-to-b from-pure-white to-white-900 border-t border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <InViewWrapper className="text-center mb-12">
          <motion.div
            variants={MOTION_CONFIG.variants.fadeSlideUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 font-display">
              Ready to Discuss a{' '}
              <span className="text-gradient-gold">Partnership?</span>
            </h2>
            <p className="text-xl text-black-50 leading-relaxed">
              Get in touch with our team to learn how we can provide premium 
              collision repair services for your insurance company or rental business.
            </p>
          </motion.div>
        </InViewWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <InViewWrapper>
            <motion.div
              variants={MOTION_CONFIG.variants.fadeSlideUp}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-black mb-6">
                  Get in Touch
                </h3>
                <p className="text-black-50 mb-8 leading-relaxed">
                  Whether you're an insurance adjuster, rental company manager, 
                  or individual customer, we're here to provide exceptional service 
                  and answer any questions you may have.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: MOTION_CONFIG.durations.medium / 1000,
                      delay: index * MOTION_CONFIG.stagger.fast,
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      x: 5,
                      transition: { duration: 0.2 },
                    }}
                    className="group"
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 focus-ring"
                      >
                        <div className="flex-shrink-0 p-3 bg-gold-100 rounded-xl group-hover:bg-gold-200 transition-colors">
                          <info.icon className="w-6 h-6 text-gold-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {info.title}
                          </h4>
                          <p className="text-gold-600 font-medium mb-1">
                            {info.content}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {info.description}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
                        <div className="flex-shrink-0 p-3 bg-gold-100 rounded-xl group-hover:bg-gold-200 transition-colors">
                          <info.icon className="w-6 h-6 text-gold-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {info.title}
                          </h4>
                          <p className="text-gray-700 font-medium mb-1">
                            {info.content}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Interactive Google Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden h-64 shadow-lg"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2951.8!2d-83.1786!3d42.2581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883b356c5c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2s1031%20Dix%20Ave%2C%20Lincoln%20Park%2C%20MI%2048146%2C%20USA!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Whittico's Collision Location"
                  className="rounded-2xl"
                />
              </motion.div>
            </motion.div>
          </InViewWrapper>

          {/* Contact Form */}
          <InViewWrapper delay={200}>
            <motion.div
              variants={MOTION_CONFIG.variants.fadeSlideUp}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We've received your message and will get back to you within 24 hours.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsSubmitted(false)}
                      className="bg-gold-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gold-600 transition-colors focus-ring"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        Send us a Message
                      </h3>
                    </div>

                    {/* Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <motion.div
                          variants={inputVariants}
                          animate={errors.name ? 'error' : 'rest'}
                          whileFocus="focus"
                        >
                          <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                            placeholder="Your full name"
                          />
                        </motion.div>
                        <AnimatePresence>
                          {errors.name && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center space-x-1 mt-1 text-red-600 text-sm"
                            >
                              <AlertCircle className="w-4 h-4" />
                              <span>{errors.name}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <motion.div
                          variants={inputVariants}
                          animate={errors.email ? 'error' : 'rest'}
                          whileFocus="focus"
                        >
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                            placeholder="your.email@company.com"
                          />
                        </motion.div>
                        <AnimatePresence>
                          {errors.email && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center space-x-1 mt-1 text-red-600 text-sm"
                            >
                              <AlertCircle className="w-4 h-4" />
                              <span>{errors.email}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Phone and Service */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <motion.div
                          variants={inputVariants}
                          animate={errors.phone ? 'error' : 'rest'}
                          whileFocus="focus"
                        >
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                            placeholder="(555) 123-4567"
                          />
                        </motion.div>
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center space-x-1 mt-1 text-red-600 text-sm"
                            >
                              <AlertCircle className="w-4 h-4" />
                              <span>{errors.phone}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                          Service Needed *
                        </label>
                        <motion.div
                          variants={inputVariants}
                          animate={errors.service ? 'error' : 'rest'}
                          whileFocus="focus"
                        >
                          <select
                            id="service"
                            value={formData.service}
                            onChange={(e) => handleInputChange('service', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200 bg-white"
                          >
                            <option value="">Select a service</option>
                            {serviceOptions.map(option => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </motion.div>
                        <AnimatePresence>
                          {errors.service && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center space-x-1 mt-1 text-red-600 text-sm"
                            >
                              <AlertCircle className="w-4 h-4" />
                              <span>{errors.service}</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <motion.div
                        variants={inputVariants}
                        animate={errors.message ? 'error' : 'rest'}
                        whileFocus="focus"
                      >
                        <textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200 resize-none"
                          placeholder="Tell us about your collision repair needs..."
                        />
                      </motion.div>
                      <AnimatePresence>
                        {errors.message && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center space-x-1 mt-1 text-red-600 text-sm"
                          >
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.message}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      variants={MOTION_CONFIG.variants.buttonHover}
                      initial="rest"
                      whileHover={!isSubmitting ? "hover" : "rest"}
                      whileTap={!isSubmitting ? "tap" : "rest"}
                      className="w-full bg-gold-500 text-white py-3 px-6 rounded-lg font-semibold btn-shimmer focus-ring hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center space-x-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            <span>Sending...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="send"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center space-x-2"
                          >
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </InViewWrapper>
        </div>
      </div>
    </section>
  );
};
