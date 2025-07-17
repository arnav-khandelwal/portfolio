import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.scss';

gsap.registerPlugin(ScrollTrigger);

// Widget component for About section interests
const AboutWidget = ({ onOpenExperienceModal }) => {
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
    year: '2023-2027',
    title: 'B.Tech in Computer Science',
    institution: 'Jaypee Institute Of Information Technology, Noida',
    gpa: '8.5/10'
  },
  {
    year: '2009-2023',
    title: 'High School',
    institution: 'DPS Indirapuram, Ghaziabad',
    achievements: 'Class XII: 93.8%, Class X: 93.4%'
  }
];

  const experienceData = [
  {
    year: 'June 2025 – Present',
    title: 'Flutter App Developer',
    company: 'Menoob (Remote)',
    fullDescription:
      'Building a cross-platform mobile app using Flutter and Firebase for seamless real-time sync across 500+ users. Integrating Razorpay API for secure payments and using Provider for state management, improving performance and reducing rebuild cycles.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Github', 'Razorpay API', 'Provider'],
    achievements: [
      'Delivered a cross-platform app used by 500+ users',
      'Integrated secure payment flow with Razorpay API',
      'Improved app performance by 30% through state management optimization',
      'Developed reusable Flutter widgets to improve code maintainability and consistency'
    ],
    responsibilities: [
      'Developing and maintaining a cross-platform Flutter application',
      'Implementing secure payment gateways with Razorpay API',
      'Managing app state efficiently using Provider',
      'Optimizing performance and ensuring smooth user experience',
      'Collaborating remotely with the product team'
    ],
    location: 'Remote',
    type: 'Internship'
  },
  {
    year: 'Mar 2025 – June 2025',
    title: 'Web Development Intern',
    company: 'Mad Marketing Club (Remote)',
    fullDescription:
      'Developed a company website using React.js, improving page load speed by 40% via code splitting and lazy loading. Built a CRM using the MERN stack with authentication, lead tracking, and role-based access. Created a real-time analytics dashboard to reduce manual work by 70%.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Github', 'SCSS'],
    achievements: [
      'Improved website performance by 40% using code splitting and lazy loading',
      'Built a full-featured CRM with role-based access control',
      'Developed a real-time analytics dashboard reducing manual tasks by 70%',
      'Delivered a production-ready websites for the company'
    ],
    responsibilities: [
      'Collaborated with other developers to create the official company website using React.js, ensuring fast load times and a seamless user experience',
      'Developed a production-ready CRM platform using the MERN stack as a product for the company to sell to clients',
      'Helped create websites for various businesses, improving their online presence',
    ],
    location: 'Remote',
    type: 'Internship'
  }
];

  useEffect(() => {
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
          end: "bottom 20%",
          toggleActions: "play reverse play reverse"
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
          end: "bottom 30%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
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
          toggleActions: "play reverse play reverse"
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
          toggleActions: "play reverse play reverse"
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
          toggleActions: "play reverse play reverse"
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
          toggleActions: "play reverse play reverse"
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
              Hey, I’m Arnav! I’m a developer who loves turning random ideas into actual working apps (most of the time xD). 
              I enjoy blending good design with clean, functional code — because what’s the 
              point of an app if it looks pretty but breaks on click, right?
            </p>
            <p className="about__description">
              I started coding out of pure curiosity, and before I knew it, 
              I was stuck in the endless loop of learn → build → mess up → fix → repeat. 
              Now, I spend my time creating web and mobile apps that (hopefully) make life a little easier.
            </p>
            <div ref={statsRef} className="about__stats">
              <div className="about__stat">
                <span className="about__stat-number">15+</span>
                <span className="about__stat-label">Projects Completed</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">2+</span>
                <span className="about__stat-label">Years Experience</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-number">500+</span>
                <span className="about__stat-label">Leetcode Questions</span>
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
