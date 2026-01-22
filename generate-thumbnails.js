/**
 * AI Thumbnail Generator Script
 * This script helps generate AI-based thumbnail prompts for each project
 * You can use these prompts with services like:
 * - DALL-E API
 * - Midjourney
 * - Stable Diffusion
 * - Unsplash AI search
 */

const { ALL_PROJECTS } = require('./src/data/projects.ts');

function generateThumbnailPrompt(project) {
  const categoryThemes = {
    XR: "futuristic, immersive, virtual reality, augmented reality, high-tech",
    Game: "gaming, interactive, dynamic, action-packed, vibrant colors",
    "3D": "3D rendering, cinematic, photorealistic, artistic, detailed"
  };

  const theme = categoryThemes[project.category] || "modern, professional";
  
  return `Create a thumbnail image for "${project.title}": ${project.description}. 
Style: ${theme}, ${project.subcategory.toLowerCase()}, 
${project.tagline}. 
Visual elements: ${project.features.slice(0, 3).join(", ")}. 
Color scheme: ${project.category === "XR" ? "neon green, dark background" : project.category === "Game" ? "vibrant purple, dynamic" : "golden, cinematic"}. 
Format: 16:9 aspect ratio, high quality, professional game/tech thumbnail style.`;
}

// Generate prompts for all projects
console.log("=== AI Thumbnail Generation Prompts ===\n");

ALL_PROJECTS.forEach((project, index) => {
  console.log(`\n${index + 1}. ${project.title}`);
  console.log(`Prompt: ${generateThumbnailPrompt(project)}`);
  console.log(`Current Thumbnail: ${project.thumbnailUrl}`);
  console.log(`YouTube ID: ${project.youtubeId || "N/A"}`);
  console.log("---");
});

// Export function for use in other scripts
module.exports = { generateThumbnailPrompt };
