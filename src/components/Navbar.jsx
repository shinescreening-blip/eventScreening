import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin } from 'lucide-react';
import JoinClubModal from './JoinClubModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Delhi NCR');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const cities = ['Mumbai', 'Bangalore', 'Hyderabad', 'Delhi NCR', , 'Chandigarh'];
  const navLinks = ['Home', 'Events', 'Venues', 'Private Screening', 'FAQs', 'Gift Card'];

  const linkToPath = {
    'Home': '/',
    'Events': '/events',
    'Venues': '/venues',
    'Gallery': '/gallery',
    'Private Screening': '/private-screening',
    'FAQs': '/faq',
    'Gift Card': '/gift-card',
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-yellow-400">
              SCC
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((label) => (
              <Link
                key={label}
                to={linkToPath[label]}
                className="text-white hover:text-yellow-400 transition-colors duration-300 text-sm xl:text-base"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop City Selector & CTA */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            
            <button onClick={openModal} className="bg-yellow-400 text-black px-4 xl:px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors duration-300 text-sm xl:text-base">
              Join The Club
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-yellow-400 transition-colors duration-300 p-2"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-gray-800 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                {navLinks.map((label, index) => (
                  <motion.div
                    key={label}
                    className="min-h-[44px]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={linkToPath[label]}
                      className="block px-4 py-3 text-white hover:text-yellow-400 transition-colors duration-300 rounded-lg hover:bg-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile City Selector */}
                <div className="px-4 py-3">
                  <label className="block text-sm text-gray-400 mb-2">Select City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 min-h-[44px]"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city} className="bg-black">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Mobile CTA Button */}
                <div className="px-4 py-3">
                  <button onClick={() => { openModal(); setIsMenuOpen(false); }} className="w-full inline-block text-center bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-300 min-h-[44px]">
                    Join The Club
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
          <JoinClubModal isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
};

export default Navbar;
