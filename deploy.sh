#!/bin/sh

# Build the project
npm run build

# Copy the build folder to the server
sftp -b - ohmbrix.dk <<EOF
  put index.html
  put -r build/static
  put build/asset-manifest.json
  put build/manifest.json
  put build/present.png
  put build/robots.txt
  put build/index.html ønsker.html
EOF
