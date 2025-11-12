import ogs from "open-graph-scraper";
import { loadCache, saveCache } from "./cache";
import type { OgObject } from "open-graph-scraper/types";

export async function getOpenGraphData(url: string): Promise<OgObject | null> {
  const options = { url, timeout: 60 };
  const cache = await loadCache(url);
  if (cache != null) {
    return cache;
  }
  console.log(`[Cache] not found cache => ${url}`);
  try {
    const { result } = await ogs(options);
    await saveCache(url, result);
    return result;
  } catch (error: any) {
    // 404エラーの場合noimage.pngを入れる
    if (error.result.error === "404 Not Found") {
      console.warn('linkcard is', error.result.error, '=>', error.result.requestUrl)
    }
    return null;
  }
}
