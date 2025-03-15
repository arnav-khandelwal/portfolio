import React from 'react';
import { Container } from 'react-bootstrap';
import Projects from '../components/Projects';

const ProjectsPage = () => {
  return (
    <div className="projects-page">
      <Container>
        <div className="page-header text-center">
          <h1>My Projects</h1>
          <p>Explore my work and portfolio</p>
        </div>
      </Container>
      <Projects />
    </div>
  );
};

export default ProjectsPage;