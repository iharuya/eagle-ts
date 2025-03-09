import { BaseAPI } from "../../lib/rest-api/index.ts";
import { queryString } from "../../lib/querystring.ts";
import type { History, Icon, Info, Switch } from "./dto.ts";
import { join } from "../../lib/join.ts";

export class LibraryAPI extends BaseAPI {
  /**
   * Get detailed information of the library currently running.
   */
  info(): Promise<Info["response"]> {
    const path = "/library/info";
    return this.get<Info["response"]>(path);
  }

  /**
   * Get the list of libraries recently opened by the Application.
   */
  history(): Promise<History["response"]> {
    const path = "/library/history";
    return this.get<History["response"]>(path);
  }

  /**
   * Switch the library currently opened by Eagle.
   */
  switch(params: Switch["request"]): Promise<Switch["response"]> {
    const path = "/library/switch";
    return this.post<Switch["response"]>(path, params);
  }

  /**
   * Obtain the icon of the specified Library.
   *
   * Note: This endpoint is not well documented.
   * The original response is a binary image without Content-Type header.
   * It might respond 200 with a raw error message text.
   * We try to make this endpoint more friendly.
   */
  async icon(params: Icon["request"]): Promise<Icon["response"]> {
    // const libraryPath = encodeURIComponent(params.libraryPath); // seems the server is not able to parse this
    const path = `/library/icon?${
      queryString({
        libraryPath: params.libraryPath,
      })
    }`;
    const response = await this.request({
      input: join(this.config.baseUrl, path),
      init: {
        method: "GET",
        headers: {
          "Content-Type": "",
          "Accept": "*/*",
        },
      },
    });
    try {
      const text = await response.clone().text();
      if (text.length < 1000) {
        return {
          status: "error",
          message: text,
        };
      }
      const blob = await response.blob();
      const base64 = await blob.arrayBuffer()
        .then((buffer) => {
          const uint8Array = new Uint8Array(buffer);
          return btoa(String.fromCharCode.apply(null, Array.from(uint8Array)));
        });
      return {
        status: "success",
        dataURI: `data:image/png;base64,${base64}`,
      };
    } catch {
      return {
        status: "error",
        message: "Failed to convert image to base64",
      };
    }
  }
}
