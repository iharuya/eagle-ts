import type { Config } from "../lib/rest-api/index.ts";

export const DEFAULT_CONFIG = {
  baseUrl: "http://localhost:41595/api",
  fetchLike: fetch,
} satisfies Config;
