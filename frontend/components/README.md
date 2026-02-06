# Arcade Components Library

Reusable arcade-style components extracted from the VSoC website for consistent styling and easy reuse.

## Installation

All components are located in the `components/` directory and can be imported individually or all at once.

## Usage

### Import All Components
```javascript
import { 
  LevelCard, 
  PowerUpCard, 
  StepCard, 
  ArcadeButton, 
  HUD, 
  SocialButton, 
  CoinAnimation, 
  BossCard, 
  SectionTitle 
} from '@/components'
```

### Import Individual Components
```javascript
import LevelCard from '@/components/LevelCard'
import ArcadeButton from '@/components/ArcadeButton'
```

## Components

### 1. LevelCard
Display game-style level selection cards.

**Props:**
- `id` (number) - Level ID
- `title` (string) - Level title
- `icon` (string) - Emoji icon
- `color` (string) - Tailwind color name (default: 'cyan')
- `isBoss` (boolean) - Boss level styling (default: false)
- `isSelected` (boolean) - Selected state (default: false)
- `shake` (boolean) - Shake animation (default: false)
- `onClick` (function) - Click handler

**Example:**
```jsx
<LevelCard
  id={1}
  title="About VSoC"
  icon="📖"
  color="cyan"
  onClick={() => handleLevelSelect(1)}
/>
```

---

### 2. PowerUpCard
Display feature/benefit cards with floating animation.

**Props:**
- `icon` (string) - Emoji icon
- `title` (string) - Power-up title
- `description` (string) - Power-up description
- `color` (string) - Tailwind color name (default: 'magenta')
- `animationDelay` (number) - Animation delay in seconds (default: 0)

**Example:**
```jsx
<PowerUpCard
  icon="⚡"
  title="Real Experience"
  description="Work on real open source projects"
  color="yellow"
  animationDelay={0.5}
/>
```

---

### 3. StepCard
Display process steps with optional arrows.

**Props:**
- `step` (string) - Step number (e.g., '01', '02')
- `title` (string) - Step title
- `description` (string) - Step description
- `icon` (string) - Emoji icon
- `showArrow` (boolean) - Show arrow to next step (default: false)

**Example:**
```jsx
<StepCard
  step="01"
  title="Register"
  description="Create your player profile"
  icon="📝"
  showArrow={true}
/>
```

---

### 4. ArcadeButton
Arcade-style button with multiple variants and sizes.

**Props:**
- `children` (node) - Button content
- `onClick` (function) - Click handler
- `variant` (string) - 'primary', 'secondary', or 'danger' (default: 'primary')
- `size` (string) - 'sm', 'md', or 'lg' (default: 'md')
- `className` (string) - Additional CSS classes

**Example:**
```jsx
<ArcadeButton 
  variant="primary" 
  size="lg"
  onClick={handleStart}
>
  🎮 START GAME
</ArcadeButton>

<ArcadeButton variant="danger" size="md">
  ⚔️ FIGHT BOSS
</ArcadeButton>
```

---

### 5. HUD
Heads-Up Display showing player stats and controls.

**Props:**
- `playerName` (string) - Player name/ID (default: 'PLAYER_01')
- `xp` (number) - Current XP value (default: 0)
- `maxXp` (number) - Maximum XP value (default: 1000)
- `score` (number) - Current score (default: 0)
- `soundOn` (boolean) - Sound state (default: true)
- `onSoundToggle` (function) - Sound toggle handler

**Example:**
```jsx
<HUD
  playerName="PLAYER_01"
  xp={650}
  maxXp={1000}
  score={25800}
  soundOn={soundOn}
  onSoundToggle={() => setSoundOn(!soundOn)}
/>
```

---

### 6. SocialButton
Social media link buttons for footer.

**Props:**
- `icon` (string) - Emoji or icon
- `href` (string) - Link URL (optional)
- `onClick` (function) - Click handler (optional)
- `ariaLabel` (string) - Accessibility label

**Example:**
```jsx
<SocialButton 
  icon="🐦" 
  href="https://twitter.com/vsoc"
  ariaLabel="Twitter"
/>

<SocialButton 
  icon="💬" 
  onClick={handleClick}
  ariaLabel="Discord"
/>
```

---

### 7. CoinAnimation
Animated coin overlay effect.

**Props:**
- `show` (boolean) - Whether to show animation (default: false)
- `icon` (string) - Icon to animate (default: '🪙')

**Example:**
```jsx
<CoinAnimation show={showCoin} icon="🪙" />
```

---

### 8. BossCard
Boss fight/CTA card with shake animation.

**Props:**
- `icon` (string) - Emoji icon (default: '👾')
- `title` (string) - Card title
- `description` (string) - Card description
- `buttonText` (string) - CTA button text
- `onButtonClick` (function) - Button click handler
- `shake` (boolean) - Shake animation (default: false)

**Example:**
```jsx
<BossCard
  icon="👾"
  title="READY TO TAKE ON THE OPEN SOURCE BOSS?"
  description="Join VSoC and prove your skills in the ultimate coding challenge."
  buttonText="⚔️ FIGHT BOSS → APPLY NOW"
  onButtonClick={handleApply}
  shake={bossShake}
/>
```

---

### 9. SectionTitle
Consistent section heading with arcade styling.

**Props:**
- `children` (node) - Title text
- `color` (string) - Tailwind color name (default: 'cyan')
- `withBorder` (boolean) - Show bottom border (default: false)
- `className` (string) - Additional CSS classes

**Example:**
```jsx
<SectionTitle color="cyan" withBorder>
  LEVEL SELECT
</SectionTitle>

<SectionTitle color="magenta">
  COLLECT POWER-UPS
</SectionTitle>
```

---

## Complete Example

Here's how to refactor a section using these components:

**Before:**
```jsx
<div className="p-6 border-4 border-cyan-700 bg-gradient-to-br from-gray-900 to-black...">
  <div className="flex items-center gap-4 mb-4">
    <div className="text-3xl">📖</div>
    <div>
      <div className="font-pixel text-2xl text-cyan-400">01</div>
      <h3 className="font-pixel text-xl text-cyan-400">About VSoC</h3>
    </div>
  </div>
  {/* ... more code ... */}
</div>
```

**After:**
```jsx
import { LevelCard } from '@/components'

<LevelCard
  id={1}
  title="About VSoC"
  icon="📖"
  color="cyan"
  isSelected={selectedLevel === 1}
  onClick={() => selectLevel(1)}
/>
```

## Notes

- All components use the `'use client'` directive for Next.js client-side rendering
- Components maintain the arcade aesthetic with pixel fonts and retro styling
- Tailwind CSS classes are used throughout for styling
- All interactive components include proper accessibility attributes
