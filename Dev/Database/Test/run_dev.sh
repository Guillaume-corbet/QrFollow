#!/bin/bash

IMAGE_NAME='dev_db_qrmania_test_image'
CONTAINER_NAME='dev_db_qrmania_test'
PORT='3306'

docker stop dev_db_qrmania_test
docker rm dev_db_qrmania_test
docker build -f Dev/Database/Test/Dockerfile -t dev_db_qrmania_image_test .
docker run -d -p 3306:3306 --name=dev_db_qrmania_test dev_db_qrmania_image_test
