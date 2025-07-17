import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SiReact, 
  SiNodedotjs, 
  SiSass, 
  SiGit, 
  SiFigma,
  SiFlutter,
  SiDart,
  SiCplusplus,
  SiPhp,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiSwift,
} from 'react-icons/si';
import './Skills.scss';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const skillsRef = useRef(null);

  const skills = [
  { name: 'React', level: 90, icon: SiReact, color: '#61DAFB' },        // Widely used frontend framework
  { name: 'Node.js', level: 85, icon: SiNodedotjs, color: '#339933' },  // Backend industry standard with JS
  { name: 'Swift (Learning)', level: 50, icon: SiSwift, color: '#FA7343' }, // Niche, for iOS-specific dev
  { name: 'Flutter', level: 80, icon: SiFlutter, color: '#02569B' },    // Growing cross-platform mobile dev
  { name: 'Dart', level: 80, icon: SiDart, color: '#0175C2' },          // Needed for Flutter
  { name: 'MongoDB', level: 80, icon: SiMongodb, color: '#47A248' },    // Popular NoSQL database
  { name: 'Git', level: 95, icon: SiGit, color: '#F05032' },            // Essential for version control
  { name: 'Firebase', level: 75, icon: SiFirebase, color: '#FFCA28' },  // Cloud backend & auth services
  { name: 'CSS/SCSS', level: 95, icon: SiSass, color: '#CC6699' },      // Must-have styling skill
  { name: 'C++', level: 90, icon: SiCplusplus, color: '#00599C' },      // Core language (DSA, system-level)
  { name: 'PHP', level: 70, icon: SiPhp, color: '#777BB4' },            // Legacy but still used in web
  { name: 'PostgreSQL', level: 75, icon: SiPostgresql, color: '#336791' }, // Highly in-demand SQL DB
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
          end: "bottom 20%",
          toggleActions: "play reverse play reverse"
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
          end: "bottom 20%",
          toggleActions: "play reverse play reverse"
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
            end: "bottom 10%",
            toggleActions: "play reverse play reverse"
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
          {skills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div key={skill.name} className="skills__item">
                <div className="skills__item-header">
                  <IconComponent 
                    className="skills__icon" 
                    style={{ color: skill.color }}
                  />
                  <span className="skills__name">{skill.name}</span>
                  <span className="skills__percentage">{skill.level}%</span>
                </div>
                <div className="skills__progress">
                  <div className="skills__progress-fill"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
