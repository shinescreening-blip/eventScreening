import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const EventCard = ({ event, index }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    console.log('Buy Ticket clicked for event:', event.id, event.title);
    navigate(`/ticket-booking/${event.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-2xl hover:shadow-yellow-400/20 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        {/* Event Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
            {event.type}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-black/80 text-white px-3 py-1 rounded-full text-sm font-semibold">
            ₹{event.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
          {event.title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-400 text-sm">
            <Calendar size={16} className="mr-2 text-yellow-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Clock size={16} className="mr-2 text-yellow-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <MapPin size={16} className="mr-2 text-yellow-400" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Users size={16} className="mr-2 text-yellow-400" />
            <span>{event.capacity} seats available</span>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={handleBookNow}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-yellow-400 text-black py-3 px-6 rounded-full font-bold hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-yellow-400/30"
        >
          Buy Ticket
        </motion.button>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </motion.div>
  );
};

export default EventCard;
