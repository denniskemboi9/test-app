import React, { useContext, useState } from 'react';
import { PropertyContext } from '../Context/PropertyContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AddProperty() {

  const { addProperty } = useContext(PropertyContext)
  const [property, setProperty] = useState({
    name: '',
    description: '',
    image_url: '',
    location: '',
  });

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we perform the logic to submit the property data to your backend or perform any other actions
    console.log(property);
    // Reset the form
    setProperty({
      name: '',
      description: '',
      image_url: '',
      location: '',
    });
    // Post property using the addProperty context from PropertyProvider
    addProperty(property);
  };


  return (
    <div className="container">
      <h1>Add Property</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={property.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={property.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="Price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            // value={property.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="image_url">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image_url"
            value={property.image_url}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={property.location}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Add Property</Button>
      </Form>
    </div>
  );
}
export default AddProperty;