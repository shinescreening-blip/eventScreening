import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, CheckCircle } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  
  const cities = ['Mumbai', 'Bangalore', 'Hyderabad', 'Delhi NCR', 'Pune', 'Chandigarh'];
  
  // Quick Links with their corresponding routes
  const quickLinksData = [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/contact' }, // Redirect to contact for now
    { name: 'FAQs', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/contact' } // Redirect to contact for now
  ];
  
  const socialLinks = [
    { icon: <Facebook size={20} />, href: 'https://www.facebook.com/', label: 'Facebook' },
    
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/', label: 'Instagram' },
    { icon: <Youtube size={20} />, href: 'https://www.youtube.com/', label: 'YouTube' }
  ];

  // Handle city navigation - redirect to events page with city filter
  const handleCityClick = (city) => {
    console.log('Navigating to events with city:', city);
    navigate('/events', { state: { selectedCity: city } });
  };

  // Handle quick link navigation
  const handleQuickLinkClick = (path) => {
    console.log('Navigating to:', path);
    navigate(path);
  };

  // Handle contact actions
  const handleEmailClick = () => {
    window.location.href = 'mailto:shinescreening@gmail.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+912248930438';
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gray-900 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">
              LET'S STAY IN TOUCH
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Sign up to receive news and updates
            </p>
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleEmailSubmit}
                  className="max-w-md mx-auto"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-4 py-3 rounded-full bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                    />
                    <button 
                      type="submit"
                      className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      Keep Me Informed
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">
                    We respect your privacy
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="max-w-md mx-auto text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4"
                  >
                    <CheckCircle size={32} className="text-white" />
                  </motion.div>
                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    className="text-xl font-semibold text-white mb-2"
                  >
                    Email has been sent!
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="text-gray-300"
                  >
                    We will reach you soon.
                  </motion.p>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6, duration: 4.4 }}
                    className="h-1 bg-yellow-400 rounded-full mt-4 mx-auto max-w-xs"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => handleQuickLinkClick('/')}
                className="inline-block text-2xl font-bold text-yellow-400 mb-4 hover:text-yellow-300 transition-colors duration-300 cursor-pointer"
              >
                sunShineScreening
              </button>
              <p className="text-gray-300 mb-6">
                India's only immersive cinema experience. We screen movies at drive-in 
                and open-air venues across India.
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleEmailClick}
                  className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors duration-300 cursor-pointer group"
                >
                  <Mail size={16} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span>shinescreening@gmail.com</span>
                </button>
                
              </div>
            </motion.div>

            {/* Cities */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Our Cities</h4>
              <div className="grid grid-cols-2 gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCityClick(city)}
                    className="text-left text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:translate-x-1 cursor-pointer"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {quickLinksData.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleQuickLinkClick(link.path)}
                    className="block w-full text-left text-gray-300 hover:text-yellow-400 transition-all duration-300 transform hover:translate-x-1 cursor-pointer"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <div className="text-gray-300">
                <p className="mb-2">Catch Our Screenings in:</p>
                <p className="text-sm">
                  Bangalore | Chandigarh | Delhi NCR | Hyderabad | Mumbai | Pune
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-gray-800 py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © Copyright 2017-25 sunShineScreening
            </div>
            <div className="text-gray-400 text-sm">
              Developed By: Mahesh Bhanushali
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
