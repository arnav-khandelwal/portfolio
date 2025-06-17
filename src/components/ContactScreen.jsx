import React from 'react';

const ContactScreen = () => {
  return (
    <div className="screen contact-screen">
      <div className="content">
        <h2>Let's Connect</h2>
        <div className="contact-info">
          <div className="contact-item">
            <span className="icon">📧</span>
            <span className="text">hello@example.com</span>
          </div>
          <div className="contact-item">
            <span className="icon">📞</span>
            <span className="text">+1 (234) 567-890</span>
          </div>
          <div className="contact-item">
            <span className="icon">💼</span>
            <span className="text">LinkedIn</span>
          </div>
          <div className="contact-item">
            <span className="icon">🐙</span>
            <span className="text">GitHub</span>
          </div>
        </div>
        <div className="cta">
          <button className="contact-btn">Send Message</button>
        </div>
      </div>
      <style jsx>{`
        .screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content {
          padding: 2rem;
          text-align: center;
          width: 100%;
        }

        h2 {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.6rem;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .icon {
          font-size: 1rem;
          width: 24px;
          text-align: center;
        }

        .text {
          font-size: 0.7rem;
          font-weight: 500;
        }

        .cta {
          text-align: center;
        }

        .contact-btn {
          background: rgba(255, 255, 255, 0.3);
          color: white;
          border: 2px solid white;
          padding: 0.6rem 1.5rem;
          border-radius: 25px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .contact-btn:hover {
          background: white;
          color: #66a6ff;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default ContactScreen;