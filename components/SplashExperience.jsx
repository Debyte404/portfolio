"use client";

/* global process */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Howl } from "howler";
import gsap from "gsap";
import { useSoundPreference } from "./SoundPreference";

const SPLASH_LABEL = "WELCOME TO DEBYTE EXPO";
const SPLASH_PHRASES = ["WELCOME TO", "DEBYTE EXPO"];
const SPLASH_STORAGE_KEY = "debyte-expo-splash-shown-at-v2";
const SPLASH_EXPIRY_MS = 5 * 60 * 1000;
const SPLASH_START_DELAY_MS = 80;
const SPLASH_DURATION_MS = 2800;
const SPLASH_PHRASE_SWAP_MS = 980;
const SPLASH_EXIT_MS = 2480;
const SPLASH_REPLAY_ONLY_IN_PRODUCTION = process.env.NODE_ENV === "production";

function shouldShowSplash() {
  if (typeof window === "undefined") return false;
  if (!SPLASH_REPLAY_ONLY_IN_PRODUCTION) return true;

  try {
    const shownAt = Number(window.localStorage.getItem(SPLASH_STORAGE_KEY) || 0);
    return !shownAt || Date.now() - shownAt > SPLASH_EXPIRY_MS;
  } catch {
    return true;
  }
}

function rememberSplashShown() {
  if (!SPLASH_REPLAY_ONLY_IN_PRODUCTION) return;

  try {
    window.localStorage.setItem(SPLASH_STORAGE_KEY, String(Date.now()));
  } catch {
    // If persistence is unavailable, keep the splash non-blocking for this visit.
  }
}

export default function SplashExperience() {
  const root = useRef(null);
  const started = useRef(false);
  const soundEnabledRef = useRef(false);
  const { soundEnabled } = useSoundPreference();
  const [visible, setVisible] = useState(false);
  const [activePhraseIndex, setActivePhraseIndex] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const sounds = useMemo(
    () => ({
      flip: new Howl({
        src: ["/assets/flip-sound.mp3", "/assets/flip-sound.ogg"],
        volume: 0.26,
        pool: 4,
      }),
      saw: new Howl({
        src: ["/assets/chainsaw.mp3"],
        volume: 0.03,
      }),
    }),
    [],
  );

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    if (!shouldShowSplash()) return;

    rememberSplashShown();
    setActivePhraseIndex(0);
    setVisible(true);
  }, []);

  const stopSplashSounds = useCallback(() => {
    sounds.flip.stop();
    sounds.saw.stop();
  }, [sounds]);

  const playSplashAccent = useCallback((rate = 1) => {
    if (!soundEnabledRef.current) return;

    const flipId = sounds.flip.play();
    sounds.flip.rate(rate, flipId);
    sounds.flip.volume(0.22, flipId);
  }, [sounds]);

  const playSplashBed = useCallback(() => {
    if (!soundEnabledRef.current) return;

    const sawId = sounds.saw.play();
    sounds.saw.fade(0.03, 0, 1300, sawId);
  }, [sounds]);

  const finish = useCallback(() => {
    stopSplashSounds();
    started.current = false;
    setActivePhraseIndex(null);
    setIsExiting(false);
    setVisible(false);
  }, [stopSplashSounds]);

  const begin = useCallback(() => {
    if (started.current) return;
    started.current = true;
    playSplashBed();
    playSplashAccent(1.02);
    setIsExiting(false);
  }, [playSplashAccent, playSplashBed]);

  useEffect(() => {
    if (!visible) return undefined;

    const splashRoot = root.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startTimer = window.setTimeout(() => {
      begin();
    }, SPLASH_START_DELAY_MS);
    const phraseTimer = window.setTimeout(() => {
      playSplashAccent(1.18);
      setActivePhraseIndex(1);
    }, SPLASH_PHRASE_SWAP_MS);
    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
      gsap.to(splashRoot, {
        "--splash-y": reduce ? "0%" : "-112%",
        opacity: 0,
        duration: reduce ? 0.16 : 0.38,
        ease: "power4.inOut",
        onComplete: finish,
      });
    }, SPLASH_EXIT_MS);
    const hardExitTimer = window.setTimeout(() => {
      finish();
    }, SPLASH_DURATION_MS + 250);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(phraseTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(hardExitTimer);
      if (splashRoot) gsap.killTweensOf(splashRoot);
    };
  }, [begin, finish, playSplashAccent, visible]);

  useEffect(
    () => () => {
      Object.values(sounds).forEach((sound) => sound.unload());
    },
    [sounds],
  );

  if (!visible) return null;

  return (
    <section
      ref={root}
      className={`splash${isExiting ? " is-exiting" : ""}`}
      aria-label={SPLASH_LABEL}
      aria-live="off"
      style={{ "--splash-y": "0%" }}
    >
      <div className="splash-copy" aria-hidden="true">
        {SPLASH_PHRASES.map((phrase, index) => (
          <span
            className={`splash-phrase${activePhraseIndex === index ? " is-active" : ""}`}
            data-beat={index === 0 ? "intro" : "title"}
            data-text={phrase}
            key={phrase}
          >
            {phrase.split("").map((letter, letterIndex) => (
              <span
                className={`splash-letter${letter === " " ? " is-space" : ""}`}
                data-char={letter}
                key={`${phrase}-${letter}-${letterIndex}`}
                style={{
                  "--letter-delay": `${letterIndex * 32}ms`,
                  "--glitch-delay-a": `${letterIndex * 32 + 72}ms`,
                  "--glitch-delay-b": `${letterIndex * 32 + 104}ms`,
                  "--letter-exit-delay": `${letterIndex * 10}ms`,
                }}
              >
                {letter === " " ? "\u00a0" : letter}
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}
