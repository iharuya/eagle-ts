import { APIError } from "./error.ts";
import { join } from "jsr:@std/path@1.0.8";

export type Config = {
  baseUrl: string;
  fetchLike: typeof fetch;
};

export class BaseAPI {
  constructor(protected readonly config: Config) {}

  protected async request(params: {
    input: RequestInfo | URL;
    init: RequestInit;
  }) {
    const { input, init } = params;
    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };
    const headers = new Headers({
      ...defaultHeaders,
      ...init.headers,
    });

    const response = await this.config.fetchLike(input, {
      redirect: "follow",
      ...init,
      headers,
    });

    if (!response.ok) {
      // ok === 200 <= response.status < 300
      throw new APIError(response);
    }
    return response;
  }

  protected async get<T>(path: string): Promise<T> {
    const response = await this.request({
      input: join(this.config.baseUrl, path),
      init: {
        method: "GET",
      },
    });
    return response.json();
  }

  protected async post<T>(path: string, data: unknown): Promise<T> {
    const response = await this.request({
      input: join(this.config.baseUrl, path),
      init: {
        method: "POST",
        body: JSON.stringify(data),
      },
    });
    return response.json();
  }

  protected async put<T>(path: string, data: unknown): Promise<T> {
    const response = await this.request({
      input: join(this.config.baseUrl, path),
      init: {
        method: "PUT",
        body: JSON.stringify(data),
      },
    });
    return response.json();
  }

  protected async patch<T>(path: string, data: unknown): Promise<T> {
    const response = await this.request({
      input: join(this.config.baseUrl, path),
      init: {
        method: "PATCH",
        body: JSON.stringify(data),
      },
    });
    return response.json();
  }

  protected async delete<T>(path: string): Promise<T> {
    const response = await this.request({
      input: join(this.config.baseUrl, path),
      init: {
        method: "DELETE",
      },
    });
    return response.json();
  }
}
