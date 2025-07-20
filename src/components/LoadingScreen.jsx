import React from 'react';

// We define the CSS keyframe animation here for self-containment.
const keyframes = `
  @keyframes scan {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(800%); /* Adjust based on container width */
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @keyframes flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
`;

const LoadingScreen = () => {
  return (
    <>
      {/* Inject the keyframes into the document's head */}
      <style>{keyframes}</style>
      <div style={styles.container}>
        <div style={styles.loader}>
          <div style={styles.loadingText}>LOADING...</div>
          <div style={styles.progressBarContainer}>
            {/* This is the infinitely animating scanner bar */}
            <div style={styles.scanner} />
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: '"Press Start 2P", monospace',
    zIndex: 0,
  },
  loader: {
    width: '80%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: '1.5rem',
    letterSpacing: '4px',
    marginBottom: '20px',
    textShadow: '2px 2px #39ff14',
    animation: 'flicker 1.5s infinite',
  },
  progressBarContainer: {
    width: '100%',
    height: '30px',
    border: '3px solid white',
    // We use overflow hidden to contain the scanner animation
    overflow: 'hidden',
    position: 'relative', // Necessary for the scanner's absolute positioning
  },
  scanner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '15%', // The width of the moving scanner block
    height: '100%',
    backgroundColor: '#39ff14',
    // Add a glow effect to the scanner
    boxShadow: '0 0 15px #39ff14, 0 0 5px #fff',
    // Apply the infinite animation
    animation: 'scan 2.5s infinite ease-in-out',
  },
};

export default LoadingScreen;
