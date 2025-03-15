import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AboutMe = ({ limit }) => {
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
  
  return (
    <section id="about" className="about-section">
      <Container>
        <div className="section-header text-center">
          <h2>About Me</h2>
          <p>Get to know me better</p>
        </div>
        
        <Row className="align-items-center">
          <Col lg={5} className="mb-4 mb-lg-0">
            <div className="position-relative lazy-load">
              <div className="about-image-wrapper">
                <img 
                  src="https://placehold.co/500x600" 
                  alt="About Me" 
                  className="img-fluid rounded-3 shadow" 
                  style={{ maxWidth: '100%' }}
                  loading="lazy"
                />
              </div>
              
              <div className="experience-badge position-absolute glass-card p-3 text-center" 
                style={{ 
                  bottom: '30px', 
                  right: '-20px', 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 2
                }}>
                <span className="fs-2 fw-bold">5+</span>
                <span>Years of<br />Experience</span>
              </div>
            </div>
          </Col>
          
          <Col lg={7}>
            <div className="about-content ps-lg-4 lazy-load">
              <h3 className="mb-3">I'm <span style={{ color: 'var(--primary-color)' }}>John Doe</span>, a passionate Web Developer</h3>
              
              <p className="mb-4">
                I specialize in creating intuitive and performant web applications using modern technologies and best practices. With over 5 years of experience in the MERN stack, I've developed a keen eye for design and user experience while maintaining clean, efficient code.
              </p>
              
              <p className="mb-4">
                My journey in web development started when I built my first website at 16. Since then, I've worked with startups and established companies, helping them create digital products that users love. I'm constantly learning and exploring new technologies to stay at the forefront of web development.
              </p>
              
              <Row className="mb-4">
                <Col sm={6} className="mb-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill me-2 fs-5" style={{ color: 'var(--primary-color)' }}></i>
                    <span>Full-Stack Development</span>
                  </div>
                </Col>
                <Col sm={6} className="mb-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill me-2 fs-5" style={{ color: 'var(--primary-color)' }}></i>
                    <span>Responsive Web Design</span>
                  </div>
                </Col>
                <Col sm={6} className="mb-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill me-2 fs-5" style={{ color: 'var(--primary-color)' }}></i>
                    <span>UI/UX Development</span>
                  </div>
                </Col>
                <Col sm={6} className="mb-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill me-2 fs-5" style={{ color: 'var(--primary-color)' }}></i>
                    <span>MERN Stack Specialist</span>
                  </div>
                </Col>
              </Row>
              
              {!limit && (
                <>
                  <h4 className="mb-3">My Approach</h4>
                  <p>
                    I believe in creating websites that not only look good but also perform exceptionally well. My development process focuses on clean architecture, performance optimization, and creating intuitive user experiences. I'm passionate about solving complex problems with elegant solutions.
                  </p>
                  
                  <div className="mt-4">
                    <a href="/files/resume.pdf" className="btn btn-custom me-3" download>
                      <i className="bi bi-download me-2"></i> Download CV
                    </a>
                  </div>
                </>
              )}
              
              {limit && (
                <Link to="/about" className="view-more">
                  More About Me
                </Link>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutMe;
