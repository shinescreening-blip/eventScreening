import React, { createContext, useContext, useState, useEffect } from 'react';
import { eventsData } from '../data/eventsData';
import { generateDynamicEvents, shouldRefreshEvents } from '../data/dynamicEventsData';

export const EventContext = createContext();

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(eventsData);
  const [dynamicEvents, setDynamicEvents] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Helper to generate and save events
  const generateAndSaveEvents = (now) => {
    console.log('Generating new dynamic events');
    const newDynamicEvents = generateDynamicEvents();
    setDynamicEvents(newDynamicEvents);
    const timestamp = now.toISOString();
    setLastRefresh(timestamp);
    
    localStorage.setItem('lastEventRefresh', timestamp);
    localStorage.setItem('cachedDynamicEvents', JSON.stringify(newDynamicEvents));
  };

  // Helper to force refresh events (useful for manual updates)
  const forceRefreshEvents = () => {
    console.log('Force refreshing events');
    localStorage.removeItem('lastEventRefresh');
    localStorage.removeItem('cachedDynamicEvents');
    const now = new Date();
    generateAndSaveEvents(now);
  };

  // Initial load effect - runs only once on mount
  useEffect(() => {
    const loadInitialEvents = () => {
      const storedRefresh = localStorage.getItem('lastEventRefresh');
      const storedEvents = localStorage.getItem('cachedDynamicEvents');
      
      if (storedRefresh && storedEvents) {
        try {
          const lastRefreshDate = new Date(storedRefresh);
          const now = new Date();
          const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
          
          const istTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + istOffset);
          const lastRefreshIST = new Date(lastRefreshDate.getTime() + (lastRefreshDate.getTimezoneOffset() * 60 * 1000) + istOffset);
          
          const isSameDay = (
            istTime.getDate() === lastRefreshIST.getDate() &&
            istTime.getMonth() === lastRefreshIST.getMonth() &&
            istTime.getFullYear() === lastRefreshIST.getFullYear()
          );

          const isAfter8PM = istTime.getHours() >= 20;
          const wasAfter8PM = lastRefreshIST.getHours() >= 20;

          // Cache is valid if:
          // 1. Same day AND (Current is < 8PM OR (Current >= 8PM AND Cache >= 8PM))
          // 2. Basically, if it's after 8PM, we need a refresh ONLY if cache is from before 8PM today.
          
          let isValid = false;
          if (isSameDay) {
            if (!isAfter8PM) {
               // Before 8 PM: Any cache from today is fine (assuming it was generated after 8PM previous day? 
               // actually logic suggests we rotate at 8PM. So if it's 2PM, cache from 10AM is fine.)
               isValid = true;
            } else {
               // After 8 PM: Cache must be from after 8 PM today
               if (wasAfter8PM) {
                 isValid = true;
               }
            }
          }

          if (isValid) {
            console.log('Using cached events from localStorage');
            setDynamicEvents(JSON.parse(storedEvents));
            setLastRefresh(storedRefresh);
            return;
          }
        } catch (e) {
          console.error("Error parsing cached events:", e);
        }
      }
      
      // If no valid cache, generate
      const now = new Date();
      generateAndSaveEvents(now);
    };
    
    loadInitialEvents();
  }, []); // Dependency array empty intentionally for mount only

  // Interval effect for checking updates
  useEffect(() => {
    const checkAndRefresh = () => {
      if (!lastRefresh) return;

      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60 * 1000) + istOffset);
      const isAfter8PM = istTime.getHours() >= 20;

      const lastRefreshDate = new Date(lastRefresh);
      const lastRefreshIST = new Date(lastRefreshDate.getTime() + (lastRefreshDate.getTimezoneOffset() * 60 * 1000) + istOffset);

      // Refresh if:
      // 1. It's after 8 PM and we haven't refreshed since 8 PM today
      // 2. It's a new day and after 8 PM (caught by date check usually, but redundant safety)
      const sameDay = istTime.getDate() === lastRefreshIST.getDate();
      
      const needsRefresh = (
        (isAfter8PM && lastRefreshIST.getHours() < 20 && sameDay) ||
        (!sameDay && isAfter8PM) // If it's a new day and past 8PM, definitely refresh. 
        // Note: If new day and < 8PM, we technically keep yesterday's 8PM batch? 
        // The original logic seemed to imply daily rotation at 8PM.
      );

      if (needsRefresh) {
        console.log('Refreshing events based on schedule');
        generateAndSaveEvents(now);
      }
    };

    const interval = setInterval(checkAndRefresh, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [lastRefresh]);

  const getEventById = React.useCallback((id) => {
    // Convert id to string for comparison to handle both string and number IDs
    const searchId = String(id);
    
    // First check dynamic events, then fallback to static events
    const dynamicEvent = dynamicEvents.find(event => String(event.id) === searchId);
    if (dynamicEvent) return dynamicEvent;
    
    return events.find(event => String(event.id) === searchId);
  }, [dynamicEvents, events]);

  const selectEvent = React.useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const getHomePageEvents = React.useCallback(() => {
    return dynamicEvents.length > 0 ? dynamicEvents.slice(0, 3) : events.slice(0, 3);
  }, [dynamicEvents, events]);

  const value = React.useMemo(() => ({
    events,
    dynamicEvents,
    selectedEvent,
    getEventById,
    selectEvent,
    getHomePageEvents,
    lastRefresh,
    forceRefreshEvents,
  }), [events, dynamicEvents, selectedEvent, getEventById, selectEvent, getHomePageEvents, lastRefresh]);

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};
