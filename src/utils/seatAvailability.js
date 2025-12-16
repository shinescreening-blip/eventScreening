/**
 * Calculates remaining seats based on event date and total capacity
 * @param {Date|string} eventDate - The date of the event
 * @param {number} totalSeats - Maximum number of seats available
 * @returns {Object} - Object containing remaining seats and a status message
 */
export const calculateRemainingSeats = (eventDate, totalSeats) => {
  // Ensure eventDate is a Date object
  const eventDateTime = new Date(eventDate);
  const now = new Date();
  
  // Calculate time differences
  const timeDiffMs = eventDateTime - now;
  const daysUntilEvent = Math.ceil(timeDiffMs / (1000 * 60 * 60 * 24));
  const hoursUntilEvent = Math.ceil(timeDiffMs / (1000 * 60 * 60));
  
  // If event is in the past, return 0 seats
  if (timeDiffMs < 0) {
    return {
      remainingSeats: 0,
      status: 'Event has passed',
      isLowAvailability: true,
      isSuperLowAvailability: true
    };
  }

  // Calculate base percentage of seats remaining based on days until event
  let availablePercentage;
  let isToday = daysUntilEvent === 0;
  let isWithin4Hours = hoursUntilEvent <= 4;
  let isSameDay = isToday || (daysUntilEvent === 1 && hoursUntilEvent <= 24);
  
  if (isWithin4Hours) {
    // Within 4 hours: 1-3 seats left
    availablePercentage = Math.max(0.5, Math.random() * 1.5); // 0.5% - 1.5% of total seats
  } else if (isToday) {
    // Today but >4 hours away: 3-10% available
    availablePercentage = 3 + Math.random() * 7; // 3-10%
  } else if (daysUntilEvent === 1) {
    // Tomorrow: 10-20% available
    availablePercentage = 10 + Math.random() * 11; // 10-20%
  } else if (daysUntilEvent >= 30) {
    // More than 30 days: 80-100% available
    availablePercentage = 80 + Math.floor(Math.random() * 21); // 80-100%
  } else if (daysUntilEvent >= 14) {
    // 14-29 days: 60-80% available
    availablePercentage = 60 + Math.floor(Math.random() * 21); // 60-80%
  } else if (daysUntilEvent >= 7) {
    // 7-13 days: 30-60% available
    availablePercentage = 30 + Math.floor(Math.random() * 31); // 30-60%
  } else if (daysUntilEvent >= 3) {
    // 3-6 days: 10-30% available
    availablePercentage = 10 + Math.floor(Math.random() * 21); // 10-30%
  } else {
    // 2 days: 5-15% available
    availablePercentage = 5 + Math.floor(Math.random() * 11); // 5-15%
  }

  // Calculate remaining seats with minimum of 1 seat if not sold out
  let remainingSeats = Math.max(1, Math.floor((totalSeats * availablePercentage) / 100));
  
  // For events within 4 hours, ensure very limited seats (1-3)
  if (isWithin4Hours) {
    remainingSeats = Math.min(3, Math.max(1, remainingSeats));
  }
  // For today's events, cap at 10 seats
  else if (isToday) {
    remainingSeats = Math.min(10, remainingSeats);
  }
  
  // Determine status message and availability flags
  let status;
  let isLowAvailability = availablePercentage < 20 || isToday;
  let isSuperLowAvailability = isWithin4Hours || availablePercentage < 5;
  
  if (isWithin4Hours) {
    status = remainingSeats === 1 ? 'Last seat left!' : `Only ${remainingSeats} seats left!`;
  } else if (isToday) {
    status = remainingSeats <= 3 ? 'Last few seats!' : `Only ${remainingSeats} seats left!`;
  } else if (availablePercentage >= 80) {
    status = 'Plenty of seats available';
  } else if (availablePercentage >= 50) {
    status = 'Seats filling up';
  } else if (availablePercentage >= 20) {
    status = 'Limited seats left';
  } else if (availablePercentage >= 5) {
    status = 'Last few seats!';
  } else {
    status = 'Almost sold out!';
  }

  return {
    remainingSeats,
    status,
    isLowAvailability,
    isSuperLowAvailability,
    isLastChance: isWithin4Hours && remainingSeats < 5
  };
};

/**
 * Updates event data with dynamic seat availability
 * @param {Array} events - Array of event objects
 * @returns {Array} - Updated events with seat information
 */
export const updateEventsWithSeatAvailability = (events) => {
  return events.map(event => {
    // Extract total capacity from the event
    const capacityMatch = event.capacity ? event.capacity.match(/\d+/) : null;
    const totalSeats = capacityMatch ? parseInt(capacityMatch[0], 10) : 100; // Default to 100 if can't parse
    
    // Parse the event date
    const eventDate = event.date instanceof Date 
      ? event.date 
      : new Date(event.date);
    
    // Calculate seat availability
    const { remainingSeats, status, isLowAvailability } = 
      calculateRemainingSeats(eventDate, totalSeats);
    
    return {
      ...event,
      totalSeats,
      remainingSeats,
      seatStatus: status,
      isLowAvailability,
      // Keep the original capacity string for display
      displayCapacity: `${remainingSeats} of ${totalSeats} seats left`,
      // For display in the UI
      availabilityStatus: isLowAvailability ? 'Hurry! Limited seats' : 'Available',
    };
  });
};
