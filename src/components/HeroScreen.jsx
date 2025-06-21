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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .hero-horizontal-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .hero-typing-horizontal {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.7rem;
          min-width: 220px;
        }
        .typing-cursor {
          display: inline-block;
          width: 1ch;
          color: #fff;
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-title-horizontal {
          font-size: 1.3rem;
          color: #f3f3f3;
          font-weight: 500;
          margin-bottom: 0;
        }
        .hero-avatar-container-horizontal {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-avatar-horizontal {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 3px solid #fff;
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