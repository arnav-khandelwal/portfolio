import React, { useState, useEffect, useRef } from 'react';
import HeroScreen from './components/HeroScreen.jsx';
import AboutScreen from './components/AboutScreen.jsx';
import ProjectsScreen from './components/ProjectsScreen.jsx';
import SkillsScreen from './components/SkillsScreen.jsx';
import ContactScreen from './components/ContactScreen.jsx';
import './App.css';

const App = () => {
  const [currentSection, setCurrentSection] = useState('hero');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const heroSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  const sections = [
    { name: 'hero', ref: heroSectionRef },
    { name: 'about', ref: aboutSectionRef },
    { name: 'projects', ref: projectsSectionRef },
    { name: 'skills', ref: skillsSectionRef },
    { name: 'contact', ref: contactSectionRef }
  ];

  const phoneRotation = currentSectionIndex * 90;

  const getCurrentScreenComponent = () => {
    switch (currentSection) {
      case 'hero': return <HeroScreen />;
      case 'about': return <AboutScreen />;
      case 'projects': return <ProjectsScreen />;
      case 'skills': return <SkillsScreen />;
      case 'contact': return <ContactScreen />;
      default: return <HeroScreen />;
    }
  };

  const getCurrentLeftImage = () => {
    const images = {
      hero: null,
      about: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
      projects: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: 'https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=400',
      contact: null
    };
    return images[currentSection];
  };

  const getCurrentRightImage = () => {
    const images = {
      hero: null,
      about: null,
      projects: 'https://images.pexels.com/photos/193349/pexels-photo-193349.jpeg?auto=compress&cs=tinysrgb&w=400',
      skills: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400',
      contact: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    return images[currentSection];
  };

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern shopping experience with React and Node.js',
      tech: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative productivity tool with real-time updates',
      tech: ['React', 'Socket.io', 'PostgreSQL']
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Responsive portfolio with smooth animations',
      tech: ['React', 'CSS3', 'Vite']
    }
  ];

  const skillCategories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Vue.js', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'CSS3', level: 92 }
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 80 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 82 }
      ]
    }
  ];

  const handleScroll = () => {
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (section.ref.current) {
        const rect = section.ref.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setCurrentSection(section.name);
          setCurrentSectionIndex(i);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      {/* Fixed Phone Mockup */}
      <div className="phone-container">
        <div className="phone" style={{ transform: `rotate(${phoneRotation}deg)` }}>
          <div className="phone-screen">
            <div className="screen-content" key={currentSection}>
              {getCurrentScreenComponent()}
            </div>
          </div>
        </div>
      </div>

      {/* Side Images */}
      <div className="side-images">
        {getCurrentLeftImage() && (
          <img 
            src={getCurrentLeftImage()} 
            className="side-image left" 
            alt="Portfolio image"
            key={`left-${currentSection}`}
          />
        )}
        {getCurrentRightImage() && (
          <img 
            src={getCurrentRightImage()} 
            className="side-image right" 
            alt="Portfolio image"
            key={`right-${currentSection}`}
          />
        )}
      </div>

      {/* Main Content Sections */}
      <main className="content">
        <section ref={heroSectionRef} className="section hero">
          <div className="container">
            <h1 className="hero-title">
              <span className="gradient-text">Creative</span>
              <br />Developer
            </h1>
            <p className="hero-subtitle">Crafting digital experiences with passion and precision</p>
            <div className="hero-cta">
              <button className="btn-primary">View My Work</button>
              <button className="btn-secondary">Get In Touch</button>
            </div>
          </div>
        </section>

        <section ref={aboutSectionRef} className="section about">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
              <div className="about-text">
                <p>I'm a passionate full-stack developer with 5+ years of experience creating beautiful, functional web applications. I specialize in modern JavaScript frameworks and love bringing creative ideas to life.</p>
                <div className="skills-preview">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Vue.js</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">TypeScript</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={projectsSectionRef} className="section projects">
          <div className="container">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
              {projects.map((project) => (
                <div className="project-card" key={project.id}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={skillsSectionRef} className="section skills">
          <div className="container">
            <h2 className="section-title">Skills & Expertise</h2>
            <div className="skills-grid">
              {skillCategories.map((category) => (
                <div className="skill-category" key={category.name}>
                  <h3>{category.name}</h3>
                  <div className="skill-items">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="skill-item">
                        <span>{skill.name}</span>
                        <div className="skill-bar">
                          <div className="skill-progress" style={{ width: skill.level + '%' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={contactSectionRef} className="section contact">
          <div className="container">
            <h2 className="section-title">Let's Work Together</h2>
            <div className="contact-content">
              <p>Ready to bring your ideas to life? Let's discuss your next project.</p>
              <div className="contact-methods">
                <a href="mailto:hello@example.com" className="contact-link">
                  📧 hello@example.com
                </a>
                <a href="tel:+1234567890" className="contact-link">
                  📞 +1 (234) 567-890
                </a>
                <a href="https://linkedin.com" className="contact-link">
                  💼 LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;