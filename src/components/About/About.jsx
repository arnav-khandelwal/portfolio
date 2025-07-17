import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import './About.scss';

gsap.registerPlugin(ScrollTrigger);

// Widget component for About section interests
const AboutWidget = ({ onOpenExperienceModal }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const atomGroupRef = useRef(null);
  const orbitGroupsRef = useRef([]);
  const iconsRef = useRef([]);
  const widgetContainerRef = useRef(null);
  const timelineRef = useRef(null);
  const [activeTab, setActiveTab] = React.useState('experience');

  const handleTabSwitch = (newTab) => {
    if (newTab === activeTab) return;
    
    // Animate out current content
    gsap.to(timelineRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(newTab);
        // Animate in new content
        gsap.fromTo(timelineRef.current, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    });
  };

  const educationData = [
    {
      year: '2020-2024',
      title: 'Bachelor of Computer Science',
      institution: 'University of Technology',
      description: 'Specialized in Software Engineering with focus on web technologies and algorithms.',
      gpa: '3.8/4.0'
    },
    {
      year: '2018-2020',
      title: 'High School Diploma',
      institution: 'Tech Preparatory School',
      description: 'Advanced courses in Mathematics, Computer Science, and Physics.',
      achievements: 'Valedictorian, Computer Science Award'
    }
  ];

  const experienceData = [
    {
      year: '2024-Present',
      title: 'Frontend Developer',
      company: 'Tech Innovation Corp',
      description: 'Developing modern web applications using React, TypeScript, and GSAP animations.',
      fullDescription: 'Leading frontend development for cutting-edge web applications at Tech Innovation Corp. Responsible for architecting scalable React applications, implementing complex animations with GSAP, and ensuring optimal performance across all devices. Collaborated closely with design teams to bring creative visions to life while maintaining code quality and best practices.',
      technologies: ['React', 'TypeScript', 'GSAP', 'SCSS'],
      achievements: [
        'Improved application performance by 40% through code optimization',
        'Led the development of 5 major product features',
        'Mentored 2 junior developers',
        'Implemented comprehensive testing strategy',
        'Reduced bug reports by 60% through quality improvements'
      ],
      responsibilities: [
        'Architecting and developing complex React applications',
        'Creating smooth animations and micro-interactions',
        'Collaborating with UI/UX designers and backend developers',
        'Code reviews and maintaining coding standards',
        'Performance optimization and cross-browser compatibility'
      ],
      location: 'San Francisco, CA',
      type: 'Full-time'
    },
    {
      year: '2023-2024',
      title: 'Web Developer Intern',
      company: 'Creative Digital Agency',
      description: 'Built responsive websites and collaborated on UI/UX design projects.',
      fullDescription: 'Gained hands-on experience in web development at a fast-paced digital agency. Worked on diverse client projects ranging from small business websites to large-scale web applications. Learned industry best practices and collaborated with senior developers on challenging technical problems.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Vue.js'],
      achievements: [
        'Successfully delivered 10+ client projects',
        'Received outstanding intern evaluation',
        'Contributed to agency\'s design system',
        'Improved website loading speeds by 30%'
      ],
      responsibilities: [
        'Developing responsive websites for various clients',
        'Implementing UI designs with pixel-perfect accuracy',
        'Testing and debugging across multiple browsers',
        'Participating in client meetings and project planning'
      ],
      location: 'New York, NY',
      type: 'Internship'
    }
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Store refs
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Create atom group
    const atomGroup = new THREE.Group();
    scene.add(atomGroup);
    atomGroupRef.current = atomGroup;

    // Initially hide the atom for entrance animation
    atomGroup.scale.setScalar(0);
    atomGroup.rotation.x = Math.PI;

    // Create nucleus
    const nucleusGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const nucleusMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x7C5E3C, // accent-brown from color palette
      transparent: true,
      opacity: 0.8
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    atomGroup.add(nucleus);

    // Create orbital rings with color palette colors
    const ringRadii = [1.8, 2.6, 3.4];
    const ringColors = [0xFFD580, 0xE6B8A2, 0xC2A98B]; // accent-gold, accent-rose, dark-beige
    
    ringRadii.forEach((radius, index) => {
      const orbitGroup = new THREE.Group();
      
      // Create ring geometry - thicker rings
      const ringGeometry = new THREE.RingGeometry(radius - 0.05, radius + 0.05, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: ringColors[index],
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      
      // Rotate rings for 3D effect with more varied angles
      ring.rotation.x = Math.PI / 2 + (index * Math.PI / 5);
      ring.rotation.z = index * Math.PI / 3;
      
      orbitGroup.add(ring);
      
      // Create orbiting particles/electrons - bigger spheres
      const particleGeometry = new THREE.SphereGeometry(0.15, 12, 12);
      const particleMaterial = new THREE.MeshBasicMaterial({ 
        color: ringColors[index],
        transparent: true,
        opacity: 0.9
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(radius, 0, 0);
      
      orbitGroup.add(particle);
      atomGroup.add(orbitGroup);
      
      orbitGroupsRef.current.push(orbitGroup);
      iconsRef.current.push(particle);
    });

    // Position camera
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    // GSAP Entrance Animation for the atom
    gsap.timeline({
      scrollTrigger: {
        trigger: widgetContainerRef.current,
        start: "top 80%",
        end: "bottom 20%",
      }
    })
    .to(atomGroup.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.5,
      ease: "back.out(1.7)"
    })
    .to(atomGroup.rotation, {
      x: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=1");

    // Animate timeline entrance
    gsap.fromTo('.about-widget__timeline-selector', 
      { y: -30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: widgetContainerRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo('.about-widget__timeline-item', 
      { x: -50, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: widgetContainerRef.current,
          start: "top 70%",
        }
      }
    );

    // Animation loop with slower movement
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate entire atom - slower movement
      if (atomGroup) {
        atomGroup.rotation.y += 0.005; // Reduced from 0.01
        atomGroup.rotation.x += 0.002; // Reduced from 0.005
      }
      
      // Rotate each orbit at different speeds - slower
      orbitGroupsRef.current.forEach((orbitGroup, index) => {
        if (orbitGroup) {
          const speed = (index + 1) * 0.01; // Reduced from 0.02
          orbitGroup.rotation.y += speed;
          orbitGroup.rotation.z += speed * 0.3; // Reduced from 0.5
        }
      });
      
      // Pulsate nucleus - slower
      if (nucleus) {
        const scale = 1 + Math.sin(Date.now() * 0.002) * 0.15; // Reduced frequency and amplitude
        nucleus.scale.setScalar(scale);
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (renderer && camera) {
        renderer.setSize(400, 400);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="about-widget" ref={widgetContainerRef}>
      {/* Timeline Selector */}
      <div className="about-widget__timeline-selector">
        <button 
          className={`about-widget__tab ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('education')}
        >
          Education
        </button>
        <button 
          className={`about-widget__tab ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('experience')}
        >
          Experience
        </button>
      </div>

      {/* Timeline Content */}
      <div className="about-widget__timeline" ref={timelineRef}>
        {activeTab === 'education' && (
          <div className="about-widget__timeline-content">
            {educationData.map((item, index) => (
              <div key={index} className="about-widget__timeline-item">
                <div className="about-widget__timeline-marker"></div>
                <div className="about-widget__timeline-card">
                  <span className="about-widget__timeline-year">{item.year}</span>
                  <h3 className="about-widget__timeline-title">{item.title}</h3>
                  <h4 className="about-widget__timeline-institution">{item.institution}</h4>
                  {item.gpa && (
                    <span className="about-widget__timeline-meta">GPA: {item.gpa}</span>
                  )}
                  {item.achievements && (
                    <span className="about-widget__timeline-meta">{item.achievements}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="about-widget__timeline-content">
            {experienceData.map((item, index) => (
              <div key={index} className="about-widget__timeline-item">
                <div className="about-widget__timeline-marker"></div>
                <div className="about-widget__timeline-card">
                  <span className="about-widget__timeline-year">{item.year}</span>
                  <h3 className="about-widget__timeline-title">{item.title}</h3>
                  <h4 className="about-widget__timeline-institution">{item.company}</h4>
                  <span 
                    className="about-widget__read-more-link"
                    onClick={() => onOpenExperienceModal(item)}
                  >
                    Read More →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3D Atom Background */}
      <div className="about-widget__3d-container">
        <div ref={mountRef} className="about-widget__3d-atom" />
      </div>
    </div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const widgetRef = useRef(null);
  const statsRef = useRef(null);
  const modalRef = useRef(null);
  const [selectedExperience, setSelectedExperience] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openExperienceModal = (experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Add slight delay for DOM update, then animate
    setTimeout(() => {
      if (modalRef.current) {
        gsap.set(modalRef.current, { 
          opacity: 0,
          display: 'flex'
        });
        
        gsap.set(modalRef.current.querySelector('.experience-modal__content'), {
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
        .to(modalRef.current.querySelector('.experience-modal__content'), {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "back.out(1.7)"
        }, 0.1);
      }
    }, 10);
  };

  const closeExperienceModal = () => {
    if (!modalRef.current) {
      setIsModalOpen(false);
      setSelectedExperience(null);
      document.body.style.overflow = 'unset';
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsModalOpen(false);
        setSelectedExperience(null);
        document.body.style.overflow = 'unset';
      }
    });

    tl.to(modalRef.current.querySelector('.experience-modal__content'), {
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
    const content = contentRef.current;
    const widget = widgetRef.current;
    const stats = statsRef.current.children;

    // Title animation with enhanced effects
    gsap.fromTo(title,
      { 
        y: 60, 
        opacity: 0,
        scale: 0.8,
        rotationX: -15
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
        }
      }
    );

    // Content animation with staggered paragraphs
    const paragraphs = content.querySelectorAll('.about__description');
    gsap.fromTo(paragraphs,
      { 
        x: -80, 
        opacity: 0,
        y: 30
      },
      {
        x: 0,
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 20%",
        }
      }
    );

    // Widget animation (icons slide in from left)
    gsap.fromTo(widget,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 20%",
        }
      }
    );

    // Stats animation with enhanced effects
    gsap.fromTo(stats,
      { 
        y: 50, 
        opacity: 0,
        scale: 0.8,
        rotationY: 20
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
          end: "bottom 20%",
        }
      }
    );
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset'; // Cleanup any modal overflow settings
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about hero">
      <div className="container hero__container">
        <div className="hero__widget" ref={widgetRef}>
          <AboutWidget onOpenExperienceModal={openExperienceModal} />
        </div>
        <div className="hero__text">
          <h2 ref={titleRef} className="about__title">About Me</h2>
          <div ref={contentRef} className="about__content">
            <p className="about__description">
              I'm a passionate developer with a keen eye for design and a love for creating 
              meaningful digital experiences. With expertise in modern web technologies, 
              I bridge the gap between creative vision and technical implementation.
            </p>
            <p className="about__description">
              My journey in web development started with curiosity and has evolved into 
              a profession driven by continuous learning and innovation. I believe in 
              writing clean, efficient code that not only works but tells a story.
            </p>
            <div ref={statsRef} className="about__stats">
              <div className="about__stat">
                <span className="about__stat-number">50+</span>
                <span className="about__stat-label">Projects Completed</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">3+</span>
                <span className="about__stat-label">Years Experience</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">100%</span>
                <span className="about__stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Detail Modal */}
      {isModalOpen && selectedExperience && (
        <div className="experience-modal" ref={modalRef} onClick={closeExperienceModal}>
          <div className="experience-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="experience-modal__close" onClick={closeExperienceModal}>
              ×
            </button>
            
            <div className="experience-modal__scrollable">
              <div className="experience-modal__header">
                <div className="experience-modal__hero">
                  <div className="experience-modal__meta">
                    <span className="experience-modal__year">{selectedExperience.year}</span>
                    <span className="experience-modal__type">{selectedExperience.type}</span>
                    <span className="experience-modal__location">{selectedExperience.location}</span>
                  </div>
                </div>
                <h1 className="experience-modal__title">{selectedExperience.title}</h1>
                <h2 className="experience-modal__company">{selectedExperience.company}</h2>
                <p className="experience-modal__description">{selectedExperience.fullDescription}</p>
              </div>

              <div className="experience-modal__body">
                <div className="experience-modal__section">
                  <h3>Key Responsibilities</h3>
                  <ul className="experience-modal__responsibilities">
                    {selectedExperience.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>

                <div className="experience-modal__section">
                  <h3>Key Achievements</h3>
                  <ul className="experience-modal__achievements">
                    {selectedExperience.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="experience-modal__section">
                  <h3>Technologies Used</h3>
                  <div className="experience-modal__technologies">
                    {selectedExperience.technologies.map((tech, index) => (
                      <span key={index} className="experience-modal__tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="experience-modal__footer">
                <button className="experience-modal__close-btn" onClick={closeExperienceModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
