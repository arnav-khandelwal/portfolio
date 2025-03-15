import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const textRef = useRef(null);
  
  useEffect(() => {
    const titles = ["Web Developer", "UI/UX Designer", "MERN Stack Developer", "Problem Solver"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
      const currentTitle = titles[titleIndex];
      
      if (isDeleting) {
        // Deleting text
        textRef.current.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        // Typing text
        textRef.current.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      // If word is complete
      if (!isDeleting && charIndex === currentTitle.length) {
        // Pause at end of word
        typingSpeed = 1500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Move to next word when deleted
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
      }
      
      setTimeout(type, typingSpeed);
    }
    
    if (textRef.current) {
      setTimeout(type, 1000);
    }
    
    return () => {
      // Cleanup
    };
  }, []);
  
  return (
    <section className="hero-section d-flex align-items-center" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="position-absolute w-100 h-100" style={{ overflow: 'hidden', top: 0, left: 0, zIndex: 0 }}>
        <div className="position-absolute" style={{ 
          width: '600px', 
          height: '600px', 
          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)',
          borderRadius: '50%', 
          top: '-300px', 
          right: '-300px',
          opacity: 0.1,
          filter: 'blur(80px)'
        }}></div>
        <div className="position-absolute" style={{ 
          width: '400px', 
          height: '400px', 
          background: 'linear-gradient(45deg, var(--accent-color) 0%, var(--primary-color) 100%)',
          borderRadius: '50%', 
          bottom: '-200px', 
          left: '-200px',
          opacity: 0.1,
          filter: 'blur(60px)'
        }}></div>
      </div>
      
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="animate-fade-in mb-5 mb-lg-0">
            <h1 className="display-4 fw-bold mb-3">Hello, I'm <br /><span style={{ color: 'var(--primary-color)' }}>John Doe</span></h1>
            <h2 className="mb-4">I'm a <span ref={textRef} className="text-gradient" style={{ 
              background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}></span></h2>
            <p className="lead mb-4">Crafting engaging digital experiences with clean code and creative design solutions.</p>
            
            <div className="d-flex flex-wrap gap-3">
              <Button as={Link} to="/contact" className="btn-custom">Get In Touch</Button>
              <Button as={Link} to="/projects" variant="outline-primary">View Projects</Button>
            </div>
            
            <div className="mt-5 d-flex gap-4">
              <a href="https://github.com/yourusername" className="social-icon" aria-label="GitHub">
                <i className="bi bi-github fs-4"></i>
              </a>
              <a href="https://linkedin.com/in/yourusername" className="social-icon" aria-label="LinkedIn">
                <i className="bi bi-linkedin fs-4"></i>
              </a>
              <a href="https://twitter.com/yourusername" className="social-icon" aria-label="Twitter">
                <i className="bi bi-twitter fs-4"></i>
              </a>
            </div>
          </Col>
          
          <Col lg={6} className="text-center">
            <div className="hero-image position-relative" 
                 style={{ 
                   animation: 'float 6s ease-in-out infinite',
                   transform: 'translateY(0px)',
                 }}>
              <div className="glass-card p-3" style={{ 
                maxWidth: '400px', 
                margin: '0 auto',
                transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
                transformStyle: 'preserve-3d',
              }}>
                <img 
                  src="https://placehold.co/500" 
                  alt="Profile" 
                  className="img-fluid rounded" 
                  style={{ 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)', 
                    border: '5px solid var(--card-bg)' 
                  }}
                  loading="lazy"
                />
              </div>
              <div className="position-absolute" style={{ 
                top: '10%', 
                right: '10%', 
                width: '80px', 
                height: '80px', 
                background: 'var(--accent-color)', 
                borderRadius: '50%', 
                opacity: 0.2, 
                filter: 'blur(20px)',
                animation: 'pulse 3s infinite alternate',
              }}></div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;