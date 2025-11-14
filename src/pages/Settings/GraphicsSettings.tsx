import React from "react";
import { GraphicsSettings as GraphicsSettingsType } from "../../types/interfaces";

interface GraphicsSettingsProps {
  settings: GraphicsSettingsType;
  onChange: (graphics: GraphicsSettingsType) => void;
}

const GraphicsSettings: React.FC<GraphicsSettingsProps> = ({
  settings,
  onChange,
}) => {
  const resolutions = ["1280x720", "1920x1080", "2560x1440", "3840x2160"];
  const qualityOptions = ["low", "medium", "high", "ultra"] as const;

  return (
    <div className="space-y-6">
      {/* Resolution */}
      <div className="space-y-3">
        <label className="text-white font-medium block">Resolution</label>
        <select
          value={settings.resolution}
          onChange={(e) =>
            onChange({ ...settings, resolution: e.target.value })
          }
          className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
        >
          {resolutions.map((res) => (
            <option key={res} value={res} className="bg-gray-800">
              {res}
            </option>
          ))}
        </select>
      </div>

      {/* Quality Preset */}
      <div className="space-y-3">
        <label className="text-white font-medium block">Quality Preset</label>
        <div className="grid grid-cols-4 gap-2">
          {qualityOptions.map((quality) => (
            <button
              key={quality}
              onClick={() => onChange({ ...settings, quality })}
              className={`p-3 rounded-lg text-center transition-all ${
                settings.quality === quality
                  ? "bg-blue-600 text-white shadow-lg transform scale-105"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {quality.charAt(0).toUpperCase() + quality.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* VSync & FPS Limit */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
          <span className="text-white">VSync</span>
          <button
            onClick={() => onChange({ ...settings, vsync: !settings.vsync })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.vsync ? "bg-blue-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.vsync ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-white font-medium block">FPS Limit</label>
          <input
            type="number"
            value={settings.fpsLimit}
            onChange={(e) =>
              onChange({ ...settings, fpsLimit: Number(e.target.value) })
            }
            className="w-full p-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            min="30"
            max="240"
          />
        </div>
      </div>

      {/* Brightness & Contrast */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-white font-medium">Brightness</label>
            <span className="text-gray-300 text-sm">
              {settings.brightness}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.brightness}
            onChange={(e) =>
              onChange({ ...settings, brightness: Number(e.target.value) })
            }
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-white font-medium">Contrast</label>
            <span className="text-gray-300 text-sm">{settings.contrast}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.contrast}
            onChange={(e) =>
              onChange({ ...settings, contrast: Number(e.target.value) })
            }
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  );
};

export default GraphicsSettings;
