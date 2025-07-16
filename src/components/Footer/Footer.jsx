import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.scss';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    gsap.fromTo(content,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 90%",
        }
      }
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="footer">
      <div className="container">
        <div ref={contentRef} className="footer__content">
          <div className="footer__top">
            <div className="footer__brand">
              <h3>Portfolio</h3>
              <p>Creating digital experiences with passion and precision.</p>
            </div>
            <button className="footer__scroll-top" onClick={scrollToTop}>
              ↑ Back to Top
            </button>
          </div>
          <div className="footer__bottom">
            <p>&copy; 2025 Arnav Khandelwal. All rights reserved.</p>
            <div className="footer__links">
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
