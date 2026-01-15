const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

const PDF_DIR = path.join(__dirname, 'pdf-export');

const PDF_FILES = [
  '01-Home.pdf',
  '02-About-Us.pdf',
  '03-Careers.pdf',
  '04-Contact.pdf',
  '05-Industries.pdf',
  '06-Portfolio-Finale.pdf',
  '07-Service-Hub.pdf',
];

async function mergePDFs() {
  console.log('Merging PDFs...\n');
  
  const mergedPdf = await PDFDocument.create();
  
  for (const filename of PDF_FILES) {
    const filepath = path.join(PDF_DIR, filename);
    
    if (!fs.existsSync(filepath)) {
      console.log(`⚠️  Skipping ${filename} (not found)`);
      continue;
    }
    
    console.log(`📄 Adding: ${filename}`);
    
    const pdfBytes = fs.readFileSync(filepath);
    const pdf = await PDFDocument.load(pdfBytes);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    
    pages.forEach(page => mergedPdf.addPage(page));
  }
  
  const mergedPdfBytes = await mergedPdf.save();
  const outputPath = path.join(PDF_DIR, 'WODH-Complete-Website.pdf');
  
  fs.writeFileSync(outputPath, mergedPdfBytes);
  
  console.log(`\n✅ Merged PDF saved: ${outputPath}`);
  console.log(`📊 Total pages: ${mergedPdf.getPageCount()}`);
}

mergePDFs().catch(console.error);
