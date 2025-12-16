import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PrivateScreening = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    numberOfPeople: '',
    preferredDate: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send formData to server / API
    console.log('Private Screening Request:', formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-[50vh] sm:min-h-[60vh] bg-cover bg-center" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-yellow-400 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Private Screening Request
          </motion.h1>
        </div>
      </div>

      {/* Info / Instructions */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-4 sm:space-y-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base sm:text-lg text-gray-300"
        >
          Organize a private screening for your group or company at some of the best venues in your city. Fill up the form below and we'll get back to you with some exciting options.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-gray-400 text-sm sm:text-base"
        >
          <p><strong>Note:</strong> Minimum <u>20 people</u> required for private screening request.</p>
          <p><strong>Minimum Booking Amount:</strong> ₹ 30,000 + GST. </p>
        </motion.div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-16">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-green-600 to-green-500 p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Thank You!</h2>
              <p className="text-white text-base sm:text-lg">
                Your request has been sent. We'll get back to you soon with private screening options.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-700"
          >
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base" htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-600 text-white px-3 sm:px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:bg-gray-800 transition-all duration-300 placeholder-gray-400 min-h-[44px]"
                    placeholder="Enter your full name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base" htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-600 text-white px-3 sm:px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:bg-gray-800 transition-all duration-300 placeholder-gray-400 min-h-[44px]"
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base" htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-600 text-white px-3 sm:px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:bg-gray-800 transition-all duration-300 placeholder-gray-400 min-h-[44px]"
                    placeholder="+91 98765 43210"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base" htmlFor="city">City</label>
                  <select
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-600 text-white px-3 sm:px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:bg-gray-800 transition-all duration-300 min-h-[44px]"
                  >
                    <option value="">Select City</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Pune">Pune</option>
                    <option value="Chandigarh">Chandigarh</option>
                  </select>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base" htmlFor="numberOfPeople">Number of People</label>
                  <input
                    type="number"
                    name="numberOfPeople"
                    id="numberOfPeople"
                    min="20"
                    value={formData.numberOfPeople}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-600 text-white px-3 sm:px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:bg-gray-800 transition-all duration-300 placeholder-gray-400 min-h-[44px]"
                    placeholder="Minimum 20 people"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base" htmlFor="preferredDate">Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    id="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-800/50 border border-gray-600 text-white px-3 sm:px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:bg-gray-800 transition-all duration-300 min-h-[44px]"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label className="block text-gray-300 mb-2 font-medium text-sm sm:text-base" htmlFor="message">Message / Special Requests</label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-gray-800/50 border border-gray-600 text-white px-3 sm:px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:bg-gray-800 transition-all duration-300 placeholder-gray-400 resize-none min-h-[100px]"
                  placeholder="Any special requirements or requests?"
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl min-h-[44px]"
              >
                Submit Request
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </div>

      {/* Contact info & Footer */}
      <div className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h3 className="text-xl font-bold text-white">sunShineScreening</h3>
          <p>For Customer Queries: <a href="mailto:shinescreening@gmail.com" className="underline">shinescreening@gmail.com</a></p>
          <p>Phone: </p>
          <p>Cities: Mumbai · Bangalore · Hyderabad · Delhi NCR · Pune · Chandigarh</p>
        </div>
      </div>
    </div>
  );
};

export default PrivateScreening;
