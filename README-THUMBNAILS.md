# AI Thumbnail Generation Guide

## 📋 Quick Start

1. **Open the prompts file**: `chatgpt-batch-prompts.txt` (contains all prompts ready to copy)

2. **For each project**:
   - Copy the prompt from the file
   - Paste into ChatGPT (with DALL-E) or DALL-E directly
   - Generate the image
   - Download the generated image
   - Save it as: `/public/images/thumbnails/[project-slug].jpg`

3. **Update the project data**:
   - Once you have all images, run: `node update-thumbnails.js`
   - Or manually update `thumbnailUrl` in `src/data/projects.ts`

## 📁 File Structure

```
/public/images/thumbnails/
  ├── trace3d-city-portal.jpg
  ├── haki-scaffolding-vr.jpg
  ├── zombie-game-vr.jpg
  ├── multiplayer-shooting.jpg
  └── ... (one for each project)
```

## 🎨 Projects Needing Thumbnails

The script found **11 projects** with YouTube videos that need custom thumbnails:

1. TraceAR City Portal
2. TopDown VR
3. VR Physical Keyboard
4. AvaSci
5. AR Museum Game
6. Handpan Hero
7. BeamNG Destruction System
8. Medieval Lands
9. Hyper Casual Runner
10. Realistic 3rd Person Warrior Game
11. Realistic 3D Cinematic

## 💡 Tips

- Use **16:9 aspect ratio** (1280x720 or 1920x1080)
- Keep file sizes reasonable (< 500KB)
- Use JPG format for smaller file sizes
- Ensure images are high quality but optimized

## 🔄 After Generating Images

Once you've generated and saved all thumbnails, the project will automatically use them since the portfolio page prioritizes `thumbnailUrl` over YouTube thumbnails.
