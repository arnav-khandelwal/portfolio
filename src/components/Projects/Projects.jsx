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
  const [visibleProjects, setVisibleProjects] = useState(6); // Start with 6 projects (2 rows)

const projects = [
  {
    title: 'MediChain',
    description: 'A secure, AI-powered healthcare platform with blockchain-backed prescription traceability.',
    fullDescription:
      'MediChain is a secure healthcare platform enabling patients, doctors, and pharmacies to issue, verify, and fulfill prescriptions with blockchain-backed traceability. It uses Solidity smart contracts for immutable verification and stores prescription payloads on IPFS with on-chain pointers. Real-time inventory and order fulfillment are powered by WebSockets (Socket.IO). An AI-powered prescription analyzer flags drug interactions and generates patient-friendly summaries. Role-based dashboards with JWT authentication and encrypted data flows provide secure access for patients, prescribers, and pharmacy admins.',
    technologies: ['React.js', 'Express.js', 'Solidity', 'WebSockets', 'ethers.js', 'MongoDB', 'SCSS'],
    link: 'https://medichain-chi.vercel.app/',
    github: 'https://github.com/yash2607-del/medichain',
    features: [
      'On-chain digital signatures and immutable verification using Solidity smart contracts',
      'Prescription data stored on IPFS with on-chain pointers to prevent tampering',
      'Real-time pharmacy inventory & order fulfillment via WebSockets',
      'AI-powered prescription analyzer to flag interactions and generate summaries',
      'Role-based dashboards with JWT authentication and encrypted data flows',
      'Tamper-proof verification and faster fulfillment with improved patient understanding'
    ]
  },
  {
    title: 'Jobr',
    description: 'A swipe-based job discovery platform that fetches jobs via web scraping and applies using a Selenium based automation',
    fullDescription:
      'Jobr is a modern job discovery app where users can explore job opportunities by simply swiping. The app fetches jobs using web scraping, parses resume to extract relevant information, uses user data to suggest best jobs for him using GenAI. When a user swipes right, the app automatically applies for the job using their uploaded resume and AI-generated answers for application questions. The frontend is built in Flutter for a smooth cross-platform experience, while the backend is powered by Python for scalable scraping, AI processing, and automated job applications.',
    technologies: ['Flutter', 'Dart', 'Python', 'FastAPI', 'Web Scraping', 'GenAI', 'Selenium'],
    github: 'https://github.com/arnav-khandelwal/jobr',
    features: [
      'Swipe-based job discovery with a Tinder-like UI',
      'Automatic job applications with AI-generated answers',
      'Job listings fetched dynamically via web scraping',
      'Resume parsing to extract user skills and experience',
      'Cross-platform Flutter app with Python backend'
    ]
  },
  {
    title: 'Meteor Madness',
    description: 'Planetary defense simulation platform for impact analysis, mission planning and interactive 3D visualization.',
    fullDescription:
      'Meteor Madness is a comprehensive planetary defense simulation system that integrates real-time NASA asteroid data, advanced physics-based impact modeling, and mission planning tools. It offers interactive 3D globe visualizations, detailed impact and damage assessments, deflection feasibility analysis (kinetic, nuclear, gravity tractor), and role-based reporting. The backend uses a high-performance FastAPI physics engine for orbital mechanics, atmospheric entry, airburst/crater modeling, and casualty estimates. Frontend uses React with Three.js/Globe visualization plus realtime features for scenario interaction.',
    technologies: ['React.js', 'Three.js', 'Globe.gl', 'FastAPI', 'NumPy', 'Python', 'SCSS'],
    github: 'https://github.com/Adithya-Venkatraman05/Meteor-Madness-AI-based-Meteor-defletion',
    features: [
      'NASA SBDB integration for real-time asteroid lookup and autocomplete',
      'Accurate orbital mechanics and impact physics (airburst, crater, thermal, overpressure)',
      'Interactive 3D globe with multi-zone damage visualization and population overlays',
      'Deflection mission planning with energy & success probability estimates',
      'High-performance physics engine validated against historical events (Chelyabinsk, Tunguska)',
      'Batch processing and real-time scenario simulation with detailed API endpoints'
    ]
  },
  {
    title: 'SportsSocial',
    description: 'A full-stack social platform to discover, join, and host events with real-time chat and location filtering.',
    fullDescription:
      'SportsSocial is a MERN-based platform that connects players by letting them create, join, and manage sports events. It features real-time chat powered by WebSockets, authentication using JWT, and location-based filtering using PostGIS and Google Maps API. Supabase (PostgreSQL) serves as the scalable backend while the frontend is built with React.js and SCSS for a smooth and responsive UI.',
    technologies: ['React.js', 'Node.js', 'Supabase (PostgreSQL)', 'WebSockets', 'Google Maps API', 'SCSS'],
    link: 'https://sportssocial.netlify.app',
    github: 'https://github.com/arnav-khandelwal/SportsSocial2.0',
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
    title: 'GameBoy Dating App',
    description: 'A retro-themed dating app with a fully interactive GameBoy interface, heart-based matching, and 8-bit pixelated profiles.',
    fullDescription:
      'GameBoy Dating App is a nostalgic twist on modern dating, combining Tinder-like swiping with a fully functional GameBoy interface. It features D-pad navigation, pixelated avatars by image processing, authentic retro sound effects, and a unique heart-based matching system. Built with Flutter for cross-platform support, Node.js for backend logic, and Supabase for authentication and database management, it delivers a fun, gamified dating experience with a strong 8-bit aesthetic.',
    technologies: ['Flutter', 'Dart', 'Node.js', 'Express.js', 'Supabase', 'Railway'],
    link: 'https://youtube.com/shorts/_ZogtFTygEc',
    github: 'https://github.com/rudradogra/Gameboy_app',
    features: [
      'Fully interactive GameBoy-inspired UI with D-pad and button controls',
      'Heart-based matching system for strategic swiping',
      'Retro image processing to create 8-bit pixelated avatars',
      'Authentic GameBoy sounds with haptic and visual feedback',
      'Cross-platform support (Android, Web, iOS) via Flutter',
      'Supabase-powered auth, database, and file storage'
    ]
  },
  {
    title: 'Travel AI',
    description: 'An AI-powered travel planner for booking hotels, flights, and generating personalized itineraries.',
    fullDescription:
      'Travel AI is an AI assistant that helps users plan trips by integrating Gemini API, OpenWeatherMap, Booking.com, and SkyScanner. It reduces planning effort by 80% by automating hotel and flight suggestions, generating custom itineraries, and providing weather-based travel insights. The app is built with React.js and optimized for responsive, modular components.',
    technologies: ['React.js', 'Gemini API', 'OpenWeatherMap', 'SkyScanner API', 'CSS'],
    link: 'https://travelai-2tdl.onrender.com/',
    github: 'https://github.com/arnav-khandelwal/TravelAi',
    features: [
      'AI-driven itinerary generation',
      'Live hotel and flight search',
      'Weather-based travel suggestions',
      'Responsive and modular design',
      'Fast API optimization for better UX'
    ]
  },
  {
    title: 'War Card Game',
    description: 'A simple iOS card game built with SwiftUI where the player competes against the computer by dealing random cards.',
    fullDescription:
      'War Card Game is a fun, lightweight iOS app built using SwiftUI. Players and the computer deal random cards, and the score updates based on who draws the higher card. The game uses custom card assets and provides a clean, interactive interface. It’s a beginner-friendly SwiftUI project demonstrating state management and basic game logic.',
    technologies: ['SwiftUI', 'Xcode', 'iOS Simulator'],
    github: 'https://github.com/arnav-khandelwal/CardGame',
    features: [
      'Tap the "Deal" button to draw random cards',
      'Dynamic score updates based on the higher card',
      'Custom card images and background assets',
      'Lightweight SwiftUI-based UI with state management',
      'Simple game logic using Int.random()'
    ]
  },
  {
    title: 'MediVerse',
    description: 'An AI-powered tool that identifies medicines from damaged packaging images and provides safe usage information.',
    fullDescription:
      'MediVerse is a health-focused AI web app that identifies medicines from images of their damaged packages using image recognition. It integrates Gemini API for AI processing, Akash AI for chatbot functionality and also has a prescription analyzer. Built with React.js for the frontend and Express.js with Node.js for backend API handling.',
    technologies: ['React.js', 'Express.js', 'Gemini API', 'Akash AI', 'SCSS'],
    link: 'https://mediverse-jh0x.onrender.com/',
    github: 'https://github.com/aryanj33/hack33/',
    features: [
      'Image recognition for medicine identification',
      'AI-powered chatbot for health queries',
      'Prescription text analyzer',
      '90% accuracy in medicine detection',
      'Responsive UI for mobile and desktop'
    ]
  },
  
  {
    title: 'SportsSocial App',
    description: 'A cross-platform sports networking app for discovering events, hosting matches, and sharing achievements with the community.',
    fullDescription:
      'SportsSocial is a Flutter-based mobile app that connects sports enthusiasts by enabling them to discover nearby events, join or host matches, and share their achievements with other players. The backend is built with Node.js and Express, featuring JWT authentication, real-time chat, and secure data management with Supabase. Push notifications keep users updated on upcoming events and new posts in their network.',
    technologies: ['Flutter', 'Dart', 'Node.js', 'Express.js', 'Supabase'],
    github: 'https://github.com/rudradogra/sportsSocial_app',
    features: [
      'Cross-platform app for Android & iOS',
      'Browse, join, and host sports events',
      'Post and share achievements & match highlights',
      'Real-time chat between participants',
      'Push notifications for event reminders and updates'
    ]
  },
  {
    title: 'Algorithm Visualizer',
    description: 'A comprehensive tool for visualizing algorithms and data structures with a React-based frontend and a C++ backend.',
    fullDescription:
      'Algorithm Visualizer is an interactive platform that helps users understand complex algorithms and data structures through visual animations. The frontend is built using React.js with Vite for fast performance, while the backend is implemented in C++ for efficient computation and served via a lightweight HTTP server. It supports sorting, searching, and graph algorithms, along with visualizations for common data structures like Binary Search Trees and Heaps.',
    technologies: ['React.js', 'C++', 'CMake'],
    github: 'https://github.com/arnav-khandelwal/DSA_Visualizer',
    features: [
      'Visualize sorting algorithms (Bubble, Merge, Quick, Heap, etc.)',
      'Visualize searching algorithms (Linear, Binary)',
      'Graph algorithm support: BFS, DFS, Dijkstra, Kruskal, Prim',
      'Data structure visualizations like BST and Max Heap',
      'Playback controls to step through algorithm execution',
      'Frontend in React.js + Backend in C++ for performance'
    ]
  },
  {
    title: 'Delivery System Project',
    description: 'A C++-based delivery system simulation with route planning, driver assignment, and order management, featuring a web-based interface.',
    fullDescription:
      'This Delivery System is a simulation platform that manages delivery routes, driver assignments, and order processing. It uses Dijkstra’s algorithm for shortest path calculations, a custom driver assignment algorithm based on workload, speed, and route compatibility, and route optimization for drivers with multiple deliveries. SQLite3 is used for storing locations, drivers, and orders, while the web-based interface allows easy management of the delivery network.',
    technologies: ['C++', 'CMake', 'SQLite3', 'JavaScript', 'HTML/CSS'],
    github: 'https://github.com/arnav-khandelwal/food-delivery-system',
    features: [
      'Shortest path calculation using Dijkstra’s algorithm with traffic factors',
      'Driver assignment based on workload, speed, and route compatibility',
      'Multi-order route optimization for efficient deliveries',
      'Web-based interface for managing locations, roads, and orders',
      'SQLite3 database integration for storing delivery network data'
    ]
  }
];

  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 6, projects.length)); // Load 6 more projects (2 rows)
  };

  const viewLessProjects = () => {
    setVisibleProjects(6); // Reset to initial 6 projects
  };

  const hasMoreProjects = visibleProjects < projects.length;
  const showingMoreThanInitial = visibleProjects > 6;

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

    // Initial projects animation
    if (projectsRef.current) {
      const initialItems = Array.from(projectsRef.current.children).slice(0, 6);
      gsap.fromTo(initialItems,
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
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Animate new projects when they're loaded
  useEffect(() => {
    if (projectsRef.current && visibleProjects > 6) {
      const allItems = projectsRef.current.children;
      const newItems = Array.from(allItems).slice(visibleProjects - 6, visibleProjects);
      
      if (newItems.length > 0) {
        gsap.fromTo(newItems,
          { y: 100, opacity: 0, rotation: 5 },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
          }
        );
      }
    }
  }, [visibleProjects]);

  return (
    <>
      <section id="projects" ref={sectionRef} className="projects">
        <div className="container">
          <h2 ref={titleRef} className="projects__title">Featured Projects</h2>
          <div ref={projectsRef} className="projects__grid">
            {projects.slice(0, visibleProjects).map((project, index) => (
              <div 
                key={index} 
                className="projects__item"
                onClick={() => openProjectModal(project)}
                style={{ cursor: 'pointer' }}
              >
                <div className="projects__content">
                  <div className="projects__header">
                    <h3 className="projects__item-title">{project.title}</h3>
                    <div className="projects__card-links">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="projects__card-link"
                        title="View GitHub Repository"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SiGithub />
                      </a>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="projects__card-link"
                          title="View Live Project"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <HiGlobeAlt />
                        </a>
                      )}
                    </div>
                  </div>
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
          
          <div className="projects__view-controls">
            {hasMoreProjects && (
              <span 
                className="projects__view-more-link"
                onClick={loadMoreProjects}
              >
                View More ↓
              </span>
            )}
            {showingMoreThanInitial && (
              <span 
                className="projects__view-less-link"
                onClick={viewLessProjects}
              >
                View Less ↑
              </span>
            )}
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
                        {selectedProject.link && (
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
                        )}
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
