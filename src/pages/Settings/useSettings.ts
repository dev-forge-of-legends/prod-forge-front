import { useState, useEffect } from "react";
import { Settings } from "../../types/interfaces";

const defaultSettings: Settings = {
  audio: {
    masterVolume: 80,
    musicVolume: 70,
    sfxVolume: 90,
    voiceVolume: 85,
    mute: false,
  },
  graphics: {
    resolution: "1920x1080",
    quality: "high",
    vsync: true,
    fpsLimit: 60,
    brightness: 50,
    contrast: 50,
  },
  controls: {
    mouseSensitivity: 50,
    invertY: false,
    keyBindings: {
      moveForward: "W",
      moveBackward: "S",
      moveLeft: "A",
      moveRight: "D",
      jump: "Space",
      crouch: "Ctrl",
      sprint: "Shift",
    },
  },
  game: {
    language: "en",
    subtitles: true,
    subtitlesSize: "medium",
    difficulty: "normal",
    autoSave: true,
  },
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("game-settings");
    if (savedSettings) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
      } catch (error) {
        console.error("Error loading settings:", error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    setHasUnsavedChanges(true);
  };

  const saveSettings = () => {
    localStorage.setItem("game-settings", JSON.stringify(settings));
    setHasUnsavedChanges(false);
  };

  const resetToDefault = () => {
    setSettings(defaultSettings);
    setHasUnsavedChanges(true);
  };

  const resetToSaved = () => {
    const savedSettings = localStorage.getItem("game-settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    setHasUnsavedChanges(false);
  };

  return {
    settings,
    updateSettings,
    saveSettings,
    resetToDefault,
    resetToSaved,
    hasUnsavedChanges,
  };
};
