/**
 * This module is the main entry point for the Eagle REST API client.
 * @module
 */

import { BaseAPI, type Config } from "../lib/rest-api/index.ts";
import { DEFAULT_CONFIG } from "./config.ts";
import { ApplicationAPI } from "./application/index.ts";
import { FolderAPI } from "./folder/index.ts";
import { ItemAPI } from "./item/index.ts";
import { LibraryAPI } from "./library/index.ts";

/**
 * The main class for interacting with the Eagle REST API.
 *
 * @example
 * ```ts
 * const eagle = new EagleAPI();
 * const result = await eagle.application.info();
 * ```
 */
export class EagleAPI extends BaseAPI {
  constructor(_config?: Partial<Config>) {
    const config = {
      ...DEFAULT_CONFIG,
      ..._config,
    };
    super(config);
  }

  application: ApplicationAPI = new ApplicationAPI(this.config);
  folder: FolderAPI = new FolderAPI(this.config);
  item: ItemAPI = new ItemAPI(this.config);
  library: LibraryAPI = new LibraryAPI(this.config);
}
