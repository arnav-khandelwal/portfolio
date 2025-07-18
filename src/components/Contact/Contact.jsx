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
  
  const [result, setResult] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult('Sending...');

    const formData = new FormData(e.target);
    formData.append("access_key", "1f3d077d-cafe-4c92-afff-7606d4a88c80");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult('✅ Message sent successfully! I\'ll get back to you soon.');
        e.target.reset();
        
        // Success animation
        gsap.to(formRef.current, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
      } else {
        console.log("Error", data);
        setResult('❌ ' + data.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setResult('❌ Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
      // Clear result message after 5 seconds
      setTimeout(() => setResult(''), 5000);
    }
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
                required
                className="contact__input"
              />
            </div>
            <div className="contact__form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="contact__input"
              />
            </div>
            <div className="contact__form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                required
                rows="5"
                className="contact__textarea"
              ></textarea>
            </div>
            <button type="submit" className="contact__submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <span className="contact__submit-arrow">→</span>
            </button>
            
            {/* Status Message */}
            {result && (
              <div className={`contact__status ${result.includes('✅') ? 'contact__status--success' : 'contact__status--error'}`}>
                {result}
              </div>
            )}
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
