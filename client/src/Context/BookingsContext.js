import React, { createContext, useEffect, useState } from 'react';

export const BookingsContext = createContext();

export default function BookingsProvider({ children })
{
  const [bookings, setBookings] = useState([]);

  // Fetch all bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    fetch('/bookings')
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.log(error));
  };
  

  // Create a Booking on a particular property using property_id
  const createBooking = (bookingData) => {
    const { propertyId, ...restData } = bookingData;
    
    // Post a booking by Current property_id
    fetch(`/bookings/${propertyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(restData),
    })
      .then((response) => {
        if (response.success) {
          return response.json();

        } else {
          throw new Error('Failed to create booking');
        }
      })

      .then((newBooking) => {
        setBookings((prevBookings) => [...prevBookings, newBooking]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  
  const contextData = {
    bookings,
    // fetchBookings,
    createBooking,
  };
  
  return (
    <BookingsContext.Provider value={contextData}>
      {children}
    </BookingsContext.Provider>
  );
  
};

