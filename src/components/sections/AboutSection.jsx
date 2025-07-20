import React from 'react';
import { useScreenWidth } from '../../hooks/useScreenWidth';

// --- Import correct logos from React Icons ---
import {
  DiReact, DiPython, DiNodejsSmall, DiMongodb, DiDocker, DiUnitySmall
} from 'react-icons/di';
import {
  SiExpress, SiFlask, SiBlender, SiFlutter, SiTelegram
} from 'react-icons/si';

import SocialLinksBar from '../SocialLinkBar';

// --- SVG for Download Button (remains the same) ---
const downloadIcon = <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13h-4v4h-2v-4H7l5-5 5 5z"/></svg>;


// Updated list with proper icon components
const skillList = [
  { name: 'React', icon: <DiReact color="#61DAFB" /> },
  { name: 'React Native', icon: <DiReact color="#61DAFB" /> },
  { name: 'Python', icon: <DiPython color="#3776AB" /> },
  { name: 'Node.js', icon: <DiNodejsSmall color="#8CC84B" /> },
  { name: 'Express', icon: <SiExpress color="#FFFFFF" /> },
  { name: 'MongoDB', icon: <DiMongodb color="#4DB33D" /> },
  { name: 'Flutter', icon: <SiFlutter color="#02569B" /> },
  { name: 'Blender', icon: <SiBlender color="#F5792A" /> },
  { name: 'Pyrogram', icon: <SiTelegram color="#26A5E4" /> }, // Using Telegram for Pyrogram
  { name: 'Flask', icon: <SiFlask color="#FFFFFF" /> },
  { name: 'Unity 3D', icon: <DiUnitySmall color="#FFFFFF" /> },
  { name: 'Docker', icon: <DiDocker color="#2496ED" /> },
];


const AboutSection = () => {
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 900;

  return (
    <div style={styles.sectionContainer}>
      <div style={{ ...styles.grid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr 1fr' }}>
        {/* --- Column 1: Profile --- */}
        <div style={styles.column}>
          <img src="/assets/AN_PHOTO.jpg" alt="Ankit Chetri" style={styles.profilePic} />
          <h3 style={styles.profileName}>Ankit Chetri</h3>
          <h3 style={styles.profileName}>{'<Debyte>'}</h3>
          <div style={{marginTop : '10px'}}>
            <SocialLinksBar />
          </div>
        </div>

        {/* --- Column 2: Skills --- */}
        <div style={styles.column}>
          <h2 style={styles.columnTitle}>Skills</h2>
          <div style={styles.skillsGrid}>
            {skillList.map(skill => (
              <div key={skill.name} style={styles.skillTag}>
                {/* The icon is now rendered directly as a component */}
                <div style={styles.skillIcon}>{skill.icon}</div>
                <span style={styles.skillName}>
                  <span style={{ color: '#888', marginRight: '5px' }}>#</span>{skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* --- Column 3: Resume --- */}
        <div style={styles.column}>
          <h2 style={styles.columnTitle}>My CV</h2>
          <p style={styles.resumeText}>Interested in my work? Feel free to download my resume for a more detailed overview of my experience.</p>
          <a href="/AnkitChetri.pdf" download style={styles.downloadButton}>
            <span style={styles.downloadIcon}>{downloadIcon}</span>
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

// --- STYLES (No changes here, except skillIcon size) ---
const styles = {
  sectionContainer: {
    minHeight: '50vh',
    width: '100%',
    padding: '4rem 2rem',

    backgroundColor: 'rgba(50, 0, 0, 0.93)',
    backgroundImage: `url('/assets/terracotta-floor.jpg')`, 
    backgroundSize: 'cover', // Ensures the texture covers the whole section
    backgroundPosition: 'center', // Centers the texture
    backgroundBlendMode: 'overlay', // Blends the image with the color
    
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    position: 'relative', // Needed for the pseudo-element if you want a color overlay
  },
  grid: {
    display: 'grid',
    gap: '2rem',
    width: '100%',
    maxWidth: '1200px',
  },
  column: {
    padding: '1.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'monospace, "Courier New"',
  },
  profilePic: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    marginBottom: '1rem',
  },
  profileName: {
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#39ff14',
  },
  columnTitle: {
    margin: '0 0 1.5rem 0',
    fontSize: '1.8rem',
    color: '#fff',
    borderBottom: '2px solid #39ff14',
    paddingBottom: '0.5rem',
  },
  skillsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  skillTag: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '8px 12px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'transform 0.2s, background-color 0.2s',
  },
  skillIcon: {
    fontSize: '24px', // Slightly larger for better visibility
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'black',
    // padding: '1%',
    borderRadius: '50%',
  },
  skillName: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  resumeText: {
    fontSize: '1rem',
    lineHeight: 1.6,
    marginBottom: '2rem',
    maxWidth: '300px'
  },
  downloadButton: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '12px 24px',
    backgroundColor: '#39ff14',
    color: '#0d1117',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  downloadIcon: {
    marginRight: '8px',
    fontSize: '1.2rem',
  },
};

export default AboutSection;
