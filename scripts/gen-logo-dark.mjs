/**
 * Dark-theme variant of public/v2/testsigma-logo.png.
 *
 * The brand PNG is the "on light" lock-up: teal gear + near-black wordmark. On
 * the dark theme that wordmark disappears into the page, and the usual CSS
 * fixes both fail -- `invert(1)` swings the teal to magenta, and
 * `brightness(0) invert(1)` flattens the gear to white, losing the one piece of
 * brand colour this shell keeps.
 *
 * So the recolour is done per pixel instead: anything appreciably green-of-red
 * is gear and survives untouched; everything else is wordmark and becomes
 * white, keeping its original alpha so the antialiased edges stay clean.
 *
 * Replace both files if the brand kit ships an official "on dark" lock-up.
 */
import sharp from 'sharp';

const SRC = 'public/v2/testsigma-logo.png';
const OUT = 'public/v2/testsigma-logo-dark.png';

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
	const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
	const isGear = g - r > 40 || b - r > 40; // teal: green/blue well clear of red
	if (!isGear) {
		data[i] = 255;
		data[i + 1] = 255;
		data[i + 2] = 255;
	}
}

await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
	.png()
	.toFile(OUT);

console.log(`${OUT}  ${info.width}x${info.height}`);
