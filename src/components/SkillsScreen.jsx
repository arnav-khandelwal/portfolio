import React from 'react';

const SkillsScreen = () => {
  const skillCategories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Vue.js', level: 85 }
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 80 }
      ]
    }
  ];

  return (
    <div className="screen skills-screen">
      <div className="content">
        <h2>Skills & Expertise</h2>
        <div className="skills-container">
          {skillCategories.map((category) => (
            <div className="skill-category" key={category.name}>
              <h3>{category.name}</h3>
              <div className="skills">
                {category.skills.map((skill) => (
                  <div className="skill" key={skill.name}>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-level">
                      <div className="skill-bar" style={{ width: skill.level + '%' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .screen {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #d299c2 0%, #fef9d7 100%);
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .content {
          padding: 1.5rem;
          width: 100%;
        }

        h2 {
          text-align: center;
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: #7c2d12;
        }

        .skills-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .skill-category h3 {
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          color: #a855f7;
        }

        .skills {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .skill {
          background: rgba(255, 255, 255, 0.4);
          padding: 0.5rem;
          border-radius: 8px;
          backdrop-filter: blur(10px);
        }

        .skill-name {
          font-size: 0.7rem;
          font-weight: 600;
          display: block;
          margin-bottom: 0.3rem;
        }

        .skill-level {
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          overflow: hidden;
        }

        .skill-bar {
          height: 100%;
          background: linear-gradient(90deg, #a855f7, #ec4899);
          border-radius: 2px;
          transition: width 0.6s ease;
        }
      `}</style>
    </div>
  );
};

export default SkillsScreen;