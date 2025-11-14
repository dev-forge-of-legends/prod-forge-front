import React from "react";
import { AudioSettings as AudioSettingsType } from "../../types/interfaces";

interface AudioSettingsProps {
  settings: AudioSettingsType;
  onChange: (audio: AudioSettingsType) => void;
}

const AudioSettings: React.FC<AudioSettingsProps> = ({
  settings,
  onChange,
}) => {
  const handleVolumeChange = (key: keyof AudioSettingsType, value: number) => {
    if (key === "mute") return;
    onChange({ ...settings, [key]: value });
  };

  const handleMuteToggle = () => {
    onChange({ ...settings, mute: !settings.mute });
  };

  const VolumeSlider = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-white font-medium">{label}</label>
        <span className="text-gray-300 text-sm">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        disabled={settings.mute}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
        <div>
          <h3 className="text-white font-semibold">Master Mute</h3>
          <p className="text-gray-400 text-sm">Toggle all audio</p>
        </div>
        <button
          onClick={handleMuteToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.mute ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.mute ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="space-y-4">
        <VolumeSlider
          label="Master Volume"
          value={settings.masterVolume}
          onChange={(value) => handleVolumeChange("masterVolume", value)}
        />
        <VolumeSlider
          label="Music Volume"
          value={settings.musicVolume}
          onChange={(value) => handleVolumeChange("musicVolume", value)}
        />
        <VolumeSlider
          label="SFX Volume"
          value={settings.sfxVolume}
          onChange={(value) => handleVolumeChange("sfxVolume", value)}
        />
        <VolumeSlider
          label="Voice Volume"
          value={settings.voiceVolume}
          onChange={(value) => handleVolumeChange("voiceVolume", value)}
        />
      </div>
    </div>
  );
};

export default AudioSettings;
