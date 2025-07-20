import React from 'react';
import { useScreenWidth } from '../../hooks/useScreenWidth'; // Adjust path if needed

// --- Import icons from React Icons ---
import { FaMapMarkerAlt, FaSchool, FaUniversity, FaGraduationCap } from 'react-icons/fa';

// Data for your education with updated logos and dates
const educationData = [
    {
        degree: "B.Tech in Computer Science & Engineering",
        institution: "Manipal University Jaipur (MUJ)",
        period: "2025 - 2029",
        details: "Fresher",
        icon: <FaUniversity />,
        logoUrl: "https://upload.wikimedia.org/wikipedia/en/1/1f/Manipal_University_Jaipur_logo.png",
    },
    {
        degree: "Class 12th",
        institution: "Gyan Educational Institution",
        period: "Completed 2024",
        details: "Percentage: 75%",
        icon: <FaSchool />,
        logoUrl: "/assets/gyan.png",
    },
    {
        degree: "Class 10th",
        institution: "St. Francis De Sales Higher Secondary",
        period: "Completed 2022",
        details: "Percentage: 92%",
        icon: <FaGraduationCap />,
        logoUrl: "/assets/sfs.png",
    },
];

const InfoSection = () => {
    const screenWidth = useScreenWidth();
    const isMobile = screenWidth < 900;

    // --- Responsive styles are re-introduced here ---
    const dynamicStyles = {
        grid: {
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr',
        },
        educationCard: {
            flexDirection: isMobile ? 'column' : 'row',
        },
        institutionLogo: {
            marginRight: isMobile ? 0 : '1.5rem',
            marginBottom: isMobile ? '1rem' : 0,
        },
        educationDetails: {
            textAlign: isMobile ? 'center' : 'left',
        }
    };

    return (
        <div style={styles.sectionContainer}>
            <div style={{ ...styles.grid, ...dynamicStyles.grid }}>
                {/* Column 1: Personal Bio */}
                <div>
                    <h3 style={styles.columnTitle}>Description</h3>
                    <div style={styles.aboutContent}>
                        <p style={styles.bio}>
                            Passionate about computers and electronics since childhood, I have been coding for over four years. I'm a versatile artist, creating both 2D drawings and 3D models in Blender. My curiosity has led me to explore diverse fields, from game and web development to app creation and automation scripts.
                        </p>
                        <div style={styles.locationContainer}>
                            <FaMapMarkerAlt style={styles.locationIcon} />
                            <span>Guwahati, Assam</span>
                        </div>
                    </div>
                </div>

                {/* Column 2: Academic Journey */}
                <div>
                    <h3 style={styles.columnTitle}>Academic Journey</h3>
                    {educationData.map((edu, index) => (
                        <div key={index} style={{ ...styles.educationCard, ...dynamicStyles.educationCard }}>
                            <img src={edu.logoUrl} alt={`${edu.institution} logo`} style={{ ...styles.institutionLogo, ...dynamicStyles.institutionLogo }} />
                            <div style={{ ...styles.educationDetails, ...dynamicStyles.educationDetails }}>
                                <h4 style={styles.degree}>{edu.degree}</h4>
                                <p style={styles.institution}>{edu.institution}</p>
                                <span style={styles.period}>{edu.period}</span>
                                <p style={styles.details}>{edu.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- STYLES ---
const styles = {
    sectionContainer: {
        width: '100%',
        padding: '4rem 2rem',
        backgroundImage: `url('/wall-texture.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(10, 10, 10, 0.93)',
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
        borderBottom: '1px solid #39ff14',
        paddingBottom: '0.5rem',
    },
    aboutContent: {
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        color: '#ddd',
    },
    bio: {
        fontSize: '1rem',
        lineHeight: 1.7,
        margin: '0 0 2rem 0',
    },
    locationContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.1rem',
        color: '#fff',
    },
    locationIcon: {
        color: '#39ff14',
        marginRight: '10px',
    },
    educationCard: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1.5rem',
        marginBottom: '1.5rem',
    },
    institutionLogo: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        objectFit: 'contain',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '5px',
    },
    educationDetails: {
        color: '#ddd',
        flex: 1,
    },
    degree: {
        margin: '0 0 5px 0',
        fontSize: '1.2rem',
        color: '#fff',
    },
    institution: {
        margin: '0 0 10px 0',
        fontSize: '1rem',
        fontStyle: 'italic',
        color: '#aaa',
    },
    period: {
        display: 'block',
        fontSize: '0.9rem',
        color: '#39ff14',
        marginBottom: '10px',
    },
    details: {
        margin: 0,
        fontSize: '0.9rem',
    },
};

export default InfoSection;
