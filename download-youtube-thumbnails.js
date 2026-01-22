/**
 * Download YouTube Thumbnails Script
 * Downloads actual YouTube thumbnails for all projects and saves them locally
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const projectsFile = path.join(__dirname, 'src/data/projects.ts');
const thumbnailsDir = path.join(__dirname, 'public/images/thumbnails');
const content = fs.readFileSync(projectsFile, 'utf8');

// Extract all projects with YouTube IDs
function extractProjectsWithYouTube(content) {
  const projects = [];
  
  // Match project objects with slug and youtubeId
  const projectRegex = /slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",[\s\S]*?youtubeId:\s*"([^"]*)"/g;
  
  let match;
  while ((match = projectRegex.exec(content)) !== null) {
    if (match[3]) { // Only if youtubeId exists
      projects.push({
        slug: match[1],
        title: match[2],
        youtubeId: match[3]
      });
    }
  }
  
  return projects;
}

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filepath);
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Get YouTube thumbnail URL (try maxresdefault first, fallback to hqdefault)
function getYouTubeThumbnailUrl(youtubeId) {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

// Main execution
console.log('📥 Downloading YouTube Thumbnails\n');
console.log('='.repeat(80));

// Ensure thumbnails directory exists
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

const projects = extractProjectsWithYouTube(content);
console.log(`\nFound ${projects.length} projects with YouTube videos\n`);

let downloaded = 0;
let failed = 0;

async function downloadAll() {
  for (const project of projects) {
    const thumbnailUrl = getYouTubeThumbnailUrl(project.youtubeId);
    const filename = `${project.slug}.jpg`;
    const filepath = path.join(thumbnailsDir, filename);
    
    try {
      console.log(`📥 Downloading: ${project.title}`);
      console.log(`   YouTube ID: ${project.youtubeId}`);
      console.log(`   Saving to: ${filename}`);
      
      await downloadImage(thumbnailUrl, filepath);
      downloaded++;
      console.log(`   ✅ Success!\n`);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      // Try hqdefault as fallback
      try {
        const fallbackUrl = `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`;
        console.log(`   ⚠️  Max quality failed, trying high quality...`);
        await downloadImage(fallbackUrl, filepath);
        downloaded++;
        console.log(`   ✅ Success (high quality)!\n`);
      } catch (fallbackError) {
        failed++;
        console.log(`   ❌ Failed: ${error.message}\n`);
      }
    }
  }
  
  console.log('='.repeat(80));
  console.log(`\n✅ Downloaded: ${downloaded} thumbnails`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed} thumbnails`);
  }
  
  if (downloaded > 0) {
    console.log(`\n📝 Updating projects.ts with local thumbnail paths...\n`);
    updateProjectThumbnails();
  }
}

// Update projects.ts with local thumbnail paths
function updateProjectThumbnails() {
  let updatedContent = content;
  let updates = 0;
  
  projects.forEach(project => {
    const filename = `${project.slug}.jpg`;
    const localPath = `/images/thumbnails/${filename}`;
    const filepath = path.join(thumbnailsDir, filename);
    
    // Only update if file exists
    if (fs.existsSync(filepath)) {
      // Find and replace thumbnailUrl for this project
      const regex = new RegExp(
        `(slug:\\s*"${project.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",[\\s\\S]*?thumbnailUrl:\\s*")[^"]+(")`,
        'g'
      );
      
      if (regex.test(updatedContent)) {
        updatedContent = updatedContent.replace(regex, `$1${localPath}$2`);
        updates++;
        console.log(`   ✅ Updated: ${project.title} -> ${localPath}`);
      }
    }
  });
  
  if (updates > 0) {
    fs.writeFileSync(projectsFile, updatedContent);
    console.log(`\n✅ Updated ${updates} projects in projects.ts`);
    console.log(`\n💡 Next steps:`);
    console.log(`   1. Restart your dev server`);
    console.log(`   2. Refresh your browser`);
    console.log(`   3. Check the portfolio page to see the new thumbnails!\n`);
  }
}

// Run the download
downloadAll().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
