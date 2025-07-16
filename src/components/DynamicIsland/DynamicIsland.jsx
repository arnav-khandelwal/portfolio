import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './DynamicIsland.scss';

const DynamicIsland = () => {
  const islandRef = useRef(null);
  const menuItemsRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  useEffect(() => {
    const island = islandRef.current;

    // Initial animation
    gsap.fromTo(island,
      { y: 100, opacity: 1, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 2 }
    );

    // Floating animation
    gsap.to(island, {
      y: -5,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });
  }, []);

  const toggleMenu = () => {
    const island = islandRef.current;
    const menuItems = menuItemsRef.current.children;
    const hamburger = hamburgerRef.current;

    if (!isExpanded) {
      // Expand the island
      setIsExpanded(true);
      
      // Animate island expansion
      gsap.to(island, {
        width: "auto",
        minWidth: "420px",
        duration: 0.8,
        ease: "power3.out"
      });

      // Animate hamburger lines with smoother timing
      const tl = gsap.timeline();
      tl.to(hamburger.children[0], {
        rotation: 45,
        y: 6,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(hamburger.children[1], {
        opacity: 0,
        scaleX: 0,
        duration: 0.3,
        ease: "power2.out"
      }, "<")
      .to(hamburger.children[2], {
        rotation: -45,
        y: -6,
        duration: 0.4,
        ease: "power2.out"
      }, "<");

      // Animate menu items with enhanced stagger
      gsap.fromTo(menuItems,
        { opacity: 0, x: -40, scale: 0.6, rotationY: -15 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          rotationY: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "back.out(1.4)",
          delay: 0.4
        }
      );
    } else {
      // Collapse the island
      setIsExpanded(false);

      // Animate menu items out with enhanced effect
      gsap.to(menuItems, {
        opacity: 0,
        x: -30,
        scale: 0.7,
        rotationY: 15,
        duration: 0.4,
        stagger: 0.04,
        ease: "power2.in"
      });

      // Animate hamburger lines back with smoother timing
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(hamburger.children[0], {
        rotation: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      })
      .to(hamburger.children[1], {
        opacity: 1,
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out"
      }, "<")
      .to(hamburger.children[2], {
        rotation: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "<");

      // Collapse island
      gsap.to(island, {
        width: "60px",
        minWidth: "60px",
        duration: 0.6,
        ease: "power3.in",
        delay: 0.3
      });
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
    <div ref={islandRef} className={`dynamic-island ${isExpanded ? 'expanded' : ''}`}>
      {/* Hamburger/Cross as separate floating block */}
      <div className="floating-block hamburger-block">
        <button 
          className="dynamic-island__hamburger"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <div ref={hamburgerRef} className="dynamic-island__hamburger-lines">
            <span className="dynamic-island__line"></span>
            <span className="dynamic-island__line"></span>
            <span className="dynamic-island__line"></span>
          </div>
        </button>
      </div>

      {/* Menu items as separate floating blocks */}
      <nav ref={menuItemsRef} className="dynamic-island__menu">
        {menuItems.map((item, index) => (
          <div key={item.id} className="floating-block menu-block">
            <button
              className="dynamic-island__menu-item"
              onClick={() => handleNavClick(item.id)}
              aria-label={`Navigate to ${item.label}`}
            >
              <span className="dynamic-island__icon">{item.icon}</span>
              <span className="dynamic-island__label">{item.label}</span>
            </button>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default DynamicIsland;
