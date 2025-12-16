import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import EventsSection from '../components/EventsSection';
import AboutSection from '../components/AboutSection';
import ExperienceSection from '../components/ExperienceSection';
import TrustBadges from '../components/TrustBadges';
import Testimonials from '../components/Testimonials';
import { generateOrganizationStructuredData, generateWebsiteStructuredData } from '../utils/structuredData';
import { motion } from 'framer-motion';

const Home = () => {
  const structuredData = [
    generateOrganizationStructuredData(),
    generateWebsiteStructuredData()
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="EventWeb - Premium Open-Air Cinema & Event Booking | India's #1"
        description="Experience movies under the stars at India's premier open-air and drive-in cinema events. Book tickets online with secure payment, 24/7 support, and best-price guarantee. Rated 4.9/5 by 50,000+ movie lovers."
        keywords="open air cinema, drive in movies, outdoor movie screening, movie under the stars, premium cinema experience, secure ticket booking, Mumbai events, Delhi NCR, Bangalore, Hyderabad, Chennai, Kolkata, Pune, movie night, outdoor entertainment"
        structuredData={structuredData}
      />
      <Hero />
      <TrustBadges />
      <EventsSection />
      <Testimonials />
      <AboutSection />
      <ExperienceSection />
      
      {/* Trust Seals Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-lg font-medium text-gray-500">TRUSTED BY LEADING BRANDS</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
            {['Netflix', 'Amazon Prime', 'Hotstar', 'Sony Pictures', 'Yash Raj Films'].map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0.6, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <span className="text-xl font-bold text-gray-700">{brand}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
