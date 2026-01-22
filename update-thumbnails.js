/**
 * Update Thumbnail URLs Script
 * Updates projects.ts with local thumbnail paths after AI images are generated
 */

const fs = require('fs');
const path = require('path');

const projectsFile = path.join(__dirname, 'src/data/projects.ts');
const thumbnailsDir = path.join(__dirname, 'public/images/thumbnails');

// Read projects file
let content = fs.readFileSync(projectsFile, 'utf8');

// Get all thumbnail files
const thumbnailFiles = fs.existsSync(thumbnailsDir) 
  ? fs.readdirSync(thumbnailsDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
  : [];

console.log('🖼️  Thumbnail Update Script\n');
console.log(`Found ${thumbnailFiles.length} thumbnail files in /public/images/thumbnails/\n`);

if (thumbnailFiles.length === 0) {
  console.log('❌ No thumbnail files found!');
  console.log('   Please generate images using ChatGPT/DALL-E and save them to:');
  console.log(`   ${thumbnailsDir}\n`);
  process.exit(1);
}

// Map filenames to project slugs
const updates = [];
thumbnailFiles.forEach(filename => {
  // Extract slug from filename (e.g., "trace3d-city-portal.jpg" -> "trace3d-city-portal")
  const slug = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
  const thumbnailPath = `/images/thumbnails/${filename}`;
  
  // Find and update the thumbnailUrl in the content
  const slugRegex = new RegExp(`(slug:\\s*"${slug.replace(/-/g, '\\-')}",[\\s\\S]*?thumbnailUrl:\\s*")[^"]+(")`, 'g');
  
  if (slugRegex.test(content)) {
    content = content.replace(slugRegex, `$1${thumbnailPath}$2`);
    updates.push({ slug, filename });
    console.log(`✅ Updated: ${slug} -> ${thumbnailPath}`);
  } else {
    console.log(`⚠️  Could not find project with slug: ${slug}`);
  }
});

// Write updated content
if (updates.length > 0) {
  fs.writeFileSync(projectsFile, content);
  console.log(`\n✅ Updated ${updates.length} projects in projects.ts`);
  console.log('\n💡 Next steps:');
  console.log('   1. Restart your dev server');
  console.log('   2. Refresh your browser');
  console.log('   3. Check the portfolio page to see the new thumbnails!\n');
} else {
  console.log('\n❌ No updates made. Make sure:');
  console.log('   1. Thumbnail filenames match project slugs');
  console.log('   2. Files are in /public/images/thumbnails/');
  console.log('   3. Files are named like: trace3d-city-portal.jpg\n');
}
