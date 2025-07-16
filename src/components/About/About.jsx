import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.scss';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const stats = statsRef.current.children;

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
        }
      }
    );

    // Content animation
    gsap.fromTo(content,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 20%",
        }
      }
    );

    // Image animation
    gsap.fromTo(image,
      { x: 50, opacity: 0, scale: 0.8 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 20%",
        }
      }
    );

    // Stats animation
    gsap.fromTo(stats,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          end: "bottom 20%",
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about">
      <div className="container">
        <h2 ref={titleRef} className="about__title">About Me</h2>
        <div className="about__content-wrapper">
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
          <div ref={imageRef} className="about__image">
            <div className="about__image-placeholder">
              <span>Your Photo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
