set -e

# Prepare "fixtures/ms"
yarn indo && cd fixtures/ms
yarn add uvu-watch@file:../..

# Test without --watch flag
yarn test

# Test watch mode
yarn test -w

# Test again, now with filespy already installed
yarn test -w
