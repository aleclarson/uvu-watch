# uvu-watch

[![npm](https://img.shields.io/npm/v/uvu-watch.svg)](https://www.npmjs.com/package/uvu-watch)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/alecdotbiz)

> Watch mode for [uvu](https://github.com/lukeed/uvu) test runner

&nbsp;

## Local usage

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

&nbsp;

## Global usage

- Install `uvu-watch` globally
  ```sh
  yarn global add uvu-watch
  ```

- Ensure `uvu` is installed in your project
  ```sh
  yarn add uvu -D
  ```

- Run `uvu` directly
  ```sh
  uvu tests -r esm -w
  ```
