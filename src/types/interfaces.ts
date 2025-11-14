export interface SliderImgItem {
  id: string | number;
  img: string;
}

export interface AudioSettings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  voiceVolume: number;
  mute: boolean;
}

export interface GraphicsSettings {
  resolution: string;
  quality: 'low' | 'medium' | 'high' | 'ultra';
  vsync: boolean;
  fpsLimit: number;
  brightness: number;
  contrast: number;
}

export interface ControlsSettings {
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
  subtitles: boolean;
  subtitlesSize: 'small' | 'medium' | 'large';
  difficulty: 'easy' | 'normal' | 'hard' | 'expert';
  autoSave: boolean;
}

export interface Settings {
  audio: AudioSettings;
  graphics: GraphicsSettings;
  controls: ControlsSettings;
  game: GameSettings;
}

export interface Achievement {
  icon: string;
  title: string;
  Description: string;
  status: string;
  xp: number;
  coin: number;
}


export interface UserData {
  id: string;
  email: string;
  userName: string;
  password: string;
  signupIp: string;
  wallet: {
    coin: string;
  };
  signupTime: string;
  avatar: string;
  teamId: string;
  role: string;
  level: number;
  played: number;
  wins: number;
  loses: number;
  xp: number;
  streak: number;
  socialAuth: string[];
  adsBy: string;
  emailVerified: boolean;
  teamInfo: Team;
  achievement: AchieveItem[];
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[]; // Updated to include member details
  avatar: string;
  played: number;
  wins: number;
  loses: number;
  ownerId: string;
}

export interface Room {
  id: string;
  type: string;
  teamId: string;
  membersCount: number;
  teamInfo?: TeamInfo; // Updated interface
  userInfo?: UserInfo;
  avatar: string;
  played: number;
  wins: number;
  loses: number;
  ownerId: string;
  lastMessage: lastMessage;
}

export interface lastMessage {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserInfo {
  id: string;
  email: string;
  userName: string;
  password: string;
  signupIp: string;
  wallet: string[];
  signupTime: Date;
  avatar: string;
  teamId: string;
  role: string;
  level: number;
  played: number;
  wins: number;
  loses: number;
  name:string;
  socialAuth: string[];
  adsBy: string;
  emailVerified: boolean;
}

export interface TeamInfo {
  id: string;
  name: string;
  members: TeamMember[]; // Updated to include member details
  ownerId: string;
}

export interface TeamMember {
  id: string;
  userName: string;
  level: number;
  email: string;
  avatar: string;
}

export interface TeamData {
  id: string;
  avatar: string;
  loses: number;
  members: string[];
  name: string;
  played: number;
  wins: number;
}

export interface IWallet {
  gc: number;
  st: number;
  redeemable: number;
  selectedCurrency: string;
}

export interface AchieveItem {
  _id: string;
  winCount: number;
  priceCoin: number;
  priceXp: number;
  description: string;
  reputation: string;
  avatar: string;
  isAchieved: string;
}

export interface INotification {
  id: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  deepLink?: string;
}

export interface IReferral {
  userId: string;
  userName: string;
  avatar: string;
  earnings: number;
  signupTime: string;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any, formData?: any) => string | null;
}

export interface ValidationSchema {
  [fieldName: string]: ValidationRule;
}

export interface ValidationErrors {
  [fieldName: string]: string;
}

export interface BaseFormData {
  [fieldName: string]: any;
}

export interface IFriendRequest {
  friendRequest: {
    id: string;
  };
  sender: {
    userName: string;
    avatar?: string;
  };
}
