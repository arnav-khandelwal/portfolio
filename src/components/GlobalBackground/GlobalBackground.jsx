import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './GlobalBackground.scss';

const GlobalBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const atomGroupRef = useRef(null);
  const orbitGroupsRef = useRef([]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
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

    // Create nucleus - larger for full screen visibility
    const nucleusGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const nucleusMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x7C5E3C, // accent-brown from color palette
      transparent: true,
      opacity: 0.4
    });
    const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    atomGroup.add(nucleus);

    // Create orbital rings with color palette colors - larger for full screen
    const ringRadii = [3.6, 5.2, 6.8];
    const ringColors = [0xFFD580, 0xE6B8A2, 0xC2A98B]; // accent-gold, accent-rose, dark-beige
    
    ringRadii.forEach((radius, index) => {
      const orbitGroup = new THREE.Group();
      
      // Create ring geometry - thicker rings
      const ringGeometry = new THREE.RingGeometry(radius - 0.1, radius + 0.1, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: ringColors[index],
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      
      // Rotate rings for 3D effect with more varied angles
      ring.rotation.x = Math.PI / 2 + (index * Math.PI / 5);
      ring.rotation.z = index * Math.PI / 3;
      
      orbitGroup.add(ring);
      
      // Create orbiting particles/electrons - bigger spheres
      const particleGeometry = new THREE.SphereGeometry(0.3, 12, 12);
      const particleMaterial = new THREE.MeshBasicMaterial({ 
        color: ringColors[index],
        transparent: true,
        opacity: 0.6
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(radius, 0, 0);
      
      orbitGroup.add(particle);
      atomGroup.add(orbitGroup);
      
      orbitGroupsRef.current.push(orbitGroup);
    });

    // Position camera further back for full screen view
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    // Adjust for mobile devices
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // Scale down the atom for mobile performance
      atomGroup.scale.setScalar(0.7);
      camera.position.set(0, 0, 12);
    }

    // Animation loop with slower movement
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate entire atom - slower movement
      if (atomGroup) {
        atomGroup.rotation.y += 0.003;
        atomGroup.rotation.x += 0.001;
      }
      
      // Rotate each orbit at different speeds - slower
      orbitGroupsRef.current.forEach((orbitGroup, index) => {
        if (orbitGroup) {
          const speed = (index + 1) * 0.008;
          orbitGroup.rotation.y += speed;
          orbitGroup.rotation.z += speed * 0.2;
        }
      });
      
      // Pulsate nucleus - slower
      if (nucleus) {
        const scale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
        nucleus.scale.setScalar(scale);
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (renderer && camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Adjust atom scale and camera position for mobile
        const isMobile = window.innerWidth <= 768;
        if (atomGroup) {
          atomGroup.scale.setScalar(isMobile ? 0.7 : 1);
        }
        if (camera) {
          camera.position.z = isMobile ? 12 : 15;
        }
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
    <div className="global-background">
      <div ref={mountRef} className="global-background__3d-atom" />
    </div>
  );
};

export default GlobalBackground;
