# uvu-watch

[![npm](https://img.shields.io/npm/v/uvu-watch.svg)](https://www.npmjs.com/package/uvu-watch)
[![ci](https://github.com/aleclarson/uvu-watch/actions/workflows/release.yml/badge.svg)](https://github.com/aleclarson/uvu-watch/actions/workflows/release.yml)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/alecdotbiz)

> Watch mode for [uvu](https://github.com/lukeed/uvu) test runner

- Plug n play (no setup required)
- Uses your local `uvu` but overwrites its command
- Runs your tests immediately, then watches your entire project
- Installs [filespy](https://github.com/alloc/filespy) on-demand to avoid slowing down CI 
- [Watchman](https://facebook.github.io/watchman/) support

&nbsp;

## Usage

- Install `uvu` and `uvu-watch` in your project
  ```sh
  yarn add uvu uvu-watch -D
  ```

- Run `uvu` through Yarn or another package manager
  ```sh
  yarn test -w
  # or
  yarn uvu tests -r esm -w
  ```
