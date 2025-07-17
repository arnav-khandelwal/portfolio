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
  const widgetRef = useRef(null);
  const cardRef = useRef(null);
  const orbsRef = useRef([]);

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
    );

    // Button animation starting with title
    gsap.fromTo(ctaRef.current,
      { y: 30, opacity: 0, scale: 0.8, rotationX: -15 },
      { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 1.2, ease: "power2.out", delay: 0.5 }
    );

    // Widget animations
    gsap.fromTo(widgetRef.current,
      { x: 100, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 1 }
    );

    // Animate floating orbs
    orbsRef.current.forEach((orb, index) => {
      if (orb) {
        gsap.fromTo(orb,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 0.8, 
            duration: 0.8, 
            ease: "back.out(1.7)", 
            delay: 1.5 + (index * 0.2) 
          }
        );
        
        // Continuous floating
        gsap.to(orb, {
          y: -15,
          duration: 2 + (index * 0.3),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 2 + (index * 0.1)
        });
      }
    });

    // Card hover effect setup
    const card = cardRef.current;
    if (card) {
      // Initial card animation
      gsap.fromTo(card,
        { rotationY: -15, scale: 0.9 },
        { rotationY: 0, scale: 1, duration: 1.2, ease: "power2.out", delay: 1.2 }
      );

      // Mouse move effect
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

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
        <div className="hero__wrapper">
          <div ref={heroRef} className="hero__content">
            <h1 ref={titleRef} className="hero__title">
              Hello, I'm <span>Arnav</span>
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
          
          <div ref={widgetRef} className="hero__widget">
            <div ref={cardRef} className="hero__card">
              <div className="hero__card-header">
                <div className="hero__card-dot hero__card-dot--red"></div>
                <div className="hero__card-dot hero__card-dot--yellow"></div>
                <div className="hero__card-dot hero__card-dot--green"></div>
              </div>
              <div className="hero__card-content">
                <div className="hero__code-line">
                  <span className="hero__code-keyword">const</span>
                  <span className="hero__code-variable"> developer</span>
                  <span className="hero__code-operator"> = </span>
                  <span className="hero__code-string">'creative'</span>
                </div>
                <div className="hero__code-line">
                  <span className="hero__code-keyword">function</span>
                  <span className="hero__code-function"> buildAmazing</span>
                  <span className="hero__code-bracket">()</span>
                  <span className="hero__code-bracket"> {'{'}</span>
                </div>
                <div className="hero__code-line hero__code-line--indent">
                  <span className="hero__code-keyword">return</span>
                  <span className="hero__code-string"> 'innovation'</span>
                </div>
                <div className="hero__code-line">
                  <span className="hero__code-bracket">{'}'}</span>
                </div>
              </div>
            </div>
            
            <div className="hero__orbs">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  ref={el => orbsRef.current[i] = el}
                  className={`hero__orb hero__orb--${i + 1}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
