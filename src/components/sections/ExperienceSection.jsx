import React from 'react';
import { useScreenWidth } from '../../hooks/useScreenWidth'; // Make sure this path is correct

// --- Import icons from React Icons ---
import { FaPaintBrush, FaCode } from 'react-icons/fa';

// Your work experience data (no changes here)
const experienceData = [
  {
    role: "Software Development Intern",
    company: "Paint Your Story",
    period: "March 2025 - Present",
    description: "As a backend developer, I am responsible for implementing payment integration, authentication, and emailing APIs.",
    icon: <FaPaintBrush />,
    techStack: ["MongoDB", "Express", "React", "Node.js", "Flask"],
  },
  {
    role: "Freelance Developer",
    company: "Self-Employed",
    period: "2024 - Present",
    description: "Successfully delivered over 100 orders consisting of Android apps, dynamic websites, and custom Telegram bots.",
    icon: <FaCode />,
    techStack: ["React Native", "Flutter", "Pyrogram", "Docker", "MongoDB", "HTML", "CSS", "JavaScript"],
  },
];

const ExperienceSection = () => {
  const screenWidth = useScreenWidth();
  // We'll consider any screen narrower than 768px as 'mobile'
  const isMobile = screenWidth < 768;

  // --- Dynamic Styles for Responsiveness ---
  const dynamicStyles = {
    timelineItem: {
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'flex-start',
    },
    timelineIcon: {
      position: isMobile ? 'relative' : 'absolute',
      transform: isMobile ? 'none' : 'translateX(-50%)',
      marginBottom: isMobile ? '20px' : '0',
    },
    timelineContent: {
      padding: isMobile ? '20px' : '20px 30px 20px 80px',
      textAlign: isMobile ? 'center' : 'left',
    },
    title: {
      fontSize: isMobile ? '2rem' : '2.5rem',
    }
  };

  return (
    <div style={styles.sectionContainer}>
      <h2 style={{...styles.title, ...dynamicStyles.title}}>Work Experience</h2>
      <div style={styles.timelineContainer}>
        {experienceData.map((exp, index) => (
          <div key={index} style={{...styles.timelineItem, ...dynamicStyles.timelineItem}}>
            <div style={{...styles.timelineIcon, ...dynamicStyles.timelineIcon}}>{exp.icon}</div>
            <div style={{...styles.timelineContent, ...dynamicStyles.timelineContent}}>
              <h3 style={styles.role}>{exp.role}</h3>
              <p style={styles.company}>{exp.company}</p>
              <span style={styles.period}>{exp.period}</span>
              <p style={styles.description}>{exp.description}</p>
              <div style={styles.techStackContainer}>
                {exp.techStack.map(tech => (
                  <span key={tech} style={styles.techTag}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Base styles object
const styles = {
  sectionContainer: {
    width: '100%',
    minHeight: '50vh',
    padding: '4rem 2rem',
    backgroundImage: `url('/wall-texture.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(20, 0, 30, 0.93)',
    backgroundBlendMode: 'overlay',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    fontFamily: 'monospace, "Courier New"',
  },
  title: {
    color: '#fff',
    marginBottom: '3rem',
    borderBottom: '2px solid #39ff14',
    paddingBottom: '0.5rem',
    textAlign: 'center',
  },
  timelineContainer: {
    position: 'relative',
    maxWidth: '800px',
    width: '100%',
  },
  timelineItem: {
    display: 'flex',
    marginBottom: '40px',
    position: 'relative',
  },
  timelineIcon: {
    left: '0',
    backgroundColor: '#39ff14',
    color: '#0d1117',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    zIndex: 1,
    border: '3px solid rgba(0, 0, 0, 0.5)',
  },
  timelineContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  role: {
    margin: '0 0 5px 0',
    fontSize: '1.4rem',
    color: '#fff',
  },
  company: {
    margin: '0',
    fontSize: '1rem',
    fontStyle: 'italic',
    color: '#aaa',
  },
  period: {
    display: 'block',
    margin: '10px 0',
    fontSize: '0.9rem',
    color: '#39ff14',
  },
  description: {
    margin: '0',
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#ddd',
  },
  techStackContainer: {
    marginTop: '15px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center', // This centers the tech tags
  },
  techTag: {
    backgroundColor: 'rgba(57, 255, 20, 0.15)',
    color: '#adffc1',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '0.8rem',
    border: '1px solid rgba(57, 255, 20, 0.3)',
  },
};

export default ExperienceSection;
