import React from 'react';
import { motion } from 'framer-motion';

const EventsHero = () => {
  return (
    <section className="relative h-[60vh] bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg "width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg%3E%3Cg"  fillRule="evenodd%3E%3Cg" fill="%23ffffff" fillOpacity="0.1%3E%3Ccircle" cx="30" cy="30" r="2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')">
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                <span className="block text-yellow-400">Events</span>
                <span className="block">Delhi NCR</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Experience immersive cinema under the stars at our drive-in and open-air venues
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Book Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300">
                View Venues
              </button>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-10 text-yellow-400 text-6xl opacity-20"
            >
              🎬
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/3 right-10 text-yellow-400 text-4xl opacity-20"
            >
              🍿
            </motion.div>
            <motion.div
              animate={{ y: [-5, 15, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 left-20 text-yellow-400 text-5xl opacity-20"
            >
              🌟
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsHero;
