import React, { useEffect, useState } from 'react';  
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  // Function to check if element is in viewport for animation
  const handleIntersection = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
    
    const elements = document.querySelectorAll('.lazy-load');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });
    
    // Reset form after successful submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 3000);
  };

  return (
    <section id="contact" className="contact-section">
      <Container>
        <div className="section-header text-center">
          <h2>Get In Touch</h2>
          <p>Have a project in mind? Let's talk!</p>
        </div>

        <Row className="justify-content-center">
          <Col lg={5} className="mb-5 mb-lg-0">
            <div className="contact-info glass-card p-4 lazy-load">
              <h3 className="mb-4">Contact Information</h3>
              
              <div className="contact-item d-flex align-items-center mb-3">
                <div className="contact-icon me-3" style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--primary-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0
                }}>
                  <i className="bi bi-envelope-fill fs-4"></i>
                </div>
                <div>
                  <h5 className="mb-1">Email</h5>
                  <p className="mb-0">hello@example.com</p>
                </div>
              </div>

              <div className="contact-item d-flex align-items-center mb-3">
                <div className="contact-icon me-3" style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--secondary-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0
                }}>
                  <i className="bi bi-geo-alt-fill fs-4"></i>
                </div>
                <div>
                  <h5 className="mb-1">Location</h5>
                  <p className="mb-0">San Francisco, California</p>
                </div>
              </div>

              <div className="contact-item d-flex align-items-center">
                <div className="contact-icon me-3" style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--accent-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0
                }}>
                  <i className="bi bi-linkedin fs-4"></i>
                </div>
                <div>
                  <h5 className="mb-1">Connect</h5>
                  <p className="mb-0">linkedin.com/in/yourprofile</p>
                </div>
              </div>
              
              <div className="social-links mt-4 d-flex">
                <a href="https://github.com" className="me-3" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--card-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-color)',
                  transition: 'all 0.3s ease'
                }}>
                  <i className="bi bi-github"></i>
                </a>
                <a href="https://twitter.com" className="me-3" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--card-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-color)',
                  transition: 'all 0.3s ease'
                }}>
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="https://dribbble.com" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--card-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-color)',
                  transition: 'all 0.3s ease'
                }}>
                  <i className="bi bi-dribbble"></i>
                </a>
              </div>
            </div>
          </Col>

          <Col lg={7}>
            <div className="contact-form glass-card p-4 lazy-load">
              <h3 className="mb-4">Send a Message</h3>
              
              {formStatus.submitted && (
                <Alert variant={formStatus.success ? "success" : "danger"}>
                  {formStatus.message}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        placeholder="Enter your name" 
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Your Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        placeholder="Enter your email" 
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                    placeholder="Enter subject" 
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    placeholder="Enter your message" 
                    rows={5} 
                  />
                </Form.Group>
                
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="btn-lg"
                  disabled={formStatus.submitted}
                >
                  {formStatus.submitted ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;