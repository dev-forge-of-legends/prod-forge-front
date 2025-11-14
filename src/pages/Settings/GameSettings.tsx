import React from "react";
import { GameSettings as GameSettingsType } from "../../types/interfaces";

interface GameSettingsProps {
  settings: GameSettingsType;
  onChange: (game: GameSettingsType) => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({ settings, onChange }) => {
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
  ];

  const difficulties = [
    {
      value: "easy",
      label: "Easy",
      description: "Relaxed gameplay experience",
    },
    { value: "normal", label: "Normal", description: "Balanced challenge" },
    { value: "hard", label: "Hard", description: "Increased difficulty" },
    { value: "expert", label: "Expert", description: "For seasoned players" },
  ];

  return (
    <div className="space-y-6">
      {/* Language */}
      <div className="space-y-3">
        <label className="text-white font-medium block">Language</label>
        <select
          value={settings.language}
          onChange={(e) => onChange({ ...settings, language: e.target.value })}
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-gray-800">
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty */}
      <div className="space-y-3">
        <label className="text-white font-medium block">Difficulty</label>
        <div className="grid gap-3">
          {difficulties.map((diff) => (
            <button
              key={diff.value}
              onClick={() =>
                onChange({ ...settings, difficulty: diff.value as any })
              }
              className={`p-4 text-left rounded-lg border-2 transition-all ${
                settings.difficulty === diff.value
                  ? "border-blue-500 bg-blue-500 bg-opacity-20"
                  : "border-gray-600 bg-gray-800 hover:border-gray-500"
              }`}
            >
              <div className="text-white font-semibold">{diff.label}</div>
              <div className="text-gray-400 text-sm">{diff.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Subtitles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
          <div>
            <span className="text-white font-medium">Subtitles</span>
            <p className="text-gray-400 text-sm">Show dialogue text</p>
          </div>
          <button
            onClick={() =>
              onChange({ ...settings, subtitles: !settings.subtitles })
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.subtitles ? "bg-blue-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.subtitles ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {settings.subtitles && (
          <div className="space-y-3">
            <label className="text-white font-medium block">
              Subtitle Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["small", "medium", "large"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => onChange({ ...settings, subtitlesSize: size })}
                  className={`p-3 rounded-lg text-center transition-all ${
                    settings.subtitlesSize === size
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Auto Save */}
      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
        <div>
          <span className="text-white font-medium">Auto Save</span>
          <p className="text-gray-400 text-sm">
            Automatically save game progress
          </p>
        </div>
        <button
          onClick={() =>
            onChange({ ...settings, autoSave: !settings.autoSave })
          }
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.autoSave ? "bg-green-500" : "bg-gray-600"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.autoSave ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default GameSettings;
