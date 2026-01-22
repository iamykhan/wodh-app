/**
 * AI Thumbnail Generator
 * Generates AI-powered thumbnail prompts and updates project data
 * Uses project descriptions to create better thumbnail URLs
 */

const fs = require('fs');
const path = require('path');

// Read the projects data file
const projectsFile = path.join(__dirname, 'src/data/projects.ts');
const projectsContent = fs.readFileSync(projectsFile, 'utf8');

// Extract project data using regex (simple approach)
function extractProjects(content) {
  const projects = [];
  const projectRegex = /id:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",[\s\S]*?tagline:\s*"([^"]+)",[\s\S]*?description:\s*"([^"]+)",[\s\S]*?thumbnailUrl:\s*"([^"]+)",/g;
  
  let match;
  while ((match = projectRegex.exec(content)) !== null) {
    projects.push({
      id: match[1],
      title: match[2],
      category: match[3],
      tagline: match[4],
      description: match[5],
      currentThumbnail: match[6]
    });
  }
  
  return projects;
}

// Generate AI thumbnail prompt
function generateAIPrompt(project) {
  const categoryThemes = {
    XR: "futuristic immersive virtual reality augmented reality high-tech neon green dark background",
    Game: "gaming interactive dynamic action-packed vibrant colors purple blue energetic",
    "3D": "3D rendering cinematic photorealistic artistic detailed golden warm lighting"
  };

  const theme = categoryThemes[project.category] || "modern professional";
  
  // Create a concise prompt for image generation
  const keywords = [
    project.title.toLowerCase(),
    project.subcategory?.toLowerCase() || "",
    ...project.tagline.split(' ').slice(0, 5),
    theme
  ].filter(Boolean).join(' ');

  return {
    prompt: `${project.title}: ${project.tagline}. ${project.description.substring(0, 100)}. Style: ${theme}`,
    searchKeywords: keywords,
    unsplashQuery: encodeURIComponent(keywords)
  };
}

// Generate better Unsplash URLs based on project themes
function generateBetterThumbnail(project) {
  const prompts = generateAIPrompt(project);
  
  // Use Unsplash Source API with AI-enhanced search
  // Format: https://source.unsplash.com/1200x675/?{keywords}
  const unsplashUrl = `https://source.unsplash.com/1200x675/?${prompts.unsplashQuery}`;
  
  // Alternative: Use specific curated Unsplash image IDs based on project type
  const curatedImages = getCuratedImageForProject(project);
  
  return {
    ...project,
    aiPrompt: prompts.prompt,
    searchKeywords: prompts.searchKeywords,
    suggestedThumbnail: curatedImages || unsplashUrl,
    currentThumbnail: project.currentThumbnail
  };
}

// Get curated Unsplash image IDs based on project type and description
function getCuratedImageForProject(project) {
  const title = project.title.toLowerCase();
  const category = project.category;
  
  // Curated Unsplash image IDs for better results
  const curatedMap = {
    // XR Projects
    'zombie': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=85',
    'multiplayer shooting': 'https://images.unsplash.com/photo-1552820728-8b83bb6b2b11?auto=format&fit=crop&w=1200&q=85',
    'trace': 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85',
    'haki': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85',
    'point cloud': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=85',
    'topdown': 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1200&q=85',
    'rocket': 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1200&q=85',
    'keyboard': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85',
    'fall guys': 'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=1200&q=85',
    'star finder': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1200&q=85',
    'avasci': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=85',
    'product': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85',
    'vr rcc': 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=85',
    'hospital': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85',
    'measuring': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85',
    'museum': 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=1200&q=85',
    'kinect': 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=85',
    
    // Game Projects
    'soul of king': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=85',
    'handpan': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=85',
    'star fox': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
    'electric': 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=85',
    'beamng': 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1200&q=85',
    'racer': 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=1200&q=85',
    'medieval': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
    'dandera': 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=85',
    'bus sort': 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=85',
    'runner': 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=85',
    'genetiq': 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=85',
    'typing': 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&w=1200&q=85',
    'warrior': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=85',
    'office': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85',
    
    // 3D Projects
    'hologram': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
    'cinematic': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=85',
    'mobile game': 'https://images.unsplash.com/photo-1616499452581-cc7f8e3dd3c9?auto=format&fit=crop&w=1200&q=85',
    'transformer': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85'
  };
  
  // Find matching curated image
  for (const [key, url] of Object.entries(curatedMap)) {
    if (title.includes(key)) {
      return url;
    }
  }
  
  return null;
}

// Main execution
console.log('🎨 AI Thumbnail Generator\n');
console.log('Generating improved thumbnails for all projects...\n');

try {
  const projects = extractProjects(projectsContent);
  
  console.log(`Found ${projects.length} projects\n`);
  console.log('='.repeat(80));
  
  const updatedProjects = projects.map(project => {
    const enhanced = generateBetterThumbnail(project);
    console.log(`\n📸 ${enhanced.title}`);
    console.log(`   Category: ${enhanced.category}`);
    console.log(`   AI Prompt: ${enhanced.aiPrompt.substring(0, 100)}...`);
    console.log(`   Search Keywords: ${enhanced.searchKeywords}`);
    console.log(`   Current: ${enhanced.currentThumbnail.substring(0, 60)}...`);
    console.log(`   Suggested: ${enhanced.suggestedThumbnail.substring(0, 60)}...`);
    
    return enhanced;
  });
  
  console.log('\n' + '='.repeat(80));
  console.log(`\n✅ Generated ${updatedProjects.length} AI thumbnail suggestions`);
  console.log('\n💡 Next Steps:');
  console.log('   1. Review the suggested thumbnails above');
  console.log('   2. Use an AI image generation service (DALL-E, Midjourney, etc.) with the prompts');
  console.log('   3. Or use the suggested Unsplash URLs');
  console.log('   4. Update the thumbnailUrl in src/data/projects.ts with the new images\n');
  
  // Save suggestions to a JSON file for reference
  const outputFile = path.join(__dirname, 'thumbnail-suggestions.json');
  fs.writeFileSync(outputFile, JSON.stringify(updatedProjects, null, 2));
  console.log(`📄 Suggestions saved to: ${outputFile}\n`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
