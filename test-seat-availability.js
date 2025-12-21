// Simple test to verify seat availability logic
import { calculateRemainingSeats, updateEventsWithSeatAvailability } from './src/utils/seatAvailability.js';

// Test the seat availability calculation
console.log('Testing seat availability calculation...');

// Create a test event for today
const today = new Date();
const testEvent = {
  id: 1,
  title: 'Test Event',
  date: today,
  capacity: '100'
};

// Test the calculation
const result = calculateRemainingSeats(today, 100);
console.log('Seat availability result:', result);

// Test with multiple events
const testEvents = [
  { ...testEvent, id: 1, date: new Date() }, // Today
  { ...testEvent, id: 2, date: new Date(Date.now() + 24 * 60 * 60 * 1000) }, // Tomorrow
  { ...testEvent, id: 3, date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) } // 3 days from now
];

const updatedEvents = updateEventsWithSeatAvailability(testEvents);
console.log('Updated events with seat availability:');
updatedEvents.forEach(event => {
  console.log(`Event ${event.id}: ${event.displayCapacity}`);
});
