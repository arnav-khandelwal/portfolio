import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.scss';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef(null);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A modern, responsive e-commerce platform built with React and Node.js, featuring real-time inventory management and seamless payment integration.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛒',
      link: '#'
    },
    {
      title: 'Task Management App',
      description: 'An intuitive task management application with drag-and-drop functionality, real-time collaboration, and advanced filtering options.',
      technologies: ['Vue.js', 'Firebase', 'TypeScript', 'CSS3'],
      image: '📋',
      link: '#'
    },
    {
      title: 'Weather Dashboard',
      description: 'A beautiful weather dashboard that provides detailed forecasts, interactive maps, and personalized weather alerts for multiple locations.',
      technologies: ['React', 'API Integration', 'Chart.js', 'SCSS'],
      image: '🌤️',
      link: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website showcasing creative animations, modern design principles, and optimized performance.',
      technologies: ['React', 'GSAP', 'SCSS', 'Vite'],
      image: '💼',
      link: '#'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const projectItems = projectsRef.current.children;

    // Title animation
    gsap.fromTo(title,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        }
      }
    );

    // Projects staggered animation
    gsap.fromTo(projectItems,
      { y: 100, opacity: 0, rotation: 5 },
      {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects">
      <div className="container">
        <h2 ref={titleRef} className="projects__title">Featured Projects</h2>
        <div ref={projectsRef} className="projects__grid">
          {projects.map((project, index) => (
            <div key={index} className="projects__item">
              <div className="projects__image">
                <span className="projects__emoji">{project.image}</span>
                <div className="projects__overlay">
                  <a href={project.link} className="projects__link">
                    View Project →
                  </a>
                </div>
              </div>
              <div className="projects__content">
                <h3 className="projects__item-title">{project.title}</h3>
                <p className="projects__description">{project.description}</p>
                <div className="projects__technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="projects__tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
