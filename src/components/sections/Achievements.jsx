import React from 'react';
import { useScreenWidth } from '../../hooks/useScreenWidth'; // Adjust path if needed

// --- Import icons from React Icons ---
import { FaAward, FaPaintBrush, FaRobot, FaChartLine } from 'react-icons/fa';
import { GiAbacus } from 'react-icons/gi';

// Data for your achievements and hobbies (no changes here)
const awardsData = [
  {
    title: "CALL2CODE Hackathon Finalist (5th Place)",
    issuer: "IEEE SB @ Manipal University Jaipur",
    date: "July 2025",
    description: "Secured 5th place in a 24-hour hackathon centered on the theme of APIs, developing a solution for the 'API Remix' problem statement.",
    icon: <FaAward />,
    image: "/assets/call2code_cert.png",
  },
  {
    title: "2nd Round Trophy",
    issuer: "SIP ABACUS",
    date: "",
    description: "Achieved recognition by advancing to the second round of the SIP ABACUS competition.",
    icon: <GiAbacus />,
  },
  {
    title: "Local Art Competitions",
    issuer: "Various",
    date: "",
    description: "Winner of multiple awards in various local art contests, showcasing creative and artistic skills.",
    icon: <FaPaintBrush />,
  },
];

const hobbiesData = [
    { name: "Art & Electronics", icon: <FaPaintBrush /> },
    { name: "Robotics", icon: <FaRobot /> },
    { name: "Finance & Investing", icon: <FaChartLine /> },
];

const AchievementsSection = () => {
  const screenWidth = useScreenWidth();
  // Using 900px as the breakpoint for a better two-column view on tablets
  const isMobile = screenWidth < 900;

  // --- Dynamic styles that change based on screen width ---
  const dynamicStyles = {
    grid: {
      gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr',
    },
    awardCard: {
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'flex-start',
    },
    awardIcon: {
      marginRight: isMobile ? 0 : '1.5rem',
      marginBottom: isMobile ? '1rem' : 0,
    },
    awardContent: {
        textAlign: isMobile ? 'center' : 'left',
    },
    sectionTitle: {
        fontSize: isMobile ? '2rem' : '2.5rem',
    }
  };

  return (
    <div style={styles.sectionContainer}>
      <h2 style={{ ...styles.sectionTitle, ...dynamicStyles.sectionTitle }}>
        Achievements & Activities
      </h2>
      <div style={{ ...styles.grid, ...dynamicStyles.grid }}>
        {/* Column 1: Honors & Awards */}
        <div>
          <h3 style={styles.columnTitle}>Honors & Awards</h3>
          {awardsData.map((award, index) => (
            <div key={index} style={{ ...styles.awardCard, ...dynamicStyles.awardCard }}>
              <div style={{ ...styles.awardIcon, ...dynamicStyles.awardIcon }}>{award.icon}</div>
              <div style={{ ...styles.awardContent, ...dynamicStyles.awardContent }}>
                <h4 style={styles.awardTitle}>{award.title}</h4>
                <p style={styles.awardIssuer}>{award.issuer} {award.date && `· ${award.date}`}</p>
                <p style={styles.awardDescription}>{award.description}</p>
                {award.image && <img src={award.image} alt={`${award.title} certificate`} style={styles.certificateImage} />}
              </div>
            </div>
          ))}
        </div>

        {/* Column 2: Co-curriculars & Hobbies */}
        <div>
          <h3 style={styles.columnTitle}>Co-curriculars & Hobbies</h3>
          <div style={styles.hobbiesContainer}>
            {hobbiesData.map((hobby, index) => (
                <div key={index} style={styles.hobbyItem}>
                    <div style={styles.hobbyIcon}>{hobby.icon}</div>
                    <span style={styles.hobbyName}>{hobby.name}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Base Styles (unchanged for the most part) ---
const styles = {
    sectionContainer: {
        width: '100%',
        padding: '4rem 2rem',
        backgroundImage: `url('/wall-texture.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 20, 30, 0.93)',
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
      sectionTitle: {
        color: '#fff',
        marginBottom: '3rem',
        borderBottom: '2px solid #39ff14',
        paddingBottom: '0.5rem',
        textAlign: 'center',
      },
      grid: {
        display: 'grid',
        gap: '3rem',
        width: '100%',
        maxWidth: '1200px',
      },
      columnTitle: {
        fontSize: '1.8rem',
        color: '#fff',
        marginBottom: '2rem',
        textAlign: 'center',
      },
      awardCard: {
        display: 'flex',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1.5rem',
        marginBottom: '1.5rem',
      },
      awardIcon: {
        color: '#39ff14',
        fontSize: '2rem',
        marginTop: '5px',
      },
      awardContent: {
        flex: 1,
      },
      awardTitle: {
        margin: '0 0 5px 0',
        fontSize: '1.2rem',
        color: '#fff',
      },
      awardIssuer: {
        margin: '0 0 1rem 0',
        fontSize: '0.9rem',
        color: '#aaa',
        fontStyle: 'italic',
      },
      awardDescription: {
        margin: '0',
        fontSize: '1rem',
        lineHeight: 1.6,
        color: '#ddd',
      },
      certificateImage: {
        width: '100%',
        borderRadius: '8px',
        marginTop: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      },
      hobbiesContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '2rem',
      },
      hobbyItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.5rem',
        justifyContent: 'center' // Center hobbies on mobile too
      },
      hobbyIcon: {
        color: '#39ff14',
        fontSize: '1.5rem',
        marginRight: '1rem',
      },
      hobbyName: {
        color: '#fff',
        fontSize: '1.1rem',
      },
};

export default AchievementsSection;
