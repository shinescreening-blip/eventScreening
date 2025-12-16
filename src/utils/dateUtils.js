export const assignDynamicDates = (events) => {
  const today = new Date();

  return events.map((event, index) => {
    const eventDate = new Date(today);
    eventDate.setDate(today.getDate() + index);

    const formattedDate = eventDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      ...event,
      date: formattedDate,
    };
  });
};
