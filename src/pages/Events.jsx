import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import EventsHero from '../components/EventsHero';
import FilterBar from '../components/FilterBar';
import EventsGrid from '../components/EventsGrid';
import { useEventContext } from '../context/EventContext';
import { assignDynamicDates } from '../utils/dateUtils';
import { eventsData } from '../data/eventsData'; // Import raw data as a fallback
import { generateEventStructuredData, generateBreadcrumbStructuredData } from '../utils/structuredData';

const Events = () => {
  const { events: contextEvents, dynamicEvents } = useEventContext();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Combine static and dynamic events, removing duplicates by ID
    const allEvents = [...contextEvents];
    const dynamicEventIds = new Set(contextEvents.map(event => event.id));
    
    // Add dynamic events that aren't already in the static events
    dynamicEvents.forEach(event => {
      if (!dynamicEventIds.has(event.id)) {
        allEvents.push(event);
      }
    });
    
    const eventsWithDates = assignDynamicDates(allEvents);
    setEvents(eventsWithDates);
    setFilteredEvents(eventsWithDates);
  }, [contextEvents, dynamicEvents]);

  const handleFilterChange = (filters) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filtered = events;

      // Apply search filter
      if (filters.search) {
        filtered = filtered.filter(event =>
          event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          event.description.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      // Apply city filter
      if (filters.city !== 'All') {
        filtered = filtered.filter(event => event.city === filters.city);
      }

      // Apply type filter
      if (filters.type !== 'All') {
        filtered = filtered.filter(event => event.type === filters.type);
      }

      // Apply date filter (simplified)
      if (filters.date !== 'All') {
        // This would need more sophisticated date filtering in a real app
        filtered = filtered.filter(event => {
          const eventDate = new Date(event.date);
          const today = new Date();
          
          switch (filters.date) {
            case 'Today':
              return eventDate.toDateString() === today.toDateString();
            case 'This Week':
              const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
              return eventDate >= today && eventDate <= weekFromNow;
            case 'This Month':
              return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();
            case 'Next Month':
              const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
              const endOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
              return eventDate >= nextMonth && eventDate <= endOfNextMonth;
            default:
              return true;
          }
        });
      }

      setFilteredEvents(filtered);
      setLoading(false);
    }, 500);
  };

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' }
  ];

  const structuredData = [
    generateBreadcrumbStructuredData(breadcrumbs),
    ...filteredEvents.slice(0, 5).map(event => generateEventStructuredData(event))
  ];

  return (
    <div className="min-h-screen bg-black">
      <SEO
        title="Events - Premium Movie Screenings & Entertainment | EventWeb"
        description="Discover and book premium events, movie screenings, and entertainment experiences. Browse upcoming events in Mumbai and book your tickets for exclusive screenings and live events."
        keywords="events, movie screenings, entertainment, premium events, cinema booking, live events, Mumbai events, event tickets"
        url={`${window.location.origin}/events`}
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <EventsHero />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filter Bar */}
        <FilterBar onFilterChange={handleFilterChange} />
        
        {/* Events Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              Upcoming Events
              <span className="block text-yellow-400 text-lg font-normal">
                {filteredEvents.length} events found
              </span>
            </h2>
          </div>
          
          <EventsGrid events={filteredEvents} loading={loading} />
        </motion.div>
      </div>
    </div>
  );
};

export default Events;
