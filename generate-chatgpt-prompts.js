/**
 * Generate ChatGPT/DALL-E Prompts from YouTube Thumbnails
 * This script creates detailed prompts you can paste into ChatGPT to generate custom thumbnails
 */

const fs = require('fs');
const path = require('path');

// Read projects data
const projectsFile = path.join(__dirname, 'src/data/projects.ts');
const content = fs.readFileSync(projectsFile, 'utf8');

// Extract project data
function extractProjects(content) {
  const projects = [];
  
  // Match project objects
  const projectRegex = /{\s*id:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",[\s\S]*?subcategory:\s*"([^"]+)",[\s\S]*?tagline:\s*"([^"]+)",[\s\S]*?description:\s*"([^"]+)",[\s\S]*?youtubeId:\s*"([^"]*)",[\s\S]*?thumbnailUrl:\s*"([^"]+)",/g;
  
  let match;
  while ((match = projectRegex.exec(content)) !== null) {
    projects.push({
      id: match[1],
      title: match[2],
      category: match[3],
      subcategory: match[4],
      tagline: match[5],
      description: match[6],
      youtubeId: match[7],
      currentThumbnail: match[8]
    });
  }
  
  return projects;
}

// Generate ChatGPT prompt for image generation
function generateChatGPTPrompt(project) {
  const youtubeThumbnail = project.youtubeId 
    ? `https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`
    : 'No YouTube video available';
  
  const categoryStyle = {
    XR: "futuristic, high-tech, neon green accents, dark background, immersive technology aesthetic",
    Game: "vibrant gaming aesthetic, dynamic action, purple/blue color scheme, energetic",
    "3D": "cinematic, photorealistic, golden warm lighting, artistic 3D rendering"
  };
  
  const style = categoryStyle[project.category] || "modern, professional";
  
  const prompt = `Create a professional thumbnail image for "${project.title}" - ${project.tagline}

Project Description: ${project.description.substring(0, 200)}

Style Requirements:
- ${style}
- Category: ${project.subcategory}
- Aspect Ratio: 16:9 (1280x720 pixels)
- High quality, professional game/tech thumbnail style
- Bold, eye-catching design
- Clear visual representation of the project concept

Reference: YouTube thumbnail at ${youtubeThumbnail} (use this as inspiration but create a unique, improved version)

The thumbnail should clearly communicate what the project is about and be visually appealing for a portfolio website.`;

  return {
    project: project.title,
    youtubeThumbnail,
    prompt,
    category: project.category,
    subcategory: project.subcategory
  };
}

// Main execution
console.log('🎨 ChatGPT/DALL-E Thumbnail Generation Prompts\n');
console.log('='.repeat(80));
console.log('\nCopy these prompts into ChatGPT (with DALL-E) or DALL-E directly:\n');

try {
  const projects = extractProjects(content);
  const prompts = projects
    .filter(p => p.youtubeId) // Only projects with YouTube videos
    .map(generateChatGPTPrompt);
  
  // Generate individual prompts
  prompts.forEach((item, index) => {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`\n📸 PROJECT ${index + 1}: ${item.project}`);
    console.log(`Category: ${item.category} | ${item.subcategory}`);
    console.log(`\nYouTube Thumbnail Reference: ${item.youtubeThumbnail}`);
    console.log(`\n🤖 CHATGPT/DALL-E PROMPT:`);
    console.log(`\n${item.prompt}`);
    console.log(`\n${'-'.repeat(80)}`);
  });
  
  // Save to file
  const outputFile = path.join(__dirname, 'chatgpt-thumbnail-prompts.json');
  fs.writeFileSync(outputFile, JSON.stringify(prompts, null, 2));
  
  console.log(`\n\n✅ Generated ${prompts.length} prompts`);
  console.log(`📄 All prompts saved to: ${outputFile}`);
  console.log(`\n💡 Instructions:`);
  console.log(`   1. Open ChatGPT (with DALL-E) or DALL-E directly`);
  console.log(`   2. Copy each prompt above`);
  console.log(`   3. Generate the image`);
  console.log(`   4. Download the generated image`);
  console.log(`   5. Save to /public/images/thumbnails/[project-slug].jpg`);
  console.log(`   6. Update thumbnailUrl in projects.ts to point to the new image\n`);
  
  // Generate batch prompt file
  const batchPromptFile = path.join(__dirname, 'chatgpt-batch-prompts.txt');
  const batchContent = prompts.map((item, i) => 
    `\n${'='.repeat(60)}\nPROJECT ${i + 1}: ${item.project}\n${'='.repeat(60)}\n\n${item.prompt}\n`
  ).join('\n');
  
  fs.writeFileSync(batchPromptFile, batchContent);
  console.log(`📄 Batch prompts file created: ${batchPromptFile}`);
  console.log(`   (You can copy all prompts at once from this file)\n`);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error(error.stack);
  process.exit(1);
}
