#!/bin/sh

# Build the project
npm run build

# Copy the build folder to the server
scp build/index.html ssh.simply.com:public_html/ønsker.html
scp -r build/* ssh.simply.com:public_html/.
scp index.html ssh.simply.com:public_html/.
