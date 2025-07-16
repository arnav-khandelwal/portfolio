import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Header.scss';

const Header = () => {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    const navItems = navRef.current.children;

    // Initial animation
    gsap.fromTo(header, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(logo,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)", delay: 0.3 }
    );

    gsap.fromTo(navItems,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.5 }
    );

    // Scroll animation
    gsap.to(header, {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "100px top",
        scrub: true,
      },
      backgroundColor: "rgba(245, 245, 220, 0.95)",
      backdropFilter: "blur(10px)",
    });
  }, []);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header ref={headerRef} className="header">
      <div className="container">
        <div className="header__content">
          <div ref={logoRef} className="header__logo">
            <span>Portfolio</span>
          </div>
          <nav ref={navRef} className="header__nav">
            <button onClick={() => handleNavClick('about')}>About</button>
            <button onClick={() => handleNavClick('skills')}>Skills</button>
            <button onClick={() => handleNavClick('projects')}>Projects</button>
            <button onClick={() => handleNavClick('contact')}>Contact</button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
