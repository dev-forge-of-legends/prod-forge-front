import React, { useState } from "react";
import { ControlsSettings as ControlsSettingsType } from "../../types/interfaces";

interface ControlsSettingsProps {
  settings: ControlsSettingsType;
  onChange: (controls: ControlsSettingsType) => void;
}

const ControlsSettings: React.FC<ControlsSettingsProps> = ({
  settings,
  onChange,
}) => {
  const [recordingKey, setRecordingKey] = useState<string | null>(null);

  const handleKeyBindStart = (action: string) => {
    setRecordingKey(action);
  };

  const handleKeyBind = (event: React.KeyboardEvent, action: string) => {
    if (!recordingKey) return;

    event.preventDefault();
    let key = event.key.toUpperCase();

    // Handle special keys
    if (event.key === " ") key = "Space";
    if (event.key === "Control") key = "Ctrl";
    if (event.key === "Shift") key = "Shift";
    if (event.key === "Alt") key = "Alt";

    onChange({
      ...settings,
      keyBindings: {
        ...settings.keyBindings,
        [action]: key,
      },
    });
    setRecordingKey(null);
  };

  const KeyBindingButton = ({
    action,
    label,
    currentKey,
  }: {
    action: string;
    label: string;
    currentKey: string;
  }) => (
    <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
      <span className="text-white">{label}</span>
      <button
        onClick={() => handleKeyBindStart(action)}
        onKeyDown={(e) => handleKeyBind(e, action)}
        className={`px-4 py-2 rounded border-2 transition-all min-w-20 ${
          recordingKey === action
            ? "border-blue-500 bg-blue-500 text-white animate-pulse"
            : "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500"
        }`}
        tabIndex={recordingKey === action ? -1 : 0}
      >
        {recordingKey === action ? "Press Key..." : currentKey}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Mouse Sensitivity */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-white font-medium">Mouse Sensitivity</label>
          <span className="text-gray-300 text-sm">
            {settings.mouseSensitivity}%
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={settings.mouseSensitivity}
          onChange={(e) =>
            onChange({ ...settings, mouseSensitivity: Number(e.target.value) })
          }
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Invert Y Axis */}
      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
        <div>
          <span className="text-white font-medium">Invert Y Axis</span>
          <p className="text-gray-400 text-sm">
            Invert mouse vertical movement
          </p>
        </div>
        <button
          onClick={() => onChange({ ...settings, invertY: !settings.invertY })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.invertY ? "bg-blue-500" : "bg-gray-600"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.invertY ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Key Bindings */}
      <div className="space-y-3">
        <h3 className="text-white font-semibold text-lg">Key Bindings</h3>
        <div className="grid gap-2">
          <KeyBindingButton
            action="moveForward"
            label="Move Forward"
            currentKey={settings.keyBindings.moveForward}
          />
          <KeyBindingButton
            action="moveBackward"
            label="Move Backward"
            currentKey={settings.keyBindings.moveBackward}
          />
          <KeyBindingButton
            action="moveLeft"
            label="Move Left"
            currentKey={settings.keyBindings.moveLeft}
          />
          <KeyBindingButton
            action="moveRight"
            label="Move Right"
            currentKey={settings.keyBindings.moveRight}
          />
          <KeyBindingButton
            action="jump"
            label="Jump"
            currentKey={settings.keyBindings.jump}
          />
          <KeyBindingButton
            action="crouch"
            label="Crouch"
            currentKey={settings.keyBindings.crouch}
          />
          <KeyBindingButton
            action="sprint"
            label="Sprint"
            currentKey={settings.keyBindings.sprint}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlsSettings;
