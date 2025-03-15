import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Sample experience data
const experienceData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    period: "2022 - Present",
    description: "Lead the development of the company's main SaaS product, implementing new features and improving performance. Mentored junior developers and contributed to architecture decisions.",
    responsibilities: [
      "Developed and maintained React.js applications with Redux state management",
      "Optimized application performance and improved load times by 40%",
      "Implemented CI/CD pipelines using GitHub Actions",
      "Led the migration from class components to functional components with hooks"
    ]
  },
  {
    id: 2,
    title: "Full Stack Developer",
    company: "Digital Innovators",
    period: "2020 - 2022",
    description: "Worked on multiple client projects developing full-stack applications using the MERN stack. Collaborated with design and product teams to deliver high-quality web applications.",
    responsibilities: [
      "Built RESTful APIs using Node.js and Express",
      "Designed and implemented MongoDB database schemas",
      "Created responsive UIs with React and Bootstrap",
      "Participated in agile development processes and sprint planning"
    ]
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "StartUp Ventures",
    period: "2018 - 2020",
    description: "Assisted in the development of web applications for startup clients, focusing on frontend implementation and bug fixing.",
    responsibilities: [
      "Implemented responsive UIs from designer mockups",
      "Fixed bugs and improved existing features",
      "Wrote unit tests for React components",
      "Participated in code reviews and team meetings"
    ]
  }
];

// Sample education data
const educationData = [
  {
    id: 1,
    degree: "Master of Computer Science",
    institution: "Tech University",
    period: "2016 - 2018",
    description: "Specialized in Web Technologies and Software Engineering. Completed thesis on 'Optimizing React Applications for Performance'."
  },
  {
    id: 2,
    degree: "Bachelor of Science in Computer Science",
    institution: "State University",
    period: "2012 - 2016",
    description: "Graduated with honors. Focus on programming fundamentals, data structures, and web development."
  }
];

const Experience = ({ limit }) => {
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
    <section id="experience" className="experience-section">
      <Container>
        <div className="section-header text-center">
          <h2>Experience & Education</h2>
          <p>My professional journey</p>
        </div>
        
        <Row>
          <Col lg={7} className="mb-5 mb-lg-0">
            <h3 className="mb-4">Work Experience</h3>
            <div className="timeline">
              {(limit ? experienceData.slice(0, limit) : experienceData).map((item, index) => (
                <div key={item.id} className={`timeline-item lazy-load ${index % 2 === 0 ? 'left' : 'right'}`} style={{position: 'relative'}}>
                  <div className="timeline-marker" style={{
                    position: 'absolute',
                    left: '-8px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'var(--primary-color)',
                    border: '3px solid var(--card-bg)',
                    zIndex: 2
                  }}></div>
                  
                  <div className="timeline-content glass-card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="mb-0">{item.title}</h4>
                      <span className="badge bg-primary rounded-pill">{item.period}</span>
                    </div>
                    <h5 className="mb-3">{item.company}</h5>
                    <p>{item.description}</p>
                    
                    {!limit && (
                      <ul className="ps-3">
                        {item.responsibilities.map((resp, i) => (
                          <li key={i} className="mb-2">{resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {limit && (
              <Link to="/experience" className="view-more">
                View Full Experience 
              </Link>
            )}
          </Col>
          
          <Col lg={5}>
            <h3 className="mb-4">Education</h3>
            <div className="timeline">
              {(limit ? educationData.slice(0, 1) : educationData).map((item, index) => (
                <div key={item.id} className="timeline-item lazy-load" style={{position: 'relative'}}>
                  <div className="timeline-marker" style={{
                    position: 'absolute',
                    left: '-8px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'var(--secondary-color)',
                    border: '3px solid var(--card-bg)',
                    zIndex: 2
                  }}></div>
                  
                  <div className="timeline-content glass-card p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="mb-0">{item.degree}</h4>
                      <span className="badge bg-secondary rounded-pill">{item.period}</span>
                    </div>
                    <h5 className="mb-3">{item.institution}</h5>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {limit && educationData.length > 1 && (
              <Link to="/experience" className="view-more">
                View Full Education
              </Link>
            )}
            
            {!limit && (
              <div className="mt-5">
                <h3 className="mb-4">Certifications</h3>
                <div className="certificates">
                  <div className="certificate-item glass-card p-3 mb-3 d-flex align-items-center">
                    <div className="certificate-icon me-3" style={{
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
                      <i className="bi bi-award fs-4"></i>
                    </div>
                    <div>
                      <h5 className="mb-1">AWS Certified Developer</h5>
                      <p className="mb-0 small">Amazon Web Services, 2023</p>
                    </div>
                  </div>
                  
                  <div className="certificate-item glass-card p-3 mb-3 d-flex align-items-center">
                    <div className="certificate-icon me-3" style={{
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
                      <i className="bi bi-award fs-4"></i>
                    </div>
                    <div>
                      <h5 className="mb-1">MongoDB Certified Developer</h5>
                      <p className="mb-0 small">MongoDB Inc., 2022</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Experience;
