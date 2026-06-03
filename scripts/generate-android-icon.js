const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const root = path.resolve(__dirname, "..");

const targets = [
  ["assets/icon.png", 1024],
  ["android/app/src/main/res/mipmap-mdpi/ic_launcher.webp", 48],
  ["android/app/src/main/res/mipmap-mdpi/ic_launcher_round.webp", 48],
  ["android/app/src/main/res/mipmap-hdpi/ic_launcher.webp", 72],
  ["android/app/src/main/res/mipmap-hdpi/ic_launcher_round.webp", 72],
  ["android/app/src/main/res/mipmap-xhdpi/ic_launcher.webp", 96],
  ["android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.webp", 96],
  ["android/app/src/main/res/mipmap-xxhdpi/ic_launcher.webp", 144],
  ["android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.webp", 144],
  ["android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.webp", 192],
  ["android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.webp", 192]
];

const colors = {
  background: [8, 7, 13, 255],
  border: [196, 181, 253, 85],
  core: [196, 181, 253, 255],
  horizontal: [139, 92, 246, 255],
  surface: [21, 17, 31, 255],
  vertical: [109, 40, 217, 255]
};

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const checksum = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  checksum.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, checksum]);
}

function insideRoundedRect(x, y, left, top, right, bottom, radius) {
  const cx = Math.max(left + radius, Math.min(x, right - radius));
  const cy = Math.max(top + radius, Math.min(y, bottom - radius));
  return (x - cx) ** 2 + (y - cy) ** 2 <= radius ** 2;
}

function pixel(size, x, y) {
  const u = (x + 0.5) / size;
  const v = (y + 0.5) / size;
  const markLeft = 0.18;
  const markTop = 0.18;
  const markRight = 0.82;
  const markBottom = 0.82;

  if (insideRoundedRect(u, v, markLeft, markTop, markRight, markBottom, 0.16)) {
    const inner = insideRoundedRect(u, v, 0.205, 0.205, 0.795, 0.795, 0.135);
    if (!inner) {
      return colors.border;
    }

    const horizontal = insideRoundedRect(u, v, 0.29, 0.47, 0.71, 0.53, 0.03);
    if (horizontal) {
      return colors.horizontal;
    }

    const vertical = insideRoundedRect(u, v, 0.47, 0.29, 0.53, 0.71, 0.03);
    if (vertical) {
      return colors.vertical;
    }

    const core = insideRoundedRect(u, v, 0.43, 0.43, 0.57, 0.57, 0.04);
    if (core) {
      return colors.core;
    }

    return colors.surface;
  }

  return colors.background;
}

function png(size) {
  const bytesPerPixel = 4;
  const rowLength = 1 + size * bytesPerPixel;
  const raw = Buffer.alloc(rowLength * size);

  for (let y = 0; y < size; y += 1) {
    const rowStart = y * rowLength;
    raw[rowStart] = 0;

    for (let x = 0; x < size; x += 1) {
      const color = pixel(size, x, y);
      const offset = rowStart + 1 + x * bytesPerPixel;
      raw[offset] = color[0];
      raw[offset + 1] = color[1];
      raw[offset + 2] = color[2];
      raw[offset + 3] = color[3];
    }
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 6;
  header[10] = 0;
  header[11] = 0;
  header[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", header),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]);
}

for (const [relativePath, size] of targets) {
  const output = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, png(size));
}

console.log(`Generated ${targets.length} launcher icon files.`);
