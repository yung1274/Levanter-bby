#!/bin/sh

docker run -it --rm \
  -v "$PWD:/root/LyFE" \
  -w /root/LyFE \
  quay.io/lyfe00011/md:beta \
  npm start
