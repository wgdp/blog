import { promises as fs } from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';
import type { OgObject } from "open-graph-scraper/types";

const CACHE_DIR = ".cache"

function getCacheFileName(url: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(url);
  return hash.digest('hex') + '.json';
}

export async function saveCache(url: string, ogObject: OgObject) {
  const cacheFileName = getCacheFileName(url);
  const cachePath = path.join(CACHE_DIR, cacheFileName);
  
  const dataToSave: OgObject = { ...ogObject };

  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });

    await fs.writeFile(cachePath, JSON.stringify(dataToSave, null, 2), 'utf-8');
    console.log(`[Cache] save cache => ${url}`);
  } catch (error) {
    console.error(`[Cache] failed save cache => `, error);
  }
}

export async function loadCache(url: string): Promise<OgObject | null> {
  const cacheFileName = getCacheFileName(url);
  const cachePath = path.join(CACHE_DIR, cacheFileName);
  try {
    await fs.stat(path.dirname(cachePath));
  } catch (e) {
    return null;
  }

  try {
    const fileContent = await fs.readFile(cachePath, 'utf-8');
    const data: OgObject = JSON.parse(fileContent);

    console.log(`[Cache] load cache => ${url}`);
    return data;

  } catch (error) {
    return null;
  }
}
