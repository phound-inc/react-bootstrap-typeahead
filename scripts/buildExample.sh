#!/bin/sh

# Build example file for development
rm example/index.js
./node_modules/.bin/webpack -w --progress --colors --config example/webpack.config.example.js
