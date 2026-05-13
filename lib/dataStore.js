/**
 * dataStore.js — Vercel-compatible file-based data store.
 *
 * Vercel's serverless runtime mounts the deployment directory as read-only.
 * Any writes must go to /tmp (ephemeral, but writable).
 *
 * Strategy:
 *  - On every read, check /tmp/<file> first.
 *  - If not present, seed /tmp/<file> from the bundled data/<file> (read-only source of truth).
 *  - All writes go to /tmp/<file>.
 *
 * NOTE: /tmp is ephemeral — it resets between cold starts. This is fine for a
 * portfolio CMS backed by flat files. For persistence across deployments the
 * data/ JSON files must be committed to the repo (they act as the seed).
 */

import fs from "fs";
import path from "path";

const IS_VERCEL = process.env.VERCEL === "1";
const TMP_DIR = IS_VERCEL ? "/tmp/portfolio-data" : null;

/**
 * Returns the writable path for a given data filename.
 * On Vercel: /tmp/portfolio-data/<filename>
 * Locally:   <cwd>/data/<filename>
 */
function getWritablePath(filename) {
  if (!IS_VERCEL) {
    return path.join(process.cwd(), "data", filename);
  }
  // Ensure the tmp dir exists
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
  }
  return path.join(TMP_DIR, filename);
}

/**
 * Seeds the tmp file from the bundled read-only source if not already present.
 */
function seedIfNeeded(writablePath, filename, defaultValue) {
  if (fs.existsSync(writablePath)) return;

  // Try reading from the bundled data/ directory (read-only on Vercel)
  const sourcePath = path.join(process.cwd(), "data", filename);
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, writablePath);
  } else {
    // No source file — create from default
    fs.writeFileSync(
      writablePath,
      typeof defaultValue === "string"
        ? defaultValue
        : JSON.stringify(defaultValue, null, 2),
      "utf-8"
    );
  }
}

/**
 * Read a JSON array file.
 * @param {string} filename  e.g. "experience.json"
 * @param {Array}  [defaultValue=[]]
 */
export function readData(filename, defaultValue = []) {
  const writablePath = getWritablePath(filename);
  seedIfNeeded(writablePath, filename, defaultValue);
  try {
    const raw = fs.readFileSync(writablePath, "utf-8");
    return raw.trim() ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Write a JSON value to a file.
 * @param {string} filename  e.g. "experience.json"
 * @param {*}      data
 */
export function writeData(filename, data) {
  const writablePath = getWritablePath(filename);
  // Make sure the parent dir exists (needed on Vercel /tmp)
  const dir = path.dirname(writablePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(writablePath, JSON.stringify(data, null, 2), "utf-8");
}
