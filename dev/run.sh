#!/bin/bash

# Konteinerio pavadinimas
CONTAINER_NAME="nginx-reverse-proxy"

# 1. Jei senas konteineris veikia, jį sustabdome ir pašaliname
docker run -d   -p 80:80   --add-host=host.docker.internal:host-gateway   -v "$(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro"   nginx:alpine

docker inspect   -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -q)
