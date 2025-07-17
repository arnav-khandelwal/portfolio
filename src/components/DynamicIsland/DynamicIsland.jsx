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
    const isMobile = window.innerWidth <= 768;

    if (!isExpanded) {
      // Expand the island
      setIsExpanded(true);
      
      // Kill floating animation during expansion
      gsap.killTweensOf(island);
      
      // Show menu items first (but keep them invisible)
      gsap.set(menuItems, { display: "flex", opacity: 0 });
      
      if (isMobile) {
        // Mobile: Keep hamburger in place, animate menu items appearing above
        gsap.fromTo(menuItems,
          { 
            opacity: 0, 
            y: 30, // Start closer to hamburger
            scale: 0.6, 
            rotationX: -45,
            filter: "blur(8px)"
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.08,
            ease: "back.out(1.5)",
            delay: 0.1
          }
        );

        // Mobile: Don't animate island height, keep hamburger position fixed
        // Just ensure the container can accommodate the menu items
        gsap.set(island, {
          height: "auto"
        });
      } else {
        // Desktop: Horizontal expansion animation (existing)
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

        // Desktop: Animate island width expansion
        gsap.to(island, {
          width: "auto",
          minWidth: "520px",
          duration: 1.0,
          ease: "power2.out",
          delay: 0.2
        });
      }

      // Resume floating after expansion
      gsap.to(island, {
        y: -6,
        rotation: 0.5,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "center center",
        delay: 1.0
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

      if (isMobile) {
        // Mobile: Mirror the expansion animation for collapse
        gsap.to(menuItems, {
          opacity: 0,
          y: 30, // Move down towards hamburger (reverse of expansion y: 30 -> y: 0)
          scale: 0.6, // Scale down (reverse of expansion scale: 0.6 -> scale: 1)
          rotationX: -45, // Rotate back (reverse of expansion rotationX: -45 -> rotationX: 0)
          filter: "blur(8px)", // Add blur (reverse of expansion blur: 8px -> blur: 0px)
          duration: 0.7, // Same duration as expansion
          stagger: 0.08, // Same stagger as expansion
          ease: "power2.in", // Smoother ease for collapse
          onComplete: () => {
            // Hide menu items after animation
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

        // Mobile: Keep island height consistent
        gsap.set(island, {
          height: "60px"
        });
      } else {
        // Desktop: Mirror the expansion animation for collapse
        gsap.to(menuItems, {
          opacity: 0,
          y: 40, // Move down (reverse of expansion y: 40 -> y: 0)
          x: -20, // Move left (reverse of expansion x: -20 -> x: 0)
          scale: 0.4, // Scale down (reverse of expansion scale: 0.4 -> scale: 1)
          rotationY: -25, // Rotate back (reverse of expansion rotationY: -25 -> rotationY: 0)
          filter: "blur(10px)", // Add blur (reverse of expansion blur: 10px -> blur: 0px)
          duration: 1.0, // Same duration as expansion
          stagger: 0.12, // Same stagger as expansion
          ease: "power2.in"
        });

        // Desktop: Collapse island width with same timing
        gsap.to(island, {
          width: "60px",
          minWidth: "60px",
          duration: 1.0, // Same duration as expansion
          ease: "power2.out", // Match expansion ease
          delay: 0.2, // Same delay as expansion
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
      }

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
      {/* Hamburger/Cross - always at bottom on mobile, left on desktop */}
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

      {/* Menu items - stack vertically on mobile, horizontally on desktop */}
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
