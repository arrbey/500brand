const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', '500brandglobal_preview_standalone (1).html');
const content = fs.readFileSync(htmlPath, 'utf8');

// Extract all base64 images and save them as actual image files in public/images!
const imgMatches = [];
const regex = /src="(data:image\/(jpeg|png|webp);base64,([^"]+))"/g;
let match;
let count = 0;

const imgDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

const imageMap = {};

while ((match = regex.exec(content)) !== null) {
  count++;
  const ext = match[2];
  const base64Data = match[3];
  const filename = `preview_img_${count}.${ext}`;
  const filepath = path.join(imgDir, filename);
  fs.writeFileSync(filepath, Buffer.from(base64Data, 'base64'));
  imageMap[count] = `/images/${filename}`;
  console.log(`Saved image ${count}: ${filename} (${Math.round(base64Data.length / 1024)} KB)`);
}

// Save clean HTML with local image paths
let cleanHtml = content;
let repCount = 0;
cleanHtml = cleanHtml.replace(/src="data:image\/[^;]+;base64,[^"]+"/g, () => {
  repCount++;
  return `src="${imageMap[repCount] || ''}"`;
});

fs.writeFileSync(path.join(__dirname, 'preview_clean.html'), cleanHtml);
console.log('Saved preview_clean.html with length:', cleanHtml.length);
