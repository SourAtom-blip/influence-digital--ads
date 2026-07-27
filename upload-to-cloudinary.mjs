import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

cloudinary.config({
  cloud_name: 'fl5vkej3',
  api_key:    '473915574551887',
  api_secret: 'pzM2wJZrWc-tB8WcBfZ_LbnMAmI',
});

const IMAGES_DIR = path.join(__dirname, 'frontend', 'public', 'images');

const files = fs.readdirSync(IMAGES_DIR).filter(f =>
  /\.(jpg|jpeg|png|webp)$/i.test(f)
);

console.log(`Found ${files.length} images. Uploading...\n`);

const results = [];

for (const file of files) {
  const filePath = path.join(IMAGES_DIR, file);
  const publicId = 'influence-ads/' + path.parse(file).name;

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    });
    console.log(`✓ ${file} → ${result.secure_url}`);
    results.push({ file, url: result.secure_url });
  } catch (err) {
    console.error(`✗ ${file} → ERROR: ${err.message}`);
  }
}

console.log(`\nDone! ${results.length}/${files.length} uploaded.`);

// Save results to a file
fs.writeFileSync(
  path.join(__dirname, 'cloudinary-urls.json'),
  JSON.stringify(results, null, 2)
);
console.log('URLs saved to cloudinary-urls.json');
