/**
 * Calculates the number of available seats based on the current time of day.
 * Caches the result using localStorage to ensure consistency across pages and refreshes
 * for the same event within the same time window.
 * 
 * Logic:
 * - 8:00 PM (20:00) to 12:00 AM (00:00): 15-20 seats
 * - 12:00 AM (00:00) to 4:00 AM (04:00): 10-15 seats
 * - 4:00 AM (04:00) to 1:00 PM (13:00): 5-10 seats
 * - 1:00 PM (13:00) to 8:00 PM (20:00): 2-5 seats
 * 
 * @param {string|number} [eventId] - The ID of the event to cache seats for. If omitted, returns random.
 * @returns {number} The calculated number of seats
 */
export const calculateSeatsBasedOnTime = (eventId) => {
  const now = new Date();
  const currentHour = now.getHours(); // 0-23
  // Get date string YYYY-MM-DD to ensure daily reset
  const dateStr = now.toISOString().split('T')[0];
  
  let min, max, windowKey;
  
  if (currentHour >= 20) { 
    // 8:00 PM to 12:00 AM (20, 21, 22, 23)
    min = 15; max = 20;
    windowKey = '20-24';
  } else if (currentHour >= 0 && currentHour < 4) {
     // 12:00 AM to 4:00 AM (0, 1, 2, 3)
     min = 10; max = 15;
     windowKey = '00-04';
  } else if (currentHour >= 4 && currentHour < 13) {
     // 4:00 AM to 1:00 PM (4 to 12)
     min = 5; max = 10;
     windowKey = '04-13';
  } else {
     // 1:00 PM to 8:00 PM (13 to 19)
     min = 2; max = 5;
     windowKey = '13-20';
  }
  
  // If no eventId, return random without caching (fallback)
  if (!eventId) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const storageKey = `seat_cache_${eventId}_${dateStr}_${windowKey}`;
  const cachedSeats = localStorage.getItem(storageKey);
  
  if (cachedSeats) {
    return parseInt(cachedSeats, 10);
  }
  
  const seats = Math.floor(Math.random() * (max - min + 1)) + min;
  localStorage.setItem(storageKey, seats.toString());
  
  return seats;
};

/**
 * Returns a formatted string for seat availability.
 * @param {string|number} [eventId] 
 * @returns {string} e.g., "5 seats available"
 */
export const getSeatAvailabilityString = (eventId) => {
  const seats = calculateSeatsBasedOnTime(eventId);
  return `${seats} seats available`;
};
