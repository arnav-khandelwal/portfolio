import React from 'react';

const AboutScreen = () => {
  return (
    <div className="screen about-screen">
      <div className="content">
        <div className="profile-section">
          <div className="profile-image">
            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150" alt="Profile" />
          </div>
          <div className="info">
            <h2>About Me</h2>
            <p>Passionate developer creating digital experiences</p>
            <div className="highlights">
              <div className="highlight">
                <span className="icon">🎯</span>
                <span>Problem Solver</span>
              </div>
              <div className="highlight">
                <span className="icon">💡</span>
                <span>Creative Thinker</span>
              </div>
              <div className="highlight">
                <span className="icon">🚀</span>
                <span>Fast Learner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content {
          padding: 2rem;
          text-align: center;
        }

        .profile-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .profile-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .info h2 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #d97706;
        }

        .info p {
          font-size: 0.8rem;
          opacity: 0.8;
          margin-bottom: 1rem;
        }

        .highlights {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .highlight {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          background: rgba(255, 255, 255, 0.3);
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }

        .icon {
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
};

export default AboutScreen;