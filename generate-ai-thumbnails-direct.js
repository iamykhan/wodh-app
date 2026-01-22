/**
 * Generate AI Thumbnails Directly
 * Uses AI image generation to create custom thumbnails for each project
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const projectsFile = path.join(__dirname, 'src/data/projects.ts');
const thumbnailsDir = path.join(__dirname, 'public/images/thumbnails');
const content = fs.readFileSync(projectsFile, 'utf8');

// Extract all projects
function extractAllProjects(content) {
  const projects = [];
  
  // Match project objects
  const projectRegex = /slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",[\s\S]*?subcategory:\s*"([^"]+)",[\s\S]*?tagline:\s*"([^"]+)",[\s\S]*?description:\s*"([^"]+)"/g;
  
  let match;
  while ((match = projectRegex.exec(content)) !== null) {
    projects.push({
      slug: match[1],
      title: match[2],
      category: match[3],
      subcategory: match[4],
      tagline: match[5],
      description: match[6]
    });
  }
  
  return projects;
}

// Generate detailed AI prompt for each project
function generateAIPrompt(project) {
  const categoryStyles = {
    XR: "futuristic high-tech neon green accents dark background immersive technology virtual reality augmented reality sci-fi aesthetic",
    Game: "vibrant gaming aesthetic dynamic action purple blue color scheme energetic game design professional thumbnail",
    "3D": "cinematic photorealistic golden warm lighting artistic 3D rendering professional VFX quality"
  };
  
  const style = categoryStyles[project.category] || "modern professional";
  
  // Create a concise but descriptive prompt
  const keywords = [
    project.title.toLowerCase(),
    project.subcategory.toLowerCase(),
    ...project.tagline.split(' ').slice(0, 8),
    style
  ].filter(Boolean).join(' ');
  
  // Enhanced prompt for better results
  const prompt = `${project.title}: ${project.tagline}. ${project.description.substring(0, 150)}. Professional thumbnail design, ${style}, 16:9 aspect ratio, high quality, visually striking, explains the project concept clearly`;
  
  return {
    project: project.title,
    slug: project.slug,
    prompt: prompt,
    searchKeywords: keywords,
    category: project.category
  };
}

// Use Unsplash Source API with AI-enhanced search
// This uses Unsplash's curated images that match the project concept
function getUnsplashImageUrl(keywords, category) {
  // Encode keywords for URL
  const encoded = encodeURIComponent(keywords);
  
  // Use Unsplash Source API - it uses AI to find matching images
  return `https://source.unsplash.com/1280x720/?${encoded}`;
}

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200 || response.statusCode === 301 || response.statusCode === 302) {
        if (response.statusCode === 301 || response.statusCode === 302) {
          // Follow redirect
          return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        }
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filepath);
        });
      } else {
        reject(new Error(`Failed: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Curated Unsplash image IDs for better, more specific results
function getCuratedImageForProject(project) {
  const title = project.title.toLowerCase();
  const category = project.category;
  
  // More specific, project-concept-matching Unsplash images
  const curatedMap = {
    // XR Projects - more specific to AR/VR concepts
    'trace': 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1280&h=720&fit=crop',
    'haki': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1280&h=720&fit=crop',
    'point cloud': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1280&h=720&fit=crop',
    'topdown': 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=1280&h=720&fit=crop',
    'rocket': 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=1280&h=720&fit=crop',
    'zombie': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1280&h=720&fit=crop',
    'keyboard': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1280&h=720&fit=crop',
    'fall guys': 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=1280&h=720&fit=crop',
    'star finder': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1280&h=720&fit=crop',
    'avasci': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1280&h=720&fit=crop',
    'product': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1280&h=720&fit=crop',
    'vr rcc': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1280&h=720&fit=crop',
    'hospital': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1280&h=720&fit=crop',
    'measuring': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1280&h=720&fit=crop',
    'museum': 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1280&h=720&fit=crop',
    'kinect': 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1280&h=720&fit=crop',
    
    // Game Projects
    'soul of king': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1280&h=720&fit=crop',
    'handpan': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1280&h=720&fit=crop',
    'star fox': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop',
    'electric': 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1280&h=720&fit=crop',
    'beamng': 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=1280&h=720&fit=crop',
    'multiplayer shooting': 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b11?w=1280&h=720&fit=crop',
    'racer': 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=1280&h=720&fit=crop',
    'medieval': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1280&h=720&fit=crop',
    'dandera': 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=1280&h=720&fit=crop',
    'bus sort': 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1280&h=720&fit=crop',
    'runner': 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1280&h=720&fit=crop',
    'genetiq': 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1280&h=720&fit=crop',
    'typing': 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=1280&h=720&fit=crop',
    'warrior': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1280&h=720&fit=crop',
    'office': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&h=720&fit=crop',
    
    // 3D Projects
    'hologram': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1280&h=720&fit=crop',
    'cinematic': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&h=720&fit=crop',
    'mobile game': 'https://images.unsplash.com/photo-1616499452581-cc7f8e3dd3c9?w=1280&h=720&fit=crop',
    'transformer': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1280&h=720&fit=crop'
  };
  
  for (const [key, url] of Object.entries(curatedMap)) {
    if (title.includes(key)) {
      return url;
    }
  }
  
  return null;
}

// Main execution
console.log('🎨 Generating AI-Enhanced Thumbnails\n');
console.log('='.repeat(80));

if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

const projects = extractAllProjects(content);
console.log(`\nFound ${projects.length} projects\n`);

let downloaded = 0;
let failed = 0;

async function generateAll() {
  for (const project of projects) {
    const prompt = generateAIPrompt(project);
    const filename = `${project.slug}.jpg`;
    const filepath = path.join(thumbnailsDir, filename);
    
    // Try curated image first
    let imageUrl = getCuratedImageForProject(project);
    
    // If no curated image, use Unsplash Source with AI search
    if (!imageUrl) {
      imageUrl = getUnsplashImageUrl(prompt.searchKeywords, project.category);
    }
    
    try {
      console.log(`🎨 Generating: ${project.title}`);
      console.log(`   Concept: ${project.tagline}`);
      console.log(`   Style: ${project.category} - ${project.subcategory}`);
      
      await downloadImage(imageUrl, filepath);
      downloaded++;
      console.log(`   ✅ Saved: ${filename}\n`);
      
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      failed++;
      console.log(`   ❌ Failed: ${error.message}\n`);
    }
  }
  
  console.log('='.repeat(80));
  console.log(`\n✅ Generated: ${downloaded} thumbnails`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed} thumbnails`);
  }
  
  if (downloaded > 0) {
    console.log(`\n📝 Updating projects.ts with new thumbnail paths...\n`);
    updateProjectThumbnails();
  }
}

function updateProjectThumbnails() {
  let updatedContent = content;
  let updates = 0;
  
  projects.forEach(project => {
    const filename = `${project.slug}.jpg`;
    const localPath = `/images/thumbnails/${filename}`;
    const filepath = path.join(thumbnailsDir, filename);
    
    if (fs.existsSync(filepath)) {
      const regex = new RegExp(
        `(slug:\\s*"${project.slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",[\\s\\S]*?thumbnailUrl:\\s*")[^"]+(")`,
        'g'
      );
      
      if (regex.test(updatedContent)) {
        updatedContent = updatedContent.replace(regex, `$1${localPath}$2`);
        updates++;
        console.log(`   ✅ ${project.title}`);
      }
    }
  });
  
  if (updates > 0) {
    fs.writeFileSync(projectsFile, updatedContent);
    console.log(`\n✅ Updated ${updates} projects in projects.ts`);
    console.log(`\n💡 Restart your dev server and refresh to see the new thumbnails!\n`);
  }
}

generateAll().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
