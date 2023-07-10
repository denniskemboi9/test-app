import React from 'react';
import Card from 'react-bootstrap/Card';

function Footer() {
  return (
    <div className="wrapper" style={{ minHeight: '10vh', display: 'flex', flexDirection: 'column' }}>

      <footer className="footer mt-auto py-0 bg-success text-center text-white">
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Real Estate</Card.Title>
          <Card.Text>
            Real estate is a valuable asset class that involves the buying, selling, and renting of properties.
          </Card.Text>
        </Card.Body>
      </Card>
       <h5> Copyright © 2023 Real Estate.</h5>
      </footer>

    </div>
  );
}

export default Footer;
