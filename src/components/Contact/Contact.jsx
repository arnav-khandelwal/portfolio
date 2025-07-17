import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import './Contact.scss';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const contactInfo = contactInfoRef.current;

    // Title animation
    gsap.fromTo(title,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Form animation
    gsap.fromTo(form,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Contact info animation
    gsap.fromTo(contactInfo,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    
    // Success animation
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="contact">
      <div className="container">
        <h2 ref={titleRef} className="contact__title">Let's Work Together</h2>
        <div className="contact__content">
          <form ref={formRef} className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="contact__input"
              />
            </div>
            <div className="contact__form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="contact__input"
              />
            </div>
            <div className="contact__form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows="5"
                className="contact__textarea"
              ></textarea>
            </div>
            <button type="submit" className="contact__submit">
              Send Message
              <span className="contact__submit-arrow">→</span>
            </button>
          </form>
          
          <div ref={contactInfoRef} className="contact__info">
            <div className="contact__info-item">
              <MdEmail className="contact__info-icon" />
              <div>
                <h4>Email</h4>
                <p>arnav181104@gmail.com</p>
              </div>
            </div>
            <div className="contact__info-item">
              <MdPhone className="contact__info-icon" />
              <div>
                <h4>Phone</h4>
                <p>+91 (704) 227-3876</p>
              </div>
            </div>
            <div className="contact__info-item">
              <MdLocationOn className="contact__info-icon" />
              <div>
                <h4>Location</h4>
                <p>Delhi, India</p>
              </div>
            </div>
            <div className="contact__social">
              <h4>Follow Me</h4>
              <div className="contact__social-links">
                <a href="https://www.linkedin.com/in/arnav-khandelwal-7a0aa2278/" className="contact__social-link" target='_blank'>
                  <FaLinkedin className="contact__social-icon" />
                  LinkedIn
                </a>
                <a href="https://github.com/arnav-khandelwal" className="contact__social-link" target='_blank'>
                  <FaGithub className="contact__social-icon" />
                  GitHub
                </a>
                <a href="https://www.instagram.com/_okayarnav_/" className="contact__social-link" target='_blank'>
                  <FaInstagram className="contact__social-icon" />
                  Instagram
                </a>
                <a href="https://leetcode.com/u/arnav-khandelwal/" className="contact__social-link" target='_blank'>
                  <SiLeetcode className="contact__social-icon" />
                  LeetCode
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
