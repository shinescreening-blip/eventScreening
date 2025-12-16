import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    city: 'All',
    date: 'All',
    type: 'All'
  });

  const cities = ['All', 'Delhi NCR', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune', 'Chandigarh'];
  const dates = ['All', 'Today', 'This Week', 'This Month', 'Next Month'];
  const types = ['All', 'Drive-in', 'Open Air', 'Private Screening', 'Special Event'];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 mb-12 shadow-2xl"
    >
      <div className="flex items-center mb-6">
        <Filter className="text-yellow-400 mr-2" size={24} />
        <h3 className="text-xl font-bold text-white">Filter Events</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search events..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-full border border-gray-600 focus:border-yellow-400 focus:outline-none transition-colors duration-300"
          />
        </div>

        {/* City Filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-full border border-gray-600 focus:border-yellow-400 focus:outline-none transition-colors duration-300 appearance-none"
          >
            {cities.map((city) => (
              <option key={city} value={city} className="bg-gray-800">
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-full border border-gray-600 focus:border-yellow-400 focus:outline-none transition-colors duration-300 appearance-none"
          >
            {dates.map((date) => (
              <option key={date} value={date} className="bg-gray-800">
                {date}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-full border border-gray-600 focus:border-yellow-400 focus:outline-none transition-colors duration-300 appearance-none"
          >
            {types.map((type) => (
              <option key={type} value={type} className="bg-gray-800">
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            const resetFilters = { search: '', city: 'All', date: 'All', type: 'All' };
            setFilters(resetFilters);
            onFilterChange(resetFilters);
          }}
          className="text-gray-400 hover:text-yellow-400 transition-colors duration-300 text-sm"
        >
          Clear all filters
        </button>
      </div>
    </motion.div>
  );
};

export default FilterBar;
