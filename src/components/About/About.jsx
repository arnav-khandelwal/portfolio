import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import './About.scss';

gsap.registerPlugin(ScrollTrigger);

// Widget component for About section interests
const AboutWidget = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const atomGroupRef = useRef(null);
  const orbitGroupsRef = useRef([]);
  const iconsRef = useRef([]);
  const widgetContainerRef = useRef(null);

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
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about hero">
      <div className="container hero__container">
        <div className="hero__widget" ref={widgetRef}>
          <AboutWidget />
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
    </section>
  );
};

export default About;
