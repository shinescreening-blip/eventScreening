import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import VenuesHero from '../components/VenuesHero';
import CitySelector from '../components/CitySelector';
import VenuesGrid from '../components/VenuesGrid';
import { venuesData } from '../data/venuesData';
import { generateVenueStructuredData, generateBreadcrumbStructuredData } from '../utils/structuredData';

const Venues = () => {
  const navigate = useNavigate();
  const [filteredVenues, setFilteredVenues] = useState(venuesData);
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [loading, setLoading] = useState(false);

  // Get unique cities from venues data
  const cities = ['All Cities', ...new Set(venuesData.map(venue => venue.city))];

  const handleCityChange = (city) => {
    setLoading(true);
    setSelectedCity(city);
    
    // Simulate API call delay
    setTimeout(() => {
      if (city === 'All Cities') {
        setFilteredVenues(venuesData);
      } else {
        const filtered = venuesData.filter(venue => venue.city === city);
        setFilteredVenues(filtered);
      }
      setLoading(false);
    }, 500);
  };

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Venues', path: '/venues' }
  ];

  const structuredData = [
    generateBreadcrumbStructuredData(breadcrumbs),
    ...filteredVenues.slice(0, 5).map(venue => generateVenueStructuredData(venue))
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Premium Venues - Event Spaces & Cinema Halls | EventWeb"
        description="Discover and book premium venues for events, private screenings, and special occasions. Browse luxury event spaces, cinema halls, and venues across Mumbai and India."
        keywords="premium venues, event spaces, cinema halls, venue booking, private screening venues, luxury venues, event halls, Mumbai venues"
        url={`${window.location.origin}/venues`}
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <VenuesHero />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Select Your City
              </h2>
              <p className="text-gray-600">
                Choose from our premium venues across India
              </p>
            </div>
            
            <CitySelector
              selectedCity={selectedCity}
              onCityChange={handleCityChange}
              cities={cities}
            />
          </div>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedCity === 'All Cities' ? 'All Venues' : `${selectedCity} Venues`}
              </h3>
              <p className="text-gray-600">
                {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            {selectedCity !== 'All Cities' && (
              <motion.button
                onClick={() => handleCityChange('All Cities')}
                className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Cities
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Venues Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <VenuesGrid venues={filteredVenues} loading={loading} />
        </motion.div>

        {/* Call to Action */}
        {!loading && filteredVenues.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-black">
              <h3 className="text-2xl font-bold mb-4">
                Can't find what you're looking for?
              </h3>
              <p className="text-lg mb-6">
                We're constantly adding new venues. Contact us to suggest a location or get updates on new venues in your city.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Venues;
