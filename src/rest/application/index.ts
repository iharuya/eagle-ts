import { BaseAPI } from "../../lib/rest-api/index.ts";
import type { Info } from "./dto.ts";

export class ApplicationAPI extends BaseAPI {
  /**
   * Get detailed information on the Eagle App currently running.
   * In most cases, this could be used to determine whether certain
   * functions are available on the user's device.
   */
  info(): Promise<Info["response"]> {
    const path = "/application/info";
    return this.get<Info["response"]>(path);
  }
}
