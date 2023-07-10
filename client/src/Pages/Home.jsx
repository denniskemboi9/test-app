import React from 'react';
import { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';

export default function Home() {

  const [approvedProperties, setApprovedProperties] = useState([]);

  // Fetch the list of approved properties
  useEffect(() => {
    fetch("/approvedproperties", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the approvedProperties state with the fetched properties
        setApprovedProperties(data);
      })
      .catch((error) => {
        // Handle the error or show an error message
        console.error("Error fetching approved properties:", error);
      });
  }, []);

  return (

    <div className="container">
    <div className="row">
      {approvedProperties.map((property) => (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={property.id}>
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
    </div>

  );
}