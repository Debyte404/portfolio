import React, { useState, useEffect } from 'react';

// Keyframes are now defined inside the component for better encapsulation
const keyframes = `
  @keyframes blinkCursor {
    0%, 50% { opacity: 1; }
    50.01%, 100% { opacity: 0; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const TerminalTitle = () => {
  const fullName = 'Ankit Chetri';
  const nickname = 'Debyte';
  const [typedName, setTypedName] = useState('');
  const [showNickname, setShowNickname] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Effect for the typing animation
  useEffect(() => {
    setTypedName(''); // Reset on mount
    let currentText = '';
    
    const typingInterval = setInterval(() => {
      if (currentText.length < fullName.length) {
        currentText = fullName.slice(0, currentText.length + 1);
        setTypedName(currentText);
      } else {
        clearInterval(typingInterval);
        // Hide the cursor and show the nickname
        setShowCursor(false);
        setTimeout(() => setShowNickname(true), 500);
      }
    }, 150); // Typing speed

    return () => clearInterval(typingInterval);
  }, [fullName]);

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <h1 style={styles.title}>
          <span>{typedName}</span>
          {showCursor && <span style={styles.cursor}>|</span>}
        </h1>
        {showNickname && (
          <div style={styles.nicknameContainer}>
            <span style={styles.nickLabel}>&lt;{nickname}&gt;</span>
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    // The background is now transparent. Style the parent div for color.
    color: '#39ff14', // Vibrant neon green text
    fontFamily: 'monospace, "Courier New", Courier',
    textAlign: 'center',
    padding: '20px', // Reduced padding
    userSelect: 'none',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '2.1rem', // Reduced font size
    marginTop: '-10px',
    letterSpacing: '2px',
    display: 'inline-block',
  },
  cursor: {
    marginLeft: '8px',
    animation: 'blinkCursor 1s step-start infinite',
  },
  nicknameContainer: {
    marginTop: '-7px',
    animation: 'fadeIn 0.8s ease-in-out',
  },
  nickLabel: {
    fontStyle: 'italic',
    fontSize: '1rem', // Reduced font size
    color: '#79ff94', // A slightly softer green for the nickname
  },
};

export default TerminalTitle;
