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

  const phoneRotation = currentSectionIndex * 180;

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

  // Helper to get phone style and orientation class
  const isHero = currentSection === 'hero';
  const phoneClass = isHero ? 'phone landscape' : 'phone portrait';
  const phoneScreenClass = isHero ? 'phone-screen landscape' : 'phone-screen portrait';
  const screenContentClass = isHero ? 'screen-content landscape' : 'screen-content portrait';

  // Helper to get phone style based on section
  const getPhoneStyle = () => {
    if (currentSection === 'hero') {
      return {
        transform: 'rotate(0deg) scale(2.4)',
        width: '560px',
        height: '280px',
        transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1), width 0.6s, height 0.6s',
      };
    } else {
      return {
        transform: `rotate(${phoneRotation}deg) scale(1.25)`,
        width: '280px',
        height: '560px',
        transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1), width 0.6s, height 0.6s',
      };
    }
  };

  // Helper to get phone container position class
  const getPhoneContainerClass = () => {
    if (currentSection === 'hero') return 'phone-container center';
    // Odd index: phone left, Even index: phone right (after hero)
    return currentSectionIndex % 2 === 1 ? 'phone-container left' : 'phone-container right';
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
      <div className={getPhoneContainerClass()}>
        <div className={phoneClass} style={getPhoneStyle()}>
          <div className={phoneScreenClass}>
            <div className={screenContentClass} key={currentSection}>
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
        <section ref={heroSectionRef} className="section hero" name ="hero">
          {/* Hero section intentionally left empty; content is now inside the phone */}
        </section>
        {/* Render main content sections with phone on left/right and content on the other side */}
        {sections.slice(1).map((section, idx) => (
          <section ref={section.ref} className={`section ${section.name}`} key={section.name}>
            <div className="container split-layout">
              {((currentSectionIndex % 2 === 1 && currentSectionIndex === idx + 1) || (currentSectionIndex % 2 === 0 && currentSectionIndex !== 0 && currentSectionIndex === idx + 1)) ? null : (
                <div className="split-content">
                  {/* Section content here, e.g. AboutScreen, ProjectsScreen, etc. */}
                  {getCurrentScreenComponent()}
                </div>
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default App;