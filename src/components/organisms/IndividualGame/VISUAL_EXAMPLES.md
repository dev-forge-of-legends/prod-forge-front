# 🎬 Visual Animation Examples

Visual guide showing what each animation looks like and when to use it.

---

## 🎯 Pawn Movement Animations

### 1. Basic Movement (Layout Animation)

**What it looks like:**
```
Position A          →          Position B
   🔴                             🔴
  (pawn)          [smooth slide]   (pawn)
```

**When to use:** Every pawn move

**Code:**
```tsx
<motion.img layoutId="pawn-1" layout />
```

**Duration:** 0.5s  
**Feel:** Smooth, natural

---

### 2. Jump Movement (Arc)

**What it looks like:**
```
Position A                      Position B
   🔴                               🔴
  (pawn)      ╱─╲      (pawn)
             ╱   ╲   
            [arc path]
```

**When to use:** Landing on safe zone, entering home

**Code:**
```tsx
<motion.img
  animate={{
    x: [0, 50, 100],
    y: [0, -30, 0]  // Goes up then down
  }}
/>
```

**Duration:** 0.4s  
**Feel:** Bouncy, energetic

---

### 3. Hover Effect

**What it looks like:**
```
Mouse over          Pawn lifts
   🔴         →         🔴
  (pawn)            (larger, higher)
   ↑ (cursor)
```

**When to use:** Showing pawn can be moved

**Code:**
```tsx
<motion.img
  whileHover={{ scale: 1.15, y: -8 }}
/>
```

**Duration:** 0.2s  
**Feel:** Responsive, interactive

---

## 💥 Collision/Kill Animations

### 4. Pawn Kill (Spin & Fade)

**What it looks like:**
```
Before              During                After
  🔴         →    🔴 (spinning)    →     (empty)
(enemy)           (getting smaller)
```

**Animation sequence:**
1. Pawn grows slightly (1.0 → 1.5 scale)
2. Spins 360 degrees
3. Shrinks to nothing (1.5 → 0 scale)
4. Fades out (opacity 1 → 0)

**Code:**
```tsx
<motion.img
  animate={{
    scale: [1, 1.5, 0],
    rotate: [0, 360],
    opacity: [1, 1, 0]
  }}
  transition={{ duration: 0.6 }}
/>
```

**Duration:** 0.6s  
**Feel:** Dramatic, satisfying

---

### 5. Explosion Effect

**What it looks like:**
```
                 ╱─╲
               ╱  ●  ╲
      ●      ╱    💥    ╲      ●
              ╲       ╱
                ╲─╱
             [particles fly out]
```

**Layers:**
1. Central flash (red circle expands)
2. Shockwave ring (expands and fades)
3. 8 particles fly outward

**Code:**
```tsx
<KillingExplosion position={{ x: 100, y: 100 }} />
```

**Duration:** 0.7s  
**Feel:** Explosive, impactful

---

## ✨ Special Effect Animations

### 6. Sparkle Effect

**What it looks like:**
```
        ✨           ★
    ✨      ✨   →  ★ ✨ ★
        ✨           ★
    [stars appear and fade]
```

**When to use:** 
- Entering home stretch
- Safe zone landing
- Special moves

**Code:**
```tsx
<SparkleEffect position={{ x: 100, y: 100 }} color="#FFD700" />
```

**Duration:** 0.6s  
**Feel:** Magical, rewarding

---

### 7. Dust Trail

**What it looks like:**
```
Start                                End
  🔴  ··· ··· ··· ··· ···            🔴
[dust clouds fade behind pawn]
```

**When to use:** Fast movements (dice roll 6)

**Code:**
```tsx
<DustTrailEffect 
  startPos={{ x: 0, y: 0 }}
  endPos={{ x: 100, y: 100 }}
  isActive={true}
/>
```

**Duration:** 0.8s  
**Feel:** Speed, momentum

---

### 8. Glowing Aura (Pulsing)

**What it looks like:**
```
    Dim          Bright         Dim
     🔴    →       🔴      →     🔴
   (glow)      (bigger glow)   (glow)
  [pulse repeats infinitely]
```

**When to use:** 
- Show movable pawns
- Highlight active pawn

**Code:**
```tsx
<PawnGlow isActive={true} color="rgba(248, 159, 23, 0.8)" />
```

**Duration:** 1.5s (loops)  
**Feel:** Alive, attention-grabbing

---

## 🎮 UI Animations

### 9. Hint Pawn (Preview)

**What it looks like:**
```
Current Position    Hover Over       Preview Appears
      🔴        →        🔴       →    🔴 . . . 👻
                      (mouse)      (ghost at destination)
```

**When to use:** Show where pawn will land

**Code:**
```tsx
<motion.img
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1, opacity: 0.6 }}
  className="ghost-pawn"
/>
```

**Duration:** 0.3s  
**Feel:** Helpful, predictive

---

### 10. Path Highlight

**What it looks like:**
```
     🔴
      ↓
     ⭕ (pulsing circle)
      ↓
     ⭕ (pulsing circle)
      ↓
     ⭕ (pulsing circle)
```

**When to use:** Show full movement path

**Code:**
```tsx
<PathHighlight 
  positions={[{x: 10, y: 10}, {x: 20, y: 20}]}
  isActive={true}
  color="#F89F17"
/>
```

**Duration:** Loops  
**Feel:** Informative, clear

---

### 11. Player Turn Indicator

**What it looks like:**
```
  Not Active          Active           Glowing
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Player  │ → │  Player  │ → │  Player  │
│    🔴    │    │    🔴    │    │   ✨🔴✨  │
└──────────┘    └──────────┘    └──────────┘
             [border pulses]
```

**When to use:** Show whose turn it is

**Code:**
```tsx
<motion.div
  animate={{
    boxShadow: [
      '0 0 0px color',
      '0 0 20px color',
      '0 0 0px color'
    ]
  }}
  transition={{ duration: 1.5, repeat: Infinity }}
/>
```

**Duration:** 1.5s (loops)  
**Feel:** Clear, rhythmic

---

## 🏆 Victory Animations

### 12. Victory Fireworks

**What it looks like:**
```
         ╱ ● ╲               ╱ ● ╲
       ●       ●           ●       ●
     ●    💥    ●       ●    💥    ●
       ●       ●           ●       ●
         ╲ ● ╱               ╲ ● ╱
    [multiple bursts]
```

**When to use:** Player wins

**Code:**
```tsx
<VictoryFireworks isActive={true} color="#FFD700" />
```

**Duration:** 3-4s  
**Feel:** Celebratory, epic

---

### 13. Celebration Dance

**What it looks like:**
```
    🔴      🔴      🔴      🔴      🔴
   (up)  → (down) → (up)  → (down) → (up)
 (rotate)        (rotate)        (rotate)
    [bouncing and spinning]
```

**When to use:** Winning pawn reaches home

**Code:**
```tsx
<motion.img
  animate={{
    scale: [1, 1.3, 1.2, 1.3, 1.2],
    rotate: [0, -15, 15, -15, 0],
    y: [0, -20, 0, -20, 0]
  }}
  transition={{ duration: 1.5, repeat: Infinity }}
/>
```

**Duration:** Loops  
**Feel:** Joyful, victorious

---

## 🎨 Animation Combinations

### Combo 1: Move + Kill

**Sequence:**
1. Pawn A moves (layout animation) → 0.5s
2. Lands on Pawn B's position
3. Explosion effect triggers → 0.7s
4. Pawn B spins and disappears → 0.6s
5. Pawn A settles

**Total:** ~1.8s  
**Feel:** Action-packed

---

### Combo 2: Move + Safe Zone

**Sequence:**
1. Pawn moves (arc animation) → 0.4s
2. Lands on safe zone (glows green)
3. Sparkle effect → 0.6s

**Total:** ~1.0s  
**Feel:** Satisfying, safe

---

### Combo 3: Move + Home Entry

**Sequence:**
1. Pawn moves to home stretch
2. Dust trail follows → 0.8s
3. Sparkle burst → 0.6s
4. Celebration dance starts

**Feel:** Triumphant

---

## ⚡ Performance Guide

### Fast Animations (< 0.3s)
- Hover effects
- Tap feedback
- Hint pawn appear/disappear

### Medium Animations (0.3s - 0.6s)
- Pawn movement
- Pawn kills
- Sparkles
- Path highlights

### Slow Animations (> 0.6s)
- Explosions
- Victory celebrations
- Fireworks

---

## 🎯 Animation Intensity Levels

### Subtle (Minimal)
```tsx
// Just smooth movement
<motion.img layout transition={{ duration: 0.3 }} />
```
**Use when:** Simple, clean aesthetic

---

### Medium (Balanced)
```tsx
// Movement + hover + glow
<motion.img 
  layout 
  whileHover={{ scale: 1.1 }}
  transition={{ type: "spring" }}
/>
<PawnGlow isActive={true} />
```
**Use when:** Modern, polished feel (RECOMMENDED)

---

### High (Dramatic)
```tsx
// All effects enabled
<motion.img layout whileHover={{ scale: 1.2, y: -10 }} />
<PawnGlow isActive={true} />
<DustTrailEffect ... />
<SparkleEffect ... />
<KillingExplosion ... />
```
**Use when:** Fun, arcade-style game

---

## 📊 Timing Guidelines

| Action | Duration | Easing | Why |
|--------|----------|--------|-----|
| Hover | 0.2s | ease-out | Instant feedback |
| Click | 0.15s | ease-in | Responsive |
| Move | 0.5s | spring | Natural motion |
| Kill | 0.6s | ease-out | Dramatic impact |
| Appear | 0.3s | back-out | Attention-grabbing |
| Disappear | 0.4s | ease-in | Smooth exit |
| Pulse | 1.5s | ease-in-out | Calming rhythm |

---

## 🎬 Putting It All Together

### Example: Complete Turn Sequence

```
1. Player indicator glows (1.5s loop) ───┐
                                         │
2. Roll dice animation (0.8s) ──────────┤
                                         │
3. Valid pawns start glowing ───────────┤
                                         │
4. Player hovers over pawn ─────────────┤
   → Hover effect (0.2s)                │
   → Hint pawn appears (0.3s)           │
   → Path highlights appear             │
                                         │
5. Player clicks pawn ──────────────────┤
   → Click shrink (0.15s)               │
   → Dust trail starts                  │
   → Pawn moves (0.5s)                  │
                                         │
6. Landing effects ─────────────────────┤
   → Explosion if kill (0.7s)           │
   → Sparkles if safe zone (0.6s)      │
   → Fireworks if victory (3s)          │
                                         │
7. Turn ends ───────────────────────────┘
   → Next player indicator glows
```

**Total animation budget per turn:** 2-3 seconds  
**Feels:** Smooth, responsive, satisfying

---

## 💡 Pro Tips

1. **Layer animations** - Combine multiple effects for richness
2. **Timing is key** - Wait for one animation before starting another
3. **Don't overdo it** - 2-3 effects max per action
4. **Use easing** - Spring physics feel most natural
5. **Test on slower devices** - Reduce effects if needed

---

## 🎓 Animation Philosophy

### Good Animation
✅ Provides feedback  
✅ Shows state changes  
✅ Guides user attention  
✅ Feels natural  
✅ Doesn't block gameplay

### Bad Animation
❌ Arbitrary movement  
❌ Too slow (blocks action)  
❌ Too many at once  
❌ Distracting  
❌ No clear purpose

---

## 🚀 Your Next Steps

1. **Start simple**: Just add layout animation
2. **Add hover**: Make movable pawns lift up
3. **Add kills**: Spinning death animation
4. **Add effects**: Explosions and sparkles
5. **Polish**: Dust trails, glows, paths
6. **Celebrate**: Victory animations

---

**Remember**: You can enable/disable any animation. Start with what you like!

All the code is ready in:
- `BoardAnimated.tsx` - Complete example
- `AdvancedEffects.tsx` - Individual effects
- `gameAnimations.ts` - Reusable configs

Happy animating! 🎮✨

