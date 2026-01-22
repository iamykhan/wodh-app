const fs = require('fs');
const path = require('path');
const https = require('https');

// Failed projects to retry
const failedProjects = [
  {
    slug: 'haki-scaffolding-vr',
    title: 'HAKI Scaffolding VR',
    prompt: 'Industrial VR training simulation, worker in virtual reality headset on metal scaffolding structure, safety training environment, neon green highlights, dark industrial atmosphere, professional game thumbnail'
  },
  {
    slug: 'hospital-vr-simulation',
    title: 'Hospital VR Simulation',
    prompt: 'Medical VR simulation, doctor in virtual reality practicing surgery, holographic patient anatomy, clean medical environment, blue neon medical UI elements, professional healthcare thumbnail'
  },
  {
    slug: 'beam-ng-destruction-system',
    title: 'BeamNG Destruction System',
    prompt: 'Car crash physics simulation, vehicle with realistic deformation and crumpling metal, slow motion destruction, dramatic lighting, professional game thumbnail'
  },
  {
    slug: '3d-world-hologram-shader',
    title: '3D World Hologram Shader',
    prompt: 'Holographic 3D globe with shader effects, scan lines chromatic aberration, cyan and magenta hologram colors, dark background, Blender 3D art style, professional thumbnail'
  }
];

const thumbnailsDir = path.join(__dirname, 'public', 'images', 'thumbnails');

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    const request = https.get(url, { 
      timeout: 120000, // 2 minute timeout
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(filepath);
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    });
    
    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      reject(err);
    });
    
    request.on('timeout', () => {
      request.destroy();
      file.close();
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      reject(new Error('Request timed out'));
    });
  });
}

async function generateImage(project) {
  const encodedPrompt = encodeURIComponent(project.prompt);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1792&height=1024&nologo=true`;
  const filepath = path.join(thumbnailsDir, `${project.slug}.jpg`);
  
  console.log(`\n🎨 Generating: ${project.title}`);
  console.log(`   URL: ${url.substring(0, 80)}...`);
  
  try {
    await downloadImage(url, filepath);
    
    const stats = fs.statSync(filepath);
    if (stats.size < 1000) {
      throw new Error('Generated image too small');
    }
    
    console.log(`   ✅ Success! (${(stats.size / 1024).toFixed(1)} KB)`);
    return true;
  } catch (error) {
    console.log(`   ❌ Failed: ${error.message}`);
    return false;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('🔄 Retrying failed thumbnails...');
  console.log('='.repeat(60));
  
  let successCount = 0;
  
  for (let i = 0; i < failedProjects.length; i++) {
    const project = failedProjects[i];
    console.log(`[${i + 1}/${failedProjects.length}]`);
    
    const success = await generateImage(project);
    if (success) successCount++;
    
    if (i < failedProjects.length - 1) {
      await delay(3000);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Generated: ${successCount}/${failedProjects.length} thumbnails`);
  
  // Update projects.ts
  if (successCount > 0) {
    console.log('\n📝 Updating projects.ts...');
    const projectsFilePath = path.join(__dirname, 'src', 'data', 'projects.ts');
    let content = fs.readFileSync(projectsFilePath, 'utf8');
    
    for (const project of failedProjects) {
      const thumbnailPath = `/images/thumbnails/${project.slug}.jpg`;
      const filepath = path.join(thumbnailsDir, `${project.slug}.jpg`);
      
      if (fs.existsSync(filepath)) {
        const slugRegex = new RegExp(`(slug:\\s*["']${project.slug}["'][\\s\\S]*?thumbnailUrl:\\s*)["'][^"']*["']`, 'g');
        content = content.replace(slugRegex, `$1"${thumbnailPath}"`);
      }
    }
    
    fs.writeFileSync(projectsFilePath, content);
    console.log('   ✅ projects.ts updated!');
  }
  
  console.log('\n🎉 Done!');
}

main().catch(console.error);
