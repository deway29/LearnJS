const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch').default;

async function visualCompare(baselinePath, actualPath, diffPath) {
    const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
    const img2 = PNG.sync.read(fs.readFileSync(actualPath));

    if (img1.width !== img2.width || img1.height !== img2.height) {
        throw new Error('Image sizes do not match');
    }

    const diff = new PNG({ width: img1.width, height: img1.height });

    const mismatch = pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        img1.width,
        img1.height,
        { threshold: 0.1 }
    );

    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    return mismatch;
}

module.exports = visualCompare;
