const fs = require('fs');
const path = require('path');
const root = 'D:\\KZ-Optical\\KZ-Optical-Full-Build';
const file = path.join(root, 'lib', 'superflex-photo-manifest.json');
const data = JSON.parse(fs.readFileSync(path.join(root, 'superflex-kids-response.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(file, 'utf8'));
let connected = 0;
for (const model of data) {
  const photos = [];
  for (const group of model.colorGroup || []) {
    for (const size of group.sizes || []) {
      for (const img of size.imageIds || []) {
        const full = path.join(root, 'public', 'westgroupe', model.styleCode, img.name);
        if (fs.existsSync(full)) {
          photos.push({
            code: group.color.split(' ')[0],
            colour: group.color,
            size: size.size,
            image: '/westgroupe/' + model.styleCode + '/' + img.name
          });
        }
      }
    }
  }
  if (photos.length) {
    manifest[model.styleCode.toLowerCase()] = photos;
    connected++;
  }
}
fs.copyFileSync(file, file + '.bak');
fs.writeFileSync(file, JSON.stringify(manifest, null, 2));
console.log('Superflex Kids models connected:', connected);
console.log('Existing adult Superflex entries preserved.');
