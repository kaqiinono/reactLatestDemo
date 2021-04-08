#!/bin/bash

if [ ! -d "../.husky/_" ]; then
  npx husky add ../.husky/pre-commit "npm run lint-staged";
  npx husky add ../.husky/commit-msg 'npx --no-install commitlint --edit "$1"';
fi
