export interface Settings {
  audio: AudioSettings;
  video: VideoSettings;
  controls: ControlSettings;
  game: GameSettings;
  accessibility: AccessibilitySettings;
}

export interface AudioSettings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  voiceVolume: number;
  mute: boolean;
}

export interface VideoSettings {
  resolution: string;
  displayMode: 'fullscreen' | 'windowed' | 'borderless';
  vsync: boolean;
  fpsLimit: number;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  brightness: number;
  contrast: number;
}

export interface ControlSettings {
  mouseSensitivity: number;
  invertY: boolean;
  keyBindings: KeyBindings;
}

export interface KeyBindings {
  moveForward: string;
  moveBackward: string;
  moveLeft: string;
  moveRight: string;
  jump: string;
  crouch: string;
  sprint: string;
}

export interface GameSettings {
  language: string;
  difficulty: 'easy' | 'normal' | 'hard' | 'expert';
  showTutorial: boolean;
  autoSave: boolean;
  crosshair: CrosshairSettings;
}

export interface CrosshairSettings {
  style: 'dot' | 'cross' | 'circle' | 'custom';
  color: string;
  size: number;
  show: boolean;
}

export interface AccessibilitySettings {
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  subtitleSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  screenShake: boolean;
  motionBlur: boolean;
}