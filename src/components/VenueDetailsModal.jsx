import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Building, Star, Clock, Phone, Mail, Wifi, Car, Coffee, Users } from 'lucide-react';

const VenueDetailsModal = ({ venue, isOpen, onClose }) => {
  if (!venue) return null;

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

  const amenities = [
    { icon: Car, label: 'Parking Available' },
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Coffee, label: 'Food & Beverages' },
    { icon: Users, label: 'Group Bookings' }
  ];

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Image */}
            <div className="relative h-64 md:h-80">
              <img 
                src={venue.image} 
                alt={venue.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDE2MFYxNDBIMTc1VjEyNVoiIGZpbGw9IiM5Q0E0QUYiLz4KPHA+dGggZD0iTTIyNSAxMjVIMjEwVjE0MEgyMjVWMTI1WiIgZmlsbD0iIzlDQTRBRiIvPgo8cGF0aCBkPSJNMjAwIDEwMEgxODVWMTE1SDIwMFYxMDBaIiBmaWxsPSIjOUNBNEFGIi8+CjwvZz4KPC9zdmc+';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Venue Type Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getTypeColor(venue.type)}`}>
                  {venue.type}
                </span>
              </div>

              {/* Rating */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.5</span>
                </div>
                <span className="text-sm opacity-90">Premium Venue</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 max-h-[calc(90vh-20rem)] overflow-y-auto">
              {/* Venue Name and Location */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{venue.name}</h2>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                  <div className="text-gray-600">
                    <p className="leading-relaxed">{venue.address}</p>
                    <p className="font-medium text-gray-800 mt-1">
                      {venue.city}, {venue.state} - {venue.pincode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">About This Venue</h3>
                <p className="text-gray-600 leading-relaxed">
                  {venue.description} This venue offers an exceptional cinema experience with 
                  state-of-the-art facilities and comfortable seating arrangements. Perfect for 
                  both intimate gatherings and large events, providing memorable entertainment 
                  experiences for all guests.
                </p>
              </div>

              {/* Venue Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Operating Hours */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">Operating Hours</h4>
                  </div>
                  <p className="text-gray-600">{operatingHours[venue.type] || 'Contact for details'}</p>
                  <p className="text-sm text-gray-500 mt-1">Hours may vary on holidays</p>
                </div>

                {/* Venue Type */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">Venue Type</h4>
                  </div>
                  <p className="text-gray-600">{venue.type} Venue</p>
                  <p className="text-sm text-gray-500 mt-1">Specialized cinema experience</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities & Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <amenity.icon className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-yellow-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">shinescreening@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-yellow-400 text-black py-3 px-6 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-300"
                >
                  Book Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors duration-300"
                >
                  Add to Favorites
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VenueDetailsModal;
