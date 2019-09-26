#!/bin/bash

set -e
export IMAGE_NAME="a31244/selfinity_web:$BRANCH_NAME"
if [[ $IMAGE_NAME == "a31244/selfinity_web:stable" ]] ; then
  IMAGE_NAME="a31244/selfinity_web:latest"
fi
docker login --username=$DOCKER_USER --password=$DOCKER_PASS
docker-compose build
docker-compose up
docker push $IMAGE_NAME

sudo docker rm -v $(docker ps -a -q -f status=exited) || true
