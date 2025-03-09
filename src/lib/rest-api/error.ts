export class APIError extends Error {
  override name = "ApiError" as const;
  constructor(private response: Response) {
    super(response.statusText);
  }

  get url() {
    return this.response.url;
  }

  get status() {
    return this.response.status;
  }

  get headers() {
    return this.response.headers;
  }

  get data() {
    return this.response.json();
  }
}
