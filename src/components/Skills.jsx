import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Sample skills data
const technicalSkills = [
  { name: "JavaScript", level: 90, category: "Frontend" },
  { name: "React.js", level: 85, category: "Frontend" },
  { name: "HTML5 & CSS3", level: 95, category: "Frontend" },
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "Express.js", level: 85, category: "Backend" },
  { name: "MongoDB", level: 80, category: "Backend" },
  { name: "Bootstrap", level: 90, category: "Frontend" },
  { name: "Redux", level: 75, category: "Frontend" },
  { name: "Git & GitHub", level: 85, category: "Tools" },
  { name: "RESTful APIs", level: 90, category: "Backend" },
  { name: "Webpack", level: 70, category: "Tools" },
  { name: "Jest", level: 75, category: "Testing" },
];

const softSkills = [
  "Problem Solving",
  "Communication",
  "Teamwork",
  "Time Management",
  "Adaptability",
  "Attention to Detail",
  "Critical Thinking",
  "Creativity"
];

const Skills = ({ limit }) => {
  const [animated, setAnimated] = useState(false);
  const [displayTechSkills, setDisplayTechSkills] = useState([]);
  const [displaySoftSkills, setDisplaySoftSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  
  useEffect(() => {
    let techSkillsToShow = technicalSkills;
    
    if (activeCategory !== 'All') {
      techSkillsToShow = technicalSkills.filter(skill => skill.category === activeCategory);
    }
    
    if (limit) {
      setDisplayTechSkills(techSkillsToShow.slice(0, limit));
      setDisplaySoftSkills(softSkills.slice(0, 4));
    } else {
      setDisplayTechSkills(techSkillsToShow);
      setDisplaySoftSkills(softSkills);
    }
    
    // Animation delay
    setTimeout(() => {
      setAnimated(true);
    }, 300);
  }, [limit, activeCategory]);
  
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
    <section id="skills" className="skills-section">
      <Container>
        <div className="section-header text-center">
          <h2>My Skills</h2>
          <p>What I bring to the table</p>
        </div>
        
        {!limit && (
          <div className="mb-5 text-center">
            <div className="btn-group" role="group">
              {['All', 'Frontend', 'Backend', 'Tools', 'Testing'].map(category => (
                <button
                  key={category}
                  className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <Row>
          <Col lg={7} className="mb-5 mb-lg-0">
            <h3 className="mb-4">Technical Skills</h3>
            <div className="technical-skills">
              {displayTechSkills.map((skill, index) => (
                <div key={index} className="skill-item mb-4 lazy-load">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="fw-bold">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <ProgressBar 
                    now={animated ? skill.level : 0} 
                    style={{ 
                      height: '10px', 
                      borderRadius: '5px',
                      transition: 'width 1.5s ease-in-out'
                    }}
                    className="skill-progress"
                  />
                </div>
              ))}
            </div>
            
            {limit && (
              <Link to="/skills" className="view-more">
                View All Skills
              </Link>
            )}
          </Col>
          
          <Col lg={5}>
            <h3 className="mb-4">Soft Skills</h3>
            <Row className="g-3">
              {displaySoftSkills.map((skill, index) => (
                <Col md={6} key={index} className="lazy-load">
                  <div className="soft-skill-item glass-card p-3 h-100 d-flex align-items-center">
                    <div className="soft-skill-icon me-3" style={{ 
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--primary-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <i className="bi bi-check-lg"></i>
                    </div>
                    <span className="fw-bold">{skill}</span>
                  </div>
                </Col>
              ))}
            </Row>
            
            {!limit && (
              <div className="mt-4">
                <h3 className="mb-4">Tools I Use</h3>
                <div className="tools-container d-flex flex-wrap gap-3">
                  <div className="tool-badge glass-card px-3 py-2 d-flex align-items-center">
                    <i className="bi bi-git me-2"></i> Git
                  </div>
                  <div className="tool-badge glass-card px-3 py-2 d-flex align-items-center">
                    <i className="bi bi-github me-2"></i> GitHub
                  </div>
                  <div className="tool-badge glass-card px-3 py-2 d-flex align-items-center">
                    <i className="bi bi-code-slash me-2"></i> VS Code
                  </div>
                  <div className="tool-badge glass-card px-3 py-2 d-flex align-items-center">
                    <i className="bi bi-terminal me-2"></i> Terminal
                  </div>
                  <div className="tool-badge glass-card px-3 py-2 d-flex align-items-center">
                    <i className="bi bi-kanban me-2"></i> Jira
                  </div>
                  <div className="tool-badge glass-card px-3 py-2 d-flex align-items-center">
                    <i className="bi bi-figma me-2"></i> Figma
                  </div>
                  <div className="tool-badge glass-card px-3 py-2 d-flex align-items-center">
                    <i className="bi bi-filetype-npm me-2"></i> npm
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

export default Skills;