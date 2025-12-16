import React from 'react';
import SEO from '../components/SEO';
import { generateBreadcrumbStructuredData, generateOrganizationStructuredData } from '../utils/structuredData';

const About = () => {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' }
  ];

  const structuredData = [
    generateBreadcrumbStructuredData(breadcrumbs),
    generateOrganizationStructuredData()
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About EventWeb - Premium Event Management Platform"
        description="Learn about EventWeb, your premier destination for premium event booking, movie screenings, and venue management. Discover our mission to connect communities through exceptional experiences."
        keywords="about eventweb, event management company, premium events, movie screening platform, venue booking service"
        url={`${window.location.origin}/about`}
        structuredData={structuredData}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            About EventWeb
          </h1>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              EventWeb is your premier destination for discovering and managing events. 
              Whether you're looking for concerts, conferences, workshops, or social gatherings, 
              we connect you with amazing experiences happening in your community.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
                <p className="text-gray-600">
                  To make event discovery effortless and help communities come together 
                  through shared experiences.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
                <p className="text-gray-600">
                  To be the leading platform that connects people with events that 
                  inspire, educate, and entertain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
