#!/bin/sh

docker pull quay.io/lyfe00011/md:beta

docker run -it --name levanter-setup --rm \
  -v "$PWD:/root/LyFE" \
  quay.io/lyfe00011/md:beta \
  sh -c "git clone https://github.com/lyfe00011/levanter.git /root/LyFE && cd /root/LyFE && yarn install" 
