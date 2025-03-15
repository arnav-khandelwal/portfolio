import React from 'react';
import { Container } from 'react-bootstrap';
import Skills from '../components/Skills';

const SkillsPage = () => {
  return (
    <div className="skills-page">
      <Container>
        <div className="page-header text-center">
          <h1>My Skills</h1>
          <p>A comprehensive overview of my technical expertise</p>
        </div>
      </Container>
      <Skills detailed={true} />
    </div>
  );
};

export default SkillsPage;