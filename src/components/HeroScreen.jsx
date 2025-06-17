import React from 'react';

const HeroScreen = () => {
  return (
    <div className="screen hero-screen">
      <div className="content">
        <div className="avatar">
          <div className="avatar-ring"></div>
          <div className="avatar-inner">JS</div>
        </div>
        <h1 className="name">John Smith</h1>
        <p className="title">Full Stack Developer</p>
        <div className="stats">
          <div className="stat">
            <span className="number">50+</span>
            <span className="label">Projects</span>
          </div>
          <div className="stat">
            <span className="number">5+</span>
            <span className="label">Years</span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .screen {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .content {
          text-align: center;
          padding: 2rem;
        }

        .avatar {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
        }

        .avatar-ring {
          position: absolute;
          inset: 0;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: rotate 3s linear infinite;
        }

        .avatar-inner {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          backdrop-filter: blur(10px);
        }

        .name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .title {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 1.5rem;
        }

        .stats {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        .stat {
          text-align: center;
        }

        .number {
          display: block;
          font-size: 1.2rem;
          font-weight: bold;
          color: #f093fb;
        }

        .label {
          font-size: 0.7rem;
          opacity: 0.7;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default HeroScreen;