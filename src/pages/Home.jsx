import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Achievements from '../components/Achievements';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <AboutMe />
      <Skills />
      <Projects limit={3} />
      <Experience limit={2} />
      <Achievements limit={4} />
      <Contact />
    </div>
  );
};

export default Home;