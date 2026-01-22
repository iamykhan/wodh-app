const fs = require('fs');
const path = require('path');
const https = require('https');

const thumbnailsDir = path.join(__dirname, 'public', 'images', 'thumbnails');

// All projects with curated Picsum image IDs
// Curated to match each project's theme
const projects = [
  // XR Projects (16) - tech, futuristic, immersive themes
  { slug: 'trace3d-city-portal', id: 1076, skip: true }, // Already exists
  { slug: 'haki-scaffolding-vr', id: 1062, skip: true }, // Already exists
  { slug: 'point-cloud-mesh-generation', id: 1069 },     // tech/scanning
  { slug: 'topdown-vr', id: 1068 },                      // vr gaming
  { slug: 'webgl-rocket-simulation', id: 1040 },         // space
  { slug: 'zombie-game-vr', id: 1074 },                  // dark gaming
  { slug: 'vr-physical-keyboard', id: 180 },             // keyboard/tech
  { slug: 'vr-fall-guys', id: 1050 },                    // colorful
  { slug: 'osr-star-finder', id: 1078 },                 // night sky
  { slug: 'avasci', id: 1005 },                          // person/avatar
  { slug: 'product-simulation', id: 1072 },              // product
  { slug: 'vr-rcc', id: 1071 },                          // car
  { slug: 'hospital-vr-simulation', id: 1062, skip: true }, // Already exists
  { slug: 'ar-measuring-tape', id: 1067 },               // architecture
  { slug: 'ar-museum-game', id: 1079 },                  // museum
  { slug: 'kinect-runner', id: 1058 },                   // motion
  
  // Game Projects (15) - gaming, action themes
  { slug: 'soul-of-king', id: 1082 },                    // epic/heroes
  { slug: 'handpan-hero', id: 1077 },                    // music
  { slug: 'star-fox-rework', id: 1041 },                 // space
  { slug: 'electric-mods', id: 1073 },                   // electric car
  { slug: 'beam-ng-destruction-system', id: 1035, skip: true }, // Already exists
  { slug: 'multiplayer-shooting', id: 1083 },            // action
  { slug: 'project-racer', id: 111 },                    // racing
  { slug: 'medieval-lands', id: 1084 },                  // medieval
  { slug: 'dandera-quest', id: 1080 },                   // ancient
  { slug: 'hyper-casual-bus-sort', id: 1051 },           // colorful
  { slug: 'hyper-casual-runner', id: 1054 },             // bright
  { slug: 'genetiq', id: 1075 },                         // science
  { slug: 'typing-online', id: 48 },                     // tech
  { slug: 'realistic-3rd-person-warrior-game', id: 1082 }, // warrior
  { slug: 'office-simulator-hyper-casual', id: 1070 },   // office
  
  // 3D Projects (4) - artistic, cinematic themes
  { slug: '3d-world-hologram-shader', id: 1076, skip: true }, // Already exists
  { slug: 'realistic-3d-cinematic-unreal', id: 1020 },   // cinematic
  { slug: 'mobile-game-ready-3d-assets', id: 1057 },     // 3d art
  { slug: 'transformer-robot-3d-model-animation', id: 1081 } // robot/tech
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    const makeRequest = (requestUrl) => {
      https.get(requestUrl, { 
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
        }
      }, (response) => {
        // Handle redirects
        if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
          file.close();
          if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
          const newFile = fs.createWriteStream(filepath);
          https.get(response.headers.location, (redirectResponse) => {
            if (redirectResponse.statusCode !== 200) {
              newFile.close();
              if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
              reject(new Error(`HTTP ${redirectResponse.statusCode}`));
              return;
            }
            redirectResponse.pipe(newFile);
            newFile.on('finish', () => {
              newFile.close();
              resolve();
            });
          }).on('error', reject);
          return;
        }
        
        if (response.statusCode !== 200) {
          file.close();
          if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
          reject(new Error(`HTTP ${response.statusCode}`));
          return;
        }
        
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          resolve();
        });
      }).on('error', (err) => {
        file.close();
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
        reject(err);
      });
    };
    
    makeRequest(url);
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🖼️  Generating All Thumbnails with Lorem Picsum');
  console.log('='.repeat(60));
  
  // Filter out projects that already have thumbnails
  const projectsToGenerate = projects.filter(p => {
    if (p.skip) return false;
    const filepath = path.join(thumbnailsDir, `${p.slug}.jpg`);
    return !fs.existsSync(filepath);
  });
  
  console.log(`\nGenerating ${projectsToGenerate.length} thumbnails...\n`);
  
  let successCount = 0;
  let failedProjects = [];
  
  for (let i = 0; i < projectsToGenerate.length; i++) {
    const project = projectsToGenerate[i];
    const filepath = path.join(thumbnailsDir, `${project.slug}.jpg`);
    const url = `https://picsum.photos/id/${project.id}/1792/1024`;
    
    console.log(`[${i + 1}/${projectsToGenerate.length}] 📥 ${project.slug}`);
    console.log(`   URL: ${url}`);
    
    try {
      await downloadImage(url, filepath);
      const stats = fs.statSync(filepath);
      console.log(`   ✅ Success! (${(stats.size / 1024).toFixed(1)} KB)\n`);
      successCount++;
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
      failedProjects.push({ slug: project.slug, error: error.message });
      
      // Try with a backup ID
      const backupId = 100 + i;
      const backupUrl = `https://picsum.photos/id/${backupId}/1792/1024`;
      console.log(`   🔄 Trying backup ID: ${backupId}`);
      
      try {
        await downloadImage(backupUrl, filepath);
        const stats = fs.statSync(filepath);
        console.log(`   ✅ Backup success! (${(stats.size / 1024).toFixed(1)} KB)\n`);
        successCount++;
        failedProjects.pop(); // Remove from failed list
      } catch (err) {
        console.log(`   ❌ Backup failed: ${err.message}\n`);
      }
    }
    
    // Small delay between requests
    await delay(300);
  }
  
  console.log('='.repeat(60));
  console.log(`\n✅ Generated: ${successCount}/${projectsToGenerate.length} thumbnails`);
  
  if (failedProjects.length > 0) {
    console.log(`\n❌ Failed projects:`);
    failedProjects.forEach(p => console.log(`   - ${p.slug}: ${p.error}`));
  }
  
  // Update projects.ts with thumbnail paths
  console.log('\n📝 Updating projects.ts...');
  await updateProjectsFile();
  
  console.log('\n🎉 Done!');
}

async function updateProjectsFile() {
  const projectsFilePath = path.join(__dirname, 'src', 'data', 'projects.ts');
  let content = fs.readFileSync(projectsFilePath, 'utf8');
  
  for (const project of projects) {
    const thumbnailPath = `/images/thumbnails/${project.slug}.jpg`;
    const filepath = path.join(thumbnailsDir, `${project.slug}.jpg`);
    
    // Only update if the thumbnail file exists
    if (fs.existsSync(filepath)) {
      // Match the thumbnailUrl for this project's slug and update it
      const slugRegex = new RegExp(`(slug:\\s*["']${project.slug}["'][\\s\\S]*?thumbnailUrl:\\s*)["'][^"']*["']`, 'g');
      content = content.replace(slugRegex, `$1"${thumbnailPath}"`);
    }
  }
  
  fs.writeFileSync(projectsFilePath, content);
  console.log('   ✅ projects.ts updated!');
}

main().catch(console.error);
