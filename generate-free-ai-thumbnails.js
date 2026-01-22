const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Project data with optimized prompts
const projects = [
  {
    slug: 'trace3d-city-portal',
    title: 'TraceAR City Portal',
    prompt: 'Futuristic city street with translucent AR holographic overlays showing navigation paths and 3D storytelling elements floating above streets, neon green accent lines, dark atmospheric background, high-tech augmented reality aesthetic, professional game thumbnail, 16:9'
  },
  {
    slug: 'haki-scaffolding-vr',
    title: 'HAKI Scaffolding VR',
    prompt: 'Worker wearing VR headset training on industrial scaffolding in virtual construction site, realistic metal scaffolding structures with safety elements highlighted in neon green, dark industrial atmosphere, VR training interface, professional thumbnail, 16:9'
  },
  {
    slug: 'point-cloud-mesh-generation',
    title: 'Point Cloud Mesh Generation',
    prompt: 'Millions of colorful 3D points transforming into solid mesh model, LiDAR scanning waves emanating outward, room being reconstructed in real-time, neon green and cyan point particles, dark tech background, spatial computing, 16:9'
  },
  {
    slug: 'topdown-vr',
    title: 'TopDown VR',
    prompt: 'Person in VR headset looking down at miniature game world below them like god-view strategy game, tiny characters and buildings from top-down perspective, neon green highlights, immersive dark atmosphere, professional thumbnail, 16:9'
  },
  {
    slug: 'webgl-rocket-simulation',
    title: 'WebGL Rocket Simulation',
    prompt: 'Detailed rocket launching with realistic fire and smoke trails, trajectory path lines visible in sky, physics equations floating nearby, space atmosphere gradient, neon accents, professional simulation thumbnail, 16:9'
  },
  {
    slug: 'zombie-game-vr',
    title: 'Zombie Game VR',
    prompt: 'First-person VR view with hands holding weapons, zombies approaching through dark abandoned city, atmospheric horror lighting with neon green zombie eyes glowing, terrifying game aesthetic, professional thumbnail, 16:9'
  },
  {
    slug: 'vr-physical-keyboard',
    title: 'VR Physical Keyboard',
    prompt: 'VR environment showing virtual hands typing on glowing outlined keyboard, mixed reality effect, neon green key highlights, dark workspace, futuristic typing interface, professional thumbnail, 16:9'
  },
  {
    slug: 'vr-fall-guys',
    title: 'VR Fall Guys',
    prompt: 'Colorful bean-shaped characters tumbling through chaotic VR obstacle course with spinning platforms and bouncy surfaces, first-person VR perspective, vibrant party colors with neon accents, fun energetic, 16:9'
  },
  {
    slug: 'osr-star-finder',
    title: 'OSR Star Finder',
    prompt: 'Person holding phone up to beautiful night sky with AR overlay showing constellation lines and highlighted star with name floating beside it, magical starry atmosphere with neon constellation lines, 16:9'
  },
  {
    slug: 'avasci',
    title: 'AvaSci',
    prompt: 'Realistic digital human avatar being scanned and created with motion capture points visible and facial rigging wireframe, scientific laboratory aesthetic with holographic displays, neon cyan and green accents, 16:9'
  },
  {
    slug: 'product-simulation',
    title: 'Product Simulation',
    prompt: 'Interactive 3D product configurator showing premium product with floating customization options and color swatches around it, clean white product floating in dark space with neon accent UI elements, 16:9'
  },
  {
    slug: 'vr-rcc',
    title: 'VR RCC',
    prompt: 'First-person VR view from inside racing car cockpit, hands gripping steering wheel, drifting around corner with realistic motion blur, speedometer and racing HUD visible, neon racing lights night track, 16:9'
  },
  {
    slug: 'hospital-vr-simulation',
    title: 'Hospital VR Simulation',
    prompt: 'Medical professional in VR headset practicing surgery on virtual patient with holographic anatomy guides floating nearby, clean medical whites with neon blue medical UI elements, healthcare training, 16:9'
  },
  {
    slug: 'ar-measuring-tape',
    title: 'AR Measuring Tape',
    prompt: 'Phone screen showing AR measurement lines across furniture and walls with precise centimeter readings displayed, floating dimension numbers, clean room with neon green measurement lines overlaid, 16:9'
  },
  {
    slug: 'ar-museum-game',
    title: 'AR Museum Game',
    prompt: 'Child pointing phone at museum dinosaur skeleton exhibit with AR bringing it to life, dinosaur stepping out as colorful animated character, magical museum atmosphere with AR particles, 16:9'
  },
  {
    slug: 'kinect-runner',
    title: 'Kinect Runner',
    prompt: 'Silhouette of person running in place in front of TV with skeletal tracking points visible as neon dots connected by lines, endless runner game on screen, motion blur effect, dark room with colorful glow, 16:9'
  },
  {
    slug: 'soul-of-king',
    title: 'Soul of King',
    prompt: 'Epic MOBA battle scene with multiple heroic characters clashing in fantasy arena, lightning and magical effects, dynamic action poses, purple and blue color scheme with golden accents, bold game art, 16:9'
  },
  {
    slug: 'handpan-hero',
    title: 'Handpan Hero',
    prompt: 'Hands playing beautiful handpan drum instrument with musical notes and rhythm game UI elements floating up, colorful note trails like Guitar Hero, warm golden lighting musical atmosphere, 16:9'
  },
  {
    slug: 'star-fox-rework',
    title: 'Star Fox Rework',
    prompt: 'Sleek spaceship Arwing flying through asteroid field with laser beams firing, modern graphics with classic arcade feel, space nebula background purple and blue hues, dynamic action angle, 16:9'
  },
  {
    slug: 'electric-mods',
    title: 'Electric Mods',
    prompt: 'Futuristic electric sports car with customization interface showing wheel options body kits and neon underglow choices floating around it, garage setting dramatic lighting, electric blue green accents, 16:9'
  },
  {
    slug: 'beam-ng-destruction-system',
    title: 'BeamNG Destruction System',
    prompt: 'Car mid-crash with realistic soft-body deformation metal crumpling glass shattering in slow motion, physics simulation visualization with force vectors shown, dramatic crash test lighting, 16:9'
  },
  {
    slug: 'multiplayer-shooting',
    title: 'Multiplayer Shooting',
    prompt: 'Intense FPS action scene with two teams of soldiers in tactical gear facing off, muzzle flashes smoke grenades, competitive esports atmosphere, red vs blue team colors dark industrial map, 16:9'
  },
  {
    slug: 'project-racer',
    title: 'Project Racer',
    prompt: 'Multiple arcade racing cars drifting around neon-lit track corner, close competitive racing, retro-futuristic aesthetic with bright colorful cars, speed lines motion blur, console-quality racing, 16:9'
  },
  {
    slug: 'medieval-lands',
    title: 'Medieval Lands',
    prompt: 'Warrior in medieval armor standing before vast fantasy kingdom with castles forests and dragons in distance, epic RPG adventure atmosphere, golden sunset lighting sweeping landscape, 16:9'
  },
  {
    slug: 'dandera-quest',
    title: 'Dandera Quest',
    prompt: 'Explorer with torch inside ancient Egyptian Dendera temple, hieroglyphics glowing with mystical energy, puzzle mechanisms visible, adventure game atmosphere golden and blue lighting, 16:9'
  },
  {
    slug: 'hyper-casual-bus-sort',
    title: 'Hyper Casual Bus Sort',
    prompt: 'Colorful cartoon passengers being sorted onto matching colored buses, simple clean mobile game aesthetic, bright cheerful colors, satisfying puzzle game feel, playful character designs, 16:9'
  },
  {
    slug: 'hyper-casual-runner',
    title: 'Hyper Casual Runner',
    prompt: 'Cute character running through colorful endless obstacle course collecting coins dodging barriers, mobile game style simple clean graphics, vibrant gradient background energetic feel, 16:9'
  },
  {
    slug: 'genetiq',
    title: 'Genetiq',
    prompt: 'DNA double helix transforming into evolved creatures with genetic modification interface elements, scientific strategy game aesthetic, bioluminescent colors green cyan purple, laboratory nature hybrid, 16:9'
  },
  {
    slug: 'typing-online',
    title: 'Typing Online',
    prompt: 'Multiple floating keyboards racing on track with typed words creating speed trails, competitive multiplayer typing race visualization, neon letters flying esports energy, dark background colorful text, 16:9'
  },
  {
    slug: 'realistic-3rd-person-warrior-game',
    title: 'Realistic 3rd Person Warrior Game',
    prompt: 'Muscular warrior in detailed armor mid-swing with massive sword, enemy being struck with impact effect, third-person camera angle, gritty realistic graphics cinematic combat moment, 16:9'
  },
  {
    slug: 'office-simulator-hyper-casual',
    title: 'Office Simulator',
    prompt: 'Chaotic cartoon office with papers flying coffee spilling worker sliding on chair between desks, hyper-casual fun management game style, bright office colors humorous workplace chaos, 16:9'
  },
  {
    slug: '3d-world-hologram-shader',
    title: '3D World Hologram Shader',
    prompt: '3D world globe with stunning holographic shader effect scan lines chromatic aberration transparency layers, Blender viewport subtly visible, cyan magenta hologram colors dark background, 16:9'
  },
  {
    slug: 'realistic-3d-cinematic-unreal',
    title: 'Realistic 3D Cinematic',
    prompt: 'Photorealistic cinematic scene with dramatic lighting, epic landscape with film camera framing guides visible, Unreal Engine 5 quality Lumen lighting movie-quality composition, 16:9'
  },
  {
    slug: 'mobile-game-ready-3d-assets',
    title: 'Mobile Game Ready 3D Assets',
    prompt: 'Collection of optimized 3D game assets displayed like product catalog, characters props environment pieces, clean studio lighting showing stylized low-poly quality, asset pack showcase, 16:9'
  },
  {
    slug: 'transformer-robot-3d-model-animation',
    title: 'Transformer Robot 3D Model',
    prompt: 'Detailed transformer robot mid-transformation with mechanical parts shifting between robot and vehicle form, wireframe and solid render split view, studio lighting professional 3D showcase, 16:9'
  }
];

const thumbnailsDir = path.join(__dirname, 'public', 'images', 'thumbnails');

// Ensure directory exists
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

// Function to download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, { 
      timeout: 60000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        file.close();
        fs.unlinkSync(filepath);
        downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
    
    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      reject(err);
    });
    
    request.on('timeout', () => {
      request.destroy();
      file.close();
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      reject(new Error('Request timed out'));
    });
  });
}

// Generate image using Pollinations.ai (free, no API key)
async function generateImage(project) {
  const encodedPrompt = encodeURIComponent(project.prompt);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1792&height=1024&nologo=true`;
  const filepath = path.join(thumbnailsDir, `${project.slug}.jpg`);
  
  console.log(`\n🎨 Generating: ${project.title}`);
  console.log(`   Saving to: ${project.slug}.jpg`);
  
  try {
    await downloadImage(url, filepath);
    
    // Verify file was created and has content
    const stats = fs.statSync(filepath);
    if (stats.size < 1000) {
      throw new Error('Generated image too small');
    }
    
    console.log(`   ✅ Success! (${(stats.size / 1024).toFixed(1)} KB)`);
    return true;
  } catch (error) {
    console.log(`   ❌ Failed: ${error.message}`);
    return false;
  }
}

// Add delay between requests to be nice to the API
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🖼️  AI Thumbnail Generator (Pollinations.ai)');
  console.log('='.repeat(60));
  console.log(`\nGenerating ${projects.length} thumbnails...\n`);
  
  let successCount = 0;
  let failedProjects = [];
  
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    console.log(`[${i + 1}/${projects.length}]`);
    
    const success = await generateImage(project);
    if (success) {
      successCount++;
    } else {
      failedProjects.push(project.title);
    }
    
    // Wait between requests to avoid overwhelming the API
    if (i < projects.length - 1) {
      await delay(2000);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ Generated: ${successCount}/${projects.length} thumbnails`);
  
  if (failedProjects.length > 0) {
    console.log(`\n❌ Failed projects:`);
    failedProjects.forEach(p => console.log(`   - ${p}`));
  }
  
  // Update projects.ts with new thumbnail paths
  if (successCount > 0) {
    console.log('\n📝 Updating projects.ts with new thumbnail paths...');
    await updateProjectsFile();
  }
  
  console.log('\n🎉 Done!');
}

async function updateProjectsFile() {
  const projectsFilePath = path.join(__dirname, 'src', 'data', 'projects.ts');
  let content = fs.readFileSync(projectsFilePath, 'utf8');
  
  for (const project of projects) {
    const thumbnailPath = `/images/thumbnails/${project.slug}.jpg`;
    const filepath = path.join(thumbnailsDir, `${project.slug}.jpg`);
    
    // Only update if the file exists
    if (fs.existsSync(filepath)) {
      // Match the thumbnailUrl for this project's slug
      const slugRegex = new RegExp(`(slug:\\s*["']${project.slug}["'][\\s\\S]*?thumbnailUrl:\\s*)["'][^"']*["']`, 'g');
      content = content.replace(slugRegex, `$1"${thumbnailPath}"`);
    }
  }
  
  fs.writeFileSync(projectsFilePath, content);
  console.log('   ✅ projects.ts updated!');
}

main().catch(console.error);
