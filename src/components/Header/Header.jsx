import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Header.scss';

const Header = () => {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const menuButtonRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuItemsRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    const logo = logoRef.current;
    const menuButton = menuButtonRef.current;

    // Initial animation
    gsap.fromTo(header, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(logo,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1.2, ease: "back.out(1.7)", delay: 0.3 }
    );

    gsap.fromTo(menuButton,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.5 }
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

  const toggleMenu = () => {
    const menuItems = menuItemsRef.current.children;
    
    if (!isMenuOpen) {
      // Open menu
      setIsMenuOpen(true);
      
      // Animate menu items expanding to the right
      gsap.fromTo(menuItems,
        { 
          x: -100, 
          opacity: 0,
          scale: 0.5
        },
        { 
          x: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.6, 
          stagger: 0.1, 
          ease: "back.out(1.7)",
          delay: 0.1
        }
      );
    } else {
      // Close menu
      gsap.to(menuItems,
        { 
          x: -50, 
          opacity: 0,
          scale: 0.5,
          duration: 0.3, 
          stagger: 0.05,
          ease: "back.in(1.7)"
        }
      );
      
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      toggleMenu(); // Close menu after navigation
    }
  };

  return (
    <>
      <header ref={headerRef} className="header">
        <div className="container">
          <div className="header__content">
            <div ref={logoRef} className="header__logo">
              <span>Portfolio</span>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Menu */}
      <div className="floating-menu">
        <button 
          ref={menuButtonRef} 
          className={`floating-menu__button ${isMenuOpen ? 'floating-menu__button--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="floating-menu__line"></span>
          <span className="floating-menu__line"></span>
          <span className="floating-menu__line"></span>
        </button>

        {/* Menu Items */}
        <nav ref={menuItemsRef} className="floating-menu__nav">
          <button 
            className="floating-menu__item"
            onClick={() => handleNavClick('about')}
            data-text="About"
          >
            <span className="floating-menu__icon">👤</span>
          </button>
          <button 
            className="floating-menu__item"
            onClick={() => handleNavClick('skills')}
            data-text="Skills"
          >
            <span className="floating-menu__icon">⚡</span>
          </button>
          <button 
            className="floating-menu__item"
            onClick={() => handleNavClick('projects')}
            data-text="Projects"
          >
            <span className="floating-menu__icon">💼</span>
          </button>
          <button 
            className="floating-menu__item"
            onClick={() => handleNavClick('contact')}
            data-text="Contact"
          >
            <span className="floating-menu__icon">📧</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;
