const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'C:\\construction_code\\3Pracross\\client\\public';

// Recursive function — subfolders mein bhi jaayegi
function compressImages(folderPath) {
  const files = fs.readdirSync(folderPath);

  files.forEach(file => {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);

    // Agar folder hai toh andar jao
    if (stat.isDirectory()) {
      console.log(`📂 Entering folder: ${file}`);
      compressImages(fullPath);
      return;
    }

    const ext = path.extname(file).toLowerCase();

    if (ext === '.jpg' || ext === '.jpeg') {
      const tempPath = fullPath + '.tmp';
      sharp(fullPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 75 })
        .toFile(tempPath)
        .then(() => {
          fs.renameSync(tempPath, fullPath);
          console.log(`✅ Compressed: ${fullPath}`);
        })
        .catch(err => console.error(`❌ Error: ${file}`, err));
    }

    if (ext === '.png') {
      const tempPath = fullPath + '.tmp';
      sharp(fullPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .png({ quality: 75, compressionLevel: 8 })
        .toFile(tempPath)
        .then(() => {
          fs.renameSync(tempPath, fullPath);
          console.log(`✅ Compressed: ${fullPath}`);
        })
        .catch(err => console.error(`❌ Error: ${file}`, err));
    }
  });
}

console.log('🚀 Starting compression...');
compressImages(inputDir);