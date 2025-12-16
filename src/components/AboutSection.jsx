import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, MapPin, Calendar } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <Star className="w-8 h-8" />,
      title: "Immersive Experience",
      description: "Watch movies under the stars at our drive-in and open-air venues"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Join a community of cinema lovers across India"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Multiple Locations",
      description: "Experience screenings in Mumbai, Bangalore, Delhi NCR, and more"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Regular Events",
      description: "From commercial hits to cult classics, we screen it all"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              The New Destination
              <span className="block text-yellow-400">For Cinema</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Watch movies you've missed watching on the big screen. We bring you 
              immersive cinema experiences at unique venues across India.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-4"></div>
                <span className="text-gray-700">Drive-in cinema experiences</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-4"></div>
                <span className="text-gray-700">Open-air screenings under the stars</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-4"></div>
                <span className="text-gray-700">Gourmet dining with movies</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-4"></div>
                <span className="text-gray-700">Private screening options</span>
              </div>
            </div>
            
          </motion.div>

          {/* Right Side - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 rounded-2xl overflow-hidden flex items-center justify-center">
  {/* Background video iframe */}
  <iframe
    id="about-youtube-video"
    className="absolute top-0 left-0 w-full h-full object-cover"
    src="https://www.youtube.com/embed/XWYBf4YT5kM?autoplay=1&loop=1&playlist=XWYBf4YT5kM&mute=1&controls=0&modestbranding=1&showinfo=0&enablejsapi=1"
    title="Cinema Under The Stars"
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
    data-loading-priority="high"
  ></iframe>

  {/* Overlay content */}
  <div className="relative text-center text-white z-10">
  </div>

  {/* Optional overlay gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/60 to-black/60"></div>
</div>

            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-yellow-400 text-black w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            >
              🍿
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-yellow-400 text-black w-12 h-12 rounded-full flex items-center justify-center text-xl"
            >
              ⭐
            </motion.div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              <div className="text-yellow-400 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
