import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Sample achievements data
const achievementsData = [
  {
    id: 1,
    title: "Best Web Application Award",
    organization: "Tech Innovation Summit",
    year: 2023,
    description: "Received award for developing an innovative AI-powered content management system.",
    icon: "bi-trophy"
  },
  {
    id: 2,
    title: "1st Place Hackathon Winner",
    organization: "Global Code Fest",
    year: 2022,
    description: "Led a team of 4 to develop a sustainable smart city solution in 48 hours.",
    icon: "bi-award"
  },
  {
    id: 3,
    title: "Open Source Contributor",
    organization: "React Community",
    year: 2021,
    description: "Contributed to multiple open-source React projects with 10+ pull requests merged.",
    icon: "bi-github"
  },
  {
    id: 4,
    title: "Speaker",
    organization: "Frontend Developer Conference",
    year: 2021,
    description: "Presented a talk on 'Optimizing React Performance' to an audience of 200+ developers.",
    icon: "bi-mic"
  },
  {
    id: 5,
    title: "Featured Developer",
    organization: "Dev Magazine",
    year: 2020,
    description: "Featured as one of the 'Top 30 Under 30' developers to watch.",
    icon: "bi-newspaper"
  },
  {
    id: 6,
    title: "Technical Blog Author",
    organization: "Tech Blog Platform",
    year: 2019,
    description: "Authored 20+ technical articles with over 100,000 combined views.",
    icon: "bi-pencil"
  }
];

const Achievements = ({ limit }) => {
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
    <section id="achievements" className="achievements-section">
      <Container>
        <div className="section-header text-center">
          <h2>Achievements</h2>
          <p>Milestones in my career</p>
        </div>
        
        <Row className="g-4">
          {(limit ? achievementsData.slice(0, limit) : achievementsData).map((achievement, index) => (
            <Col key={achievement.id} md={6} lg={limit ? 4 : 4} className="lazy-load">
              <Card className="glass-card h-100 border-0 achievement-card">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="achievement-icon me-3" style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0
                    }}>
                      <i className={`bi ${achievement.icon} fs-4`}></i>
                    </div>
                    <div>
                      <Card.Title className="mb-0">{achievement.title}</Card.Title>
                      <div className="text-muted small">{achievement.organization} | {achievement.year}</div>
                    </div>
                  </div>
                  <Card.Text>{achievement.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        {limit && achievementsData.length > limit && (
          <div className="text-center mt-5">
            <Link to="/achievements" className="view-more">
              View All Achievements
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Achievements;
