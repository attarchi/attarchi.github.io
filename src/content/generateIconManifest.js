const fs = require('fs');
const path = require('path');

function generateIconManifest() {
    const iconsDir = path.join(process.cwd(), 'public', 'icons');
    const outputPath = path.join(process.cwd(), 'src', 'content', 'icon-manifest.json');

    try {
        const files = fs.readdirSync(iconsDir);
        const iconManifest = {};
        files.forEach(file => {
            const ext = path.extname(file);
            const name = path.basename(file, ext);
            if (ext === '.svg') {
                iconManifest[name] = 'svg';
            } else if (ext === '.png') {
                iconManifest[name] = 'png';
            }
        });
        fs.writeFileSync(outputPath, JSON.stringify(iconManifest, null, 2));
        return iconManifest;
    } catch (error) {
        console.error('❌ Error generating icon manifest:', error);
        process.exit(1);
    }
}

module.exports = { generateIconManifest }; 