import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ isLoading, progress = 0 }) => {
  const [displayText, setDisplayText] = useState('Loading');

  // Animate the loading text
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setDisplayText(prev => {
        if (prev === 'Loading...') return 'Loading';
        if (prev === 'Loading') return 'Loading.';
        if (prev === 'Loading.') return 'Loading..';
        return 'Loading...';
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center">
            {/* Logo/Brand */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                sunShineScreening
              </h1>
              <p className="text-gray-300 text-lg">
                Immersive Cinema Experience
              </p>
            </motion.div>

            {/* Spinner */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <div className="relative w-20 h-20 mx-auto">
                {/* Outer Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-transparent border-t-yellow-400 border-r-yellow-400 rounded-full"
                ></motion.div>
                
                {/* Inner Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-2 border-transparent border-b-yellow-400/60 border-l-yellow-400/60 rounded-full"
                ></motion.div>

                {/* Center Dot */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                ></motion.div>
              </div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-6"
            >
              <p className="text-2xl font-semibold text-white mb-2">
                {displayText}
              </p>
              <p className="text-gray-400">
                Preparing your cinema experience
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="w-full max-w-md mx-auto"
            >
              <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full relative"
                >
                  {/* Progress Bar Shine Effect */}
                  <motion.div
                    animate={{ x: [-100, 200] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-20 skew-x-12"
                  ></motion.div>
                </motion.div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-400">
                <span>0%</span>
                <span className="font-semibold text-yellow-400">{Math.round(progress)}%</span>
                <span>100%</span>
              </div>
            </motion.div>

            {/* Floating Cinema Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ 
                  y: [-20, 20, -20],
                  rotate: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-1/4 left-1/4 text-4xl opacity-20"
              >
                🎬
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [20, -20, 20],
                  rotate: [0, -5, 0, 5, 0]
                }}
                transition={{ 
                  duration: 3.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-3/4 right-1/4 text-3xl opacity-20"
              >
                🍿
              </motion.div>

              <motion.div
                animate={{ 
                  y: [-15, 15, -15],
                  x: [-10, 10, -10]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute bottom-1/4 left-1/3 text-2xl opacity-20"
              >
                🎭
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
