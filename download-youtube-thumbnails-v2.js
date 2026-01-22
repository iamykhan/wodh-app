/**
 * Download YouTube Thumbnails for Projects
 * Uses actual YouTube video thumbnails which show real project content
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Projects with YouTube IDs - these will get actual project thumbnails
const projectsWithYoutube = [
  { slug: "haki-scaffolding-vr", youtubeId: "_Wz9zB2GO4o" },
  { slug: "point-cloud-mesh-generation", youtubeId: "xcvcpT9RGLg" },
  { slug: "topdown-vr", youtubeId: "Y7gWknLKHtQ" },
  { slug: "webgl-rocket-simulation", youtubeId: "dyxwko0wojs" },
  { slug: "zombie-game-vr", youtubeId: "tY3W3MMVRmI" },
  { slug: "vr-physical-keyboard", youtubeId: "K936m1ITyuw" },
  { slug: "vr-fall-guys", youtubeId: "xull9N6u7Uk" },
  { slug: "osr-star-finder", youtubeId: "PoWnvbYCsKQ" },
  { slug: "avasci", youtubeId: "--Q8dnqMXy4" },
  { slug: "hospital-vr-simulation", youtubeId: "GuuxVhrrtgo" },
  { slug: "ar-measuring-tape", youtubeId: "SFrUy4Ji0Lo" },
  { slug: "ar-museum-game", youtubeId: "slHWmMkqahw" },
  { slug: "kinect-runner", youtubeId: "kLL-it-7ho0" },
  { slug: "soul-of-king", youtubeId: "IwrKOx1Qz0E" },
  { slug: "handpan-hero", youtubeId: "8R2L47gF_p0" },
  { slug: "star-fox-rework", youtubeId: "JDI-TXvbt5M" },
  { slug: "electric-mods", youtubeId: "PvEHxBJ02YA" },
  { slug: "beam-ng-destruction-system", youtubeId: "WQxectnaq0M" },
  { slug: "multiplayer-shooting", youtubeId: "SEyN9bgtLu4" },
  { slug: "project-racer", youtubeId: "TD-OLJihG90" },
  { slug: "medieval-lands", youtubeId: "VBr7gwP3fLI" },
  { slug: "dandera-quest", youtubeId: "Ub-SAqslBpY" },
  { slug: "hyper-casual-bus-sort", youtubeId: "31bUYOl8diM" },
  { slug: "hyper-casual-runner", youtubeId: "waUi60HNJ4A" },
  { slug: "genetiq", youtubeId: "nt-SDGBulMM" },
  { slug: "typing-online", youtubeId: "pq9kcp-hsJY" },
  { slug: "realistic-3rd-person-warrior-game", youtubeId: "yS5Fw8U6yAw" },
  { slug: "office-simulator-hyper-casual", youtubeId: "ZGdy-d3FQl8" },
  { slug: "3d-world-hologram-shader", youtubeId: "JZ2OkqjENPQ" },
  { slug: "realistic-3d-cinematic-unreal", youtubeId: "QLnamOt_VGk" },
  { slug: "mobile-game-ready-3d-assets", youtubeId: "c5hS1Fp61fg" },
  { slug: "transformer-robot-3d-model-animation", youtubeId: "Xn2TmGtdOPs" }
];

const thumbnailsDir = path.join(__dirname, 'public/images/thumbnails');

// Download image from URL with better redirect handling
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : require('http');
    
    const request = protocol.get(url, { 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
          return;
        }
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      const file = fs.createWriteStream(filepath);
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    });
    
    request.on('error', (err) => {
      reject(err);
    });
  });
}

// Get YouTube thumbnail URL (try maxres first, fall back to hq)
function getYouTubeThumbnailUrl(youtubeId, quality = 'maxresdefault') {
  return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
}

// Main execution
async function downloadThumbnails() {
  console.log('🎬 Downloading YouTube Thumbnails\n');
  console.log('='.repeat(60));
  console.log(`Found ${projectsWithYoutube.length} projects with YouTube videos\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const project of projectsWithYoutube) {
    const filepath = path.join(thumbnailsDir, `${project.slug}.jpg`);
    
    console.log(`\n📸 ${project.slug}`);
    console.log(`   YouTube ID: ${project.youtubeId}`);
    
    // Try maxresdefault first, then hqdefault
    const qualities = ['maxresdefault', 'hqdefault', 'mqdefault'];
    let downloaded = false;
    
    for (const quality of qualities) {
      const url = getYouTubeThumbnailUrl(project.youtubeId, quality);
      console.log(`   Trying ${quality}...`);
      
      try {
        await downloadImage(url, filepath);
        
        // Check if file is valid (not a placeholder)
        const stats = fs.statSync(filepath);
        if (stats.size > 5000) { // Valid images are usually larger than 5KB
          console.log(`   ✅ Success! (${quality}, ${Math.round(stats.size/1024)}KB)`);
          successCount++;
          downloaded = true;
          break;
        }
      } catch (error) {
        // Try next quality
      }
    }
    
    if (!downloaded) {
      console.log(`   ❌ Failed to download valid thumbnail`);
      failCount++;
    }
    
    // Small delay
    await new Promise(r => setTimeout(r, 200));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Successfully downloaded: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`\n💡 Refresh your browser to see the updated thumbnails!`);
}

downloadThumbnails().catch(console.error);
