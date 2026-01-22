/**
 * Generate AI Thumbnails using OpenAI DALL-E API
 * Creates custom AI-generated thumbnails that explain each project concept
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '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';

const projectsFile = path.join(__dirname, 'src/data/projects.ts');
const thumbnailsDir = path.join(__dirname, 'public/images/thumbnails');
const content = fs.readFileSync(projectsFile, 'utf8');

// Ensure thumbnails directory exists
if (!fs.existsSync(thumbnailsDir)) {
  fs.mkdirSync(thumbnailsDir, { recursive: true });
}

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

// Generate optimized DALL-E prompt
function generateDALLEPrompt(project) {
  const categoryStyles = {
    XR: "futuristic cyberpunk style, neon green and cyan accents, dark background with glowing elements, holographic displays, augmented reality visualization, high-tech immersive technology aesthetic",
    Game: "vibrant gaming art style, dynamic composition, purple and blue color scheme with energy effects, professional game thumbnail design, bold and eye-catching, action-packed",
    "3D": "cinematic photorealistic 3D render, golden hour lighting, professional VFX quality, movie poster composition, artistic and dramatic"
  };
  
  const style = categoryStyles[project.category] || "modern professional tech aesthetic";
  
  // Create a focused, descriptive prompt for DALL-E
  let prompt = `Professional thumbnail image for "${project.title}". `;
  prompt += `Concept: ${project.tagline}. `;
  prompt += `Visual style: ${style}. `;
  prompt += `The image should clearly represent ${project.subcategory.toLowerCase()} technology. `;
  prompt += `High quality, 16:9 aspect ratio composition, visually striking design suitable for a tech portfolio website. No text or words in the image.`;
  
  return prompt;
}

// Generate image using DALL-E API
async function generateImage(prompt, outputPath) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1792x1024",
      quality: "standard",
      response_format: "url"
    });

    const options = {
      hostname: 'api.openai.com',
      path: '/v1/images/generations',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(responseData);
          
          if (response.error) {
            reject(new Error(response.error.message));
            return;
          }
          
          if (response.data && response.data[0] && response.data[0].url) {
            // Download the generated image
            downloadImage(response.data[0].url, outputPath)
              .then(resolve)
              .catch(reject);
          } else {
            reject(new Error('No image URL in response'));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message} - Response: ${responseData.substring(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filepath);
        });
        fileStream.on('error', reject);
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      } else {
        reject(new Error(`Download failed: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

// Update projects.ts with new thumbnail paths
function updateProjectThumbnails(projects) {
  let updatedContent = content;
  let updates = 0;
  
  projects.forEach(project => {
    const filename = `${project.slug}.png`;
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
      }
    }
  });
  
  if (updates > 0) {
    fs.writeFileSync(projectsFile, updatedContent);
    console.log(`\n✅ Updated ${updates} projects in projects.ts`);
  }
  
  return updates;
}

// Main execution
async function main() {
  console.log('🎨 Generating AI Thumbnails with DALL-E 3\n');
  console.log('='.repeat(80));
  
  const projects = extractAllProjects(content);
  console.log(`\nFound ${projects.length} projects to generate thumbnails for\n`);
  
  let generated = 0;
  let failed = 0;
  const failedProjects = [];
  
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const filename = `${project.slug}.png`;
    const filepath = path.join(thumbnailsDir, filename);
    
    // Skip if already exists (comment out to regenerate all)
    // if (fs.existsSync(filepath)) {
    //   console.log(`⏭️  Skipping ${project.title} (already exists)`);
    //   continue;
    // }
    
    const prompt = generateDALLEPrompt(project);
    
    console.log(`\n[${i + 1}/${projects.length}] 🎨 Generating: ${project.title}`);
    console.log(`   Category: ${project.category} | ${project.subcategory}`);
    console.log(`   Prompt: ${prompt.substring(0, 100)}...`);
    
    try {
      await generateImage(prompt, filepath);
      generated++;
      console.log(`   ✅ Saved: ${filename}`);
      
      // Rate limiting - wait between requests
      if (i < projects.length - 1) {
        console.log(`   ⏳ Waiting 15 seconds before next request...`);
        await new Promise(resolve => setTimeout(resolve, 15000));
      }
    } catch (error) {
      failed++;
      failedProjects.push({ project, error: error.message });
      console.log(`   ❌ Failed: ${error.message}`);
      
      // If rate limited, wait longer
      if (error.message.includes('rate') || error.message.includes('limit')) {
        console.log(`   ⏳ Rate limited. Waiting 60 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 60000));
      }
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log(`\n✅ Generated: ${generated} thumbnails`);
  
  if (failed > 0) {
    console.log(`❌ Failed: ${failed} thumbnails`);
    console.log('\nFailed projects:');
    failedProjects.forEach(({ project, error }) => {
      console.log(`   - ${project.title}: ${error}`);
    });
  }
  
  if (generated > 0) {
    console.log('\n📝 Updating projects.ts with new thumbnail paths...');
    const updates = updateProjectThumbnails(projects);
    
    console.log('\n💡 Next steps:');
    console.log('   1. Restart your dev server');
    console.log('   2. Refresh your browser');
    console.log('   3. Check the portfolio page to see the new AI-generated thumbnails!\n');
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
