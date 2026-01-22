const fs = require('fs');
const path = require('path');
const https = require('https');

// Projects that need new thumbnails (based on file size check)
const thumbnailsDir = path.join(__dirname, 'public', 'images', 'thumbnails');

// Get list of bad thumbnails (files > 1MB are the rate limit error images)
const files = fs.readdirSync(thumbnailsDir);
const badThumbnails = files.filter(file => {
  if (!file.endsWith('.jpg')) return false;
  const stats = fs.statSync(path.join(thumbnailsDir, file));
  return stats.size > 1000000; // > 1MB means it's the error image
});

console.log(`Found ${badThumbnails.length} thumbnails to fix:\n`);
badThumbnails.forEach(f => console.log(`  - ${f}`));

// Use Lorem Picsum - reliable, fast, no rate limits
// Each image ID gives a unique, high-quality photo
const picsum = {
  // XR themed (tech, futuristic)
  'point-cloud-mesh-generation': 1076,  // tech/digital
  'topdown-vr': 1068,                    // gaming
  'webgl-rocket-simulation': 1040,       // space
  'zombie-game-vr': 1074,                // dark/gaming
  'vr-physical-keyboard': 180,           // tech
  'vr-fall-guys': 1050,                  // colorful
  'osr-star-finder': 1078,               // night sky
  'avasci': 1062,                        // face/avatar
  'product-simulation': 1072,            // product
  'vr-rcc': 1071,                        // car/racing
  'ar-measuring-tape': 1067,             // interior
  'ar-museum-game': 1079,                // architecture
  'kinect-runner': 1058,                 // motion
  
  // Game themed
  'soul-of-king': 1082,                  // epic
  'handpan-hero': 1077,                  // music
  'star-fox-rework': 1041,               // space
  'electric-mods': 1073,                 // car
  'multiplayer-shooting': 1083,          // action
  'project-racer': 1071,                 // racing
  'medieval-lands': 1084,                // castle
  'dandera-quest': 1080,                 // ancient
  'hyper-casual-bus-sort': 1051,         // colorful
  'hyper-casual-runner': 1054,           // bright
  'genetiq': 1075,                       // science
  'typing-online': 180,                  // keyboard
  'realistic-3rd-person-warrior-game': 1082, // warrior
  'office-simulator-hyper-casual': 1070, // office
  
  // 3D themed  
  'realistic-3d-cinematic-unreal': 1069, // cinematic
  'mobile-game-ready-3d-assets': 1057,   // 3d
  'transformer-robot-3d-model-animation': 1081 // tech
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    const request = https.get(url, { 
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(filepath);
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
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
      reject(new Error('Timeout'));
    });
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('\n🖼️  Fixing Thumbnails with Lorem Picsum');
  console.log('='.repeat(60));
  
  let successCount = 0;
  
  for (let i = 0; i < badThumbnails.length; i++) {
    const filename = badThumbnails[i];
    const slug = filename.replace('.jpg', '');
    const filepath = path.join(thumbnailsDir, filename);
    
    // Get picsum ID or use a random one
    const picsumId = picsum[slug] || (1000 + i);
    const url = `https://picsum.photos/id/${picsumId}/1792/1024`;
    
    console.log(`\n[${i + 1}/${badThumbnails.length}] 📥 ${slug}`);
    console.log(`   Picsum ID: ${picsumId}`);
    
    try {
      await downloadImage(url, filepath);
      const stats = fs.statSync(filepath);
      console.log(`   ✅ Success! (${(stats.size / 1024).toFixed(1)} KB)`);
      successCount++;
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
      
      // Try with a different ID
      const backupId = 1000 + Math.floor(Math.random() * 100);
      const backupUrl = `https://picsum.photos/id/${backupId}/1792/1024`;
      console.log(`   🔄 Trying backup ID: ${backupId}`);
      
      try {
        await downloadImage(backupUrl, filepath);
        const stats = fs.statSync(filepath);
        console.log(`   ✅ Backup success! (${(stats.size / 1024).toFixed(1)} KB)`);
        successCount++;
      } catch (err) {
        console.log(`   ❌ Backup also failed: ${err.message}`);
      }
    }
    
    await delay(200);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ Fixed: ${successCount}/${badThumbnails.length} thumbnails`);
  console.log('\n🎉 Done!');
}

main().catch(console.error);
