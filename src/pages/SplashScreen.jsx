import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeProvider";
import "./pageCss/SplashScreen.css";

// Dynamic grid sizing based on screen size
const getOptimalGridSize = () => {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  // eslint-disable-next-line no-unused-vars
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  if (vw >= 1920) return 28; // Large desktop
  if (vw >= 1366) return 24; // Medium desktop
  if (vw >= 768) return 20; // Tablet
  return 18; // Mobile
};

function getCenterSquares(count, gridSize) {
  const c = Math.floor(gridSize / 2);
  const arr = [];

  if (count === 2) {
    // For "TO" - two center squares horizontally
    arr.push((c - 1) * gridSize + c - 1, (c - 1) * gridSize + c);
  } else if (count === 7) {
    // For "WELCOME" - 7 squares in center row, perfectly centered
    const startCol = c - 3;
    for (let i = 0; i < 7; i++) {
      arr.push((c - 1) * gridSize + startCol + i);
    }
  } else if (count === 10) {
    // For "DEBYTE EXPO" - two rows, perfectly centered
    // Top row: DEBYTE (6 letters)
    const debyteStart = c - 3;
    for (let i = 0; i < 6; i++) {
      arr.push((c - 2) * gridSize + debyteStart + i);
    }
    // Bottom row: EXPO (4 letters)
    const expoStart = c - 2;
    for (let i = 0; i < 4; i++) {
      arr.push((c - 1) * gridSize + expoStart + i);
    }
  }
  return arr;
}

export default function SplashScreen({ onFinish }) {
  const { theme, setTheme } = useTheme();
  const [phase, setPhase] = useState("start"); // 'start', 'loading', 'animating'
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasUserInteraction, setHasUserInteraction] = useState(false);
  const [flipped, setFlipped] = useState(new Set());
  const [currentText, setCurrentText] = useState("");
  const [gridSize, setGridSize] = useState(18);
  const audioRef = useRef(null);
    const audioContextRef = useRef(null);
    const audioBufferRef = useRef(null);
  // Set default theme and calculate grid size
  useEffect(() => {
    if (!theme || theme === "system") {
      setTheme("light");
    }
    setGridSize(getOptimalGridSize());

    // Recalculate on window resize
    const handleResize = () => setGridSize(getOptimalGridSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme, setTheme]);

  const totalSquares = gridSize * gridSize;
  const isDark = theme === "dark";

  // Netflix-style loading bar animation
  const startLoading = () => {
    setPhase("loading");
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 3; // Smoother increments
      if (progress >= 100) {
        progress = 100;
        setLoadingProgress(progress);
        clearInterval(interval);
        setTimeout(() => setPhase("animating"), 800);
      } else {
        setLoadingProgress(progress);
      }
    }, 120);
  };

  // Handle start button click
  const handleStartClick = () => {
    setHasUserInteraction(true);
    // --- WEB AUDIO API UNLOCK ---
  if (!audioContextRef.current) {
    try {
      // Create the audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();

      // Pre-load the audio file. We do this here to ensure it's
      // loaded before the animation starts.
      fetch('/assets/flip-sound.mp3')
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContextRef.current.decodeAudioData(arrayBuffer))
        .then(decodedData => {
          audioBufferRef.current = decodedData;
        })
        .catch(e => console.error("Audio loading failed:", e));

      // The context may start in a "suspended" state.
      // A resume() call linked to a user gesture is required to start it.
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
    } catch (e) {
      console.error("Web Audio API is not supported here.", e);
    }
  }
  // --- END OF WEB AUDIO API UNLOCK ---
    startLoading();
  };

  // Play flip sound
  function playFlipSound() {
    console.log("played flip")
    console.log(hasUserInteraction)
    console.log(audioRef.current)
    // if (audioRef.current && hasUserInteraction) {
    //   const audio = audioRef.current.cloneNode();
    //   audio.currentTime = 0;
    //   audio.volume = 0.7;
    //   audio.play().catch((e) => console.log("Audio play failed:", e));
    // }
    // Check if the context and buffer are ready
    if (audioContextRef.current && audioBufferRef.current && hasUserInteraction) {
        try {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(audioContextRef.current.destination);
        source.start(0); // Play the sound immediately
        } catch (e) {
        console.error("Error playing sound:", e);
        }
    }
  }

  // Sequenced flip helper with vertical flip
  async function flipSquares(squares, text, displayTime) {
    setCurrentText(text);

    // Flip squares to reveal text with 0.1s delay between each flip
    for (let i = 0; i < squares.length; i++) {
      await new Promise((res) => setTimeout(res, i === 0 ? 0 : 100));
      setFlipped((prev) => new Set([...prev, squares[i]]));
      playFlipSound();
    }

    // Keep text displayed for specified time
    await new Promise((res) => setTimeout(res, displayTime));

    // Flip squares back in reverse order
    for (let i = squares.length - 1; i >= 0; i--) {
      await new Promise((res) => setTimeout(res, 100));
      setFlipped((prev) => {
        const n = new Set(prev);
        n.delete(squares[i]);
        return n;
      });
      playFlipSound();
    }

    setCurrentText("");
    await new Promise((res) => setTimeout(res, 150));
  }

  // Animation sequence
  useEffect(() => {
    if (phase !== "animating") return;

    const run = async () => {
      // Sequence 1: Welcome
      await flipSquares(getCenterSquares(7, gridSize), "WELCOME", 700);

      // Sequence 2: To
      await flipSquares(getCenterSquares(2, gridSize), "TO", 500);

      // Sequence 3: Debyte Expo
      await flipSquares(getCenterSquares(10, gridSize), "DEBYTE EXPO", 1000);

      setTimeout(() => onFinish && onFinish(), 400);
    };
    setTimeout(run, 300);
  }, [phase, gridSize, onFinish]);

  const renderSquareContent = (i) => {
    if (!flipped.has(i)) return null;

    const welcome = getCenterSquares(7, gridSize);
    const to = getCenterSquares(2, gridSize);
    const debyteExpo = getCenterSquares(10, gridSize);

    if (welcome.includes(i) && currentText === "WELCOME") {
      const position = welcome.indexOf(i);
      return "WELCOME"[position];
    }

    if (to.includes(i) && currentText === "TO") {
      const position = to.indexOf(i);
      return "TO"[position];
    }

    if (debyteExpo.includes(i) && currentText === "DEBYTE EXPO") {
      const position = debyteExpo.indexOf(i);
      // First 6 squares are DEBYTE, next 4 are EXPO
      if (position < 6) {
        return "DEBYTE"[position];
      } else {
        return "EXPO"[position - 6];
      }
    }

    return null;
  };
return (
    <div
      className={`splash-screen-wrapper${
        isDark ? " splash-dark" : " splash-light"
      }`}
    >
      {/* ===== STEP 1: PASTE THE AUDIO ELEMENT HERE, OUTSIDE THE CONDITIONS ===== */}
      {/* <audio ref={audioRef} preload="auto" style={{ display: "none" }}>
        <source src="/assets/flip-sound.mp3" type="audio/mpeg" />
        <source src="/assets/flip-sound.wav" type="audio/wav" />
        <source src="/assets/flip-sound.ogg" type="audio/ogg" />
      </audio> */}

      {/* ===== STEP 2: RENDER CONTENT BASED ON PHASE, INSIDE THE WRAPPER ===== */}
      {/* Show Start Screen */}
      {phase === "start" && (
        <div className="start-screen-container"> {/* I added a container for tidiness */}
          {/* Pixelated background artifacts */}
          <div className="pixel-artifacts">
            <div className="artifact artifact-1"></div>
            <div className="artifact artifact-2"></div>
            <div className="artifact artifact-3"></div>
            <div className="artifact artifact-4"></div>
            <div className="artifact artifact-5"></div>
          </div>
          <div className="start-screen">
            {/* Paste your <button> JSX here */}
            <button onClick={handleStartClick} className="terminal-button">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <div className="dot dot-red"></div>
                  <div className="dot dot-yellow"></div>
                  <div className="dot dot-green"></div>
                </div>
                <div className="terminal-title">~/experience</div>
              </div>
              <div className="terminal-content">
                <span className="terminal-prompt">$</span>
                <span className="terminal-command">./experience</span>
                <div className="terminal-cursor"></div>
              </div>
              <div className="terminal-glow"></div>
            </button>
            {/* Paste your <div className="floating-pixels"> JSX here */}
            <div className="floating-pixels">
              <div className="pixel-element pixel-1"></div>
              <div className="pixel-element pixel-2"></div>
              <div className="pixel-element pixel-3"></div>
              <div className="pixel-element pixel-4"></div>
              <div className="pixel-element pixel-5"></div>
            </div>
          </div>
        </div>
      )}

      {/* Show Loading Screen */}
      {phase === "loading" && (
        <div className="loading-screen">
          {/* Paste the content of your loading screen here */}
          <div className="loading-content">
            <h2 className="loading-title">Initializing...</h2>
            <div className="terminal-progress-container">
              <div className="terminal-progress-wrapper">
                <span className="progress-text">[</span>
                <div className="terminal-progress-track">
                  <div
                    className="terminal-progress-bar"
                    style={{ width: `${loadingProgress}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  ] {Math.round(loadingProgress)}%
                </span>
              </div>
            </div>
            <p className="loading-subtitle">Loading experience modules...</p>
          </div>
        </div>
      )}

      {/* Show Animating Grid */}
      {phase === "animating" && (
        <div
          className="splash-grid-fullscreen"
          style={{
            "--grid-size": gridSize,
            "--grid-columns": `repeat(${gridSize}, 1fr)`,
            "--grid-rows": `repeat(${gridSize}, 1fr)`,
          }}
        >
          {/* This is your grid mapping, which is already correct */}
          {Array.from({ length: totalSquares }, (_, i) => (
            <div className="splash-grid-square" key={i}>
              <div className={`flip-card-inner${flipped.has(i) ? " flipped" : ""}`}>
                <div className="flip-card-face flip-card-back"></div>
                <div className="flip-card-face flip-card-front">
                  <span className="splash-letter">{renderSquareContent(i)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
