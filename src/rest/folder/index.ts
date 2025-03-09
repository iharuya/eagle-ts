import { BaseAPI } from "../../lib/rest-api/index.ts";
import type { Create, List, ListRecent, Rename, Update } from "./dto.ts";

export class FolderAPI extends BaseAPI {
  /**
   * Create a folder.
   * The created folder will be put at the bottom of the folder list of the current library.
   */
  create(params: Create["request"]) {
    const path = "/folder/create";
    return this.post<Create["response"]>(path, params);
  }

  /**
   * Rename the specified folder.
   */
  rename(params: Rename["request"]) {
    const path = "/folder/rename";
    return this.post<Rename["response"]>(path, params);
  }

  /**
   * Update the specified folder.
   */
  update(params: Update["request"]) {
    const path = "/folder/update";
    return this.post<Update["response"]>(path, params);
  }

  /**
   * Get the list of folders of the current library.
   */
  list() {
    const path = "/folder/list";
    return this.get<List["response"]>(path);
  }

  /**
   * Get the list of folders recently used by the user.
   */
  listRecent() {
    const path = "/folder/listRecent";
    return this.get<ListRecent["response"]>(path);
  }
}
