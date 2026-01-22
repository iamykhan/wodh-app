const fs = require('fs');
const path = require('path');
const https = require('https');

// Projects that need thumbnails (the ones that failed)
const projectsToFix = [
  // XR Projects
  { slug: 'point-cloud-mesh-generation', query: 'lidar-3d-scanning-technology', keywords: 'lidar,point,cloud,mesh' },
  { slug: 'topdown-vr', query: 'virtual-reality-gaming', keywords: 'vr,gaming,immersive' },
  { slug: 'webgl-rocket-simulation', query: 'rocket-launch-space', keywords: 'rocket,space,launch' },
  { slug: 'zombie-game-vr', query: 'zombie-horror-game', keywords: 'zombie,horror,apocalypse' },
  { slug: 'vr-physical-keyboard', query: 'virtual-reality-keyboard-typing', keywords: 'vr,keyboard,typing' },
  { slug: 'vr-fall-guys', query: 'colorful-party-game-characters', keywords: 'party,game,colorful' },
  { slug: 'osr-star-finder', query: 'night-sky-stars-constellation', keywords: 'stars,constellation,night' },
  { slug: 'avasci', query: 'digital-human-avatar-3d', keywords: 'avatar,digital,human' },
  { slug: 'product-simulation', query: '3d-product-visualization', keywords: 'product,3d,visualization' },
  { slug: 'vr-rcc', query: 'racing-car-cockpit-simulator', keywords: 'racing,car,vr' },
  { slug: 'ar-measuring-tape', query: 'augmented-reality-measurement', keywords: 'ar,measure,tape' },
  { slug: 'ar-museum-game', query: 'museum-dinosaur-exhibit', keywords: 'museum,dinosaur,ar' },
  { slug: 'kinect-runner', query: 'motion-capture-gaming', keywords: 'kinect,motion,gaming' },
  
  // Game Projects  
  { slug: 'soul-of-king', query: 'moba-battle-arena-heroes', keywords: 'moba,battle,heroes' },
  { slug: 'handpan-hero', query: 'handpan-drum-music', keywords: 'handpan,music,rhythm' },
  { slug: 'star-fox-rework', query: 'space-shooter-spaceship', keywords: 'spaceship,space,shooter' },
  { slug: 'electric-mods', query: 'electric-car-racing-neon', keywords: 'electric,car,racing' },
  { slug: 'multiplayer-shooting', query: 'fps-shooter-multiplayer-game', keywords: 'fps,shooter,multiplayer' },
  { slug: 'project-racer', query: 'arcade-racing-game-neon', keywords: 'racing,arcade,neon' },
  { slug: 'medieval-lands', query: 'medieval-fantasy-kingdom-castle', keywords: 'medieval,fantasy,castle' },
  { slug: 'dandera-quest', query: 'ancient-egypt-temple-hieroglyphics', keywords: 'egypt,temple,ancient' },
  { slug: 'hyper-casual-bus-sort', query: 'colorful-mobile-puzzle-game', keywords: 'puzzle,colorful,mobile' },
  { slug: 'hyper-casual-runner', query: 'endless-runner-mobile-game', keywords: 'runner,endless,mobile' },
  { slug: 'genetiq', query: 'dna-genetics-evolution-science', keywords: 'dna,genetics,evolution' },
  { slug: 'typing-online', query: 'keyboard-typing-speed-test', keywords: 'typing,keyboard,race' },
  { slug: 'realistic-3rd-person-warrior-game', query: 'medieval-warrior-sword-combat', keywords: 'warrior,sword,combat' },
  { slug: 'office-simulator-hyper-casual', query: 'office-workplace-chaos-funny', keywords: 'office,work,chaos' },
  
  // 3D Projects
  { slug: 'realistic-3d-cinematic-unreal', query: 'cinematic-3d-render-unreal', keywords: 'cinematic,3d,render' },
  { slug: 'mobile-game-ready-3d-assets', query: '3d-game-assets-characters', keywords: '3d,assets,game' },
  { slug: 'transformer-robot-3d-model-animation', query: 'transformer-robot-3d-model', keywords: 'robot,transformer,3d' }
];

// Unsplash source URLs (random images by query)
const getUnsplashUrl = (query) => {
  return `https://source.unsplash.com/1792x1024/?${query}`;
};

const thumbnailsDir = path.join(__dirname, 'public', 'images', 'thumbnails');

function downloadImage(url, filepath, maxRetries = 3) {
  return new Promise((resolve, reject) => {
    const attemptDownload = (retryCount) => {
      const file = fs.createWriteStream(filepath);
      
      https.get(url, { 
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
      }, (response) => {
        // Handle redirects (Unsplash uses redirects)
        if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303) {
          file.close();
          if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
          downloadImage(response.headers.location, filepath, maxRetries - retryCount)
            .then(resolve)
            .catch(reject);
          return;
        }
        
        if (response.statusCode !== 200) {
          file.close();
          if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
          if (retryCount < maxRetries) {
            setTimeout(() => attemptDownload(retryCount + 1), 1000);
          } else {
            reject(new Error(`HTTP ${response.statusCode}`));
          }
          return;
        }
        
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          // Verify file size
          const stats = fs.statSync(filepath);
          if (stats.size < 5000) {
            if (retryCount < maxRetries) {
              fs.unlinkSync(filepath);
              setTimeout(() => attemptDownload(retryCount + 1), 1000);
            } else {
              reject(new Error('Image too small'));
            }
          } else {
            resolve();
          }
        });
      }).on('error', (err) => {
        file.close();
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        if (retryCount < maxRetries) {
          setTimeout(() => attemptDownload(retryCount + 1), 1000);
        } else {
          reject(err);
        }
      });
    };
    
    attemptDownload(0);
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🖼️  Downloading Themed Thumbnails from Unsplash');
  console.log('='.repeat(60));
  console.log(`\nDownloading ${projectsToFix.length} thumbnails...\n`);
  
  let successCount = 0;
  let failedProjects = [];
  
  for (let i = 0; i < projectsToFix.length; i++) {
    const project = projectsToFix[i];
    const filepath = path.join(thumbnailsDir, `${project.slug}.jpg`);
    const url = getUnsplashUrl(project.query);
    
    console.log(`[${i + 1}/${projectsToFix.length}] 📥 ${project.slug}`);
    console.log(`   Query: ${project.query}`);
    
    try {
      await downloadImage(url, filepath);
      const stats = fs.statSync(filepath);
      console.log(`   ✅ Success! (${(stats.size / 1024).toFixed(1)} KB)\n`);
      successCount++;
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}\n`);
      failedProjects.push(project.slug);
    }
    
    // Delay between requests to be nice to Unsplash
    if (i < projectsToFix.length - 1) {
      await delay(500);
    }
  }
  
  console.log('='.repeat(60));
  console.log(`\n✅ Downloaded: ${successCount}/${projectsToFix.length} thumbnails`);
  
  if (failedProjects.length > 0) {
    console.log(`\n❌ Failed:`);
    failedProjects.forEach(p => console.log(`   - ${p}`));
  }
  
  console.log('\n🎉 Done!');
}

main().catch(console.error);
