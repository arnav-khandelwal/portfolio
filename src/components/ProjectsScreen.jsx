import React from 'react';

const ProjectsScreen = () => {
  const projects = [
    { id: 1, name: 'E-Commerce App', tech: 'React', icon: '🛒' },
    { id: 2, name: 'Task Manager', tech: 'React', icon: '📋' },
    { id: 3, name: 'Portfolio Site', tech: 'React', icon: '💼' }
  ];

  return (
    <div className="screen projects-screen">
      <div className="content">
        <h2>Featured Projects</h2>
        <div className="projects-list">
          {projects.map((project) => (
            <div className="project" key={project.id}>
              <div className="project-icon">{project.icon}</div>
              <div className="project-info">
                <h3>{project.name}</h3>
                <p>{project.tech}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all">
          <button className="view-btn">View All</button>
        </div>
      </div>
      <style jsx>{`
        .screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content {
          padding: 2rem;
          width: 100%;
        }

        h2 {
          text-align: center;
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: #0891b2;
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-bottom: 1rem;
        }

        .project {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          background: rgba(255, 255, 255, 0.4);
          padding: 0.8rem;
          border-radius: 12px;
          backdrop-filter: blur(10px);
        }

        .project-icon {
          font-size: 1.2rem;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 8px;
        }

        .project-info h3 {
          font-size: 0.8rem;
          margin-bottom: 0.2rem;
          color: #0f172a;
        }

        .project-info p {
          font-size: 0.6rem;
          opacity: 0.7;
        }

        .view-all {
          text-align: center;
        }

        .view-btn {
          background: linear-gradient(45deg, #0891b2, #06b6d4);
          color: white;
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .view-btn:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default ProjectsScreen;