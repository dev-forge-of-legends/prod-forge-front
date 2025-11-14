import { dustTrail, explosionParticle, generateExplosionParticles, sparkleEffect } from "@app-utils/gameAnimations";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Advanced particle effects for game events
 */

interface EffectPosition {
  x: number;
  y: number;
}

interface KillingEffectProps {
  position: EffectPosition | null;
  onComplete?: () => void;
}

// Explosion effect when pawn is killed
export const KillingExplosion: React.FC<KillingEffectProps> = ({ position, onComplete }) => {
  if (!position) return null;

  const particles = generateExplosionParticles(8);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      <motion.div
        key="explosion-container"
        className="absolute pointer-events-none"
        style={{
          left: position.x,
          top: position.y,
          width: 0,
          height: 0
        }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.8 }}
      >
        {/* Central flash */}
        <motion.div
          className="absolute rounded-full bg-red-500"
          style={{
            width: 40,
            height: 40,
            left: -20,
            top: -20
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 2, 3],
            opacity: [1, 0.6, 0]
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Shockwave ring */}
        <motion.div
          className="absolute rounded-full border-4 border-red-400"
          style={{
            width: 40,
            height: 40,
            left: -20,
            top: -20
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [0, 3, 4],
            opacity: [1, 0.5, 0],
            borderWidth: [4, 2, 0]
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-orange-500"
            style={{
              width: 8,
              height: 8,
              left: -4,
              top: -4
            }}
            custom={particle.id}
            variants={explosionParticle}
            initial="initial"
            animate="animate"
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

interface SparkleEffectProps {
  position: EffectPosition | null;
  color?: string;
}

// Sparkle effect for special moves (like entering home)
export const SparkleEffect: React.FC<SparkleEffectProps> = ({ position, color = "#FFD700" }) => {
  if (!position) return null;

  const sparkles = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    offset: { x: Math.cos(i * 72 * Math.PI / 180) * 15, y: Math.sin(i * 72 * Math.PI / 180) * 15 }
  }));

  return (
    <AnimatePresence>
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: position.x,
          top: position.y
        }}
      >
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{
              width: 0,
              height: 0,
              left: sparkle.offset.x,
              top: sparkle.offset.y
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: sparkle.delay }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" style={{ marginLeft: -10, marginTop: -10 }}>
              <motion.path
                d="M10 0 L11 9 L20 10 L11 11 L10 20 L9 11 L0 10 L9 9 Z"
                fill={color}
                variants={sparkleEffect}
                initial="initial"
                animate="animate"
              />
            </svg>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

interface DustTrailEffectProps {
  startPos: EffectPosition;
  endPos: EffectPosition;
  isActive: boolean;
}

// Dust trail effect when pawn moves quickly
export const DustTrailEffect: React.FC<DustTrailEffectProps> = ({ startPos, endPos, isActive }) => {
  if (!isActive) return null;

  const trailParticles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    position: {
      x: startPos.x + ((endPos.x - startPos.x) * i) / 6,
      y: startPos.y + ((endPos.y - startPos.y) * i) / 6
    },
    delay: i * 0.05
  }));

  return (
    <AnimatePresence>
      {trailParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none rounded-full bg-gray-400"
          style={{
            width: 12,
            height: 12,
            left: particle.position.x - 6,
            top: particle.position.y - 6
          }}
          variants={dustTrail}
          initial="initial"
          animate="animate"
          transition={{ delay: particle.delay }}
        />
      ))}
    </AnimatePresence>
  );
};

interface VictoryFireworksProps {
  isActive: boolean;
  color: string;
}

// Victory fireworks effect
export const VictoryFireworks: React.FC<VictoryFireworksProps> = ({ isActive, color }) => {
  if (!isActive) return null;

  const fireworks = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    x: 150 + i * 80,
    y: 100 + (i % 2) * 100,
    delay: i * 0.3
  }));

  return (
    <AnimatePresence>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {fireworks.map((firework) => (
          <motion.div
            key={firework.id}
            className="absolute"
            style={{
              left: firework.x,
              top: firework.y
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: firework.delay }}
          >
            {generateExplosionParticles(12).map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  background: color
                }}
                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos(particle.angle * Math.PI / 180) * 60,
                  y: Math.sin(particle.angle * Math.PI / 180) * 60,
                  opacity: [1, 1, 0]
                }}
                transition={{
                  duration: 1.2,
                  delay: firework.delay,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

interface PawnGlowProps {
  isActive: boolean;
  color: string;
}

// Glowing aura effect for active/movable pawns
export const PawnGlow: React.FC<PawnGlowProps> = ({ isActive, color }) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        boxShadow: `0 0 20px ${color}`,
        filter: 'blur(8px)',
        zIndex: -1
      }}
      animate={{
        opacity: [0.4, 1, 0.4],
        scale: [0.8, 1.2, 0.8]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

interface SafeZoneGlowProps {
  position: EffectPosition;
  isActive: boolean;
}

// Safe zone highlight effect
export const SafeZoneGlow: React.FC<SafeZoneGlowProps> = ({ position, isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      className="absolute rounded-full bg-green-500 pointer-events-none"
      style={{
        width: 40,
        height: 40,
        left: position.x - 20,
        top: position.y - 20,
        opacity: 0.3
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

interface PathHighlightProps {
  positions: EffectPosition[];
  isActive: boolean;
  color: string;
}

// Highlight possible path for pawn movement
export const PathHighlight: React.FC<PathHighlightProps> = ({ positions, isActive, color }) => {
  if (!isActive || positions.length === 0) return null;

  return (
    <AnimatePresence>
      {positions.map((pos, index) => (
        <motion.div
          key={`path-${index}`}
          className="absolute rounded-full border-2 pointer-events-none"
          style={{
            width: 28,
            height: 28,
            left: pos.x - 14,
            top: pos.y - 14,
            borderColor: color
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: [0.6, 0.3, 0.6]
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            delay: index * 0.05,
            opacity: {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      ))}
    </AnimatePresence>
  );
};

export default {
  KillingExplosion,
  SparkleEffect,
  DustTrailEffect,
  VictoryFireworks,
  PawnGlow,
  SafeZoneGlow,
  PathHighlight
};

