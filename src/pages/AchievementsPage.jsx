import React from 'react';
import { Container } from 'react-bootstrap';
import Achievements from '../components/Achievements';

const AchievementsPage = () => {
  return (
    <div className="achievements-page">
      <Container>
        <div className="page-header text-center">
          <h1>Achievements</h1>
          <p>My accomplishments and recognition</p>
        </div>
      </Container>
      <Achievements />
    </div>
  );
};

export default AchievementsPage;
