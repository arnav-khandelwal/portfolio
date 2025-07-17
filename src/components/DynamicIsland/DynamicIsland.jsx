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
    const hamburger = hamburgerRef.current;
    const menuItems = menuItemsRef.current.children;

    // Set initial state - ensure island starts collapsed
    gsap.set(island, { width: "60px", minWidth: "60px" });
    
    // Ensure hamburger lines are in default position on mount
    if (hamburger) {
      gsap.set(hamburger.children[0], { rotation: 0, y: 0 });
      gsap.set(hamburger.children[1], { opacity: 1, scaleX: 1 });
      gsap.set(hamburger.children[2], { rotation: 0, y: 0 });
    }

    // Ensure menu items are completely hidden initially
    gsap.set(menuItems, { opacity: 0, display: "none" });

    // Enhanced initial animation - pop out from bottom
    gsap.fromTo(island,
      { y: 150, opacity: 0, scale: 0.3, rotationX: -90 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        rotationX: 0,
        duration: 1.2, 
        ease: "back.out(2)", 
        delay: 1.5,
        transformOrigin: "center center"
      }
    );

    // Enhanced floating animation with more organic movement
    gsap.to(island, {
      y: -6,
      rotation: 0.5,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 2.7,
      transformOrigin: "center center"
    });
  }, []);

  const toggleMenu = () => {
    const island = islandRef.current;
    const menuItems = menuItemsRef.current.children;
    const hamburger = hamburgerRef.current;

    if (!isExpanded) {
      // Expand the island
      setIsExpanded(true);
      
      // Kill floating animation during expansion
      gsap.killTweensOf(island);
      
      // Show menu items first (but keep them invisible)
      gsap.set(menuItems, { display: "flex", opacity: 0 });
      
      // Animate menu items with enhanced effects FIRST
      gsap.fromTo(menuItems,
        { 
          opacity: 0, 
          y: 40, 
          x: -20, 
          scale: 0.4, 
          rotationY: -25,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotationY: 0,
          filter: "blur(0px)",
          duration: 1.0,
          stagger: 0.12,
          ease: "back.out(1.7)",
          delay: 0.3
        }
      );

      // THEN animate island expansion (after menu items are visible)
      gsap.to(island, {
        width: "auto",
        minWidth: "520px",
        duration: 1.0,
        ease: "power2.out",
        delay: 0.2,
        onComplete: () => {
          // Resume floating after expansion
          gsap.to(island, {
            y: -6,
            rotation: 0.5,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            transformOrigin: "center center"
          });
        }
      });

      // Smooth hamburger to cross transformation
      const tl = gsap.timeline({ delay: 0.1 });
      tl.to(hamburger.children[0], {
        rotation: 45,
        y: 6,
        duration: 0.6,
        ease: "back.out(1.4)"
      })
      .to(hamburger.children[1], {
        opacity: 0,
        scaleX: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "<0.1")
      .to(hamburger.children[2], {
        rotation: -45,
        y: -6,
        duration: 0.6,
        ease: "back.out(1.4)"
      }, "<");
    } else {
      // Collapse the island
      setIsExpanded(false);

      // Kill floating animation during collapse
      gsap.killTweensOf(island);

      // First animate menu items out smoothly
      gsap.to(menuItems, {
        opacity: 0,
        y: 30,
        x: -30,
        scale: 0.7,
        rotationY: 20,
        filter: "blur(6px)",
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.in"
      });

      // Then collapse island width AFTER menu items fade
      gsap.to(island, {
        width: "60px",
        minWidth: "60px",
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.4,
        onComplete: () => {
          // Hide menu items after island collapse
          gsap.set(menuItems, { display: "none" });
          
          // Resume floating after collapse
          gsap.to(island, {
            y: -6,
            rotation: 0.5,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            transformOrigin: "center center"
          });
        }
      });

      // Smooth cross to hamburger transformation
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(hamburger.children[0], {
        rotation: 0,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.4)"
      })
      .to(hamburger.children[1], {
        opacity: 1,
        scaleX: 1,
        duration: 0.4,
        ease: "back.out(1.4)"
      }, "<0.1")
      .to(hamburger.children[2], {
        rotation: 0,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.4)"
      }, "<");
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
