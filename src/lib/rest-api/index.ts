import { APIError } from "./error.ts";
import { join } from "../join.ts";

export type Config = {
  baseUrl: string;
};

export class BaseAPI {
  constructor(protected readonly config: Config) {}

  protected async request(params: {
    input: RequestInfo | URL;
    init: RequestInit;
  }): Promise<Response> {
    const { input, init } = params;
    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
    };
    const headers = new Headers({
      ...defaultHeaders,
      ...init.headers,
    });

    const response = await fetch(input, {
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
