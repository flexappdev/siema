#!/usr/bin/env node
/**
 * Upload siema paintings from Windows path to S3 com27/siema/
 * Run: node scripts/upload-to-s3.mjs
 */
import { S3Client, PutObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

const S3_BUCKET = "com27";
const S3_REGION = "eu-west-2";
const SOURCE_DIR = "/mnt/c/ABC/MEDIA/IMAGES/2026/siema";

const client = new S3Client({
  region: S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY ?? "AKIAWOXGQTTKN634WNJX",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
  },
});

// Map local filename → S3 key
const FILE_MAP = [
  ["Cosmic Detour Through Ancient Ruins.png", "siema/cosmic-detour.png"],
  ["Ilya Sutskever's Superintelligence Lab Board.png", "siema/ilya-board.png"],
  // Cyrillic 'е' in Somosiеra
  ["Somosiеra Cavalry Charge through Spain.png", "siema/somosierra.png"],
  ["image-gen-1(20260815-123758).png", "siema/sketch-01a.png"],
  ["image-gen-1(20260815-123911).png", "siema/sketch-01b.png"],
  ["image-gen-1(20260815-124449).png", "siema/sketch-01c.png"],
  ["image-gen-2(7).png", "siema/sketch-02a.png"],
  ["image-gen-2(8).png", "siema/sketch-02b.png"],
  ["image-gen-3(5).png", "siema/sketch-03a.png"],
  ["image-gen-3(6).png", "siema/sketch-03b.png"],
  ["image-gen-4(4).png", "siema/sketch-04a.png"],
  ["image-gen-4(5).png", "siema/sketch-04b.png"],
  ["image-gen-5(3).png", "siema/sketch-05a.png"],
  ["image-gen-5(4).png", "siema/sketch-05b.png"],
  ["image-gen-6(2).png", "siema/sketch-06a.png"],
  ["image-gen-6(3).png", "siema/sketch-06b.png"],
  ["image-gen-7(2).png", "siema/sketch-07.png"],
  ["image-gen-8(2).png", "siema/sketch-08.png"],
  ["image-gen-9(2).png", "siema/sketch-09.png"],
  ["image-gen-10(2).png", "siema/sketch-10.png"],
];

async function exists(key) {
  try {
    await client.send(new HeadObjectCommand({ Bucket: S3_BUCKET, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function upload(localFile, s3Key) {
  const localPath = join(SOURCE_DIR, localFile);
  if (!existsSync(localPath)) {
    console.warn(`  ⚠ Not found locally: ${localFile}`);
    return false;
  }
  const alreadyExists = await exists(s3Key);
  if (alreadyExists) {
    console.log(`  ✓ Already exists: ${s3Key}`);
    return true;
  }
  const body = readFileSync(localPath);
  await client.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: s3Key,
      Body: body,
      ContentType: "image/png",
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
  console.log(`  ↑ Uploaded: ${s3Key} (${(body.length / 1024).toFixed(0)} KB)`);
  return true;
}

async function main() {
  console.log(`Uploading ${FILE_MAP.length} siema paintings to s3://${S3_BUCKET}/siema/\n`);
  let ok = 0;
  let fail = 0;
  for (const [local, key] of FILE_MAP) {
    try {
      const success = await upload(local, key);
      if (success) ok++;
      else fail++;
    } catch (err) {
      console.error(`  ✗ Failed ${key}: ${err.message}`);
      fail++;
    }
    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 200));
  }
  console.log(`\nDone: ${ok} uploaded/existing, ${fail} failed`);
}

main().catch((e) => { console.error(e); process.exit(1); });
