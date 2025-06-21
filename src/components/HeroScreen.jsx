import React, { useState, useEffect } from 'react';

const AVATAR_URL = 'https://avatars.githubusercontent.com/u/10270277?v=4';
const TYPING_TEXT = 'Arnav Khandelwal';

const HeroScreen = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (!isDeleting && typingIndex < TYPING_TEXT.length) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + TYPING_TEXT[typingIndex]);
        setTypingIndex(typingIndex + 1);
      }, 120);
    } else if (!isDeleting && typingIndex === TYPING_TEXT.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1200);
    } else if (isDeleting && typingIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setTypingIndex(typingIndex - 1);
      }, 60);
    } else if (isDeleting && typingIndex === 0) {
      timeout = setTimeout(() => setIsDeleting(false), 600);
    }
    return () => clearTimeout(timeout);
  }, [typingIndex, isDeleting]);

  return (
    <div className="hero-phone-content-horizontal">
      <div className="hero-horizontal-left">
        <h1 className="hero-typing-horizontal">
          <span>{displayedText}</span>
          <span className="typing-cursor">|</span>
        </h1>
        <h2 className="hero-title-horizontal">Full Stack Developer</h2>
        <p className="hero-description">
          Full-stack developer with 1+ years of experience building scalable web and mobile apps using MERN and Flutter. Passionate about backend-heavy roles, AI integration, and solving real-world problems
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn-primary">Contact Me</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">My Resume</a>
        </div>
      </div>
      <div className="hero-avatar-container-horizontal">
        <img src={AVATAR_URL} alt="Arnav Khandelwal" className="hero-avatar-horizontal" />
      </div>
      <style jsx>{`
        .hero-phone-content-horizontal {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          width: 100%;
          padding: 2rem 2.5rem;
          background: #111;
        }
        .hero-horizontal-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-typing-horizontal {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
          min-width: 180px;
        }
        .hero-title-horizontal {
          font-size: 0.8rem;
          color: #fff;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        .hero-description {
          color: #e0e0e0;
          font-size: 0.7rem;
          margin-bottom: 0.6rem;
          max-width: 280px;
          text-align: justify;
        }
        .hero-buttons {
          display: flex;
          gap: 0.5rem;
        }
        .btn-primary, .btn-secondary {
          padding: 7px 16px;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          text-decoration: none;
        }
        .btn-primary {
          background: #fff;
          color: #111;
          border: 2px solid #fff;
        }
        .btn-primary:hover {
          background: #111;
          color: #fff;
          border: 2px solid #fff;
          box-shadow: 0 0 0 2px #fff;
        }
        .btn-secondary {
          background: transparent;
          color: #fff;
          border: 2px solid #fff;
        }
        .btn-secondary:hover {
          background: #fff;
          color: #111;
          border: 2px solid #fff;
        }
        .hero-avatar-container-horizontal {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-avatar-horizontal {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 2px solid #fff;
          object-fit: cover;
          box-shadow: 0 2px 16px rgba(0,0,0,0.15);
        }
        @media (max-width: 600px) {
          .hero-phone-content-horizontal {
            flex-direction: column;
            align-items: center;
            padding: 1rem;
          }
          .hero-horizontal-left {
            align-items: center;
          }
          .hero-avatar-horizontal {
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroScreen;