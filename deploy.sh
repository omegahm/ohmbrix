#!/bin/sh

set -e

npm run build

scp -r build/* ssh.simply.com:public_html/.
