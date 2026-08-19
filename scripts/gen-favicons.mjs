/**
 * Raster favicons, generated from public/testsigma-mark.svg.
 *
 * The SVG is the primary icon and stays crisp at any size, but browsers still
 * request /favicon.ico blind, and iOS ignores SVG icons entirely -- so the mark
 * is rasterised once here rather than hand-exported.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

const SRC = 'public/testsigma-mark.svg';
const svg = readFileSync(SRC);

// 32px tab icon, and the ICO body (ICO may embed a PNG verbatim).
const png32 = await sharp(svg, { density: 384 }).resize(32, 32).png().toBuffer();
writeFileSync('public/favicon-32.png', png32);

// Apple composites touch icons on BLACK, so transparency has to go: white
// plate, mark inset to 80% the way iOS expects.
const inner = await sharp(svg, { density: 900 }).resize(144, 144).png().toBuffer();
await sharp({
	create: { width: 180, height: 180, channels: 4, background: '#ffffff' },
})
	.composite([{ input: inner, top: 18, left: 18 }])
	.png()
	.toFile('public/apple-touch-icon.png');

// Minimal single-image ICO: 6-byte header, one 16-byte directory entry, then
// the PNG itself. No dependency needed for a container this small.
const ico = Buffer.alloc(22 + png32.length);
ico.writeUInt16LE(0, 0); // reserved
ico.writeUInt16LE(1, 2); // type: icon
ico.writeUInt16LE(1, 4); // one image
ico.writeUInt8(32, 6); // width
ico.writeUInt8(32, 7); // height
ico.writeUInt8(0, 8); // palette colours: 0 = truecolour
ico.writeUInt8(0, 9); // reserved
ico.writeUInt16LE(1, 10); // colour planes
ico.writeUInt16LE(32, 12); // bits per pixel
ico.writeUInt32LE(png32.length, 14);
ico.writeUInt32LE(22, 18); // offset of the image data
png32.copy(ico, 22);
writeFileSync('public/favicon.ico', ico);

console.log('favicon-32.png', png32.length, 'B  ico', ico.length, 'B');
