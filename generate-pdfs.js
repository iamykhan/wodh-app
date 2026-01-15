const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3002';

const PAGES = [
  { name: '01-Home', path: '/' },
  { name: '02-About-Us', path: '/about-us' },
  { name: '03-Careers', path: '/careers' },
  { name: '04-Contact', path: '/contact' },
  { name: '05-Industries', path: '/industries' },
  { name: '06-Portfolio-Finale', path: '/portfoliofinale' },
  { name: '07-Service-Hub', path: '/servicehubfinal' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generatePDFs() {
  const outputDir = path.join(__dirname, 'pdf-export');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  console.log('Generating PDFs...\n');

  for (const page of PAGES) {
    const browserPage = await browser.newPage();
    
    await browserPage.setViewport({ width: 1440, height: 900 });
    
    const url = `${BASE_URL}${page.path}`;
    console.log(`📄 Capturing: ${page.name} (${url})`);
    
    try {
      await browserPage.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 60000 
      });
      
      // Wait for any animations to complete
      await delay(3000);
      
      const pdfPath = path.join(outputDir, `${page.name}.pdf`);
      
      await browserPage.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' }
      });
      
      console.log(`   ✅ Saved: ${pdfPath}\n`);
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}\n`);
    }
    
    await browserPage.close();
  }

  await browser.close();
  
  console.log('\n🎉 All PDFs generated in:', outputDir);
}

generatePDFs().catch(console.error);
