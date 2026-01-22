/**
 * AI Concept Thumbnail Generator
 * Creates highly specific AI image prompts that visually explain each project's concept
 * Use with ChatGPT/DALL-E, Midjourney, or other AI image generators
 */

const fs = require('fs');
const path = require('path');

// Project-specific thumbnail concepts that visually explain what each project does
const projectThumbnailConcepts = {
  // ============================================================================
  // XR PROJECTS
  // ============================================================================
  
  "trace3d-city-portal": {
    concept: "City-scale AR navigation overlaying digital information on streets",
    visualElements: [
      "Modern city street with glass buildings",
      "Holographic AR overlay showing navigation arrows floating in air",
      "Person holding smartphone with AR interface visible",
      "Digital store signs and waypoints hovering above real buildings",
      "Blue/cyan AR elements contrasting with warm city lighting"
    ],
    style: "Futuristic urban, cinematic lighting, technological overlay aesthetic",
    mood: "Innovative, helpful, seamlessly blending digital and physical",
    colorPalette: "Warm city amber + cool cyan AR elements"
  },
  
  "haki-scaffolding-vr": {
    concept: "VR industrial safety training for scaffolding assembly",
    visualElements: [
      "Person wearing VR headset in industrial setting",
      "Virtual scaffolding structure being assembled",
      "Construction safety elements (hard hat, safety harness)",
      "Step-by-step assembly guides floating in VR space",
      "Industrial warehouse or construction site background"
    ],
    style: "Industrial training, professional, safety-focused",
    mood: "Educational, professional, safety-conscious",
    colorPalette: "Industrial grey + safety orange/yellow + VR blue accents"
  },
  
  "point-cloud-mesh-generation": {
    concept: "LiDAR scanning converting points into 3D meshes in real-time",
    visualElements: [
      "Dense point cloud data visualized as colored dots",
      "Points transforming into solid 3D mesh surface",
      "LiDAR scanning beams emanating from device",
      "Room or environment being scanned and reconstructed",
      "Technical data visualization aesthetic"
    ],
    style: "Scientific visualization, data-driven, technical",
    mood: "Cutting-edge technology, precision, transformation",
    colorPalette: "Rainbow point cloud colors + wireframe blue + solid mesh grey"
  },
  
  "topdown-vr": {
    concept: "God-game VR where player looks down at miniature world",
    visualElements: [
      "Floating diorama-style miniature world on table",
      "Giant hands reaching down to interact with tiny buildings",
      "VR headset wearer viewed from above",
      "Tiny characters and structures in strategic game layout",
      "Ethereal lighting from above"
    ],
    style: "Fantasy strategy, tabletop gaming, immersive VR",
    mood: "Powerful, strategic, whimsical god-perspective",
    colorPalette: "Warm miniature world + purple VR environment"
  },
  
  "webgl-rocket-simulation": {
    concept: "Educational browser-based rocket physics and orbital mechanics",
    visualElements: [
      "Rocket launching with detailed exhaust plume",
      "Orbital trajectory lines around Earth",
      "Physics equations and trajectory data overlaid",
      "Browser window frame showing web application",
      "Educational diagram aesthetic with labels"
    ],
    style: "Educational scientific illustration, NASA-inspired",
    mood: "Educational, inspiring, scientifically accurate",
    colorPalette: "Space black + rocket white/orange + trajectory green/blue"
  },
  
  "zombie-game-vr": {
    concept: "Terrifying VR zombie shooter with realistic weapons",
    visualElements: [
      "First-person view holding shotgun in VR",
      "Zombies emerging from darkness",
      "Abandoned urban environment with debris",
      "Muzzle flash and shell casings",
      "Atmospheric fog and horror lighting"
    ],
    style: "Horror survival, intense action, atmospheric",
    mood: "Terrifying, intense, survival adrenaline",
    colorPalette: "Dark shadows + blood red + muzzle flash orange"
  },
  
  "vr-physical-keyboard": {
    concept: "VR productivity with passthrough showing real keyboard",
    visualElements: [
      "VR headset wearer at desk",
      "Physical keyboard visible through passthrough",
      "Virtual monitors floating in VR space",
      "Hands typing with overlay highlighting keys",
      "Modern workspace environment"
    ],
    style: "Productivity tech, clean modern aesthetic",
    mood: "Productive, seamless, professional workflow",
    colorPalette: "Clean white workspace + subtle VR blue overlays"
  },
  
  "vr-fall-guys": {
    concept: "Chaotic VR party game with physics-based bean characters",
    visualElements: [
      "Colorful bean characters racing on obstacle course",
      "Physics-based chaos with characters tumbling",
      "Vibrant candy-colored environment",
      "Spinning obstacles and platforms",
      "First-person VR perspective of the chaos"
    ],
    style: "Playful party game, cartoon physics, vibrant",
    mood: "Fun, chaotic, hilarious multiplayer energy",
    colorPalette: "Candy pink + sky blue + sunshine yellow + bean colors"
  },
  
  "osr-star-finder": {
    concept: "AR app pointing at night sky to find registered stars",
    visualElements: [
      "Person holding phone up at starry night sky",
      "AR overlay showing constellation lines",
      "Highlighted star with name tag floating",
      "Beautiful night sky with Milky Way",
      "Romantic stargazing atmosphere"
    ],
    style: "Romantic astronomy, night photography aesthetic",
    mood: "Wonder, personal connection, cosmic beauty",
    colorPalette: "Deep night blue + star white + AR cyan highlights"
  },
  
  "avasci": {
    concept: "AI-powered realistic digital avatar creation platform",
    visualElements: [
      "Photorealistic digital human face",
      "Face mesh wireframe transforming into skin",
      "Motion capture dots on real face",
      "Split screen showing real person and avatar",
      "Futuristic avatar creation interface"
    ],
    style: "High-tech portrait, digital human, uncanny valley breakthrough",
    mood: "Cutting-edge, lifelike, futuristic identity",
    colorPalette: "Skin tones + technical cyan wireframe + interface purple"
  },
  
  "product-simulation": {
    concept: "3D product configurator for customization and AR preview",
    visualElements: [
      "Luxury product (car/furniture) in configurator interface",
      "Color/material options floating around product",
      "AR preview showing product in real room",
      "Sleek e-commerce interface design",
      "Photorealistic product rendering"
    ],
    style: "Premium e-commerce, luxury product visualization",
    mood: "Premium, customizable, confidence in purchase",
    colorPalette: "Luxury black/white + accent colors for options"
  },
  
  "vr-rcc": {
    concept: "VR racing with realistic car physics and cockpit interaction",
    visualElements: [
      "First-person cockpit view in VR",
      "Hands gripping steering wheel",
      "Racing track visible through windshield",
      "Dashboard gauges and racing HUD",
      "Motion blur suggesting speed"
    ],
    style: "Racing simulation, cockpit perspective, speed",
    mood: "Exhilarating, immersive, racing adrenaline",
    colorPalette: "Racing red + track grey + dashboard glow"
  },
  
  "hospital-vr-simulation": {
    concept: "VR medical training in realistic hospital environment",
    visualElements: [
      "Healthcare worker in VR headset",
      "Virtual patient on hospital bed",
      "Medical equipment and monitors",
      "Procedure guides floating in VR",
      "Clean hospital environment"
    ],
    style: "Medical professional, clinical, educational",
    mood: "Professional, life-saving, educational confidence",
    colorPalette: "Hospital white/green + medical blue + VR interface"
  },
  
  "ar-measuring-tape": {
    concept: "AR app measuring real-world distances and spaces",
    visualElements: [
      "Phone showing AR measuring overlay",
      "Measurement lines between points in room",
      "Dimension numbers floating in AR",
      "Room or furniture being measured",
      "Clean utility app interface"
    ],
    style: "Utility app, practical tool, clean design",
    mood: "Practical, precise, helpful everyday tool",
    colorPalette: "Clean white + measurement yellow + AR blue"
  },
  
  "ar-museum-game": {
    concept: "AR gamifying museum visits with interactive exhibits",
    visualElements: [
      "Child pointing phone at museum exhibit",
      "Historical figure appearing in AR next to artifact",
      "Collection badges and achievements floating",
      "Ancient artifact with AR information overlay",
      "Museum gallery background"
    ],
    style: "Educational entertainment, museum aesthetic, magical discovery",
    mood: "Wonder, discovery, learning through play",
    colorPalette: "Museum gold + historical sepia + AR magic purple"
  },
  
  "kinect-runner": {
    concept: "Full-body motion gaming controlled by physical movement",
    visualElements: [
      "Person running in place in living room",
      "Kinect sensor capturing silhouette",
      "Game character mirroring real movement on screen",
      "Endless runner obstacles visible",
      "Motion tracking skeleton overlay"
    ],
    style: "Active gaming, fitness, motion capture visualization",
    mood: "Active, fun, exercising through gaming",
    colorPalette: "Living room warm + game neon + motion tracking green"
  },
  
  // ============================================================================
  // GAME PROJECTS
  // ============================================================================
  
  "soul-of-king": {
    concept: "5v5 MOBA with mythological heroes in battle arena",
    visualElements: [
      "Epic battle scene with multiple heroes",
      "Hero abilities with magical effects",
      "MOBA lane and tower structures",
      "Diverse character roster showcase",
      "Dynamic team fight action"
    ],
    style: "Epic fantasy MOBA, magical combat, heroic",
    mood: "Epic, competitive, heroic team battles",
    colorPalette: "Royal purple + ability gold + team blue/red"
  },
  
  "handpan-hero": {
    concept: "Rhythm game teaching handpan instrument through gameplay",
    visualElements: [
      "Beautiful handpan instrument close-up",
      "Rhythm notes descending toward strike zones",
      "Hands striking the handpan surface",
      "Musical notes and sound waves visualized",
      "Zen meditation aesthetic"
    ],
    style: "Musical, zen, rhythm game interface",
    mood: "Musical, meditative, learning through play",
    colorPalette: "Handpan bronze/gold + rhythm neon + zen earth tones"
  },
  
  "star-fox-rework": {
    concept: "Classic space combat shooter with modern graphics",
    visualElements: [
      "Arwing spacecraft flying through asteroid field",
      "Laser fire and explosions",
      "Planet surface or space station below",
      "Enemy ships in formation",
      "Cockpit HUD elements"
    ],
    style: "Space combat, retro-modern, Nintendo-inspired",
    mood: "Nostalgic, action-packed, space adventure",
    colorPalette: "Space black + laser green/red + Arwing grey/blue"
  },
  
  "electric-mods": {
    concept: "Electric vehicle racing with deep customization",
    visualElements: [
      "Sleek electric supercar on race track",
      "Customization menu with parts options",
      "Electric charging/energy visualization",
      "Futuristic racing environment",
      "Vehicle performance stats display"
    ],
    style: "Electric future racing, clean tech aesthetic",
    mood: "Fast, futuristic, eco-performance",
    colorPalette: "Electric blue + racing neon + clean white"
  },
  
  "beam-ng-destruction-system": {
    concept: "Soft-body physics vehicle deformation and crashes",
    visualElements: [
      "Car mid-crash with realistic crumpling",
      "Deformation simulation visualization",
      "Before/after damage comparison",
      "Slow-motion impact moment",
      "Technical physics node visualization"
    ],
    style: "Physics simulation, technical, destructive satisfaction",
    mood: "Scientific fascination, destruction physics",
    colorPalette: "Metal grey + crash fire orange + technical wireframe"
  },
  
  "multiplayer-shooting": {
    concept: "Competitive FPS multiplayer with precise gunplay",
    visualElements: [
      "First-person gun aiming down sights",
      "Multiplayer combat scene",
      "Weapon loadout display",
      "Tactical urban environment",
      "Kill feed and HUD elements"
    ],
    style: "Competitive FPS, tactical military, esports",
    mood: "Competitive, tactical, skill-based combat",
    colorPalette: "Military tactical grey + HUD orange + muzzle flash"
  },
  
  "project-racer": {
    concept: "Arcade racing with track editor and multiplayer",
    visualElements: [
      "Racing cars drifting on colorful track",
      "Track editor interface showing custom creation",
      "Multiplayer grid start",
      "Reactive track environment",
      "Leaderboard and time display"
    ],
    style: "Arcade racing, vibrant, competitive",
    mood: "Fast, fun, creative racing community",
    colorPalette: "Racing vibrant colors + track neon + speed blur"
  },
  
  "medieval-lands": {
    concept: "Dark fantasy action RPG with combat and exploration",
    visualElements: [
      "Warrior with sword in medieval landscape",
      "Combat against fantasy creature",
      "Castle or medieval village background",
      "RPG interface with health/stamina bars",
      "Epic dark fantasy atmosphere"
    ],
    style: "Dark fantasy RPG, medieval, cinematic",
    mood: "Epic adventure, danger, heroic journey",
    colorPalette: "Medieval earth tones + blood red + steel grey"
  },
  
  "dandera-quest": {
    concept: "Ancient Egyptian temple puzzle adventure",
    visualElements: [
      "Dendera temple interior with hieroglyphics",
      "Archaeologist solving light-based puzzle",
      "Ancient mechanisms and artifacts",
      "Zodiac ceiling detail",
      "Torchlit mysterious atmosphere"
    ],
    style: "Archaeological adventure, Egyptian mysticism",
    mood: "Mysterious, discovery, ancient secrets",
    colorPalette: "Egyptian gold + sandstone + torchlight amber"
  },
  
  "hyper-casual-bus-sort": {
    concept: "Puzzle game sorting colored passengers onto buses",
    visualElements: [
      "Colorful buses with matching passengers",
      "Tap-to-move gameplay visualization",
      "Clean cartoon puzzle aesthetic",
      "Level completion celebration",
      "Simple satisfying mechanics"
    ],
    style: "Hyper-casual mobile, cartoon, satisfying",
    mood: "Simple, satisfying, casual puzzle fun",
    colorPalette: "Bright primary colors + clean white background"
  },
  
  "hyper-casual-runner": {
    concept: "Endless runner with swipe controls and collectibles",
    visualElements: [
      "Character running through colorful obstacles",
      "Swipe gesture indicators",
      "Coins and collectibles floating",
      "Procedural endless path ahead",
      "Mobile game UI elements"
    ],
    style: "Endless runner, mobile casual, colorful",
    mood: "Addictive, quick sessions, beat your score",
    colorPalette: "Bright game colors + coin gold + obstacle red"
  },
  
  "genetiq": {
    concept: "Evolution strategy game with genetic trait manipulation",
    visualElements: [
      "Creature evolution tree visualization",
      "DNA helix and genetic traits",
      "Creatures adapting to environment",
      "Trait selection interface",
      "Evolutionary progression"
    ],
    style: "Scientific strategy, evolution visualization",
    mood: "Scientific curiosity, strategic evolution",
    colorPalette: "DNA green/blue + evolution earth tones + UI purple"
  },
  
  "typing-online": {
    concept: "Multiplayer typing races with real-time competition",
    visualElements: [
      "Racing cars representing typists",
      "Typing passage with highlighted progress",
      "WPM speedometer display",
      "Multiplayer race visualization",
      "Keyboard and fast fingers"
    ],
    style: "Educational competitive, typing interface",
    mood: "Competitive, skill improvement, racing excitement",
    colorPalette: "Racing colors + keyboard grey + progress green"
  },
  
  "realistic-3rd-person-warrior-game": {
    concept: "Visceral melee combat with realistic warrior animations",
    visualElements: [
      "Warrior mid-swing with heavy sword",
      "Brutal combat against armored enemy",
      "Sparks and blood effects",
      "Dark medieval battlefield",
      "Unreal Engine 5 visual quality"
    ],
    style: "Dark Souls-inspired, brutal combat, cinematic",
    mood: "Brutal, weighty, skill-based combat",
    colorPalette: "Dark medieval + blood red + steel weapon shine"
  },
  
  "office-simulator-hyper-casual": {
    concept: "Comedic office chaos management simulation",
    visualElements: [
      "Chaotic office scene with flying papers",
      "Stressed character avoiding boss",
      "Office tasks and time pressure",
      "Humorous workplace scenarios",
      "Cartoon office aesthetic"
    ],
    style: "Comedy simulation, cartoon office, chaotic",
    mood: "Hilarious, relatable, office humor",
    colorPalette: "Office beige + stress red + humor bright accents"
  },
  
  // ============================================================================
  // 3D PROJECTS
  // ============================================================================
  
  "3d-world-hologram-shader": {
    concept: "Holographic shader effects for sci-fi visualization",
    visualElements: [
      "3D globe or structure with hologram effect",
      "Scan lines and chromatic aberration",
      "Glitch effects and digital noise",
      "Cyan/blue holographic glow",
      "Sci-fi interface aesthetic"
    ],
    style: "Sci-fi hologram, technical visualization, futuristic",
    mood: "Futuristic, technical, sci-fi aesthetic",
    colorPalette: "Hologram cyan + scan line blue + glitch artifacts"
  },
  
  "realistic-3d-cinematic-unreal": {
    concept: "Photorealistic cinematics with Unreal Engine 5",
    visualElements: [
      "Photorealistic environment or character",
      "Cinematic camera angle and lighting",
      "Lumen global illumination showcase",
      "Film-quality visual effects",
      "Virtual production aesthetic"
    ],
    style: "Photorealistic cinematic, film quality, UE5 showcase",
    mood: "Cinematic wonder, photorealistic achievement",
    colorPalette: "Cinematic color grading + natural lighting"
  },
  
  "mobile-game-ready-3d-assets": {
    concept: "Optimized 3D assets for mobile game development",
    visualElements: [
      "Collection of stylized 3D game assets",
      "Characters, props, and environments together",
      "Low-poly aesthetic with clean textures",
      "Asset showcase on mobile device",
      "Game-ready presentation"
    ],
    style: "Game asset pack, stylized 3D, mobile-optimized",
    mood: "Professional, ready-to-use, game development",
    colorPalette: "Stylized game colors + clean presentation"
  },
  
  "transformer-robot-3d-model-animation": {
    concept: "Transforming robot model with detailed animation",
    visualElements: [
      "Robot mid-transformation sequence",
      "Mechanical parts folding and moving",
      "Both robot and vehicle forms visible",
      "Technical mechanical detail",
      "Dynamic action pose"
    ],
    style: "Mechanical character, transformation, technical 3D",
    mood: "Impressive engineering, dynamic transformation",
    colorPalette: "Metal silver/grey + mechanical accent colors"
  }
};

// Generate optimized DALL-E/Midjourney prompt
function generateAIPrompt(projectSlug, projectTitle) {
  const concept = projectThumbnailConcepts[projectSlug];
  
  if (!concept) {
    return null;
  }
  
  const visualDescription = concept.visualElements.join(", ");
  
  // DALL-E optimized prompt
  const dallePrompt = `Professional portfolio thumbnail for "${projectTitle}": ${concept.concept}. 

Scene elements: ${visualDescription}

Style: ${concept.style}
Mood: ${concept.mood}
Color palette: ${concept.colorPalette}

Technical requirements: 16:9 aspect ratio, high resolution, suitable for web portfolio, clear visual communication of the concept, no text or watermarks, professional game/tech industry quality.`;

  // Midjourney optimized prompt
  const midjourneyPrompt = `${concept.concept}, ${visualDescription}, ${concept.style}, ${concept.mood}, ${concept.colorPalette}, professional portfolio thumbnail, 16:9 aspect ratio, high quality --ar 16:9 --v 6`;

  return {
    projectSlug,
    projectTitle,
    concept: concept.concept,
    dallePrompt,
    midjourneyPrompt,
    visualElements: concept.visualElements,
    style: concept.style,
    mood: concept.mood,
    colorPalette: concept.colorPalette,
    saveAs: `/public/images/thumbnails/${projectSlug}.jpg`
  };
}

// Main execution
console.log('🎨 AI Concept Thumbnail Generator\n');
console.log('='.repeat(80));
console.log('Generating concept-aligned AI prompts for all projects...\n');

const projectTitles = {
  // XR Projects
  "trace3d-city-portal": "TraceAR City Portal",
  "haki-scaffolding-vr": "HAKI Scaffolding VR",
  "point-cloud-mesh-generation": "Point Cloud Mesh Generation",
  "topdown-vr": "TopDown VR",
  "webgl-rocket-simulation": "WebGL Rocket Simulation",
  "zombie-game-vr": "Zombie Game VR",
  "vr-physical-keyboard": "VR Physical Keyboard",
  "vr-fall-guys": "VR Fall Guys",
  "osr-star-finder": "OSR Star Finder",
  "avasci": "AvaSci",
  "product-simulation": "Product Simulation",
  "vr-rcc": "VR RCC",
  "hospital-vr-simulation": "Hospital VR Simulation",
  "ar-measuring-tape": "AR Measuring Tape",
  "ar-museum-game": "AR Museum Game",
  "kinect-runner": "Kinect Runner",
  // Game Projects
  "soul-of-king": "Soul of King",
  "handpan-hero": "Handpan Hero",
  "star-fox-rework": "Star Fox Rework",
  "electric-mods": "Electric Mods",
  "beam-ng-destruction-system": "BeamNG Destruction System",
  "multiplayer-shooting": "Multiplayer Shooting",
  "project-racer": "Project Racer",
  "medieval-lands": "Medieval Lands",
  "dandera-quest": "Dandera Quest",
  "hyper-casual-bus-sort": "Hyper Casual Bus Sort",
  "hyper-casual-runner": "Hyper Casual Runner",
  "genetiq": "Genetiq",
  "typing-online": "Typing Online",
  "realistic-3rd-person-warrior-game": "Realistic 3rd Person Warrior Game",
  "office-simulator-hyper-casual": "Office Simulator",
  // 3D Projects
  "3d-world-hologram-shader": "3D World Hologram Shader",
  "realistic-3d-cinematic-unreal": "Realistic 3D Cinematic",
  "mobile-game-ready-3d-assets": "Mobile Game Ready 3D Assets",
  "transformer-robot-3d-model-animation": "Transformer Robot 3D Model"
};

const allPrompts = [];
let promptCount = 1;

for (const [slug, title] of Object.entries(projectTitles)) {
  const prompt = generateAIPrompt(slug, title);
  
  if (prompt) {
    allPrompts.push(prompt);
    
    console.log(`\n${'='.repeat(80)}`);
    console.log(`PROJECT ${promptCount}: ${title}`);
    console.log(`Slug: ${slug}`);
    console.log(`${'='.repeat(80)}`);
    console.log(`\n📌 CONCEPT: ${prompt.concept}\n`);
    console.log(`🎯 VISUAL ELEMENTS:`);
    prompt.visualElements.forEach(el => console.log(`   • ${el}`));
    console.log(`\n🎨 STYLE: ${prompt.style}`);
    console.log(`💫 MOOD: ${prompt.mood}`);
    console.log(`🌈 COLORS: ${prompt.colorPalette}`);
    console.log(`\n📝 DALL-E PROMPT:\n${'-'.repeat(40)}`);
    console.log(prompt.dallePrompt);
    console.log(`\n📝 MIDJOURNEY PROMPT:\n${'-'.repeat(40)}`);
    console.log(prompt.midjourneyPrompt);
    console.log(`\n💾 SAVE AS: ${prompt.saveAs}`);
    
    promptCount++;
  }
}

// Save prompts to JSON for easy access
const outputJson = path.join(__dirname, 'ai-thumbnail-prompts.json');
fs.writeFileSync(outputJson, JSON.stringify(allPrompts, null, 2));
console.log(`\n${'='.repeat(80)}`);
console.log(`\n✅ Generated ${allPrompts.length} concept-aligned AI prompts`);
console.log(`📄 Full prompts saved to: ${outputJson}`);

// Create a simple text file with just the DALL-E prompts
const dallePromptsFile = path.join(__dirname, 'dalle-prompts.txt');
let dalleText = '🎨 DALL-E THUMBNAIL PROMPTS\n';
dalleText += '='.repeat(80) + '\n\n';
dalleText += 'Copy each prompt into ChatGPT with DALL-E to generate thumbnails.\n';
dalleText += 'Save generated images to: /public/images/thumbnails/[slug].jpg\n\n';

allPrompts.forEach((p, i) => {
  dalleText += `${'='.repeat(80)}\n`;
  dalleText += `${i + 1}. ${p.projectTitle}\n`;
  dalleText += `Save as: ${p.saveAs}\n`;
  dalleText += `${'='.repeat(80)}\n\n`;
  dalleText += `${p.dallePrompt}\n\n`;
  dalleText += `${'─'.repeat(80)}\n\n`;
});

fs.writeFileSync(dallePromptsFile, dalleText);
console.log(`📝 DALL-E prompts saved to: ${dallePromptsFile}`);

// Create Midjourney prompts file
const mjPromptsFile = path.join(__dirname, 'midjourney-prompts.txt');
let mjText = '🎨 MIDJOURNEY THUMBNAIL PROMPTS\n';
mjText += '='.repeat(80) + '\n\n';
mjText += 'Copy each prompt into Midjourney Discord to generate thumbnails.\n';
mjText += 'Save generated images to: /public/images/thumbnails/[slug].jpg\n\n';

allPrompts.forEach((p, i) => {
  mjText += `${'='.repeat(80)}\n`;
  mjText += `${i + 1}. ${p.projectTitle}\n`;
  mjText += `Save as: ${p.saveAs}\n`;
  mjText += `${'='.repeat(80)}\n\n`;
  mjText += `/imagine ${p.midjourneyPrompt}\n\n`;
  mjText += `${'─'.repeat(80)}\n\n`;
});

fs.writeFileSync(mjPromptsFile, mjText);
console.log(`📝 Midjourney prompts saved to: ${mjPromptsFile}`);

console.log('\n💡 INSTRUCTIONS:');
console.log('   1. Open dalle-prompts.txt or midjourney-prompts.txt');
console.log('   2. Copy each prompt to your AI image generator');
console.log('   3. Generate the image (16:9 aspect ratio)');
console.log('   4. Download and save to: /public/images/thumbnails/[slug].jpg');
console.log('   5. The existing thumbnails will be replaced with AI-generated ones\n');
