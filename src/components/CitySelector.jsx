import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronDown } from 'lucide-react';

const CitySelector = ({ selectedCity, onCityChange, cities }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCitySelect = (city) => {
    onCityChange(city);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 min-w-[200px]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <MapPin className="w-5 h-5 text-yellow-600" />
        <span className="text-gray-800 font-semibold flex-1 text-left">
          {selectedCity}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </motion.div>
      </motion.button>

      {/* Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-60 overflow-y-auto"
        >
          {cities.map((city) => (
            <motion.button
              key={city}
              onClick={() => handleCitySelect(city)}
              className={`w-full px-6 py-3 text-left hover:bg-yellow-50 transition-colors duration-200 ${
                selectedCity === city ? 'bg-yellow-100 text-yellow-800 font-semibold' : 'text-gray-700'
              }`}
              whileHover={{ backgroundColor: '#fef3c7' }}
            >
              {city}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default CitySelector;
