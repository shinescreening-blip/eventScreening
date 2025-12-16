import React from 'react';
import { motion } from 'framer-motion';

const ExperienceSection = () => {

  const experiences = [
    {
      title: "Drive-in Cinema",
      description: "Experience movies from the comfort of your car",
      icon: "",
      features: ["Personal audio", "Food delivery", "Privacy"]
    },
    {
      title: "Open Air Venues",
      description: "Watch under the stars at beautiful outdoor locations",
      icon: "",
      features: ["Rooftop screenings", "Beach venues", "Garden settings"]
    },
    {
      title: "Gourmet Cinema",
      description: "Fine dining experience with curated movie screenings",
      icon: "",
      features: ["Chef's menu", "Wine pairing", "Premium seating"]
    },
    {
      title: "Private Screenings",
      description: "Host exclusive events for your group",
      icon: "",
      features: ["Custom venues", "Group bookings", "Corporate events"]
    }
  ];


  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Request a Screening
            <span className="block text-yellow-400">For Your Group</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We organize private screenings for big groups at some of the best venues in town
          </p>
        </motion.div>

        {/* Experience Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-300"
            >
              <div className="text-4xl mb-4">{experience.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-400">
                {experience.title}
              </h3>
              <p className="text-gray-300 mb-4">
                {experience.description}
              </p>
              <ul className="space-y-2">
                {experience.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-400">
                    <div className="w-1 h-1 bg-yellow-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
