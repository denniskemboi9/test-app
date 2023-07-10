import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const PropertyContext = createContext();

export default function PropertyProvider({ children })
{

  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [change, setChange] = useState(true);

  // Fetch properties
  const fetchProperties = () => {
    fetch("/properties", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log(response)
        setProperties(response)
      })
      // .catch((error) => {
      //   console.log("Error fetching properties:", error);
      // });
  };

  useEffect(() => {
    fetchProperties();

  }, [change]);


  // Add property
  const addProperty = (propertyData) => {
    fetch("/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(propertyData),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log('added', response)
        if (response.error) {
          Swal.fire("Error", response.error, "error");
        } else if (response.success) {
          Swal.fire("Success", response.success, "success");
          setChange(!change);
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      })
      navigate('/Home')
      // .catch((error) => {
      //   console.log("Error adding property:", error);
      // });
  };

  
  // Delete property
  const deleteProperty = (propertyId) => {
    fetch(`/properties/${propertyId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          Swal.fire("Success", response.success, "success");
          setChange(!change);
        } else {
          Swal.fire("Error", "Something went wrong", "error");
        }
      })
      .catch((error) => {
        console.log("Error deleting property:", error);
      });
  };


// Approve property function
const approveProperty = (propertyId) => {
  fetch(`/properties/approve/${propertyId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log(data.success);
        // Property approved successfully
        // You can perform any necessary actions or show a success message
        setProperties((prevProperties) =>
        prevProperties.filter((property) => property.id !== propertyId)
        );
        navigate("/Home")

      } else if (data.error) {
        // Error occurred during approval
        // Handle the error or show an error message
        console.error(data.error);
      }
    })
    .catch((error) => {
      // Error occurred during the request
      // Handle the error or show an error message
      console.error("Error approving property:", error);
    });
};


  const contextData = {
    properties,
    addProperty,
    deleteProperty,
    approveProperty
  };
  return (
    <PropertyContext.Provider value={contextData}>
      {children}
    </PropertyContext.Provider>
  );
}
