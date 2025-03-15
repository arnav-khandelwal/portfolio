import React from 'react';
import { Container } from 'react-bootstrap';
import AboutMe from '../components/AboutMe';

const AboutPage = () => {
  return (
    <div className="about-page">
      <Container>
        <div className="page-header text-center">
          <h1>About Me</h1>
          <p>Learn more about my journey and expertise</p>
        </div>
      </Container>
      <AboutMe detailed={true} />
    </div>
  );
};

export default AboutPage;