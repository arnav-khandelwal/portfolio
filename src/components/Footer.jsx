import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="py-4 mt-5" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0">&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="social-links">
              <a href="https://github.com/yourusername" className="mx-2" aria-label="GitHub">
                <i className="bi bi-github fs-5"></i>
              </a>
              <a href="https://linkedin.com/in/yourusername" className="mx-2" aria-label="LinkedIn">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a href="https://twitter.com/yourusername" className="mx-2" aria-label="Twitter">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="mailto:your.email@example.com" className="mx-2" aria-label="Email">
                <i className="bi bi-envelope fs-5"></i>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;