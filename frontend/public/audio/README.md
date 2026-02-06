# Audio Files Directory

This directory contains audio files for the VSoC arcade game website.

## Required Audio Files

### Background Music
**File:** `background-music.mp3`
**Location:** `public/audio/background-music.mp3`
**Description:** Looping background music that plays throughout the website
**Recommended:** 
- Retro arcade/chiptune style music
- 8-bit or 16-bit game music
- Duration: 1-3 minutes (will loop)
- Format: MP3
- Bitrate: 128-192 kbps

## How to Add Audio Files

1. Place your `.mp3` file in this directory: `public/audio/`
2. Name it `background-music.mp3` (or update the src in `app/page.js`)
3. The audio will automatically be available at `/audio/background-music.mp3`

## Audio Controls

- **Toggle Button:** Click the speaker icon in the top-right HUD to toggle music on/off
- **Keyboard Shortcut:** Press 'M' key to toggle music
- **Default State:** Music starts muted (user must click to enable)

## Recommended Sources for Arcade Music

- **Free Resources:**
  - OpenGameArt.org
  - FreeMusicArchive.org
  - Incompetech.com (Kevin MacLeod)
  - Chosic.com (royalty-free music)
  
- **Search Terms:**
  - "8-bit arcade music"
  - "chiptune background music"
  - "retro game music"
  - "pixel game soundtrack"

## File Structure
```
public/
  └── audio/
      ├── background-music.mp3  (main background music)
      └── README.md             (this file)
```

## Future Audio Files (Optional)

You can add more sound effects later:
- `coin-insert.mp3` - Sound when inserting coin
- `button-press.mp3` - Sound for button clicks
- `level-select.mp3` - Sound when selecting a level
- `success.mp3` - Sound for successful actions
- `error.mp3` - Sound for errors

To use these, you'll need to update the components to reference them.
