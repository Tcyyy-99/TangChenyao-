import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, '../public/images');
const maxWidth = 1200;
const quality = 85;

async function compressImage(filePath) {
  const size = fs.statSync(filePath).size;
  const sizeKB = (size / 1024).toFixed(0);
  
  if (size < 300000) {
    console.log(`跳过: ${path.basename(filePath)} (${sizeKB}KB - 已够小)`);
    return;
  }
  
  console.log(`压缩中: ${path.basename(filePath)} (${sizeKB}KB)`);
  
  try {
    const ext = path.extname(filePath).toLowerCase();
    const tempPath = filePath + '.tmp';
    
    // Resize and optimize
    await sharp(filePath)
      .resize(maxWidth, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality, mozjpeg: true })
      .toFile(tempPath);
    
    const newSize = fs.statSync(tempPath).size;
    const newSizeKB = (newSize / 1024).toFixed(0);
    const saved = ((1 - newSize / size) * 100).toFixed(0);
    
    // Replace original
    fs.unlinkSync(filePath);
    fs.renameSync(tempPath, filePath);
    
    console.log(`✓ 完成: ${newSizeKB}KB (省${saved}%)\n`);
  } catch (err) {
    console.error(`✗ 错误: ${path.basename(filePath)}`, err.message);
  }
}

async function processDir(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDir(fullPath);
    } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
      await compressImage(fullPath);
    }
  }
}

console.log('开始压缩图片...\n');
await processDir(targetDir);
console.log('\n全部完成！');
