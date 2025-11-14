export type AchievementStatus = "Unlocked" | "Locked" | "In Progress";

export interface Cta {
  label: string;
  to: string;
  className: string;
}
export interface Stat {
  label: string;
  value: number | string;
  icon: string;
}
export interface Member {
  name: string;
  level: number;
  avatarSrc?: string;
}
export interface MiniBlock {
  label: string;
  value: number | string;
}
export interface AchievementData {
  title: string;
  desc: string;
  status: AchievementStatus;
  icon?: string;
}

// ---- Storage keys (typed) ----
export const STORAGE_KEYS = {
  USER: "userdata",
  WALLET: "wallet",
  PURCHASE_PACKAGES: "purchase_packages",
  REDIRECT: "redirect",
} as const satisfies Record<string, string>;

export type StorageKey = keyof typeof STORAGE_KEYS;

// ---- Assets/CDN helpers ----
/**
 * Prefer CDN if available, fallback to local.
 * .env: VITE_CDN_BASE=https://cdn.example.com
 */
const cdn = import.meta.env.VITE_CDN_BASE as string | undefined;

export const DEFAULT_AVATAR_URL = cdn
  ? `${cdn}/images/header/profile.webp`
  : "https://i.ibb.co/89L3kF7/user-avatar.png";

// ---- Validation (regex + tiny helpers) ----
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9]{7,15}$/,
  postalCode: /^[0-9]{4,10}$/,
  alphaOnly: /^[A-Za-z\s]+$/, // NOTE: international names? use \p{L}+u
  alphaNumeric: /^[A-Za-z0-9\s]+$/,
  strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
  username: /^[A-Za-z0-9_]{3,20}$/,
  address: /^[A-Za-z0-9\s,.-]{5,200}$/,
  url: /^(https?):\/\/[^\s/$.?#].[^\s]*$/i,
  zipCode: /^\d{5}(-\d{4})?$/,
  // CC length 13–19, formatting spaces/dashes allowed; do Luhn check in helper
  creditCard: /^(?:\d[ -]?){13,19}$/,
  socialSecurityNumber: /^\d{3}-\d{2}-\d{4}$/,
  phoneInternational: /^\+[1-9]\d{1,14}$/,
} as const;

export const validate = {
  email: (s: string) => VALIDATION_PATTERNS.email.test(s),
  url: (s: string) => VALIDATION_PATTERNS.url.test(s),
  phone: (s: string) => VALIDATION_PATTERNS.phone.test(s),
  creditCardLuhn: (s: string) => {
    // remove spaces/dashes then Luhn
    const digits = (s.match(/\d/g) || []).map(Number);
    let sum = 0,
      dbl = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let d = digits[i];
      if (dbl) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
      dbl = !dbl;
    }
    return digits.length >= 13 && digits.length <= 19 && sum % 10 === 0;
  },
};

export const CTAS: Cta[] = [
  {
    label: "Play Now",
    to: "/ludo-game-ui",
    className:
      "bg-gradient-to-b from-[var(--color-cta-play-from)] to-[var(--color-cta-play-to)] text-white hover:brightness-110 text-xs sm:text-sm md:text-base",
  },
  {
    label: "Join Tournament",
    to: "/match-histories-ui",
    className: "bg-join text-xs sm:text-sm md:text-base",
  },
  {
    label: "Leaderboard",
    to: "/match-histories-ui",
    className:
      "bg-cta-leaderboard text-white hover:brightness-110 text-xs sm:text-sm md:text-base",
  },
];

export const TEAM_MEMBERS: Member[] = [
  { name: "Kristin Watson", level: 11 },
  { name: "Ronald Richards", level: 11 },
  { name: "Jane Cooper", level: 11 },
  { name: "Savannah Nguyen", level: 11 },
];

export const INDIVIDUAL_MINI: MiniBlock[] = [
  { label: "Matches Created", value: 88 },
  { label: "Matches Waiting for Players", value: 12 },
];

export const CHALLENGE_MINI: MiniBlock[] = [
  { label: "Matches Created", value: 88 },
  { label: "Matches Waiting for Players", value: 12 },
];

export const ACHIEVEMENTS: AchievementData[] = [
  {
    title: "First Victory",
    desc: "Won your first match",
    status: "Unlocked",
    icon: "/assets/images/icons/Win.svg",
  },
  {
    title: "5 Wins Streak",
    desc: "Won 5 matches in a row",
    status: "Locked",
    icon: "/assets/images/icons/Right.png",
  },
  {
    title: "Team Player",
    desc: "Joined a team",
    status: "In Progress",
    icon: "/assets/images/icons/Team.svg",
  },
  {
    title: "First Victory",
    desc: "Won your first match",
    status: "Unlocked",
    icon: "/assets/images/icons/Win.svg",
  },
  {
    title: "Team Player",
    desc: "Joined a team",
    status: "In Progress",
    icon: "/assets/images/icons/Team.svg",
  },
];


export const STATS: Stat[] = [
  {
    label: "Matches Played",
    value: 20,
    icon: "/assets/images/icons/WINNERS.svg",
  },
  {
    label: "Wins",
    value: 18,
    icon: "/assets/images/icons/lucide_circle-check.svg",
  },
  {
    label: "Losses",
    value: 16,
    icon: "/assets/images/icons/Cross.svg",
  },
  {
    label: "Current Streak",
    value: "03",
    icon: "/assets/images/icons/Fire.svg",
  },
];