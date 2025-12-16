import React from 'react';
import { motion } from 'framer-motion';
import UniversalEventCard from './UniversalEventCard';

const EventsGrid = ({ events, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-xl h-96 animate-pulse">
            <div className="h-64 bg-gray-700 rounded-t-xl"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              <div className="h-10 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-2xl font-bold text-white mb-4">No Events Found</h3>
        <p className="text-gray-400 mb-8">
          We couldn't find any events matching your criteria. Try adjusting your filters.
        </p>
        <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors duration-300">
          View All Events
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {events.map((event, index) => (
        <UniversalEventCard key={event.id} event={event} index={index} variant="dark" />
      ))}
    </motion.div>
  );
};

export default EventsGrid;
