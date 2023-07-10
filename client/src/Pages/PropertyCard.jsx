import React, {useContext, useState} from 'react';
import { PropertyContext } from '../Context/PropertyContext'; 
import { BookingsContext } from '../Context/BookingsContext';

const PropertyCard = ({ property }) => {
  const { deleteProperty } = useContext(PropertyContext);
  const { createBooking } = useContext(BookingsContext);
  const [bookingCount, setBookingCount] = useState(0);

  const handleBooking = () => {
    const bookingData = {
      propertyId: property.id,
    };
    createBooking(bookingData);
    setBookingCount(bookingCount + 1);
  };

  const handleDelete = () => {
    deleteProperty(property.id);
  };

  return (
    <div className="card mt-3 mb-4 d-flex flex-column align-items">
      <img src={property.image_url} alt={property.name} className="card-img-top img-fluid" style={{ objectFit: "cover", maxHeight: "200px" }} />
      <div className="card-body d-flex flex-column">
        <h4 className="card-title">{property.name}</h4>
        <p className="card-text">{property.description}</p>
        <p className="card-text">Posted by: {property.location}</p>
        <p className="card-text">Bookings: {bookingCount}</p>
        <div className="mt-auto d-flex justify-content-between">
          <button className="btn btn-primary btn-sm" onClick={handleBooking}>Book</button>
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

