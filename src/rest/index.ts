import { BaseAPI, type Config } from "../lib/rest-api/index.ts";
import { DEFAULT_CONFIG } from "./config.ts";
import { ApplicationAPI } from "./application/index.ts";
import { FolderAPI } from "./folder/index.ts";
import { ItemAPI } from "./item/index.ts";
import { LibraryAPI } from "./library/index.ts";

export class EagleAPI extends BaseAPI {
  constructor(_config?: Config) {
    const config = {
      ...DEFAULT_CONFIG,
      ..._config,
    };
    super(config);
  }

  application = new ApplicationAPI(this.config);
  folder = new FolderAPI(this.config);
  item = new ItemAPI(this.config);
  library = new LibraryAPI(this.config);
}
