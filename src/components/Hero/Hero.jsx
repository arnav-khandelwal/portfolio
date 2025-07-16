import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.scss';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Background animation
    gsap.fromTo(backgroundRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
    );

    // Text animations
    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.5"
    )
    .fromTo(descriptionRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=1"
    )
    .fromTo(ctaRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.3"
    );

    // Continuous floating animation
    gsap.to(heroRef.current, {
      y: -10,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });
  }, []);

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div ref={backgroundRef} className="hero__background"></div>
      <div className="container">
        <div ref={heroRef} className="hero__content">
          <h1 ref={titleRef} className="hero__title">
            Hello, I'm <span>Your Name</span>
          </h1>
          <h2 ref={subtitleRef} className="hero__subtitle">Creative Developer & Designer</h2>
          <p ref={descriptionRef} className="hero__description">
            I craft digital experiences that blend creativity with functionality,
            bringing ideas to life through elegant code and thoughtful design.
          </p>
          <button ref={ctaRef} className="hero__cta" onClick={handleScrollToProjects}>
            View My Work
            <span className="hero__cta-arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
