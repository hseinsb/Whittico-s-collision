'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, User, Car, ChevronLeft, ChevronRight } from 'lucide-react';
import { InViewWrapper } from './motion/InViewWrapper';
import { MOTION_CONFIG } from '@/lib/motion-config';

const reviews = [
  {
    name: 'Kimberly',
    vehicle: 'Toyota',
    date: '8/28/25',
    experience: 'Extremely positive experience, very efficient and friendly team',
    rating: 5,
    highlights: ['Likely to Recommend', 'Excellent Repair Quality', 'Outstanding Customer Service']
  },
  {
    name: 'Yolanda',
    vehicle: 'Jeep',
    date: '7/26/25',
    experience: 'Customer service was awesome. Received my vehicle in estimated time that was promised.',
    rating: 5,
    highlights: ['Likely to Recommend', 'Kept Me Informed', 'Ready on Time']
  },
  {
    name: 'Brandi',
    vehicle: 'Ford',
    date: '7/24/25',
    experience: 'You guys were fast and prompt and so nice. Thank you for making a nerve wrecking experience smoother for me.',
    rating: 5,
    highlights: ['Likely to Recommend', 'Kept Me Informed', 'Ready on Time']
  },
  {
    name: 'Douglas',
    vehicle: 'Ford',
    date: '6/12/25',
    experience: 'Did a great job in a very timely manner, thank you.',
    rating: 5,
    highlights: ['Likely to Recommend', 'Good Customer Service', 'Ready on Time']
  },
  {
    name: 'Barbara',
    vehicle: 'Chevrolet',
    date: '5/26/25',
    experience: 'Very pleased with your work. Will recommend to anyone who needs your service. It\'s the 2nd car you did for us. Both a 10. We will refer to all who need your service.',
    rating: 5,
    highlights: ['Likely to Recommend', 'Appreciated Email Updates', 'Ready on Time']
  },
  {
    name: 'Alexander',
    vehicle: 'Toyota',
    date: '3/28/25',
    experience: 'Your repairs were excellent and on time thank you entire team for a job WELL done. I was treated very well.',
    rating: 5,
    highlights: ['Likely to Recommend', 'Excellent Service', 'Ready on Time']
  },
  {
    name: 'John',
    vehicle: 'Chevrolet',
    date: '1/13/25',
    experience: 'It is the only place we have used over the past years',
    rating: 5,
    highlights: ['Loyal Customer', 'Kept Me Informed', 'Ready on Time']
  },
  {
    name: 'James',
    vehicle: 'Kia',
    date: '12/25/24',
    experience: 'My car looks great.. Excellent job',
    rating: 5,
    highlights: ['Likely to Recommend', 'Excellent Results']
  }
];

const ReviewCard = ({ review }: { review: typeof reviews[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-pure-white rounded-2xl p-8 shadow-xl border border-white-200 mx-auto max-w-4xl"
    >
      {/* Quote Icon */}
      <div className="flex items-start justify-between mb-6">
        <Quote className="w-12 h-12 text-gold-500 opacity-60" />
        <div className="flex">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-6 h-6 text-gold-500 fill-current" />
          ))}
        </div>
      </div>

      {/* Review Text */}
      <blockquote className="text-black-50 text-xl lg:text-2xl leading-relaxed mb-8 italic text-center">
        "{review.experience}"
      </blockquote>

      {/* Customer Info */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gold-100 rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-gold-600" />
          </div>
          <div className="text-center">
            <h4 className="font-bold text-black text-lg">{review.name}</h4>
            <div className="flex items-center justify-center space-x-2 text-black-50">
              <Car className="w-4 h-4" />
              <span>{review.vehicle} Owner</span>
              <span>•</span>
              <span>{review.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="flex flex-wrap gap-3 justify-center">
        {review.highlights.map((highlight, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-gold-100 text-gold-700 text-sm font-medium rounded-full"
          >
            {highlight}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export const ReviewsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Pause auto-play when user interacts
  };

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-b from-pure-white to-white-900 border-t border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <InViewWrapper className="text-center mb-12">
          <motion.div
            variants={MOTION_CONFIG.variants.fadeSlideUp}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6 font-display">
              What Our{' '}
              <span className="text-gradient-gold">Customers Say</span>
            </h2>
            <p className="text-xl text-black-50 leading-relaxed mb-8">
              Real reviews from real customers who trust Whittico's Collision with their vehicles.
            </p>
            
            {/* Overall Rating */}
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-6 h-6 ${i < Math.floor(averageRating) ? 'text-gold-500 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <div className="text-black-50">
                <span className="text-2xl font-bold text-black">{averageRating.toFixed(1)}</span>
              </div>
            </div>
          </motion.div>
        </InViewWrapper>

        {/* Slideshow Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors focus-ring"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors focus-ring"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>

          {/* Reviews Slideshow */}
          <div className="min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <ReviewCard key={currentSlide} review={reviews[currentSlide]} />
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors focus-ring ${
                  index === currentSlide 
                    ? 'bg-gold-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-4">
            <span className="text-sm text-black-50">
              {currentSlide + 1} / {totalReviews}
            </span>
          </div>
        </div>

        {/* CTA */}
        <InViewWrapper delay={600} className="text-center mt-16">
          <motion.div
            variants={MOTION_CONFIG.variants.fadeSlideUp}
            className="max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-black mb-4">
              Join Our Satisfied Customers
            </h3>
            <p className="text-black-50 mb-8">
              Experience the premium service and quality workmanship that has earned us these outstanding reviews.
            </p>
            <motion.button
              variants={MOTION_CONFIG.variants.buttonHover}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className="bg-gold-500 text-black px-8 py-3 rounded-lg font-semibold btn-shimmer focus-ring hover:bg-gold-600 transition-colors inline-flex items-center space-x-2"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>Get Your Free Estimate</span>
              <motion.div
                variants={{
                  rest: { x: 0 },
                  hover: { x: 4 },
                }}
              >
                <Star className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </InViewWrapper>
      </div>
    </section>
  );
};
