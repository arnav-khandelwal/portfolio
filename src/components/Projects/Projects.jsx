import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
      title: 'E-Commerce Platform',
      description: 'A modern, responsive e-commerce platform built with React and Node.js, featuring real-time inventory management and seamless payment integration.',
      fullDescription: 'This comprehensive e-commerce solution revolutionizes online shopping with its intuitive interface and robust backend architecture. Built using React for dynamic user interactions and Node.js for scalable server-side operations, the platform seamlessly integrates with MongoDB for efficient data management and Stripe for secure payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛒',
      link: '#',
      gallery: [
        '🖥️ Desktop View',
        '📱 Mobile Interface', 
        '🛒 Shopping Cart',
        '💳 Checkout Process'
      ],
      features: [
        'Real-time inventory tracking',
        'Advanced search and filtering',
        'Secure payment gateway integration',
        'User authentication and profiles',
        'Admin dashboard for management',
        'Responsive design for all devices'
      ],
      role: 'Full-Stack Developer',
      duration: '3 months',
      year: '2024'
    },
    {
      title: 'Task Management App',
      description: 'An intuitive task management application with drag-and-drop functionality, real-time collaboration, and advanced filtering options.',
      fullDescription: 'A powerful productivity tool designed to streamline team collaboration and project management. Built with Vue.js for reactive user experiences and Firebase for real-time data synchronization, this application transforms how teams organize, track, and complete their work.',
      technologies: ['Vue.js', 'Firebase', 'TypeScript', 'CSS3'],
      image: '📋',
      link: '#',
      gallery: [
        '📊 Dashboard Overview',
        '📋 Task Boards',
        '👥 Team Collaboration',
        '📈 Analytics View'
      ],
      features: [
        'Drag-and-drop task management',
        'Real-time team collaboration',
        'Advanced filtering and search',
        'Progress tracking and analytics',
        'Customizable project boards',
        'Notification system'
      ],
      role: 'Frontend Developer',
      duration: '2 months',
      year: '2024'
    },
    {
      title: 'Weather Dashboard',
      description: 'A beautiful weather dashboard that provides detailed forecasts, interactive maps, and personalized weather alerts for multiple locations.',
      fullDescription: 'An elegant weather application that combines beautiful design with powerful functionality. Utilizing multiple weather APIs and Chart.js for data visualization, this dashboard provides comprehensive weather information with an intuitive and visually appealing interface.',
      technologies: ['React', 'API Integration', 'Chart.js', 'SCSS'],
      image: '🌤️',
      link: '#',
      gallery: [
        '🌍 Global Weather Map',
        '📊 Weather Charts',
        '📱 Mobile Dashboard',
        '🔔 Alert System'
      ],
      features: [
        'Multi-location weather tracking',
        'Interactive weather maps',
        'Detailed 7-day forecasts',
        'Weather alerts and notifications',
        'Historical weather data',
        'Customizable dashboard widgets'
      ],
      role: 'Frontend Developer',
      duration: '6 weeks',
      year: '2023'
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website showcasing creative animations, modern design principles, and optimized performance.',
      fullDescription: 'A cutting-edge portfolio website that demonstrates advanced web development techniques and creative design. Built with React and enhanced with GSAP animations, this project showcases the perfect blend of aesthetics and functionality.',
      technologies: ['React', 'GSAP', 'SCSS', 'Vite'],
      image: '💼',
      link: '#',
      gallery: [
        '🎨 Design System',
        '⚡ Performance Metrics',
        '📱 Responsive Design',
        '🎭 Animation Showcase'
      ],
      features: [
        'Advanced GSAP animations',
        'Responsive design system',
        'Optimized performance',
        'Modern UI/UX principles',
        'SEO optimized',
        'Accessibility compliant'
      ],
      role: 'Full-Stack Developer & Designer',
      duration: '1 month',
      year: '2024'
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
                <div className="projects__image">
                  <span className="projects__emoji">{project.image}</span>
                  <div className="projects__overlay">
                    <span className="projects__link">
                      View Details →
                    </span>
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
                <div className="project-modal__hero">
                  <span className="project-modal__emoji">{selectedProject.image}</span>
                  <div className="project-modal__meta">
                    <span className="project-modal__year">{selectedProject.year}</span>
                    <span className="project-modal__role">{selectedProject.role}</span>
                    <span className="project-modal__duration">{selectedProject.duration}</span>
                  </div>
                </div>
                <h1 className="project-modal__title">{selectedProject.title}</h1>
                <p className="project-modal__description">{selectedProject.fullDescription}</p>
              </div>

              <div className="project-modal__body">
                <div className="project-modal__section">
                  <h3>Project Gallery</h3>
                  <div className="project-modal__gallery">
                    {selectedProject.gallery.map((item, index) => (
                      <div key={index} className="project-modal__gallery-item">
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

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

              <div className="project-modal__footer">
                <a href={selectedProject.link} className="project-modal__visit-btn">
                  Visit Project
                </a>
                <button className="project-modal__close-btn" onClick={closeProjectModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Projects;
