import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

const VenueCalendar = ({ venueId }) => {
  const [bookedDates, setBookedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookedDates = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${venueId}?_bookings=true`);
        if (!response.ok) throw new Error('Failed to fetch booked dates');
        const data = await response.json();
        const dates = data.map(dateStr => new Date(dateStr));
        setBookedDates(dates);
      } catch (error) {
        console.error('Error fetching booked dates:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookedDates();
  }, [venueId]);

  const tileDisabled = ({ date, view }) => {
    return view === 'month' && bookedDates.some(bookedDate => 
      date.getFullYear() === bookedDate.getFullYear() &&
      date.getMonth() === bookedDate.getMonth() &&
      date.getDate() === bookedDate.getDate()
    );
  };

  if (isLoading) return <p>Loading calendar...</p>;

  return (
    <div>
      <Calendar
        tileDisabled={tileDisabled}
      />
    </div>
  );
};

export default VenueCalendar;
