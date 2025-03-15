import React from 'react';
import { Container } from 'react-bootstrap';
import Contact from '../components/Contact';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <Container>
        <div className="page-header text-center">
          <h1>Contact Me</h1>
          <p>Get in touch for opportunities or collaborations</p>
        </div>
      </Container>
      <Contact />
    </div>
  );
};

export default ContactPage;