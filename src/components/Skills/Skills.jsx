import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.scss';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const skillsRef = useRef(null);

  const skills = [
    { name: 'JavaScript', level: 90, icon: '⚡' },
    { name: 'React', level: 85, icon: '⚛️' },
    { name: 'TypeScript', level: 80, icon: '📘' },
    { name: 'Node.js', level: 75, icon: '🟢' },
    { name: 'CSS/SCSS', level: 90, icon: '🎨' },
    { name: 'Python', level: 70, icon: '🐍' },
    { name: 'Git', level: 85, icon: '📚' },
    { name: 'UI/UX Design', level: 75, icon: '✨' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const skillItems = skillsRef.current.children;

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
        }
      }
    );

    // Skills animation
    gsap.fromTo(skillItems,
      { y: 50, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
        }
      }
    );

    // Progress bar animations
    Array.from(skillItems).forEach((item, index) => {
      const progressBar = item.querySelector('.skills__progress-fill');
      const skill = skills[index];
      
      gsap.fromTo(progressBar,
        { width: '0%' },
        {
          width: `${skill.level}%`,
          duration: 1.5,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
          }
        }
      );
    });
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="skills">
      <div className="container">
        <h2 ref={titleRef} className="skills__title">Skills & Expertise</h2>
        <div ref={skillsRef} className="skills__grid">
          {skills.map((skill, index) => (
            <div key={skill.name} className="skills__item">
              <div className="skills__item-header">
                <span className="skills__icon">{skill.icon}</span>
                <span className="skills__name">{skill.name}</span>
                <span className="skills__percentage">{skill.level}%</span>
              </div>
              <div className="skills__progress">
                <div className="skills__progress-fill"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
