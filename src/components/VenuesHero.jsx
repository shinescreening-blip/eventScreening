import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';

const VenuesHero = () => {
  const handleScroll = () => {
    window.scrollBy({ top: 900, left: 0, behavior: "smooth" }); 
    // top: 600 → jitna neeche scroll karna hai
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Background Image/Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1489599808088-8a1a1a1a1a1a?auto=format&fit=crop&w=2070&q=80')`
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Title */}
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white leading-tight"
              >
                Our <span className="text-yellow-400">Venues</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                Discover our premium venues across India - from drive-in cinemas to rooftop experiences
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 text-white"
            >
              <div className="flex items-center gap-2">
                <MapPin className="text-yellow-400" size={24} />
                <span className="text-lg font-semibold">20+ Cities</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" size={24} />
                <span className="text-lg font-semibold">50+ Venues</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div>
              <button 
                onClick={handleScroll}
                className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Venues
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Dummy Content so scroll works */}
      
    </div>
  );
};

export default VenuesHero;
