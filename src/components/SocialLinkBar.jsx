import React from 'react';

// Define your social links here
const socialLinks = {
  github: 'https://github.com/Debyte404', // Replace with your GitHub URL
  x: 'https://x.com/debyte404', // Replace with your Twitter URL
  linkedin: 'https://www.linkedin.com/in/ankit-chetri-910b46300/', // Replace with your LinkedIn URL
  email: 'mailto:ankit.byte.404@gmail.com', // Replace with your email
};

// SVG icons for self-containment
const icons = {
  github: (
    <svg viewBox="0 0 16 16" fill="currentColor" height="1em" width="1em">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
    </svg>
  ),
 // The new X logo SVG
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zm-1.61 19.931h2.52L5.41 2.65H2.74l14.551 18.434z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
};

const SocialLinksBar = () => {
  return (
    <div style={styles.bar}>
      <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" style={styles.link}>
        {icons.github}
      </a>
      <a href={socialLinks.email} style={styles.link}>
        {icons.email}
      </a>
      <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" style={styles.link}>
        {icons.x}
      </a>
      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={styles.link}>
        {icons.linkedin}
      </a>
    </div>
  );
};

const styles = {
  bar: {
    display: 'flex',
    gap: '15px',
    padding: '10px 25px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Translucent black background
    backdropFilter: 'blur(10px)', // The blurry effect
    webkitBackdropFilter: 'blur(10px)', // For Safari support
    borderRadius: '50px', // Pill shape
    border: '1px solid rgba(255, 255, 255, 0.2)', // Slightly lighter border
    width : '250px',
    justifyContent: 'space-around',
  },
  link: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%', // Circular logos
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    fontSize: '20px',
    textDecoration: 'none',
    transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
  },
};

export default SocialLinksBar;
