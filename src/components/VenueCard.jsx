import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building, Star, ArrowLeft, Clock, Phone, Mail, Wifi, Car, Coffee, Users } from 'lucide-react';

const VenueCard = ({ venue }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const flipCard = () => setIsFlipped(true);
  const flipBack = () => setIsFlipped(false);

  // Handle click outside to flip back
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target) && isFlipped) {
        flipBack();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFlipped]);
  const getTypeColor = (type) => {
    const colors = {
      'Drive-In': 'bg-blue-100 text-blue-800',
      'Mall': 'bg-purple-100 text-purple-800',
      'Hotel': 'bg-green-100 text-green-800',
      'Rooftop': 'bg-orange-100 text-orange-800',
      'Brewery': 'bg-amber-100 text-amber-800',
      'Club': 'bg-pink-100 text-pink-800',
      'Restaurant': 'bg-red-100 text-red-800',
      'Cafe': 'bg-yellow-100 text-yellow-800',
      'Lawn': 'bg-emerald-100 text-emerald-800',
      'Amphitheatre': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const operatingHours = {
    'Drive-In': 'Shows: 7:00 PM - 11:00 PM',
    'Mall': 'Open: 10:00 AM - 10:00 PM',
    'Hotel': 'Check-in: 3:00 PM - 11:00 PM',
    'Rooftop': 'Open: 6:00 PM - 2:00 AM',
    'Brewery': 'Open: 12:00 PM - 1:00 AM',
    'Club': 'Open: 8:00 PM - 3:00 AM',
    'Restaurant': 'Open: 11:00 AM - 11:00 PM',
    'Cafe': 'Open: 8:00 AM - 10:00 PM',
    'Lawn': 'Events: 6:00 PM - 12:00 AM',
    'Amphitheatre': 'Shows: 7:00 PM - 11:00 PM'
  };

  const amenities = [
    { icon: Car, label: 'Parking' },
    { icon: Wifi, label: 'WiFi' },
    { icon: Coffee, label: 'F&B' },
    { icon: Users, label: 'Groups' }
  ];

  return (
    <div 
      ref={cardRef}
      className="relative w-full h-[500px] perspective-1000"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          rotateY: isFlipped ? 180 : 0
        }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ y: isFlipped ? 0 : -5 }}
        className="relative w-full h-full preserve-3d cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div 
          className={`absolute inset-0 w-full h-full backface-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${isFlipped ? 'pointer-events-none' : ''}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Venue Image */}
          <div className="h-48 relative overflow-hidden">
            <img 
              src={venue.image} 
              alt={venue.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE2MFYxNDBIMTc1VjEyNVoiIGZpbGw9IiM5Q0E0QUYiLz4KPHA+dGggZD0iTTIyNSAxMjVIMjEwVjE0MEgyMjVWMTI1WiIgZmlsbD0iIzlDQTRBRiIvPgo8cGF0aCBkPSJNMjAwIDEwMEgxODVWMTE1SDIwMFYxMDBaIiBmaWxsPSIjOUNBNEFGIi8+CjwvZz4KPC9zdmc+';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(venue.type)}`}>
                {venue.type}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">Premium Venue</span>
              </div>
            </div>
          </div>

          {/* Venue Content */}
          <div className="p-6">
            <div className="space-y-3">
              {/* Venue Name */}
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                {venue.name}
              </h3>

              {/* Address */}
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <div className="text-gray-600 text-sm leading-relaxed">
                  <p>{venue.address}</p>
                  <p className="font-medium text-gray-800">{venue.city}, {venue.state} - {venue.pincode}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {venue.description}
              </p>

              {/* Venue Type Badge */}
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{venue.type} Venue</span>
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={flipCard}
              className="w-full mt-4 bg-yellow-400 text-black py-2 px-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-300"
            >
              View Details
            </motion.button>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className={`absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-xl text-white overflow-hidden ${!isFlipped ? 'pointer-events-none' : ''}`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-r from-yellow-400/20 to-transparent p-4">
            <button
              onClick={flipBack}
              className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(venue.type)}`}>
                {venue.type}
              </span>
            </div>
            <div className="absolute bottom-4 left-4">
              <h3 className="text-lg font-bold text-white">{venue.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">4.5 Rating</span>
              </div>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-4 space-y-4 h-[calc(100%-8rem)] overflow-y-auto">
            {/* Location */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-gray-300">{venue.address}</p>
                  <p className="text-white font-medium">{venue.city}, {venue.state}</p>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold">Operating Hours</span>
              </div>
              <p className="text-xs text-gray-300">{operatingHours[venue.type] || 'Contact for details'}</p>
            </div>

            {/* Amenities */}
            <div>
              <h4 className="text-sm font-semibold mb-2 text-yellow-400">Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <amenity.icon className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-gray-300">{amenity.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white/10 rounded-lg p-3">
              <h4 className="text-sm font-semibold mb-2 text-yellow-400">Contact</h4>
              <div className="space-y-1">
                
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-gray-300">shinescreening@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VenueCard;
