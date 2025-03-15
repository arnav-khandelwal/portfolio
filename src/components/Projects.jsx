import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Sample project data
const allProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform built with React, Node.js, Express, and MongoDB.",
    image: "https://placehold.co/600x400",
    category: "Full Stack",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Redux"],
    github: "https://github.com/yourusername/ecommerce",
    demo: "https://ecommerce-demo.com",
    featured: true
  },
  {
    id: 2,
    title: "Task Manager App",
    description: "A productivity app with drag-and-drop task management and real-time updates.",
    image: "https://placehold.co/600x400",
    category: "Web App",
    technologies: ["React", "Firebase", "Material UI", "React DnD"],
    github: "https://github.com/yourusername/task-manager",
    demo: "https://task-manager-demo.com",
    featured: true
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description: "An analytics dashboard for social media metrics with interactive charts.",
    image: "https://placehold.co/600x400",
    category: "Frontend",
    technologies: ["React", "D3.js", "Bootstrap", "REST API"],
    github: "https://github.com/yourusername/social-dashboard",
    demo: "https://social-dashboard-demo.com",
    featured: true
  },
  {
    id: 4,
    title: "Recipe Finder App",
    description: "A recipe search application with filtering options and saved favorites.",
    image: "https://placehold.co/600x400",
    category: "Web App",
    technologies: ["React", "Context API", "CSS Modules", "Third-party API"],
    github: "https://github.com/yourusername/recipe-finder",
    demo: "https://recipe-finder-demo.com",
    featured: false
  },
  {
    id: 5,
    title: "Portfolio Website Generator",
    description: "A tool to create customized portfolio websites from templates.",
    image: "https://placehold.co/600x400",
    category: "Full Stack",
    technologies: ["React", "Node.js", "MongoDB", "AWS S3"],
    github: "https://github.com/yourusername/portfolio-generator",
    demo: "https://portfolio-generator-demo.com",
    featured: false
  },
  {
    id: 6,
    title: "Weather Forecast App",
    description: "A weather application with 7-day forecasts and location-based data.",
    image: "https://placehold.co/600x400",
    category: "Frontend",
    technologies: ["React", "OpenWeatherMap API", "Geolocation API", "CSS"],
    github: "https://github.com/yourusername/weather-app",
    demo: "https://weather-app-demo.com",
    featured: false
  }
];

const Projects = ({ limit }) => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isAnimated, setIsAnimated] = useState(false);
  
  const categories = ['All', 'Full Stack', 'Frontend', 'Web App'];
  
  useEffect(() => {
    let displayProjects = allProjects;
    
    if (limit) {
      displayProjects = allProjects.filter(project => project.featured).slice(0, limit);
    } else if (filter !== 'All') {
      displayProjects = allProjects.filter(project => project.category === filter);
    }
    
    setProjects(displayProjects);
    
    // Add small delay before animation for better effect
    setTimeout(() => {
      setIsAnimated(true);
    }, 100);
    
    return () => {
      setIsAnimated(false);
    };
  }, [filter, limit]);
  
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
  }, [projects]);
  
  return (
    <section id="projects" className="projects-section">
      <Container>
        <div className="section-header text-center">
          <h2>My Projects</h2>
          <p>Some of my recent work</p>
        </div>
        
        {!limit && (
          <div className="filter-buttons text-center mb-5">
            {categories.map((category, index) => (
              <Button 
                key={index}
                variant={filter === category ? 'primary' : 'outline-primary'}
                className="mx-2 mb-2 rounded-pill"
                onClick={() => setFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}
        
        <Row className="g-4">
          {projects.map((project, index) => (
            <Col key={project.id} lg={4} md={6} className="lazy-load" style={{
              transition: 'all 0.5s ease',
              transitionDelay: `${index * 0.1}s`,
              opacity: isAnimated ? 1 : 0,
              transform: isAnimated ? 'translateY(0)' : 'translateY(20px)'
            }}>
              <Card className="project-card h-100 border-0 glass-card overflow-hidden">
                <div className="project-image position-relative overflow-hidden">
                  <Card.Img variant="top" src={project.image} alt={project.title} loading="lazy" />
                  <div className="project-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{
                    background: 'rgba(0,0,0,0.7)',
                    opacity: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    <div className="d-flex gap-2">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-light">
                        <i className="bi bi-eye me-1"></i> Demo
                      </a>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-light">
                        <i className="bi bi-github me-1"></i> Code
                      </a>
                    </div>
                  </div>
                </div>
                
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title>{project.title}</Card.Title>
                    <span className="badge bg-primary rounded-pill">{project.category}</span>
                  </div>
                  <Card.Text>{project.description}</Card.Text>
                </Card.Body>
                
                <Card.Footer className="bg-transparent border-top-0">
                  <div className="d-flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="badge bg-light text-dark me-1 mb-1">{tech}</span>
                    ))}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        
        {limit && (
          <div className="text-center mt-5">
            <Link to="/projects" className="view-more">
              View All Projects
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Projects;