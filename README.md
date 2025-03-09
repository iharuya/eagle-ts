# Eagle API client for Typescript users

[Eagle](https://en.eagle.cool/) is an app to organize all your reference images
in one place.

You can manipulate your image library in Typescript 💪

## Key Features

- **Type-safe:** Leverage TypeScript's type system for safe and efficient
  interaction with the Eagle API.
- **Full-featured:** Access all functionalities of the Eagle API.
- **Asynchronous:** Supports asynchronous operations using `async/await`.

## Install

This package is registered on JSR: https://jsr.io/@iharuya/eagle

- npm: `npx jsr add @iharuya/eagle`
- pnpm: `pnpm dlx jsr add @iharuya/eagle`
- deno: `deno add jsr:@iharuya/eagle` (if you want to explicitly install it)
- bun: `bunx jsr add @iharuya/eagle`

## Usage

You'd have to open Eagle App first to gain access to all function of Eagle API.

```ts
import { EagleAPI } from "@iharuya/eagle/rest";
const eagle = new EagleAPI();
try {
  const result = await eagle.folder.create({ folderName: "test" });
  console.log(result);
} catch (error) {
  console.error(error);
}
```

## Eagle REST API

Useful if you want to programmatically create or update items in your library.

Documentation: https://api.eagle.cool/

Client supports version 3.0 Build23（2022-11-01）

## Eagle Plugin API

**Currently not supported.**

Documentation: https://developer.eagle.cool/plugin-api

You can use the official SDK in Javascript to develop plugins.

## Disclaimer

This is an unofficial client implementation for the Eagle API. While it follows
the official API documentation, please be aware of the following:

- API responses may contain additional data not mentioned in the official
  documentation.
- Obscure properties will be typed as `unknown`.
- The Eagle API may change in the future, potentially affecting the behavior or
  compatibility of this client.
- This client is not officially supported by Eagle.

Please use this client at your own risk.

## Development

While the official documentation provides a good starting point, it may not be
exhaustive. For more precise typing and debugging, using Jupyter Notebook is
recommended. First, run `deno jupyter --install` to set it up.

## License

MIT
