/**
 * Fix Mismatched Thumbnails
 * Downloads better placeholder images that match each project's concept
 * Uses Unsplash Source API for relevant images
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Mismatched thumbnails with better search queries
const mismatchedThumbnails = [
  {
    filename: "zombie-game-vr.jpg",
    project: "Zombie Game VR",
    searchQuery: "zombie,horror,apocalypse,dark",
    unsplashId: "photo-1509248961725-aec71f0a614d" // Horror/dark image
  },
  {
    filename: "soul-of-king.jpg",
    project: "Soul of King (MOBA)",
    searchQuery: "gaming,esports,battle,arena",
    unsplashId: "photo-1542751371-adc38448a05e" // Gaming/esports
  },
  {
    filename: "handpan-hero.jpg",
    project: "Handpan Hero",
    searchQuery: "handpan,drum,music,instrument",
    unsplashId: "photo-1511379938547-c1f69419868d" // Musical instrument
  },
  {
    filename: "medieval-lands.jpg",
    project: "Medieval Lands (RPG)",
    searchQuery: "medieval,castle,knight,fantasy",
    unsplashId: "photo-1518709268805-4e9042af9f23" // Medieval castle
  },
  {
    filename: "vr-fall-guys.jpg",
    project: "VR Fall Guys",
    searchQuery: "colorful,obstacle,fun,playground",
    unsplashId: "photo-1558618666-fcd25c85cd64" // Colorful playground
  },
  {
    filename: "multiplayer-shooting.jpg",
    project: "Multiplayer Shooting (FPS)",
    searchQuery: "tactical,military,soldier,action",
    unsplashId: "photo-1552820728-8b83bb6b2b11" // Tactical/military
  },
  {
    filename: "project-racer.jpg",
    project: "Project Racer",
    searchQuery: "racing,car,speed,track",
    unsplashId: "photo-1568605117036-5fe5e7bab0b7" // Modern racing car
  },
  {
    filename: "dandera-quest.jpg",
    project: "Dandera Quest (Egyptian)",
    searchQuery: "egypt,pyramid,temple,ancient",
    unsplashId: "photo-1539650116574-8efeb43e2750" // Egyptian temple
  },
  {
    filename: "genetiq.jpg",
    project: "Genetiq (Evolution)",
    searchQuery: "dna,genetics,science,evolution",
    unsplashId: "photo-1507413245164-6160d8298b31" // DNA/science
  },
  {
    filename: "star-fox-rework.jpg",
    project: "Star Fox Rework",
    searchQuery: "space,spaceship,stars,galaxy",
    unsplashId: "photo-1451187580459-43490279c0fa" // Space/stars
  },
  {
    filename: "office-simulator-hyper-casual.jpg",
    project: "Office Simulator",
    searchQuery: "office,desk,work,computer",
    unsplashId: "photo-1497366216548-37526070297c" // Modern office
  },
  {
    filename: "hyper-casual-bus-sort.jpg",
    project: "Hyper Casual Bus Sort",
    searchQuery: "bus,colorful,puzzle,transport",
    unsplashId: "photo-1570125909232-eb263c188f7e" // Colorful bus
  },
  {
    filename: "hyper-casual-runner.jpg",
    project: "Hyper Casual Runner",
    searchQuery: "running,game,colorful,mobile",
    unsplashId: "photo-1538481199705-c710c4e965fc" // Gaming/mobile
  },
  {
    filename: "realistic-3rd-person-warrior-game.jpg",
    project: "Realistic 3rd Person Warrior",
    searchQuery: "warrior,sword,medieval,combat",
    unsplashId: "photo-1578662996442-48f60103fc96" // Warrior/sword
  },
  {
    filename: "electric-mods.jpg",
    project: "Electric Mods (EV Racing)",
    searchQuery: "electric,car,tesla,racing",
    unsplashId: "photo-1593941707882-a5bba14938c7" // Electric car
  },
  {
    filename: "avasci.jpg",
    project: "AvaSci (Avatar Tech)",
    searchQuery: "avatar,digital,face,technology",
    unsplashId: "photo-1633356122544-f134324a6cee" // Digital/AI
  },
  {
    filename: "osr-star-finder.jpg",
    project: "OSR Star Finder",
    searchQuery: "stars,night,sky,constellation",
    unsplashId: "photo-1419242902214-272b3f66ee7a" // Night sky/stars
  },
  {
    filename: "topdown-vr.jpg",
    project: "TopDown VR",
    searchQuery: "vr,strategy,game,miniature",
    unsplashId: "photo-1614728263952-84ea256f9679" // VR/gaming
  },
  {
    filename: "kinect-runner.jpg",
    project: "Kinect Runner",
    searchQuery: "fitness,motion,exercise,gaming",
    unsplashId: "photo-1476480862126-209bfaa8edc8" // Fitness/motion
  },
  {
    filename: "vr-rcc.jpg",
    project: "VR RCC (Racing)",
    searchQuery: "racing,cockpit,car,speed",
    unsplashId: "photo-1449824913935-59a10b8d2000" // Racing cockpit view
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

// Generate better Unsplash URL
function getUnsplashUrl(searchQuery, width = 1200, height = 675) {
  // Use Unsplash Source API with search query
  const query = encodeURIComponent(searchQuery);
  return `https://source.unsplash.com/${width}x${height}/?${query}`;
}

// Main execution
async function fixThumbnails() {
  console.log('🔧 Fixing Mismatched Thumbnails\n');
  console.log('='.repeat(60));
  console.log(`Found ${mismatchedThumbnails.length} mismatched thumbnails to fix\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const thumb of mismatchedThumbnails) {
    const filepath = path.join(thumbnailsDir, thumb.filename);
    const url = getUnsplashUrl(thumb.searchQuery);
    
    console.log(`\n📸 ${thumb.project}`);
    console.log(`   File: ${thumb.filename}`);
    console.log(`   Query: ${thumb.searchQuery}`);
    console.log(`   Downloading...`);
    
    try {
      await downloadImage(url, filepath);
      console.log(`   ✅ Success!`);
      successCount++;
      
      // Add small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 500));
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
