import React from 'react';
import { Container } from 'react-bootstrap';
import Experience from '../components/Experience';

const ExperiencePage = () => {
  return (
    <div className="experience-page">
      <Container>
        <div className="page-header text-center">
          <h1>Experience & Education</h1>
          <p>My professional journey and academic background</p>
        </div>
      </Container>
      <Experience />
    </div>
  );
};

export default ExperiencePage;
