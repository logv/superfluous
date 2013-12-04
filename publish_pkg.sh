#!/usr/bin/env bash

rm -rf dist/node_modules
npm publish dist $*
cp superfluous/node_modules dist/ -R
