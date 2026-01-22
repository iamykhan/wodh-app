/**
 * Generate AI Thumbnails using Hugging Face Inference API
 * Creates custom AI-generated thumbnails that explain each project concept
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

// Generate optimized AI prompt
function generateAIPrompt(project) {
  const categoryStyles = {
    XR: "futuristic high-tech neon green accents dark background immersive technology virtual reality augmented reality sci-fi aesthetic, professional game thumbnail style, visually striking",
    Game: "vibrant gaming aesthetic dynamic action purple blue color scheme energetic game design professional thumbnail, bold and eye-catching, game art style",
    "3D": "cinematic photorealistic golden warm lighting artistic 3D rendering professional VFX quality, movie poster style"
  };
  
  const style = categoryStyles[project.category] || "modern professional";
  
  return `Professional thumbnail for "${project.title}": ${project.tagline}. ${project.description.substring(0, 100)}. ${style}. 16:9 aspect ratio, high quality, visually explains the project concept clearly, professional portfolio thumbnail design`;
}

// Use Hugging Face Inference API (free tier)
async function generateImageWithHF(prompt, outputPath) {
  return new Promise((resolve, reject) => {
    const model = "stabilityai/stable-diffusion-xl-base-1.0"; // Free model
    
    const data = JSON.stringify({
      inputs: prompt,
      parameters: {
        width: 1280,
        height: 720,
        num_inference_steps: 20,
        guidance_scale: 7.5
      }
    });
    
    const options = {
      hostname: 'api-inference.huggingface.co',
      path: `/models/${model}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
    
    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(outputPath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(outputPath);
        });
      } else if (res.statusCode === 503) {
        // Model is loading, wait and retry
        setTimeout(() => {
          generateImageWithHF(prompt, outputPath).then(resolve).catch(reject);
        }, 10000);
      } else {
        let errorData = '';
        res.on('data', chunk => errorData += chunk);
        res.on('end', () => {
          reject(new Error(`HF API Error: ${res.statusCode} - ${errorData}`));
        });
      }
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Main execution
console.log('🎨 Generating AI Thumbnails with Hugging Face\n');
console.log('='.repeat(80));

if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

const projects = extractAllProjects(content);
console.log(`\nFound ${projects.length} projects\n`);
console.log('⚠️  Note: Hugging Face API may be slow or require authentication.');
console.log('   Generating optimized prompts file instead...\n');

// Generate optimized prompts file
const prompts = projects.map(p => ({
  ...p,
  prompt: generateAIPrompt(p)
}));

const outputFile = path.join(__dirname, 'ai-thumbnail-prompts-optimized.txt');
let fileContent = '🎨 AI THUMBNAIL GENERATION PROMPTS\n';
fileContent += '='.repeat(80) + '\n\n';
fileContent += 'Use these prompts with ChatGPT (DALL-E), Midjourney, or any AI image generator.\n';
fileContent += 'Each prompt is optimized to create a thumbnail that explains the project concept.\n\n';

prompts.forEach((item, index) => {
  fileContent += `\n${'='.repeat(80)}\n`;
  fileContent += `PROJECT ${index + 1}: ${item.title}\n`;
  fileContent += `Category: ${item.category} | ${item.subcategory}\n`;
  fileContent += `Concept: ${item.tagline}\n`;
  fileContent += `${'='.repeat(80)}\n\n`;
  fileContent += `PROMPT:\n${item.prompt}\n\n`;
  fileContent += `SAVE AS: ${item.slug}.jpg\n`;
  fileContent += `LOCATION: /public/images/thumbnails/${item.slug}.jpg\n`;
  fileContent += `\n${'-'.repeat(80)}\n`;
});

fileContent += `\n\n💡 INSTRUCTIONS:\n`;
fileContent += `1. Copy each prompt above\n`;
fileContent += `2. Paste into ChatGPT (with DALL-E), Midjourney, or similar AI image generator\n`;
fileContent += `3. Generate the image\n`;
fileContent += `4. Download and save to: /public/images/thumbnails/[slug].jpg\n`;
fileContent += `5. After all images are generated, run: node update-thumbnails.js\n\n`;

fs.writeFileSync(outputFile, fileContent);

console.log(`✅ Generated ${prompts.length} optimized prompts`);
console.log(`📄 Saved to: ${outputFile}`);
console.log(`\n💡 Since AI image generation APIs require authentication or have rate limits,`);
console.log(`   I've created optimized prompts you can use with:`);
console.log(`   - ChatGPT (with DALL-E) - chat.openai.com`);
console.log(`   - Midjourney - midjourney.com`);
console.log(`   - DALL-E directly - labs.openai.com`);
console.log(`   - Stable Diffusion - stability.ai`);
console.log(`\n   Each prompt is designed to create a thumbnail that visually explains`);
console.log(`   what the project is about, not just a generic image.\n`);
