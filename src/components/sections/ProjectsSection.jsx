import React from 'react';
import { useScreenWidth } from '../../hooks/useScreenWidth'; // Make sure path is correct

// --- Import icons from React Icons ---
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

// Updated project data with a new 'imageUrl' property
const projectsData = [
  {
    title: "Conway's Game of Life",
    description: "A faithful recreation of John Conway's famous cellular automaton, 'The Game of Life', built with vanilla JavaScript to simulate emergent behavior from simple rules.",
    techStack: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://conways-game-of-life-by-debyte.vercel.app/",
    githubLink: "https://github.com/Debyte404/conways-game-of-life",
    imageUrl: "https://github.com/Debyte404/conways-game-of-life/blob/main/repo_det/conway2.png?raw=true", // Replace with your image path
  },
  {
    title: "Globular Info",
    description: "An itinerary generator website developed for a hackathon. It dynamically creates detailed travel plans based on user-provided destinations and preferences.",
    techStack: ["React", "Node.js", "Express", "CSS", "HTML"],
    liveLink: "https://globular-info.vercel.app/",
    githubLink: "https://github.com/Debyte404/OPEN-GlobularInfo",
    imageUrl: "/assets/globular.png", // Replace with your image path
  },
  {
    title: "EIVOM Movie Suggester",
    description: "A movie suggestion web app to help users discover films. While the AI suggestion feature is deprecated due to API credit limits, users can still browse and manage movie lists.",
    techStack: ["Python", "MongoDB", "Flask", "Flask-Session", "HTML", "CSS", "JS"],
    liveLink: "https://eivom.vercel.app/",
    githubLink: "https://github.com/Debyte404/EIVOM-Open",
    imageUrl: "/assets/eivom.png", // Replace with your image path
  },
  {
    title: "Python Snake Game",
    description: "A classic implementation of the arcade-style Snake game, built from the ground up using the powerful Ursina 3D game engine in Python.",
    techStack: ["Python", "Ursina Engine"],
    githubLink: "https://github.com/Debyte404/snake_game",
    liveLink: null,
    imageUrl: "/assets/snake.png", // Replace with your image path
  },
];

const ProjectsSection = () => {
  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 768;

  return (
    <div style={styles.sectionContainer}>
      <h2 style={{ ...styles.title, fontSize: isMobile ? '2rem' : '2.5rem' }}>
        My Projects
      </h2>
      <div style={styles.projectsGrid}>
        {projectsData.map((project, index) => (
          <div key={index} style={styles.projectCard}>
            {/* --- Image Added Here --- */}
            <img src={project.imageUrl} alt={`${project.title} preview`} style={styles.projectImage} />
            
            <div style={styles.cardContent}>
              <h3 style={styles.projectTitle}>{project.title}</h3>
              <p style={styles.projectDescription}>{project.description}</p>
              <div style={styles.techStackContainer}>
                {project.techStack.map(tech => (
                  <span key={tech} style={styles.techTag}>{tech}</span>
                ))}
              </div>
              <div style={styles.linksContainer}>
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" style={styles.linkButton}>
                    <FiExternalLink style={{ marginRight: '8px' }} /> Live Demo
                  </a>
                )}
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" style={{ ...styles.linkButton, ...styles.githubButton }}>
                  <FaGithub style={{ marginRight: '8px' }} /> Source Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Updated Styles ---
const styles = {
  sectionContainer: {
    width: '100%',
    minHeight: '100vh',
    padding: '4rem 2rem',
    backgroundImage: `url('/wall-texture.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(30, 0, 20, 0.93)',
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
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
    width: '100%',
    maxWidth: '1200px',
  },
  projectCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    overflow: 'hidden', // Hides parts of the image that go outside the rounded corners
  },
  // --- New style for the image ---
  projectImage: {
    width: '100%',
    aspectRatio: '16 / 9', // Widescreen aspect ratio for consistency
    objectFit: 'cover',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  // --- New container for text content ---
  cardContent: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1, // Ensures the card footer aligns
  },
  projectTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1.5rem',
    color: '#fff',
  },
  projectDescription: {
    margin: '0 0 1.5rem 0',
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#ddd',
    flexGrow: 1,
  },
  techStackContainer: {
    marginBottom: '1.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  techTag: {
    backgroundColor: 'rgba(57, 255, 20, 0.15)',
    color: '#adffc1',
    padding: '5px 10px',
    borderRadius: '5px',
    fontSize: '0.8rem',
    border: '1px solid rgba(57, 255, 20, 0.3)',
  },
  linksContainer: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginTop: 'auto', // Pushes the links to the bottom
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 15px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    backgroundColor: '#39ff14',
    color: '#0d1117',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  githubButton: {
    backgroundColor: '#fff',
    color: '#000',
  }
};

export default ProjectsSection;
