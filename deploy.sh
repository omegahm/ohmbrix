#!/bin/sh

# Build the project
npm run build

# Copy the build folder to the server
scp build/index.html ohmbrix.dk:public_html/ønsker.html
scp -r build/* ohmbrix.dk:public_html/.
scp index.html ohmbrix.dk:public_html/.
