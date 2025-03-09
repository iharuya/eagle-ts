import { BaseAPI } from "../../lib/rest-api/index.ts";
import { queryString } from "../../lib/querystring.ts";
import type {
  AddBookmark,
  AddFromPath,
  AddFromPaths,
  AddFromURL,
  AddFromURLs,
  Info,
  List,
  MoveToTrash,
  RefreshPalette,
  RefreshThumbnail,
  Thumbnail,
  Update,
} from "./dto.ts";

export class ItemAPI extends BaseAPI {
  /**
   * Add an image from a URL to Eagle App.
   */
  addFromURL(params: AddFromURL["request"]): Promise<AddFromURL["response"]> {
    const path = "/item/addFromURL";
    return this.post<AddFromURL["response"]>(path, params);
  }

  /**
   * Add multiple images from URLs to Eagle App.
   */
  addFromURLs(
    params: AddFromURLs["request"],
  ): Promise<AddFromURLs["response"]> {
    const path = "/item/addFromURLs";
    return this.post<AddFromURLs["response"]>(path, params);
  }

  /**
   * Add a local file to Eagle App.
   */
  addFromPath(
    params: AddFromPath["request"],
  ): Promise<AddFromPath["response"]> {
    const path = "/item/addFromPath";
    return this.post<AddFromPath["response"]>(path, params);
  }

  /**
   * Add multiple local files to Eagle App.
   */
  addFromPaths(
    params: AddFromPaths["request"],
  ): Promise<AddFromPaths["response"]> {
    const path = "/item/addFromPaths";
    return this.post<AddFromPaths["response"]>(path, params);
  }

  /**
   * Save the link in the URL form to Eagle App.
   */
  addBookmark(
    params: AddBookmark["request"],
  ): Promise<AddBookmark["response"]> {
    const path = "/item/addBookmark";
    return this.post<AddBookmark["response"]>(path, params);
  }

  /**
   * Get properties of the specified file.
   */
  info(params: Info["request"]): Promise<Info["response"]> {
    const path = `/item/info?${queryString(params)}`;
    return this.get<Info["response"]>(path);
  }

  /**
   * Get the path of the thumbnail of the specified file.
   */
  thumbnail(params: Thumbnail["request"]): Promise<Thumbnail["response"]> {
    const path = `/item/thumbnail?${queryString(params)}`;
    return this.get<Thumbnail["response"]>(path);
  }

  /**
   * Get items that match the filter condition.
   */
  list(params?: List["request"]): Promise<List["response"]> {
    let path = "/item/list";
    if (params) {
      const query = queryString(params);
      if (query) path += `?${query}`;
    }
    return this.get<List["response"]>(path);
  }

  /**
   * Move items to trash.
   */
  moveToTrash(
    params: MoveToTrash["request"],
  ): Promise<MoveToTrash["response"]> {
    const path = "/item/moveToTrash";
    return this.post<MoveToTrash["response"]>(path, params);
  }

  /**
   * Re-analyze the color of the file.
   */
  refreshPalette(
    params: RefreshPalette["request"],
  ): Promise<RefreshPalette["response"]> {
    const path = "/item/refreshPalette";
    return this.post<RefreshPalette["response"]>(path, params);
  }

  /**
   * Re-generate the thumbnail of the file.
   */
  refreshThumbnail(
    params: RefreshThumbnail["request"],
  ): Promise<RefreshThumbnail["response"]> {
    const path = "/item/refreshThumbnail";
    return this.post<RefreshThumbnail["response"]>(path, params);
  }

  /**
   * Modify data of specified fields of the item.
   */
  update(params: Update["request"]): Promise<Update["response"]> {
    const path = "/item/update";
    return this.post<Update["response"]>(path, params);
  }
}
