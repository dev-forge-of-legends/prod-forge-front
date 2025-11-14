import React, { useState } from "react";
import { useSettings } from "./useSettings";
import AudioSettings from "./AudioSettings";
import GraphicsSettings from "./GraphicsSettings";
import ControlsSettings from "./ControlsSettings";
import GameSettings from "./GameSettings";

const Settings: React.FC = () => {
  const {
    settings,
    updateSettings,
    saveSettings,
    resetToDefault,
    resetToSaved,
    hasUnsavedChanges,
  } = useSettings();
  const [activeTab, setActiveTab] = useState<
    "audio" | "graphics" | "controls" | "game"
  >("audio");

  const tabs = [
    { id: "audio" as const, label: "Audio", icon: "🔊" },
    { id: "graphics" as const, label: "Graphics", icon: "🎮" },
    { id: "controls" as const, label: "Controls", icon: "⌨️" },
    { id: "game" as const, label: "Game", icon: "⚙️" },
  ];

  const handleSettingsUpdate = (
    section: keyof typeof settings,
    newSettings: any
  ) => {
    updateSettings({ [section]: newSettings });
  };

  const handleSave = () => {
    saveSettings();
    // Show success message or feedback
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            Game Settings
          </h1>
          <p className="text-gray-400">Customize your gaming experience</p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 bg-gray-900 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 p-4 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-lg transform scale-105"
                        : "text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="font-semibold">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleSave}
                  disabled={!hasUnsavedChanges}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                    hasUnsavedChanges
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  💾 Save Changes
                </button>
                <button
                  onClick={resetToSaved}
                  disabled={!hasUnsavedChanges}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                    hasUnsavedChanges
                      ? "bg-yellow-600 hover:bg-yellow-700 text-white"
                      : "bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  🔄 Reset Changes
                </button>
                <button
                  onClick={resetToDefault}
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
                >
                  ⚠️ Reset to Default
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
              <div className="max-w-2xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {tabs.find((tab) => tab.id === activeTab)?.label} Settings
                  </h2>
                  <p className="text-gray-400">
                    {activeTab === "audio" &&
                      "Adjust volume levels and audio preferences"}
                    {activeTab === "graphics" &&
                      "Configure visual quality and display settings"}
                    {activeTab === "controls" &&
                      "Customize keyboard and mouse controls"}
                    {activeTab === "game" &&
                      "Modify gameplay and language settings"}
                  </p>
                </div>

                {/* Settings Content */}
                <div className="space-y-6">
                  {activeTab === "audio" && (
                    <AudioSettings
                      settings={settings.audio}
                      onChange={(audio) => handleSettingsUpdate("audio", audio)}
                    />
                  )}
                  {activeTab === "graphics" && (
                    <GraphicsSettings
                      settings={settings.graphics}
                      onChange={(graphics) =>
                        handleSettingsUpdate("graphics", graphics)
                      }
                    />
                  )}
                  {activeTab === "controls" && (
                    <ControlsSettings
                      settings={settings.controls}
                      onChange={(controls) =>
                        handleSettingsUpdate("controls", controls)
                      }
                    />
                  )}
                  {activeTab === "game" && (
                    <GameSettings
                      settings={settings.game}
                      onChange={(game) => handleSettingsUpdate("game", game)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unsaved Changes Indicator */}
        {hasUnsavedChanges && (
          <div className="fixed bottom-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
            ⚠️ You have unsaved changes
          </div>
        )}
      </div>

      {/* Custom Styles for Sliders */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default Settings;
