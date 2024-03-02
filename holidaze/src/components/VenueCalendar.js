import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

const VenueCalendar = ({ bookings, onDateChange }) => {
  const [bookedDates, setBookedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState({ dateFrom: null, dateTo: null });

  useEffect(() => {
    if (bookings) {
      const dates = bookings.flatMap(booking => {
        const start = new Date(booking.dateFrom);
        const end = new Date(booking.dateTo);
        for (var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
          arr.push(new Date(dt));
        }
        return arr;
      });
      setBookedDates(dates);
      setIsLoading(false);
    }
  }, [bookings]);

  const tileDisabled = ({ date, view }) => {
    return view === 'month' && bookedDates.some(bookedDate => 
      date.getFullYear() === bookedDate.getFullYear() &&
      date.getMonth() === bookedDate.getMonth() &&
      date.getDate() === bookedDate.getDate()
    );
  };

  const onChange = (value) => {
    setSelectedDateRange({ dateFrom: value[0], dateTo: value[1] });
    onDateChange({ dateFrom: value[0], dateTo: value[1] });
  };

  if (isLoading) return <p>Loading calendar...</p>;

  return (
    <div>
      <Calendar
        selectRange
        tileDisabled={tileDisabled}
        onChange={onChange}
        value={selectedDateRange.dateFrom && [selectedDateRange.dateFrom, selectedDateRange.dateTo]}
      />
    </div>
  );
};

export default VenueCalendar;