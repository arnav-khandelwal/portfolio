import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiGithub } from 'react-icons/si';
import { HiGlobeAlt } from 'react-icons/hi';
import './Projects.scss';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectsRef = useRef();
  const modalRef = useRef();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
  {
    title: 'SportsSocial',
    description: 'A full-stack social platform to discover, join, and host events with real-time chat and location filtering.',
    fullDescription:
      'SportsSocial is a MERN-based platform that connects players by letting them create, join, and manage sports events. It features real-time chat powered by WebSockets, authentication using JWT, and location-based filtering using PostGIS and Google Maps API. Supabase (PostgreSQL) serves as the scalable backend while the frontend is built with React.js and SCSS for a smooth and responsive UI.',
    technologies: ['React.js', 'Node.js', 'Supabase (PostgreSQL)', 'WebSockets', 'Google Maps API', 'SCSS'],
    link: 'https://sportssocial.netlify.app',
    github: 'https://github.com/arnav-khandelwal/sportssocial',
    features: [
      'JWT-based user authentication',
      'Real-time chat with WebSockets',
      'Location filtering with PostGIS + Google Maps API',
      'Event hosting and joining system',
      'Responsive UI with SCSS',
      'Tournament registration and management'
    ]
  },
  {
    title: 'Travel AI',
    description: 'An AI-powered travel planner for booking hotels, flights, and generating personalized itineraries.',
    fullDescription:
      'Travel AI is an AI assistant that helps users plan trips by integrating Gemini API, OpenWeatherMap, Booking.com, and SkyScanner. It reduces planning effort by 80% by automating hotel and flight suggestions, generating custom itineraries, and providing weather-based travel insights. The app is built with React.js and optimized for responsive, modular components.',
    technologies: ['React.js', 'Gemini API', 'OpenWeatherMap', 'SkyScanner API', 'SCSS'],
    link: 'https://travelai-2tdl.onrender.com/',
    github: 'https://github.com/arnav-khandelwal/travel-ai',
    features: [
      'AI-driven itinerary generation',
      'Live hotel and flight search',
      'Weather-based travel suggestions',
      'Responsive and modular design',
      'Fast API optimization for better UX'
    ]
  },
  {
    title: 'MediVerse',
    description: 'An AI-powered tool that identifies medicines from images and provides safe usage information.',
    fullDescription:
      'MediVerse is a health-focused AI web app that identifies medicines using image recognition and provides detailed usage instructions. It integrates Gemini API for AI processing, Akash AI for deep learning, and features a chatbot + prescription analyzer. Built with React.js for the frontend and Express.js for backend API handling.',
    technologies: ['React.js', 'Express.js', 'Gemini API', 'Akash AI', 'SCSS'],
    link: 'https://mediverse-jh0x.onrender.com/',
    github: 'https://github.com/arnav-khandelwal/mediverse',
    features: [
      'Image recognition for medicine identification',
      'AI-powered chatbot for health queries',
      'Prescription text analyzer',
      '90% accuracy in medicine detection',
      'Responsive UI for mobile and desktop'
    ]
  },
  {
    title: 'Mad Marketing Club Website & CRM',
    description: 'A company website and CRM platform built to manage leads and streamline business operations.',
    fullDescription:
      'Developed the official Mad Marketing Club website with React.js, optimized for a 40% faster load speed using code splitting and lazy loading. Built a scalable CRM software as a sellable product, integrating authentication, lead tracking, and role-based access. Created a real-time analytics dashboard that reduced manual work by 70%.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'SCSS'],
    link: 'https://madmarketingclub.com/',
    github: 'https://github.com/arnav-khandelwal/mad-marketing-club',
    features: [
      'Fully responsive company website',
      'CRM with secure user authentication',
      'Lead tracking and role-based access',
      'Real-time analytics dashboard',
      'Code-splitting for faster performance'
    ]
  },
  {
    title: 'Personal Portfolio Website',
    description: 'A responsive portfolio website showcasing creative animations, modern design principles, and optimized performance.',
    fullDescription:
      'A cutting-edge personal portfolio website designed to showcase projects and skills with modern UI/UX practices. Built with React.js and enhanced with GSAP animations for smooth transitions and interactive visuals. Styled with SCSS for modularity and optimized using Vite for blazing-fast performance.',
    technologies: ['React.js', 'GSAP', 'SCSS', 'Vite'],
    link: '#',
    github: 'https://github.com/arnav-khandelwal/portfolio',
    features: [
      'Smooth GSAP animations for sections',
      'Responsive design optimized for all devices',
      'SEO-friendly and accessible',
      'Lightweight and fast with Vite',
      'Modern UI/UX principles'
    ]
  }
];

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    
    // Add slight delay for DOM update, then animate
    setTimeout(() => {
      if (modalRef.current) {
        gsap.set(modalRef.current, { 
          opacity: 0,
          display: 'flex'
        });
        
        gsap.set(modalRef.current.querySelector('.project-modal__content'), {
          y: 100,
          scale: 0.8,
          opacity: 0
        });

        const tl = gsap.timeline();
        tl.to(modalRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        })
        .to(modalRef.current.querySelector('.project-modal__content'), {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)"
        }, 0.1);
      }
    }, 10);
  };

  const closeProjectModal = () => {
    if (!modalRef.current) {
      setIsModalOpen(false);
      setSelectedProject(null);
      document.body.style.overflow = 'unset';
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        document.body.style.overflow = 'unset';
      }
    });

    tl.to(modalRef.current.querySelector('.project-modal__content'), {
      y: 50,
      scale: 0.9,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in"
    })
    .to(modalRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    }, 0.1);
  };

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
          end: "bottom 20%",
          toggleActions: "play reverse play reverse"
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
          end: "bottom 20%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <section id="projects" ref={sectionRef} className="projects">
        <div className="container">
          <h2 ref={titleRef} className="projects__title">Featured Projects</h2>
          <div ref={projectsRef} className="projects__grid">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="projects__item"
                onClick={() => openProjectModal(project)}
                style={{ cursor: 'pointer' }}
              >
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
                  <span className="projects__read-more-link">
                    Read More →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {isModalOpen && selectedProject && (
        <div className="project-modal" ref={modalRef} onClick={closeProjectModal}>
          <div className="project-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="project-modal__close" onClick={closeProjectModal}>
              ×
            </button>
            
            <div className="project-modal__scrollable">
              <div className="project-modal__header">
                <div className="project-modal__header-content">
                  <div className="project-modal__title-section">
                    <h1 className="project-modal__title">{selectedProject.title}</h1>
                    <div className="project-modal__content-with-links">
                      <p className="project-modal__description">{selectedProject.fullDescription}</p>
                      <div className="project-modal__links">
                        <a 
                          href={selectedProject.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-modal__link-btn"
                          title="View GitHub Repository"
                        >
                          <SiGithub />
                          <span>GitHub</span>
                        </a>
                        <a 
                          href={selectedProject.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-modal__link-btn"
                          title="View Live Project"
                        >
                          <HiGlobeAlt />
                          <span>Live Site</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>              <div className="project-modal__body">
                <div className="project-modal__section">
                  <h3>Key Features</h3>
                  <ul className="project-modal__features">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-modal__section">
                  <h3>Technologies Used</h3>
                  <div className="project-modal__technologies">
                    {selectedProject.technologies.map((tech, index) => (
                      <span key={index} className="project-modal__tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
