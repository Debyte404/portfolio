// src/components/AmbientSound.jsx

import React, { useEffect } from 'react';
import { Howl } from 'howler';

// This component handles the background audio playback.
export function AmbientSound({ src, volume = 0.5 }) {
  useEffect(() => {
    // Initialize Howler with your sound file.
    const sound = new Howl({
      src: [src],
      autoplay: true,
      loop: true,
      volume: volume,
      html5: true, // Helps with compatibility and streaming.
    });

    // Start playing the sound.
    sound.play();

    // This is a cleanup function that runs when the component is unmounted.
    // It's crucial for stopping the sound when the user navigates away.
    return () => {
      sound.stop();
      sound.unload();
    };
  }, [src, volume]); // The effect will re-run if the src or volume changes.

  // This component does not render any visible HTML.
  return null;
}
