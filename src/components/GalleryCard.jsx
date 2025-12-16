import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Eye, Heart } from 'lucide-react';

const GalleryCard = ({ photo }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={photo.image}
          alt={photo.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isHovered ? 'opacity-40' : 'opacity-0'
        }`}></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
            {photo.category}
          </span>
        </div>
        
        {/* Like Button */}
        <motion.button
          onClick={handleLike}
          className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart 
            className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} 
          />
        </motion.button>
        
        {/* View Button */}
        <motion.div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </motion.button>
        </motion.div>
      </div>

      {/* Photo Info */}
      <div className="p-6">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
            {photo.title}
          </h3>

          {/* Venue */}
          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="text-gray-600 text-sm">
              <p className="font-medium">{photo.venue}</p>
              <p className="text-gray-500">{photo.city}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{formatDate(photo.date)}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {photo.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryCard;
