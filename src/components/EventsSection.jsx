import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEventContext } from '../context/EventContext';
import UniversalEventCard from './UniversalEventCard';

const EventsSection = () => {
  const navigate = useNavigate();
  const { getHomePageEvents } = useEventContext();
  const processedEventIds = useRef(new Set());

  // Helper to apply seat logic
  // Helper to apply seat logic based on time of day
  const enhanceEventsWithSeats = React.useCallback((events) => {
    return events.map(event => {
      const now = new Date();
      const currentHour = now.getHours(); // 0-23
      
      let min, max;
      
      if (currentHour >= 20 || currentHour < 0) { 
        // 8:00 PM to 12:00 AM (Handling 12 AM as start of next day logic usually, but user said 8PM-12AM)
        // Adjusting logic: 
        // 20, 21, 22, 23 -> 15-20
        min = 15; max = 20;
      } 
      
      if (currentHour >= 20 && currentHour <= 23) {
         min = 15; max = 20;
      } else if (currentHour >= 0 && currentHour < 4) {
         min = 10; max = 15;
      } else if (currentHour >= 4 && currentHour < 13) {
         min = 5; max = 10;
      } else {
         // 13 (1 PM) to 20 (8 PM)
         min = 2; max = 5;
      }
      
      const seats = Math.floor(Math.random() * (max - min + 1)) + min;
      
      return {
        ...event,
        displayCapacity: `${seats} seats available`
      };
    });
  }, []);

  const [featuredEvents, setFeaturedEvents] = useState(() => enhanceEventsWithSeats(getHomePageEvents()));

  const handleViewMoreEvents = () => {
    navigate('/events');
  };

  useEffect(() => {
    setFeaturedEvents(enhanceEventsWithSeats(getHomePageEvents()));
  }, [getHomePageEvents, enhanceEventsWithSeats]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
            Upcoming Events
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Experience movies like never before at our immersive cinema venues
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12"
          layout
        >
          <AnimatePresence mode="popLayout">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                <UniversalEventCard event={event} index={index} variant="home" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button 
            onClick={handleViewMoreEvents}
            className="w-full sm:w-auto bg-black text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 min-h-[44px]"
          >
            View More Events
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
