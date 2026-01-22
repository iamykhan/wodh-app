/**
 * Fix Mismatched Thumbnails v2
 * Uses Lorem Picsum API with specific image IDs for reliable downloads
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Mismatched thumbnails with Picsum image IDs that match the concepts
// Picsum provides reliable placeholder images at picsum.photos
const mismatchedThumbnails = [
  {
    filename: "zombie-game-vr.jpg",
    project: "Zombie Game VR",
    // Dark, moody image
    picsumId: 1003
  },
  {
    filename: "soul-of-king.jpg",
    project: "Soul of King (MOBA)",
    // Epic/dramatic
    picsumId: 1011
  },
  {
    filename: "handpan-hero.jpg",
    project: "Handpan Hero",
    // Artistic/musical vibes
    picsumId: 1060
  },
  {
    filename: "medieval-lands.jpg",
    project: "Medieval Lands (RPG)",
    // Nature/forest/adventure
    picsumId: 15
  },
  {
    filename: "vr-fall-guys.jpg",
    project: "VR Fall Guys",
    // Colorful/fun
    picsumId: 1043
  },
  {
    filename: "multiplayer-shooting.jpg",
    project: "Multiplayer Shooting (FPS)",
    // Urban/tactical feel
    picsumId: 1029
  },
  {
    filename: "project-racer.jpg",
    project: "Project Racer",
    // Speed/motion
    picsumId: 133
  },
  {
    filename: "dandera-quest.jpg",
    project: "Dandera Quest (Egyptian)",
    // Desert/ancient architecture
    picsumId: 1044
  },
  {
    filename: "genetiq.jpg",
    project: "Genetiq (Evolution)",
    // Nature/science
    picsumId: 1015
  },
  {
    filename: "star-fox-rework.jpg",
    project: "Star Fox Rework",
    // Space/dark
    picsumId: 1025
  },
  {
    filename: "office-simulator-hyper-casual.jpg",
    project: "Office Simulator",
    // Office/workspace
    picsumId: 180
  },
  {
    filename: "hyper-casual-bus-sort.jpg",
    project: "Hyper Casual Bus Sort",
    // Colorful/playful
    picsumId: 1041
  },
  {
    filename: "hyper-casual-runner.jpg",
    project: "Hyper Casual Runner",
    // Motion/colorful
    picsumId: 1033
  },
  {
    filename: "realistic-3rd-person-warrior-game.jpg",
    project: "Realistic 3rd Person Warrior",
    // Dark/dramatic
    picsumId: 1002
  },
  {
    filename: "electric-mods.jpg",
    project: "Electric Mods (EV Racing)",
    // Tech/modern
    picsumId: 111
  },
  {
    filename: "avasci.jpg",
    project: "AvaSci (Avatar Tech)",
    // Portrait/face
    picsumId: 64
  },
  {
    filename: "osr-star-finder.jpg",
    project: "OSR Star Finder",
    // Night/sky
    picsumId: 1035
  },
  {
    filename: "topdown-vr.jpg",
    project: "TopDown VR",
    // Tech/gaming
    picsumId: 1017
  },
  {
    filename: "kinect-runner.jpg",
    project: "Kinect Runner",
    // Motion/fitness
    picsumId: 1054
  },
  {
    filename: "vr-rcc.jpg",
    project: "VR RCC (Racing)",
    // Speed/car
    picsumId: 514
  }
];

const thumbnailsDir = path.join(__dirname, 'public/images/thumbnails');

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    const request = https.get(url, { 
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    });
    
    request.on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err);
    });
    
    file.on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

// Main execution
async function fixThumbnails() {
  console.log('🔧 Fixing Mismatched Thumbnails (v2 - Picsum)\n');
  console.log('='.repeat(60));
  console.log(`Found ${mismatchedThumbnails.length} mismatched thumbnails to fix\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const thumb of mismatchedThumbnails) {
    const filepath = path.join(thumbnailsDir, thumb.filename);
    // Picsum URL format: https://picsum.photos/id/{id}/{width}/{height}
    const url = `https://picsum.photos/id/${thumb.picsumId}/1200/675`;
    
    console.log(`\n📸 ${thumb.project}`);
    console.log(`   File: ${thumb.filename}`);
    console.log(`   Picsum ID: ${thumb.picsumId}`);
    console.log(`   Downloading...`);
    
    try {
      await downloadImage(url, filepath);
      console.log(`   ✅ Success!`);
      successCount++;
      
      // Add small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 300));
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
      failCount++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Successfully fixed: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`\n💡 Refresh your browser to see the updated thumbnails!`);
}

fixThumbnails().catch(console.error);
