import { Transition, Variants } from "framer-motion";

/**
 * Reusable animation variants for game elements
 */

// ==================== Pawn Animations ====================
export const pawnAnimations = {
  // Basic states
  idle: { 
    scale: 1, 
    rotate: 0,
    y: 0 
  },
  
  // Hover effect when pawn can be moved
  hover: { 
    scale: 1.15, 
    y: -8,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  },
  
  // Moving animation
  moving: {
    scale: [1, 1.2, 1],
    rotate: [0, 10, -10, 0],
    transition: { 
      duration: 0.5,
      ease: "easeInOut"
    }
  },
  
  // Jump animation for moving between positions
  jump: {
    y: [-10, -30, -10],
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  
  // Killed animation
  killed: {
    scale: [1, 1.5, 0],
    rotate: [0, 180, 360],
    opacity: [1, 1, 0],
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  },
  
  // Respawn/Enter base animation
  respawn: {
    scale: [0, 1.3, 1],
    rotate: [0, 360],
    opacity: [0, 1, 1],
    transition: { 
      duration: 0.6,
      ease: "backOut"
    }
  },
  
  // Winning celebration
  celebrate: {
    scale: [1, 1.3, 1.2, 1.3, 1.2],
    rotate: [0, -15, 15, -15, 0],
    y: [0, -20, 0, -20, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop" as const
    }
  }
} satisfies Record<string, any>;

// ==================== Effect Animations ====================

// Killing/collision effect
export const killingEffect: Variants = {
  initial: { 
    scale: 0, 
    opacity: 0 
  },
  animate: {
    scale: [0, 1.8, 2.5],
    opacity: [1, 0.6, 0],
    transition: { 
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

// Explosion particles effect
export const explosionParticle: Variants = {
  initial: { 
    scale: 0, 
    opacity: 1,
    x: 0,
    y: 0
  },
  animate: (custom: number) => ({
    scale: [0.5, 1, 0],
    opacity: [1, 0.8, 0],
    x: Math.cos(custom * (Math.PI / 4)) * 40,
    y: Math.sin(custom * (Math.PI / 4)) * 40,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  })
};

// Star/sparkle effect
export const sparkleEffect: Variants = {
  initial: { scale: 0, opacity: 0, rotate: 0 },
  animate: {
    scale: [0, 1.5, 0],
    opacity: [0, 1, 0],
    rotate: [0, 180],
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Smoke/dust trail effect
export const dustTrail: Variants = {
  initial: { 
    scale: 0.5, 
    opacity: 0.8,
    y: 0 
  },
  animate: {
    scale: [0.5, 1.2, 1.5],
    opacity: [0.8, 0.4, 0],
    y: [0, -20, -40],
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// ==================== UI Animations ====================

// Hint/preview pawn
export const hintPawn: Variants = {
  initial: { 
    scale: 0, 
    opacity: 0 
  },
  animate: { 
    scale: 1, 
    opacity: 0.6,
    transition: { 
      type: "spring", 
      stiffness: 300,
      damping: 20
    }
  },
  exit: { 
    scale: 0, 
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

// Glow/highlight effect
export const glowPulse: Variants = {
  animate: {
    opacity: [0.4, 1, 0.4],
    scale: [0.95, 1.05, 0.95],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Player indicator glow
export const playerGlow: Variants = {
  idle: {
    boxShadow: '0 0 0px rgba(255, 255, 255, 0)'
  },
  active: {
    boxShadow: [
      '0 0 0px var(--glow-color)',
      '0 0 20px var(--glow-color)',
      '0 0 0px var(--glow-color)'
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// ==================== Transition Presets ====================

export const transitions = {
  // Smooth spring animation
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 25
  } as Transition,
  
  // Bouncy spring
  bouncy: {
    type: "spring",
    stiffness: 400,
    damping: 10,
    mass: 0.5
  } as Transition,
  
  // Smooth ease
  smooth: {
    duration: 0.3,
    ease: "easeInOut"
  } as Transition,
  
  // Fast snap
  snap: {
    duration: 0.15,
    ease: "easeOut"
  } as Transition,
  
  // Layout transition for position changes
  layout: {
    type: "spring",
    stiffness: 300,
    damping: 25,
    duration: 0.5
  } as Transition
};

// ==================== Helper Functions ====================

/**
 * Generate random explosion particles positions
 */
export const generateExplosionParticles = (count: number = 8) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    angle: (i * 360) / count
  }));
};

/**
 * Get color-specific glow effect
 */
export const getPlayerGlowColor = (color: string): string => {
  const colorMap: Record<string, string> = {
    green: 'rgba(34, 197, 94, 0.8)',
    red: 'rgba(239, 68, 68, 0.8)',
    blue: 'rgba(59, 130, 246, 0.8)',
    yellow: 'rgba(234, 179, 8, 0.8)',
  };
  return colorMap[color.toLowerCase()] || 'rgba(255, 255, 255, 0.8)';
};

/**
 * Generate path animation for pawn movement
 * This creates a smooth path between positions
 */
export const generatePathAnimation = (
  startPos: { x: number; y: number },
  endPos: { x: number; y: number },
  isHomeStretch: boolean = false
) => {
  const duration = isHomeStretch ? 0.4 : 0.5;
  
  return {
    x: [startPos.x, endPos.x],
    y: [startPos.y, endPos.y - 30, endPos.y], // Arc movement
    transition: {
      duration,
      times: [0, 0.5, 1],
      ease: "easeInOut"
    }
  };
};

/**
 * Create sequential animation for multiple dice rolls
 */
export const createDiceRollAnimation = () => ({
  rotate: [0, 360, 720, 1080],
  scale: [1, 1.2, 0.8, 1],
  transition: {
    duration: 0.8,
    ease: "easeOut"
  }
});

/**
 * Victory animation sequence
 */
export const victorySequence: Variants = {
  initial: { 
    scale: 0,
    rotate: -180,
    opacity: 0
  },
  animate: {
    scale: [0, 1.2, 1],
    rotate: [180, 0],
    opacity: [0, 1],
    transition: {
      duration: 0.8,
      ease: "backOut"
    }
  }
};

/**
 * Stagger children animation
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 300 }
  }
};

