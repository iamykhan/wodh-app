/**
 * Generate AI Thumbnails using Replicate API
 * Creates custom AI-generated thumbnails that explain each project concept
 */

const fs = require('fs');
const path = require('path');

const projectsFile = path.join(__dirname, 'src/data/projects.ts');
const thumbnailsDir = path.join(__dirname, 'public/images/thumbnails');
const content = fs.readFileSync(projectsFile, 'utf8');

// Extract all projects
function extractAllProjects(content) {
  const projects = [];
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

// Generate detailed prompt for AI image generation
function generateAIPrompt(project) {
  const categoryStyles = {
    XR: "futuristic high-tech neon green accents dark background immersive technology virtual reality augmented reality sci-fi aesthetic, professional game thumbnail style",
    Game: "vibrant gaming aesthetic dynamic action purple blue color scheme energetic game design professional thumbnail, bold and eye-catching",
    "3D": "cinematic photorealistic golden warm lighting artistic 3D rendering professional VFX quality, movie poster style"
  };
  
  const style = categoryStyles[project.category] || "modern professional";
  
  // Create a comprehensive prompt
  const prompt = `Professional thumbnail image for "${project.title}" - ${project.tagline}. ${project.description.substring(0, 120)}. ${style}. 16:9 aspect ratio, high quality, visually striking design that clearly explains the project concept, professional game/tech portfolio thumbnail`;
  
  return {
    project: project.title,
    slug: project.slug,
    prompt: prompt,
    category: project.category
  };
}

// Generate prompts file for manual generation
function generatePromptsFile(projects) {
  const prompts = projects.map(generateAIPrompt);
  
  console.log('🎨 AI Thumbnail Generation Prompts\n');
  console.log('='.repeat(80));
  console.log('\nSince we need actual AI image generation, here are optimized prompts');
  console.log('you can use with ChatGPT/DALL-E, Midjourney, or other AI image generators:\n');
  
  prompts.forEach((item, index) => {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`\n📸 PROJECT ${index + 1}: ${item.project}`);
    console.log(`Category: ${item.category}`);
    console.log(`\n🤖 AI PROMPT:`);
    console.log(`\n${item.prompt}`);
    console.log(`\n💾 Save as: ${item.slug}.jpg`);
    console.log(`\n${'-'.repeat(80)}`);
  });
  
  // Save to file
  const outputFile = path.join(__dirname, 'ai-thumbnail-prompts-final.txt');
  const fileContent = prompts.map((item, i) => 
    `\n${'='.repeat(60)}\nPROJECT ${i + 1}: ${item.project}\n${'='.repeat(60)}\n\n${item.prompt}\n\nSave as: ${item.slug}.jpg\n`
  ).join('\n');
  
  fs.writeFileSync(outputFile, fileContent);
  console.log(`\n\n✅ Generated ${prompts.length} prompts`);
  console.log(`📄 All prompts saved to: ${outputFile}`);
  console.log(`\n💡 Instructions:`);
  console.log(`   1. Use these prompts with ChatGPT (DALL-E), Midjourney, or similar`);
  console.log(`   2. Generate images for each project`);
  console.log(`   3. Save them to: /public/images/thumbnails/[slug].jpg`);
  console.log(`   4. Run: node update-thumbnails.js to update the project data\n`);
}

// Main execution
const projects = extractAllProjects(content);
generatePromptsFile(projects);
