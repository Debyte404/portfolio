"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";

export const SOUND_STORAGE_KEY = "debyte-expo-sound-enabled";
export const SOUND_CHANGE_EVENT = "portfolio:sound-preference-change";

function readStoredSoundPreference() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(SOUND_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function useSoundPreference() {
  const [soundEnabled, setSoundEnabledState] = useState(false);

  useEffect(() => {
    setSoundEnabledState(readStoredSoundPreference());

    const onPreferenceChange = (event) => {
      if (event instanceof CustomEvent && typeof event.detail?.enabled === "boolean") {
        setSoundEnabledState(event.detail.enabled);
        return;
      }

      setSoundEnabledState(readStoredSoundPreference());
    };

    const onStorage = (event) => {
      if (event.key === SOUND_STORAGE_KEY) {
        setSoundEnabledState(event.newValue === "true");
      }
    };

    window.addEventListener(SOUND_CHANGE_EVENT, onPreferenceChange);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(SOUND_CHANGE_EVENT, onPreferenceChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setSoundEnabled = useCallback((nextEnabled) => {
    const enabled =
      typeof nextEnabled === "function" ? Boolean(nextEnabled(readStoredSoundPreference())) : Boolean(nextEnabled);

    setSoundEnabledState(enabled);
    try {
      window.localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
    } catch {
      // Keep the in-session preference even when persistence is unavailable.
    }
    window.dispatchEvent(new CustomEvent(SOUND_CHANGE_EVENT, { detail: { enabled } }));
  }, []);

  return { soundEnabled, setSoundEnabled };
}

export function SoundToggle() {
  const { soundEnabled, setSoundEnabled } = useSoundPreference();
  const tooltipId = useId();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const Icon = soundEnabled ? SpeakerHigh : SpeakerSlash;
  const label = soundEnabled ? "Sound on" : "Sound off";

  return (
    <span
      className="sound-toggle-shell"
      data-sound-toggle
      data-tooltip-open={tooltipOpen ? "true" : "false"}
      onBlur={() => setTooltipOpen(false)}
      onFocus={() => setTooltipOpen(true)}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
    >
      <button
        type="button"
        className="sound-toggle"
        aria-describedby={tooltipId}
        aria-label={soundEnabled ? "Turn sound off" : "Turn sound on"}
        aria-pressed={soundEnabled}
        data-sound-enabled={soundEnabled ? "true" : "false"}
        onClick={() => setSoundEnabled((enabled) => !enabled)}
      >
        <Icon size={19} weight="bold" aria-hidden="true" />
        <span className="sound-toggle-label">{label}</span>
      </button>
      <span
        className="sound-toggle-tooltip"
        id={tooltipId}
        role="tooltip"
        style={tooltipOpen ? { opacity: 1, transform: "translateY(0)" } : undefined}
      >
        {soundEnabled ? "Sound armed" : "Sound muted"}
      </span>
    </span>
  );
}
