#!/bin/bash

IMAGE_NAME='dev_db_qrmania_image'
CONTAINER_NAME='dev_db_qrmania'
PORT='3306'

docker stop dev_db_qrmania
docker rm dev_db_qrmania
docker build -f Dev/Database/Dev/Dockerfile -t dev_db_qrmania_image .
docker run -d -p 3306:3306 --name=dev_db_qrmania dev_db_qrmania_image
